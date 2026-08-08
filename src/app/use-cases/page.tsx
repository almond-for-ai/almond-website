import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal } from "@/components/Motion";
import { AudienceToggle } from "@/components/AudienceToggle";
import { AudienceCopy } from "@/components/AudienceCopy";
import { ScenarioCards } from "@/components/ScenarioCards";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Use cases · Almond AI",
  description:
    "How Almond keeps context alive across Claude Code, Cursor, and Figma, from the first commit to the whole company.",
};

const USE_CASES_DATA = {
  hero: {
    chip: "Use cases",
    solo: {
      title: "Many tools. One memory.",
      subtitle:
        "Work moves fast across Claude Code, Cursor, and Figma. Almond keeps the thread so nothing gets re-explained, by you or anyone who joins.",
    },
    team: {
      title: "One team. Many tools. One memory.",
      subtitle:
        "Decisions get made fast and forgotten faster. Almond keeps them alive in the tools where the work happens.",
    },
  },
  scenarios: { eyebrow: "Where it shows up" },
  metrics: {
    eyebrow: "What changes",
    solo: [
      { value: "10", unit: "hrs", caption: "back every week" },
      { value: "0", unit: "", caption: "context resets" },
      { value: "1", unit: "day", caption: "to onboard anyone new" },
    ],
    team: [
      { value: "1", unit: "day", caption: "to fully onboarded" },
      { value: "5", unit: "×", caption: "faster ramp" },
      { value: "20", unit: "min", caption: "to ship a decision again" },
    ],
  },
  cta: {
    solo: {
      heading: "See it on your stack.",
      body: "30 minutes, your real tools. We'll surface decisions you forgot you made.",
    },
    team: {
      heading: "See it on your team's stack.",
      body: "30 minutes, your real codebase. We'll surface decisions you forgot you made.",
    },
  },
};

type Metric = { value: string; unit: string; caption: string };

function MetricsRow({ items }: { items: Metric[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3">
      {items.map((m) => (
        <div key={m.caption} className="bg-white p-[28px] md:p-[36px]">
          <div className="flex items-end gap-[4px]">
            <span className="font-display text-[56px] font-normal leading-[1] tracking-[-1.12px] text-black md:text-[72px]">
              {m.value}
            </span>
            {m.unit ? (
              <span className="mb-[8px] font-display text-[24px] font-normal leading-none text-walnut-500">
                {m.unit}
              </span>
            ) : null}
          </div>
          <p className="mt-[12px] text-[14px] leading-[20px] text-black/60">
            {m.caption}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function UseCasesPage({
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
        <PageRawView payload={USE_CASES_DATA} format={view} scope="use-cases" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/use-cases" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[56px] md:pt-[180px] md:pb-[72px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{USE_CASES_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.12} y={12} className="mt-[24px]">
            <AudienceToggle variant="light" size="md" />
          </Mount>
          <AudienceCopy
            as="h1"
            className="mt-[28px] max-w-[820px] font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black md:text-[60px] md:leading-[64px] md:tracking-[-1.2px]"
            solo={USE_CASES_DATA.hero.solo.title}
            team={USE_CASES_DATA.hero.team.title}
          />
          <AudienceCopy
            as="p"
            className="mt-[20px] max-w-[640px] text-[18px] leading-[28px] tracking-[-0.18px] text-black/60 md:text-[20px] md:leading-[30px]"
            solo={USE_CASES_DATA.hero.solo.subtitle}
            team={USE_CASES_DATA.hero.team.subtitle}
          />
        </div>
      </section>

      {/* ── Scenarios ────────────────────────────────────────── */}
      <section
        data-section="Scenarios"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {USE_CASES_DATA.scenarios.eyebrow}
            </p>
          </Reveal>
          <div className="mt-[40px]">
            <ScenarioCards />
          </div>
        </div>
      </section>

      {/* ── Metrics (audience-aware) ─────────────────────────── */}
      <section data-section="Metrics" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {USE_CASES_DATA.metrics.eyebrow}
            </p>
          </Reveal>
          <div className="mt-[40px]">
            <AudienceCopy
              as="div"
              solo={<MetricsRow items={USE_CASES_DATA.metrics.solo} />}
              team={<MetricsRow items={USE_CASES_DATA.metrics.team} />}
            />
          </div>
        </div>
      </section>

      {/* ── CTA (audience-aware) ─────────────────────────────── */}
      <section
        data-section="CTA"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="overflow-hidden rounded-[32px] bg-walnut-500 px-[28px] py-[56px] text-center text-white md:rounded-[48px] md:px-[80px] md:py-[96px]">
              <AudienceCopy
                as="h2"
                className="font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] md:text-[64px] md:leading-[64px] md:tracking-[-1.28px]"
                solo={USE_CASES_DATA.cta.solo.heading}
                team={USE_CASES_DATA.cta.team.heading}
              />
              <AudienceCopy
                as="p"
                className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-white/75"
                solo={USE_CASES_DATA.cta.solo.body}
                team={USE_CASES_DATA.cta.team.body}
              />
              <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-[24px] py-[10px] text-[15px] font-medium leading-[18px] tracking-[-0.3px] text-black transition-opacity hover:opacity-90"
                >
                  Book demo
                </Link>
                <Link href="/product" className="btn-ghost-dark">
                  How it works
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
