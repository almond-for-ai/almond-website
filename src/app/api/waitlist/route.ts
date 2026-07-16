import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import { sendWaitlistConfirmation } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = "-10 minutes";

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: NextRequest) {
  // Same-origin check: browsers always send Origin on cross-site POSTs.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let body: { email?: unknown; source?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn the field exists.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const source =
    typeof body.source === "string" ? body.source.slice(0, 32) : null;

  const { env, ctx } = getCloudflareContext();
  const db = env.WAITLIST_DB;

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const ipHash = await sha256Hex(ip);

  try {
    const recent = await db
      .prepare(
        "SELECT COUNT(*) AS n FROM waitlist WHERE ip_hash = ?1 AND created_at > datetime('now', ?2)",
      )
      .bind(ipHash, RATE_LIMIT_WINDOW)
      .first<{ n: number }>();
    if ((recent?.n ?? 0) >= RATE_LIMIT_MAX) {
      return NextResponse.json({ ok: false, error: "slow_down" }, { status: 429 });
    }

    // Duplicate email is treated as success so membership isn't leakable.
    const result = await db
      .prepare(
        "INSERT INTO waitlist (email, source, ip_hash, user_agent) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(email) DO NOTHING",
      )
      .bind(email, source, ipHash, request.headers.get("user-agent") ?? null)
      .run();

    // Only email on a genuinely new row (meta.changes === 0 means the
    // conflict branch fired, i.e. this email already existed).
    if (result.meta.changes > 0 && env.RESEND_API_KEY) {
      ctx.waitUntil(
        sendWaitlistConfirmation(env.RESEND_API_KEY, email).catch((err) => {
          console.error("waitlist confirmation email failed", err);
        }),
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
