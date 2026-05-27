import Link from "next/link";
import { BlogTeaserSection } from "@/components/BlogTeaserSection";
import { MindGameSection } from "@/components/MindGameSection";
import { RawView } from "@/components/RawView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { Mount, Reveal } from "@/components/Motion";
import { AlmondGlyph } from "@/components/AlmondMark";
import { HeroAudienceToggle } from "@/components/HeroAudienceToggle";
import { HeroVisibilityTracker } from "@/components/HeroVisibilityTracker";
import { AudienceCopy } from "@/components/AudienceCopy";
import { RotatingWord } from "@/components/RotatingWord";
import { PersonaChips } from "@/components/PersonaChips";
import { ConnectorDiagram } from "@/components/ConnectorDiagram";
import { FlowTabs } from "@/components/FlowTabs";
import { MetricStrip } from "@/components/MetricStrip";
import { Lazy3D } from "@/components/illustrations/Lazy3D";
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
      <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
        <SiteNav />
        <RawView data={data} format={view} scope="home" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
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
            <h1 className="font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black md:text-[64px] md:leading-[68px] md:tracking-[-1.28px]">
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

          {/* CTAs */}
          <Mount delay={0.4} y={12} className="mt-[28px]">
            <div className="flex flex-wrap items-center gap-[12px]">
              {data.hero.ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={
                    cta.kind === "primary" ? "btn-primary" : "btn-secondary"
                  }
                >
                  {cta.label}
                </Link>
              ))}
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
        className="w-full py-[40px] md:py-[80px]"
      >
        <div className="container-x">
          <Reveal y={24} duration={0.9}>
            <div className="mx-auto max-w-[760px]">
              <ConnectorDiagram />
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

      {/* ── FlowTabs ───────────────────────────────────────── */}
      <section
        data-section="Flow"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              How it works
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
              Three motions. One layer.
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.1} className="mt-[48px]">
            <FlowTabs />
          </Reveal>
        </div>
      </section>

      {/* ── Metric strip ───────────────────────────────────── */}
      <section
        data-section="Numbers"
        className="w-full py-[100px] md:py-[140px]"
      >
        <div className="container-x">
          <MetricStrip />
        </div>
      </section>

      {/* ── MemoryGraph 3D, full-bleed black ──────────────── */}
      <section
        data-section="Graph"
        className="w-full bg-black py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-300">
              Compiled memory
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] max-w-[820px] font-sans text-[28px] font-medium leading-[36px] tracking-[-0.56px] text-white md:text-[44px] md:leading-[52px] md:tracking-[-0.88px]">
              Decisions become structure. Structure stays alive.
            </h2>
          </Reveal>
          <Reveal y={24} delay={0.1} className="mt-[40px]">
            <div className="h-[400px] w-full md:h-[520px]">
              <Lazy3D
                name="MemoryGraph"
                colors={["#a36740", "#ffffff", "#7b4019"]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quote ──────────────────────────────────────────── */}
      <section
        data-section="Quote"
        className="w-full py-[100px] md:py-[140px]"
      >
        <div className="container-x text-center">
          <Reveal y={24}>
            <p className="mx-auto max-w-[820px] font-display text-[44px] font-normal leading-[48px] tracking-[-0.88px] text-black md:text-[80px] md:leading-[80px] md:tracking-[-1.6px]">
              {data.quote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* MindGame kept */}
      <div data-section="Game" id="game">
        <MindGameSection />
      </div>

      {/* BlogTeaser kept */}
      <div data-section="Blog">
        <BlogTeaserSection posts={posts} />
      </div>

      {/* ── Final CTA (audience-aware) ─────────────────────── */}
      <section
        data-section="CTA"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="relative overflow-hidden rounded-[32px] bg-white px-[28px] py-[64px] text-center md:rounded-[48px] md:px-[80px] md:py-[120px]">
              {/* line-art orbit ring inside CTA card */}
              <svg
                viewBox="0 0 600 600"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              >
                <circle
                  cx="300"
                  cy="300"
                  r="220"
                  fill="none"
                  stroke="rgba(123,64,25,0.08)"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                  style={{
                    transformOrigin: "center",
                    animation: "spin-slow 40s linear infinite",
                  }}
                />
                <circle
                  cx="300"
                  cy="300"
                  r="280"
                  fill="none"
                  stroke="rgba(123,64,25,0.05)"
                  strokeWidth="1"
                  strokeDasharray="1 9"
                  style={{
                    transformOrigin: "center",
                    animation: "spin-slow 60s linear infinite reverse",
                  }}
                />
              </svg>

              <div className="relative">
                <AudienceCopy
                  solo={
                    <>
                      <h2 className="font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] text-black md:text-[64px] md:leading-[64px] md:tracking-[-1.28px]">
                        {data.audience.solo.finalCta.heading}
                      </h2>
                      <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-black/60">
                        {data.audience.solo.finalCta.body}
                      </p>
                    </>
                  }
                  team={
                    <>
                      <h2 className="font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] text-black md:text-[64px] md:leading-[64px] md:tracking-[-1.28px]">
                        {data.audience.team.finalCta.heading}
                      </h2>
                      <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-black/60">
                        {data.audience.team.finalCta.body}
                      </p>
                    </>
                  }
                />
                <div className="mt-[36px] flex flex-wrap items-center justify-center gap-[12px]">
                  <Link href="/contact" className="btn-primary">
                    Book demo
                  </Link>
                  <Link href="/manifesto" className="btn-secondary">
                    Read the manifesto
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
