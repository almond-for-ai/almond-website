import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { BoardCanvas } from "@/components/board/BoardCanvas";
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
      "Almond is about remembering. This is the thing we're growing beside it — and yes, you can push it around.",
  },
  board: {
    hint: "Drag the cards. Drag the belief. Nothing snaps back.",
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
      title: "A belief is a memory more than one person holds.",
      body: [
        "One card is a note. The same thing said three times, by three people, months apart, is something else — and it should be able to say so out loud.",
        "That is what the middle of the board is.",
      ],
    },
    {
      n: "04",
      title: "Remembering is still the point.",
      body: [
        "Nothing about Almond changes. The memory is the spine, and it stays the spine.",
        "This is something we're adding on top of it, not instead of it.",
      ],
    },
    {
      n: "05",
      title: "The rest stays covered for now.",
      body: [
        "You've seen the shape of it. The names, the sources and most of the words stay blacked out until it opens.",
        "If you want to be in the room when it does, leave your email.",
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
      <section className="w-full pb-[36px] pt-[150px] md:pt-[190px]">
        <div className="container-x mx-auto" style={{ maxWidth: 1080 }}>
          <Mount delay={0.05} y={10}>
            <span className="chip-accent inline-flex items-center gap-[6px]">
              {GROVE_DATA.hero.chip}
            </span>
          </Mount>
          <Mount delay={0.15} y={14} className="mt-[24px]">
            <h1 className="font-display text-[44px] font-normal leading-[1.05] tracking-[-0.02em] text-black md:text-[60px]">
              {GROVE_DATA.hero.title}
            </h1>
          </Mount>
          <Mount delay={0.25} y={14} className="mt-[18px]">
            <p className="max-w-[560px] text-[18px] leading-[27px] text-black/55">
              {GROVE_DATA.hero.subtitle}
            </p>
          </Mount>
        </div>
      </section>

      {/* The board itself — full size, live from load */}
      <section className="w-full pb-[80px]">
        <div className="container-x mx-auto" style={{ maxWidth: 1080 }}>
          <Reveal y={24}>
            <BoardCanvas density="full" />
          </Reveal>
          <Reveal y={12} delay={0.08}>
            <p className="mt-[10px] px-[4px] font-mono text-[11px] tracking-[0.02em] text-black/30 md:text-[12px]">
              {GROVE_DATA.board.hint}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stanzas */}
      <section className="w-full pb-[96px]">
        <div className="container-x mx-auto" style={{ maxWidth: 880 }}>
          {GROVE_DATA.sections.map((s, i) => (
            <Reveal key={s.n} delay={0.05 * i} y={20}>
              <div className="border-t border-black/[0.08] py-[44px] md:grid md:grid-cols-[120px_1fr] md:gap-[24px]">
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
                  {s.n === "05" && (
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
