import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal } from "@/components/Motion";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Manifesto · Almond AI",
  description:
    "Memory, not models. Why AI needs a shared multiplayer memory layer, so nothing gets decided twice.",
};

const MANIFESTO_DATA = {
  hero: {
    chip: "Manifesto",
    title: "Memory, not models.",
    subtitle:
      "We don't need bigger brains. We need ones that remember what we built yesterday.",
  },
  sections: [
    {
      n: "01",
      title: "Memory is infrastructure.",
      body: [
        "Storage is solved. Models are solved. Memory is not.",
        "Every AI-native company today has the same architecture: a chat window, a thousand prompts, a folder full of PDFs no one reads. The model gets smarter every quarter. The company gets dumber every Monday.",
        "Memory is the missing layer. And like every layer that becomes infrastructure, it'll feel obvious in retrospect.",
      ],
    },
    {
      n: "02",
      title: "AI is stateless. Companies aren't.",
      body: [
        "Every prompt starts from zero. The model has no idea you fought this exact battle last Thursday. No idea why the auth flow is the way it is. No idea which approach you considered and rejected.",
        "So you re-type. You re-explain. You re-decide. The same decisions, over and over, with slightly different words each time.",
        "Your team has memory. Your tools don't. We close the gap with one shared layer the whole stack draws from.",
      ],
    },
    {
      n: "03",
      title: "Companies forget by default.",
      body: [
        "Slack archives. Docs ossify. Linear closes tickets. Notion pages drift out of date the day they're written.",
        "None of this is memory. It's exhaust. The actual decisions: the why, the constraints, the things you considered and rejected. None of them make it out of the heads they were made in.",
        "Six months later, the new hire asks why. Nobody knows. Nobody wrote it down. Nobody was supposed to.",
      ],
    },
    {
      n: "04",
      title: "The compiler is the right metaphor.",
      body: [
        "A compiler takes source and produces a runnable artifact. It resolves references, types things, links symbols, throws errors when something doesn't fit.",
        "Almond is a company compiler. The source is your team's daily work. The artifact is a typed, linked, queryable memory graph. It catches what you forgot to think about. It surfaces what you forgot you knew.",
        "We didn't pick the metaphor for the aesthetic. We picked it because it's accurate.",
      ],
    },
    {
      n: "05",
      title: "Capture the work, not the chatter.",
      body: [
        "Chat memory is logs. It remembers what was said. That's not what your company runs on.",
        "Your company runs on commits, frames, contracts, components, schemas. On the artifacts you shipped, not the words you used to describe shipping them.",
        "Almond watches what you build. The signal is in the artifact, not the announcement.",
      ],
    },
    {
      n: "06",
      title: "Delivery, not storage.",
      body: [
        "Knowledge bases fail because nobody reads them. Wikis fail because nobody updates them. Notion fails because nobody opens it.",
        "Memory has to show up where work is. In the IDE when you open a file. In Figma when you reopen a frame. In the prompt window when you start typing.",
        "Storage is necessary. Storage is not sufficient. We deliver memory; we don't ask you to fetch it.",
      ],
    },
    {
      n: "07",
      title: "On-prem is first-class.",
      body: [
        "If your memory is your moat, you shouldn't have to ship it through someone else's server.",
        "Almond runs managed for solo founders. BYO cloud for teams. Self-host and air-gapped for the security teams that'll ask. Same product, same plugins, your perimeter.",
        "Memory you don't own isn't memory. It's rental.",
      ],
    },
    {
      n: "08",
      title: "Memory, not models.",
      body: [
        "We're not training a model. We're not fine-tuning one. We're not building another LLM with a new logo.",
        "The model is fine. The model is excellent. What's missing is the layer underneath it. The layer that remembers what the model just helped you build, so the next prompt doesn't start from zero.",
        "Memory, not models. That's the whole thing.",
      ],
    },
  ],
  signature: "The Almond team",
};

export default async function ManifestoPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const sp = await searchParams;
  const view = getViewFromSearchParams(sp);

  if (view !== "roasted") {
    return (
      <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
        <SiteNav />
        <PageRawView
          payload={MANIFESTO_DATA}
          format={view}
          scope="manifesto"
        />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
      <SiteNav />
      <SectionTracker page="/manifesto" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section data-section="Hero" className="w-full pt-[140px] pb-[80px] md:pt-[200px] md:pb-[120px]">
        <div className="container-x" style={{ maxWidth: 880 }}>
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{MANIFESTO_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.15} y={14} className="mt-[32px]">
            <h1 className="font-display text-[56px] font-normal leading-[60px] tracking-[-1.12px] text-black md:text-[96px] md:leading-[96px] md:tracking-[-1.92px]">
              {MANIFESTO_DATA.hero.title}
            </h1>
          </Mount>
          <Mount delay={0.25} y={14} className="mt-[24px]">
            <p className="text-[18px] leading-[28px] text-black/55 md:text-[22px] md:leading-[32px]">
              {MANIFESTO_DATA.hero.subtitle}
            </p>
          </Mount>
        </div>
      </section>

      {/* ── 8 numbered sections ────────────────────────────── */}
      <div data-section="Essay" className="w-full pb-[80px] md:pb-[120px]">
        <div className="container-x" style={{ maxWidth: 880 }}>
          <div className="flex flex-col gap-[64px] md:gap-[96px]">
            {MANIFESTO_DATA.sections.map((s) => (
              <Reveal key={s.n} y={24}>
                <article className="grid grid-cols-1 gap-[24px] md:grid-cols-[80px_1fr] md:gap-[40px]">
                  <div className="font-display text-[40px] font-normal leading-[40px] tracking-[-0.8px] text-walnut-500 md:text-[56px] md:leading-[56px] md:tracking-[-1.12px]">
                    {s.n}
                  </div>
                  <div>
                    <h2 className="font-sans text-[26px] font-medium leading-[32px] tracking-[-0.52px] text-black md:text-[32px] md:leading-[40px] md:tracking-[-0.64px]">
                      {s.title}
                    </h2>
                    <div className="mt-[20px] flex flex-col gap-[16px]">
                      {s.body.map((p, i) => (
                        <p
                          key={i}
                          className="text-[16px] leading-[26px] text-black/70 md:text-[17px] md:leading-[28px]"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal y={20} className="mt-[80px] border-t border-black/[0.08] pt-[40px] md:mt-[120px]">
            <p className="font-display text-[20px] font-normal leading-[28px] tracking-[-0.4px] text-black/55 md:text-[24px] md:leading-[32px]">
              {MANIFESTO_DATA.signature}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section data-section="CTA" className="w-full bg-black py-[80px] md:py-[120px]">
        <div className="container-x text-center">
          <Reveal y={20}>
            <h2 className="mx-auto max-w-[760px] font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] text-white md:text-[64px] md:leading-[64px] md:tracking-[-1.28px]">
              Give the whole team one memory.
            </h2>
          </Reveal>
          <Reveal y={16} delay={0.05}>
            <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-white/60">
              30-minute demo of shared memory on your real stack.
            </p>
          </Reveal>
          <Reveal y={12} delay={0.1} className="mt-[32px]">
            <div className="flex flex-wrap items-center justify-center gap-[12px]">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-[24px] py-[10px] text-[15px] font-medium leading-[18px] tracking-[-0.3px] text-black transition-opacity hover:opacity-90"
              >
                Book demo
              </Link>
              <Link href="/product" className="btn-ghost-dark">
                See the product
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
