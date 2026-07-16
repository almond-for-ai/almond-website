import { Resend } from "resend";

const FROM = "Almond <hello@almondai.tech>";
const REPLY_TO = "contact.almondai@gmail.com";

// Research (see PR/commit note) converges on: Gmail's Promotions classifier
// is cumulative, not a single trigger. The signals that matter are HTML
// tables/multi-column layout, background-color blocks, logo/brand headers,
// button-style CTAs, image weight, and clustered links — not "any styling at
// all." A single column of plain paragraphs with inline text styling, one
// descriptive-text link, and a real text/plain alternative stays well clear
// of those signals while looking like actual writing instead of raw text.
// Kept: no table wrapper, no background-color, no logo, no button, one link.
function waitlistConfirmationText(): string {
  return [
    "You're on the list.",
    "",
    "I'll write when there's something worth sharing, probably not for a",
    "while. If you're curious in the meantime, a few short notes are here:",
    "https://almondai.tech/manifesto",
    "",
    "Reply anytime.",
  ].join("\n");
}

function waitlistConfirmationHtml(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:24px;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:24px;color:#222;">
    <p style="margin:0 0 16px;">You're on the list.</p>
    <p style="margin:0 0 16px;">
      I'll write when there's something worth sharing, probably not for a
      while. If you're curious in the meantime, a few short notes are
      <a href="https://almondai.tech/manifesto" style="color:#7b4019;">here</a>.
    </p>
    <p style="margin:0;">Reply anytime.</p>
  </body>
</html>`;
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
    html: waitlistConfirmationHtml(),
    text: waitlistConfirmationText(),
  });
  // The SDK resolves with `{ error }` on API failures rather than throwing,
  // so callers relying on try/catch alone would silently miss send failures.
  if (error) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}
