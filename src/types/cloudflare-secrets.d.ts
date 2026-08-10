/**
 * Types for Worker secrets.
 *
 * `wrangler types` only knows about bindings declared in wrangler.jsonc, and
 * secrets deliberately are not declared there: a plain-text var of the same
 * name is pushed on every deploy and would overwrite the secret. So the secret
 * types live here by hand, outside the generated cloudflare-env.d.ts.
 *
 * Set the value with `wrangler secret put RESEND_API_KEY` (once per
 * environment), or put it in .dev.vars for local development.
 *
 * Optional because it is genuinely absent until someone sets it; the waitlist
 * route checks for it before trying to send a confirmation email.
 */
interface CloudflareEnv {
  RESEND_API_KEY?: string;
}

declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY?: string;
  }
}
