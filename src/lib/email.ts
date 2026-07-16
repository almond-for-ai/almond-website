import { Resend } from "resend";

const FROM = "Almond <hello@almondai.tech>";
const REPLY_TO = "contact.almondai@gmail.com";

function waitlistConfirmationText(): string {
  return [
    "You're on the list.",
    "",
    "Thanks for showing up early. We keep this list short and only write",
    "when there's something worth saying, so this is likely the last",
    "email you'll get from us for a while.",
    "",
    "If you're curious in the meantime, a few short notes are here:",
    "https://almondai.tech/manifesto",
    "",
    "Reply to this email any time; a person reads it.",
    "",
    "Almond",
  ].join("\n");
}

// Plain, text-forward layout on purpose: no logo image, no banner, no
// filled marketing button. High text-to-markup ratio and a real reply-to
// read better as a personal note than a promo blast to mail providers.
function waitlistConfirmationHtml(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>You're on the list</title>
  </head>
  <body style="margin:0;padding:0;background-color:#faf7f3;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Thanks for showing up early. We'll write when there's something worth saying.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f3;">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:15px;letter-spacing:0.02em;color:#7b4019;padding-bottom:32px;">
                Almond
              </td>
            </tr>
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;color:#1a1a1a;padding-bottom:20px;">
                You're on the list.
              </td>
            </tr>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#3a3a3a;padding-bottom:16px;">
                Thanks for showing up early. We keep this list short and only write when there's something worth saying, so this is likely the last email you'll get from us for a while.
              </td>
            </tr>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#3a3a3a;padding-bottom:32px;">
                If you're curious in the meantime, a few short notes are here:<br />
                <a href="https://almondai.tech/manifesto" style="color:#7b4019;">almondai.tech/manifesto</a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #e8e1d8;padding-top:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#8a8a8a;">
                Reply to this email any time. A person reads it.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
    subject: "You're on the list",
    html: waitlistConfirmationHtml(),
    text: waitlistConfirmationText(),
  });
  // The SDK resolves with `{ error }` on API failures rather than throwing,
  // so callers relying on try/catch alone would silently miss send failures.
  if (error) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}
