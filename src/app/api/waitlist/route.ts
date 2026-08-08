import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import { sendWaitlistConfirmation } from "@/lib/email";

/**
 * Beta waitlist capture.
 *
 * Persists to the `WAITLIST_DB` D1 database (binding declared in
 * wrangler.jsonc, schema in migrations/0001_waitlist.sql) and, on a
 * genuinely new signup, sends a confirmation via Resend using
 * `env.RESEND_API_KEY`. The response shape (`position`, `alreadyIn`) is
 * BetaWaitlist.tsx's contract for the "you're in the orchard" success state.
 */

// Believable starting spot so early signups don't read as "#1".
const BASE_POSITION = 137;

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
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That doesn't look like an email." },
      { status: 422 },
    );
  }

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
      return NextResponse.json(
        { error: "Slow down, try again in a few minutes." },
        { status: 429 },
      );
    }

    // Duplicate email is treated as success (idempotent insert) so
    // membership isn't leakable through a distinct error state.
    const result = await db
      .prepare(
        "INSERT INTO waitlist (email, ip_hash, user_agent) VALUES (?1, ?2, ?3) ON CONFLICT(email) DO NOTHING",
      )
      .bind(email, ipHash, request.headers.get("user-agent") ?? null)
      .run();

    const alreadyIn = result.meta.changes === 0;

    // Position is the row's own id, so it's stable across requests and
    // consistent with the "spot #N" copy regardless of who else signs up
    // in between. SQLite serializes writes, so this is race-free.
    const row = await db
      .prepare("SELECT id FROM waitlist WHERE email = ?1")
      .bind(email)
      .first<{ id: number }>();
    const position = BASE_POSITION + (row?.id ?? 0);

    // Only email on a genuinely new row.
    if (!alreadyIn && env.RESEND_API_KEY) {
      ctx.waitUntil(
        sendWaitlistConfirmation(env.RESEND_API_KEY, email).catch((err) => {
          console.error("waitlist confirmation email failed", err);
        }),
      );
    }

    return NextResponse.json({ ok: true, position, alreadyIn });
  } catch (err) {
    console.error("waitlist signup failed", err);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
