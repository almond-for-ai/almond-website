import { NextResponse } from "next/server";

/**
 * Beta waitlist capture.
 *
 * NOTE: persistence is intentionally a single swappable seam (`saveSignup`).
 * Today it uses an in-memory store so the flow works end-to-end locally.
 * For production, replace the body of `saveSignup` with a durable sink:
 *   - Cloudflare KV / D1 (add the binding in wrangler.jsonc), or
 *   - an email tool (Resend / Loops / Mailchimp) via its API, or
 *   - a Google Sheet / form webhook.
 */

// Believable starting spot so early signups don't read as "#1".
const BASE_POSITION = 137;
const store = new Set<string>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function saveSignup(
  email: string,
  _name: string,
): Promise<{ position: number; alreadyIn: boolean }> {
  const key = email.toLowerCase();
  const alreadyIn = store.has(key);
  if (!alreadyIn) store.add(key);
  // `_name` is captured here too — persist it alongside the email when you
  // wire a durable sink (KV/D1/email tool).
  // Position is deterministic-ish: base + count of unique signups.
  const position = BASE_POSITION + store.size;
  return { position, alreadyIn };
}

export async function POST(request: Request) {
  let email = "";
  let name = "";
  try {
    const body = (await request.json()) as { email?: unknown; name?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
    name = typeof body.name === "string" ? body.name.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That doesn't look like an email." },
      { status: 422 },
    );
  }

  const { position, alreadyIn } = await saveSignup(email, name);

  return NextResponse.json({ ok: true, position, alreadyIn });
}
