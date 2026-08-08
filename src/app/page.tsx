import Link from "next/link";
import { BlogTeaserSection } from "@/components/BlogTeaserSection";
import { BoardSection } from "@/components/BoardSection";
import { RawView } from "@/components/RawView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { Mount, Reveal } from "@/components/Motion";
import { AlmondGlyph } from "@/components/AlmondMark";
import { HeroAudienceToggle } from "@/components/HeroAudienceToggle";
import { HeroVisibilityTracker } from "@/components/HeroVisibilityTracker";
import { BetaWaitlist } from "@/components/BetaWaitlist";
import { AudienceCopy } from "@/components/AudienceCopy";
import { RotatingWord } from "@/components/RotatingWord";
import { PersonaChips } from "@/components/PersonaChips";
import { ConnectorDiagram } from "@/components/ConnectorDiagram";
import { ConnectionConstellation } from "@/components/ConnectionConstellation";
import { MetricStrip } from "@/components/MetricStrip";
import { OutcomeMarquee } from "@/components/OutcomeMarquee";
import { ToolLogoWall } from "@/components/ToolLogoWall";
import { ValueCardsGrid } from "@/components/ValueCardsGrid";
import { SectionTracker } from "@/components/SectionTracker";
import { getAllPosts } from "@/lib/posts";
import { buildSiteData } from "@/lib/site-data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const posts = await getAllPosts();
  const sp = await searchParams;
  const view = getViewFromSearchParams(sp);
  const data = buildSiteData(posts);

  if (view !== "roasted") {
    return (
      <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
        <SiteNav />
        <RawView data={data} format={view} scope="home" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/" />

      <HeroVisibilityTracker />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        id="hero-section"
        data-section="Hero"
        data-hero-tracker
        className="relative w-full pt-[120px] pb-[40px] md:pt-[160px] md:pb-[60px]"
      >
        <div className="container-x">
          {/* eyebrow chip */}
          <Mount delay={0.05} y={10}>
            <Link
              href={data.hero.chipHref}
              className="chip-accent inline-flex items-center gap-[6px]"
            >
              <span>{data.hero.chip}</span>
              <AlmondGlyph size={12} />
            </Link>
          </Mount>

          {/* audience toggle */}
          <Mount delay={0.1} y={8} className="mt-[20px]">
            <HeroAudienceToggle />
          </Mount>

          {/* headline + rotating word */}
          <Mount delay={0.2} y={14} className="mt-[24px]">
            <h1 className="font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black md:text-[60px] md:leading-[64px] md:tracking-[-1.2px]">
              {data.hero.titleLead}{" "}
              <span className="text-walnut-500">
                <RotatingWord words={data.hero.rotatingWords} />
              </span>
              <span className="text-walnut-500">.</span>
            </h1>
          </Mount>

          {/* audience-aware body */}
          <Mount delay={0.3} y={12} className="mt-[24px] max-w-[600px]">
            <AudienceCopy
              solo={
                <p className="text-[17px] leading-[28px] tracking-[-0.17px] text-black/60 md:text-[19px] md:leading-[30px]">
                  {data.audience.solo.body}
                </p>
              }
              team={
                <p className="text-[17px] leading-[28px] tracking-[-0.17px] text-black/60 md:text-[19px] md:leading-[30px]">
                  {data.audience.team.body}
                </p>
              }
            />
          </Mount>

          {/* Beta waitlist */}
          <Mount delay={0.4} y={12} className="mt-[28px] max-w-[520px]">
            <BetaWaitlist />
            <div className="mt-[16px]">
              <Link
                href="/manifesto"
                className="text-[14px] font-medium tracking-[-0.14px] text-black/60 underline-offset-4 hover:text-walnut-500 hover:underline"
              >
                Read the manifesto →
              </Link>
            </div>
          </Mount>

          {/* persona chips */}
          <Mount delay={0.5} y={10} className="mt-[28px]">
            <PersonaChips />
          </Mount>
        </div>
      </section>

      {/* ── Connector diagram ──────────────────────────────── */}
      <section
        data-section="Connector"
        className="w-full pt-[88px] pb-[40px] md:pt-[140px] md:pb-[80px]"
      >
        <div className="container-x">
          <Reveal y={20} duration={0.5}>
            <div className="capsule-50 bg-grey-96 px-[12px] pb-[20px] pt-[16px] md:px-[20px] md:pb-[28px] md:pt-[24px]">
              <div className="mx-auto max-w-[760px]">
                <ConnectorDiagram />
              </div>
              <p className="pointer-events-none mt-[4px] text-center font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-500/70 md:text-[12px]">
                Press and hold Almond to see the magic
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Tagline ────────────────────────────────────────── */}
      <section
        data-section="Tagline"
        className="w-full pb-[80px] md:pb-[120px]"
      >
        <div className="container-x">
          <Reveal y={20}>
            <p className="mx-auto max-w-[920px] text-center font-display text-[32px] font-normal leading-[40px] tracking-[-0.64px] text-black md:text-[52px] md:leading-[60px] md:tracking-[-1.04px]">
              {data.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Impact: outcome marquee + value cards + logo wall ─ */}
      <section
        data-section="Impact"
        className="w-full bg-grey-96 py-[100px] md:py-[140px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {data.impact.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <AudienceCopy
              as="h2"
              className="mt-[16px] max-w-[760px] font-sans text-[28px] font-medium leading-[1.15] tracking-[-0.56px] text-black md:text-[44px] md:leading-[50px] md:tracking-[-0.88px]"
              solo={<>{data.audience.solo.value.heading}</>}
              team={<>{data.audience.team.value.heading}</>}
            />
          </Reveal>
          <Reveal y={16} delay={0.1}>
            <AudienceCopy
              as="p"
              className="mt-[18px] max-w-[640px] text-[16px] leading-[24px] text-black/65 md:text-[18px] md:leading-[28px]"
              solo={<>{data.audience.solo.value.lead}</>}
              team={<>{data.audience.team.value.lead}</>}
            />
          </Reveal>
        </div>

        {/* Slim outcome marquee, full-bleed */}
        <div className="mt-[48px] md:mt-[56px]">
          <OutcomeMarquee chips={data.outcomes} />
        </div>

        {/* Value cards grid */}
        <div className="container-x mt-[40px] md:mt-[56px]">
          <ValueCardsGrid
            audienceBlocks={data.audience}
            terminalLines={data.terminalLines}
          />
        </div>

        {/* Companion social-proof: tool logo wall */}
        <div className="container-x mt-[64px] md:mt-[88px]">
          <ToolLogoWall
            label={data.impact.logoWallLabel}
            tools={data.impact.logoWallTools}
          />
        </div>
      </section>

      {/* ── Metric strip ───────────────────────────────────── */}
      <section
        data-section="Numbers"
        className="w-full py-[100px] md:py-[140px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              The model
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] max-w-[640px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
              Three numbers. One idea.
            </h2>
          </Reveal>
          <Reveal y={24} delay={0.1} className="mt-[48px] md:mt-[56px]">
            <MetricStrip />
          </Reveal>
        </div>
      </section>

      {/* ── The board: several minds, one memory ───────────── */}
      <BoardSection id="board" />

      {/* MindGame moved into SiteFooter; MindGameSection retained as reference. */}

      {/* BlogTeaser kept */}
      <div data-section="Blog">
        <BlogTeaserSection posts={posts} />
      </div>

      {/* ── Network constellation (people + tools) ─────────── */}
      <div data-section="Network">
        <ConnectionConstellation copy={data.network} />
      </div>

      <SiteFooter />
    </main>
  );
}
