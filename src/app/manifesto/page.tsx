import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal } from "@/components/Motion";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Manifesto · Almond AI",
  description:
    "Notes before the reveal. Something is growing under the husk.",
};

const MANIFESTO_DATA = {
  hero: {
    chip: "Notes before the reveal",
    title: "Under the husk.",
    subtitle:
      "A few things we believe, written down before we show you what we're building.",
  },
  sections: [
    {
      n: "01",
      title: "Most of an almond's life is invisible.",
      body: [
        "The tree takes three years before it gives you anything. The kernel spends its whole life sealed inside a shell, inside a husk, on a branch you never look at.",
        "Ours too, for now.",
      ],
    },
    {
      n: "02",
      title: "We named the company after a part of your brain.",
      body: [
        "There's an almond-shaped thing deep in your head that notices before you do. It never stops paying attention, and it never asks for credit.",
        "That's the only hint you get.",
      ],
    },
    {
      n: "03",
      title: "Attention is expensive. Forgetting is more expensive.",
      body: [
        "Everyone measures what it costs to focus. Nobody measures what it costs to lose the thread: to walk back into a room and start from zero.",
        "Someone should do something about that.",
      ],
    },
    {
      n: "04",
      title: "Good things are grown, not launched.",
      body: [
        "We're not in a hurry. The orchard doesn't rush, and the fruit is better for it.",
        "When it's ready, you'll know.",
      ],
    },
    {
      n: "05",
      title: "We remember who showed up first.",
      body: [
        "If you want to be there early, leave your email. That's the whole ask.",
      ],
    },
  ],
} as const;

export default async function ManifestoPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const sp = await searchParams;
  const view = getViewFromSearchParams(sp);

  if (view !== "roasted") {
    return (
      <main className="relative flex min-h-dvh w-full flex-col bg-white">
        <SiteNav active="manifesto" />
        <PageRawView payload={MANIFESTO_DATA} format={view} scope="manifesto" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-white">
      <SiteNav active="manifesto" />

      {/* Hero */}
      <section className="w-full pb-[48px] pt-[160px] md:pt-[200px]">
        <div className="container-x mx-auto" style={{ maxWidth: 880 }}>
          <Mount delay={0.05} y={10}>
            <span className="chip-accent inline-flex items-center gap-[6px]">
              {MANIFESTO_DATA.hero.chip}
            </span>
          </Mount>
          <Mount delay={0.15} y={14} className="mt-[28px]">
            <h1 className="font-display text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-black md:text-[72px]">
              {MANIFESTO_DATA.hero.title}
            </h1>
          </Mount>
          <Mount delay={0.25} y={14} className="mt-[20px]">
            <p className="max-w-[560px] text-[19px] leading-[28px] text-black/55">
              {MANIFESTO_DATA.hero.subtitle}
            </p>
          </Mount>
        </div>
      </section>

      {/* Stanzas */}
      <section className="w-full pb-[96px]">
        <div className="container-x mx-auto" style={{ maxWidth: 880 }}>
          {MANIFESTO_DATA.sections.map((s, i) => (
            <Reveal key={s.n} delay={0.05 * i} y={20}>
              <div className="border-t border-black/[0.08] py-[48px] md:grid md:grid-cols-[120px_1fr] md:gap-[24px]">
                <span className="font-mono text-[15px] leading-[24px] text-[#7b4019]/60">
                  {s.n}
                </span>
                <div>
                  <h2 className="font-display text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-black md:text-[34px]">
                    {s.title}
                  </h2>
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
                      <WaitlistForm source="manifesto" />
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
