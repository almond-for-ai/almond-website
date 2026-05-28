import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required by @opennextjs/cloudflare when using `--skipNextBuild`
  // so .next/standalone/ exists before the OpenNext bundler runs.
  output: "standalone",
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

// Wires up Cloudflare bindings into `next dev` so server code can access
// the same env it sees in production via getCloudflareContext().
// See https://opennext.js.org/cloudflare/get-started
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
