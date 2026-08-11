import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter, SOCIAL_LINKS } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "About · Almond AI",
  description:
    "Why Almond exists: AI, but multiplayer. The shared memory layer your whole team's tools draw from.",
};

const ABOUT_DATA = {
  hero: {
    chip: "About",
    title: "Memory, not models.",
    subtitle:
      "The models keep getting better. What they forget is everything your team already decided. Almond is the shared memory layer those tools draw from.",
  },
  thesis: {
    eyebrow: "The thesis",
    heading: "We don't build another chat. We make AI multiplayer.",
    body: "Every team's real knowledge lives scattered across the tools they work in. Almond captures it into one living memory the whole team shares, and delivers it back where the work happens. The long version is the manifesto.",
    link: { label: "Read the manifesto", href: "/manifesto" },
  },
  believe: {
    eyebrow: "What we believe",
    items: [
      {
        title: "Memory is the moat",
        body: "Models are a commodity. What your team has decided together is not. That's the asset worth compounding.",
      },
      {
        title: "No new destination",
        body: "The best tool is no tool. Shared memory should show up inside what you already open, never another tab.",
      },
      {
        title: "You own it",
        body: "Your decisions are yours. Portable, exportable, and self-hostable from day one.",
      },
    ],
  },
  building: {
    eyebrow: "Who's building it",
    heading: "A small team, in private beta.",
    body: "Almond is early and built in the open with design partners. We ship weekly and talk to every team that runs it.",
  },
  connect: [
    { label: "Email", value: "contact@almondai.tech", href: "mailto:contact@almondai.tech" },
    { label: "LinkedIn", value: "linkedin.com/company/hey-almond-ai", href: SOCIAL_LINKS.linkedin },
    { label: "X", value: "@Hey_AlmondAI", href: SOCIAL_LINKS.x },
  ],
};

export default async function AboutPage({
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
        <PageRawView payload={ABOUT_DATA} format={view} scope="about" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/about" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[56px] md:pt-[200px] md:pb-[80px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{ABOUT_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.15} y={14} className="mt-[28px]">
            <h1 className="font-display text-[52px] font-normal leading-[1.0] tracking-[-1.04px] text-black md:text-[88px] md:tracking-[-1.76px]">
              {ABOUT_DATA.hero.title}
            </h1>
          </Mount>
          <Mount delay={0.25} y={14} className="mt-[24px] max-w-[640px]">
            <p className="text-[18px] leading-[28px] tracking-[-0.18px] text-black/60 md:text-[20px] md:leading-[30px]">
              {ABOUT_DATA.hero.subtitle}
            </p>
          </Mount>
        </div>
      </section>

      {/* ── Thesis ───────────────────────────────────────────── */}
      <section
        data-section="Thesis"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {ABOUT_DATA.thesis.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] max-w-[820px] font-sans text-[28px] font-medium leading-[1.15] tracking-[-0.56px] text-black md:text-[40px] md:leading-[46px] md:tracking-[-0.8px]">
              {ABOUT_DATA.thesis.heading}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <p className="mt-[20px] max-w-[620px] text-[16px] leading-[26px] text-black/60">
              {ABOUT_DATA.thesis.body}
            </p>
          </Reveal>
          <Reveal y={16} delay={0.15} className="mt-[28px]">
            <Link href={ABOUT_DATA.thesis.link.href} className="btn-secondary">
              {ABOUT_DATA.thesis.link.label}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── What we believe ──────────────────────────────────── */}
      <section data-section="Believe" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {ABOUT_DATA.believe.eyebrow}
            </p>
          </Reveal>
          <Stagger
            as="ul"
            className="mt-[40px] grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3"
          >
            {ABOUT_DATA.believe.items.map((it) => (
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

      {/* ── Who's building it + connect ──────────────────────── */}
      <section
        data-section="Team"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <div className="grid grid-cols-1 gap-[40px] md:grid-cols-[1fr_1fr]">
            <div>
              <Reveal y={16}>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
                  {ABOUT_DATA.building.eyebrow}
                </p>
              </Reveal>
              <Reveal y={20} delay={0.05}>
                <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
                  {ABOUT_DATA.building.heading}
                </h2>
              </Reveal>
              <Reveal y={20} delay={0.1}>
                <p className="mt-[16px] max-w-[460px] text-[16px] leading-[26px] text-black/60">
                  {ABOUT_DATA.building.body}
                </p>
              </Reveal>
            </div>
            <Stagger as="ul" className="flex flex-col gap-[12px]">
              {ABOUT_DATA.connect.map((c) => (
                <StaggerItem
                  key={c.label}
                  as="li"
                  className="rounded-[20px] border border-black/[0.08] bg-white p-[20px] md:p-[24px]"
                >
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="flex items-start justify-between gap-[16px]"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-500">
                        {c.label}
                      </span>
                      <span className="mt-[8px] block truncate font-sans text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-black">
                        {c.value}
                      </span>
                    </span>
                    <span className="shrink-0 text-black/30" aria-hidden>
                      ↗
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
