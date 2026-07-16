// `wrangler types` only sees vars present in .dev.vars, which is gitignored
// (it holds real local secrets) and doesn't exist in CI. Runtime secrets set
// via `wrangler secret put` are never in that file either. Declare them here
// so CloudflareEnv stays typed everywhere without a real key on disk.
interface CloudflareEnv {
  RESEND_API_KEY: string;
}
