import { Resend } from "resend";

// Personal name in the from-header, not just the brand — Gmail's Promotions
// classifier weighs sender identity heavily, and a company name alone reads
// as a marketing sender regardless of content.
const FROM = "Atishay from Almond <hello@almondai.tech>";
const REPLY_TO = "contact.almondai@gmail.com";

// Plain text only, no HTML part at all. The earlier version's table/card
// layout (centered content, colored background, boxed sections) is exactly
// the structural fingerprint Gmail's classifier associates with bulk/product
// email, independent of copy — landed in Promotions despite having no images
// or buttons. A real 1:1 email has no markup to fingerprint, so this drops
// the HTML entirely and relies on text alone.
function waitlistConfirmationText(): string {
  return [
    "hey, thanks for signing up.",
    "",
    "I'll email when there's something worth sharing, probably not for a",
    "while. If you're curious in the meantime I wrote a few short notes",
    "here: https://almondai.tech/manifesto",
    "",
    "reply anytime,",
    "atishay",
  ].join("\n");
}

export async function sendWaitlistConfirmation(
  apiKey: string,
  email: string,
): Promise<void> {
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    replyTo: REPLY_TO,
    subject: "you're in",
    text: waitlistConfirmationText(),
  });
  // The SDK resolves with `{ error }` on API failures rather than throwing,
  // so callers relying on try/catch alone would silently miss send failures.
  if (error) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}
