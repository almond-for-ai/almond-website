import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal } from "@/components/Motion";
import { AudienceToggle } from "@/components/AudienceToggle";
import { AudienceCopy } from "@/components/AudienceCopy";
import {
  IntegrationGrid,
  INTEGRATION_CATEGORIES,
} from "@/components/IntegrationGrid";
import { TerminalCard } from "@/components/cards/TerminalCard";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Integrations · Almond AI",
  description:
    "Almond meets your stack where it lives. Claude Code, Figma, Cursor, Linear, Notion and anything that speaks MCP.",
};

const INTEGRATIONS_DATA = {
  hero: {
    chip: "Integrations",
    title: "Almond meets your stack where it lives.",
    solo: {
      subtitle:
        "The tools you already open, sharing one memory. Connect a tool once, everything and everyone you add inherits it.",
    },
    team: {
      subtitle:
        "Every tool your team ships in, connected to one company memory. Add a tool once, the whole team gets it.",
    },
  },
  connect: {
    eyebrow: "Add a tool",
    heading: "If it speaks MCP, it connects.",
    body: "No SDK to learn. Point Almond at the tool, wire the MCP server, and memory starts streaming both ways.",
    lines: [
      "> almond connect cursor",
      "✓ MCP wired",
      "✓ memory streaming",
      "> almond status",
      "running · 13 tools connected",
    ],
  },
  request: {
    heading: "Don't see your tool?",
    body: "Tell us what you run. MCP-capable tools are usually a same-week add.",
  },
  // flattened for raw view
  categories: INTEGRATION_CATEGORIES,
};

export default async function IntegrationsPage({
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
        <PageRawView
          payload={INTEGRATIONS_DATA}
          format={view}
          scope="integrations"
        />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/integrations" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[56px] md:pt-[180px] md:pb-[72px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{INTEGRATIONS_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.12} y={12} className="mt-[24px]">
            <AudienceToggle variant="light" size="md" />
          </Mount>
          <Mount delay={0.18} y={14} className="mt-[28px]">
            <h1 className="max-w-[820px] font-sans text-[34px] font-medium leading-[38px] tracking-[-0.68px] text-black md:text-[48px] md:leading-[52px] md:tracking-[-0.96px]">
              {INTEGRATIONS_DATA.hero.title}
            </h1>
          </Mount>
          <AudienceCopy
            as="p"
            className="mt-[20px] max-w-[640px] text-[18px] leading-[28px] tracking-[-0.18px] text-black/60 md:text-[20px] md:leading-[30px]"
            solo={INTEGRATIONS_DATA.hero.solo.subtitle}
            team={INTEGRATIONS_DATA.hero.team.subtitle}
          />
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section
        data-section="Grid"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <IntegrationGrid />
        </div>
      </section>

      {/* ── How a tool connects ──────────────────────────────── */}
      <section data-section="Connect" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <div className="grid grid-cols-1 items-center gap-[40px] md:grid-cols-[1fr_1fr]">
            <div>
              <Reveal y={16}>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
                  {INTEGRATIONS_DATA.connect.eyebrow}
                </p>
              </Reveal>
              <Reveal y={20} delay={0.05}>
                <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
                  {INTEGRATIONS_DATA.connect.heading}
                </h2>
              </Reveal>
              <Reveal y={20} delay={0.1}>
                <p className="mt-[16px] max-w-[460px] text-[16px] leading-[26px] text-black/60">
                  {INTEGRATIONS_DATA.connect.body}
                </p>
              </Reveal>
            </div>
            <Reveal y={20} delay={0.1}>
              <TerminalCard lines={INTEGRATIONS_DATA.connect.lines} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Request CTA ──────────────────────────────────────── */}
      <section
        data-section="Request"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="overflow-hidden rounded-[32px] bg-white px-[28px] py-[56px] text-center md:rounded-[48px] md:px-[80px] md:py-[80px]">
              <h2 className="font-display text-[36px] font-normal leading-[40px] tracking-[-0.72px] text-black md:text-[52px] md:leading-[56px] md:tracking-[-1.04px]">
                {INTEGRATIONS_DATA.request.heading}
              </h2>
              <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-black/60">
                {INTEGRATIONS_DATA.request.body}
              </p>
              <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
                <Link href="/contact" className="btn-primary">
                  Request an integration
                </Link>
                <Link href="/product" className="btn-secondary">
                  See the product
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
