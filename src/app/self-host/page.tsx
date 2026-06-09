import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { AudienceToggle } from "@/components/AudienceToggle";
import { AudienceCopy } from "@/components/AudienceCopy";
import { TerminalCard } from "@/components/cards/TerminalCard";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Self-host · Almond AI",
  description:
    "Run Almond entirely on your own infrastructure. Air-gapped, your keys, your region. The Orchard tier.",
};

const SELF_HOST_DATA = {
  hero: {
    chip: "Self-host · Orchard",
    title: "Run Almond on your own infrastructure.",
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
        <PageRawView payload={SELF_HOST_DATA} format={view} scope="self-host" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/self-host" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[56px] md:pt-[180px] md:pb-[72px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{SELF_HOST_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.12} y={12} className="mt-[24px]">
            <AudienceToggle variant="light" size="md" />
          </Mount>
          <Mount delay={0.18} y={14} className="mt-[28px]">
            <h1 className="max-w-[820px] font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black md:text-[60px] md:leading-[64px] md:tracking-[-1.2px]">
              {SELF_HOST_DATA.hero.title}
            </h1>
          </Mount>
          <AudienceCopy
            as="p"
            className="mt-[20px] max-w-[640px] text-[18px] leading-[28px] tracking-[-0.18px] text-black/60 md:text-[20px] md:leading-[30px]"
            solo={SELF_HOST_DATA.hero.solo.subtitle}
            team={SELF_HOST_DATA.hero.team.subtitle}
          />
          <Mount delay={0.4} y={12} className="mt-[32px]">
            <div className="flex flex-wrap items-center gap-[12px]">
              <Link href="/contact" className="btn-primary">
                Talk to us
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See Orchard pricing
              </Link>
            </div>
          </Mount>
        </div>
      </section>

      {/* ── Why self-host ────────────────────────────────────── */}
      <section
        data-section="Why"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {SELF_HOST_DATA.why.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
              {SELF_HOST_DATA.why.heading}
            </h2>
          </Reveal>
          <Stagger
            as="ul"
            className="mt-[40px] grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3"
          >
            {SELF_HOST_DATA.why.items.map((it) => (
              <StaggerItem key={it.title} as="li" className="bg-white p-[28px] md:p-[32px]">
                <h3 className="font-sans text-[18px] font-medium leading-[24px] tracking-[-0.18px] text-black">
                  {it.title}
                </h3>
                <p className="mt-[12px] text-[14px] leading-[22px] text-black/60">
                  {it.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── What you get + deploy ────────────────────────────── */}
      <section data-section="Get" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <div className="grid grid-cols-1 items-start gap-[40px] md:grid-cols-[1fr_1fr]">
            <div>
              <Reveal y={16}>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
                  {SELF_HOST_DATA.get.eyebrow}
                </p>
              </Reveal>
              <Reveal y={20} delay={0.05}>
                <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
                  {SELF_HOST_DATA.get.heading}
                </h2>
              </Reveal>
              <Stagger as="ul" className="mt-[28px] flex flex-col gap-[12px]">
                {SELF_HOST_DATA.get.points.map((p) => (
                  <StaggerItem
                    key={p}
                    as="li"
                    className="flex items-start gap-[12px] text-[15px] leading-[22px] text-black/70"
                  >
                    <span className="mt-[8px] inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-walnut-500" />
                    {p}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <div>
              <Reveal y={16}>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
                  {SELF_HOST_DATA.deploy.eyebrow}
                </p>
              </Reveal>
              <Reveal y={20} delay={0.05}>
                <h3 className="mt-[16px] mb-[24px] font-sans text-[22px] font-medium leading-[28px] tracking-[-0.44px] text-black">
                  {SELF_HOST_DATA.deploy.heading}
                </h3>
              </Reveal>
              <Reveal y={20} delay={0.1}>
                <TerminalCard lines={SELF_HOST_DATA.deploy.lines} />
              </Reveal>
              <Reveal y={16} delay={0.15}>
                <p className="mt-[16px] text-[14px] leading-[22px] text-black/55">
                  {SELF_HOST_DATA.deploy.body}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Requirements ─────────────────────────────────────── */}
      <section
        data-section="Requirements"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {SELF_HOST_DATA.requirements.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
              {SELF_HOST_DATA.requirements.heading}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <div className="mt-[40px] overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
              {SELF_HOST_DATA.requirements.items.map((it, i) => (
                <div
                  key={it.label}
                  className={[
                    "flex items-center justify-between px-[24px] py-[18px]",
                    i < SELF_HOST_DATA.requirements.items.length - 1
                      ? "border-b border-black/[0.06]"
                      : "",
                  ].join(" ")}
                >
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-black/50">
                    {it.label}
                  </span>
                  <span className="text-[15px] font-medium text-black">
                    {it.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section data-section="CTA" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="overflow-hidden rounded-[32px] bg-black px-[28px] py-[56px] text-center text-white md:rounded-[48px] md:px-[80px] md:py-[80px]">
              <h2 className="font-display text-[36px] font-normal leading-[40px] tracking-[-0.72px] md:text-[52px] md:leading-[56px] md:tracking-[-1.04px]">
                Bring it in-house.
              </h2>
              <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-white/70">
                We'll scope the deploy with your team and hand you a running instance.
              </p>
              <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-[24px] py-[10px] text-[15px] font-medium leading-[18px] tracking-[-0.3px] text-black transition-opacity hover:opacity-90"
                >
                  Book a call
                </Link>
                <Link href="/security" className="btn-ghost-dark">
                  Read on security
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
