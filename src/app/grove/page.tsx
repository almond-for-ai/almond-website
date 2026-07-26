import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal } from "@/components/Motion";
import { WaitlistForm } from "@/components/WaitlistForm";
import { WordReveal } from "@/components/WordReveal";

export const metadata: Metadata = {
  title: "The grove · Almond AI",
  description: "One is a seed. Several make a grove.",
};

const GROVE_DATA = {
  hero: {
    chip: "Growing next to it",
    title: "One is a seed. Several make a grove.",
    subtitle:
      "Almond is about remembering. This is the thing we're growing beside it.",
  },
  sections: [
    {
      n: "01",
      title: "A seed is a private thing.",
      body: [
        "It keeps to itself. Everything it knows stays sealed inside a shell nobody else gets to open.",
        "A grove is not like that.",
      ],
    },
    {
      n: "02",
      title: "Thinking is not a solo sport.",
      body: [
        "Almost nothing you know arrived while you sat alone. It arrived out loud, in a room, from someone who was working the same problem next to you.",
        "Most of what we build for the mind quietly assumes the opposite.",
      ],
    },
    {
      n: "03",
      title: "Remembering is still the point.",
      body: [
        "Nothing about Almond changes. The memory is the spine, and it stays the spine.",
        "This is something we're adding on top of it, not instead of it.",
      ],
    },
    {
      n: "04",
      title: "It's called Mynd Board.",
      body: [
        "A place where more than one mind works at once, and the room remembers what happened in it.",
        "That's all you get for now. If you want to be there when it opens, leave your email.",
      ],
    },
  ],
} as const;

export default async function GrovePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const sp = await searchParams;
  const view = getViewFromSearchParams(sp);

  if (view !== "roasted") {
    return (
      <main className="relative flex min-h-dvh w-full flex-col bg-white">
        <SiteNav active="grove" />
        <PageRawView payload={GROVE_DATA} format={view} scope="grove" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-white">
      <SiteNav active="grove" />

      {/* Hero */}
      <section className="w-full pb-[48px] pt-[160px] md:pt-[200px]">
        <div className="container-x mx-auto" style={{ maxWidth: 880 }}>
          <Mount delay={0.05} y={10}>
            <span className="chip-accent inline-flex items-center gap-[6px]">
              {GROVE_DATA.hero.chip}
            </span>
          </Mount>
          <Mount delay={0.15} y={14} className="mt-[28px]">
            <h1 className="font-display text-[48px] font-normal leading-[1.05] tracking-[-0.02em] text-black md:text-[64px]">
              {GROVE_DATA.hero.title}
            </h1>
          </Mount>
          <Mount delay={0.25} y={14} className="mt-[20px]">
            <p className="max-w-[560px] text-[19px] leading-[28px] text-black/55">
              {GROVE_DATA.hero.subtitle}
            </p>
          </Mount>
        </div>
      </section>

      {/* Stanzas */}
      <section className="w-full pb-[96px]">
        <div className="container-x mx-auto" style={{ maxWidth: 880 }}>
          {GROVE_DATA.sections.map((s, i) => (
            <Reveal key={s.n} delay={0.05 * i} y={20}>
              <div className="border-t border-black/[0.08] py-[48px] md:grid md:grid-cols-[120px_1fr] md:gap-[24px]">
                <span className="font-mono text-[15px] leading-[24px] text-[#7b4019]/60">
                  {s.n}
                </span>
                <div>
                  <WordReveal
                    as="h2"
                    inView
                    text={s.title}
                    className="font-display text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-black md:text-[34px]"
                  />
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="mt-[16px] max-w-[560px] text-[17px] leading-[27px] text-black/65"
                    >
                      {p}
                    </p>
                  ))}
                  {s.n === "04" && (
                    <div className="mt-[28px]">
                      <WaitlistForm source="grove" />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
