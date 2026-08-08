import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount } from "@/components/Motion";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Self-host · Almond AI",
  description:
    "Self-hosting Almond will be supported. Contact the team for more information.",
};

/**
 * What the page says until self-hosting ships. The full SELF_HOST_DATA below
 * is kept but not rendered: restore the sections that read from it once the
 * capability is available.
 */
const SELF_HOST_TEASER = {
  chip: "Self-host · Coming soon",
  title: "Run Almond on your own infrastructure.",
  body: "Self-hosting will be supported. Our team is working hard on it and we will share an update as soon as it is available.",
  cta: { label: "Contact the team", href: "/contact" },
};

const SELF_HOST_DATA = {
  hero: {
    chip: "Self-host · Coming soon",
    title: "Run Almond on your own infrastructure.",
    status:
      "Self-hosting will be supported. Our team is working hard on it and we will share an update as soon as it is available.",
    solo: {
      subtitle:
        "For when memory can't leave the building. Air-gap it, bring your keys, pick your region. Same product, your perimeter.",
    },
    team: {
      subtitle:
        "For teams with residency, air-gap, or compliance requirements. Same product, your servers, your rules.",
    },
  },
  why: {
    eyebrow: "Why self-host",
    heading: "When the memory can't leave the building.",
    items: [
      {
        title: "Data residency",
        body: "Memory stays in your region, on your hardware. No egress you didn't approve.",
      },
      {
        title: "Air-gapped",
        body: "Runs with no outbound connection. Built for networks that never touch the internet.",
      },
      {
        title: "Compliance",
        body: "Meet the controls your auditors require, with retention policies you set.",
      },
    ],
  },
  get: {
    eyebrow: "What you get",
    heading: "The same product. Your servers.",
    points: [
      "On-prem MCP server",
      "Full memory engine, no managed dependency",
      "Custom retention + deletion policies",
      "All integrations, wired to your instance",
      "Dedicated solutions engineer",
    ],
  },
  deploy: {
    eyebrow: "Deploy",
    heading: "One command in.",
    body: "Ship it into your cluster, point your tools at the on-prem MCP server, and you're running.",
    lines: [
      "> almond deploy --on-prem",
      "✓ pulling almond-core",
      "✓ MCP server up :7700",
      "✓ memory engine ready",
      "> almond status",
      "running · self-hosted · air-gapped",
    ],
  },
  requirements: {
    eyebrow: "Requirements",
    heading: "What it needs to run.",
    items: [
      { label: "Runtime", value: "Docker or Kubernetes" },
      { label: "Compute", value: "4 vCPU · 8 GB RAM minimum" },
      { label: "Storage", value: "Postgres-compatible volume" },
      { label: "Network", value: "Internal only · no egress required" },
    ],
  },
};

export default async function SelfHostPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const sp = await searchParams;
  const view = getViewFromSearchParams(sp);

  if (view !== "roasted") {
    return (
      <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
        <SiteNav />
        <PageRawView payload={SELF_HOST_TEASER} format={view} scope="self-host" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/self-host" />

      {/* ── Holding page until self-hosting ships ───────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[100px] md:pt-[180px] md:pb-[140px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{SELF_HOST_TEASER.chip}</span>
          </Mount>
          <Mount delay={0.18} y={14} className="mt-[28px]">
            <h1 className="max-w-[820px] font-sans text-[34px] font-medium leading-[38px] tracking-[-0.68px] text-black md:text-[48px] md:leading-[52px] md:tracking-[-0.96px]">
              {SELF_HOST_TEASER.title}
            </h1>
          </Mount>
          <Mount delay={0.26} y={12} className="mt-[20px]">
            <p className="max-w-[560px] text-[18px] leading-[28px] text-black/60 md:text-[20px] md:leading-[30px]">
              {SELF_HOST_TEASER.body}
            </p>
          </Mount>
          <Mount delay={0.34} y={12} className="mt-[32px]">
            <Link href={SELF_HOST_TEASER.cta.href} className="btn-primary">
              {SELF_HOST_TEASER.cta.label}
            </Link>
          </Mount>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
