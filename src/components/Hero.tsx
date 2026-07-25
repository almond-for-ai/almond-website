import Link from "next/link";
import { FactCard } from "@/components/FactCard";
import { HeroParallax } from "@/components/HeroParallax";
import { Mount } from "@/components/Motion";
import { AlmondGlyph } from "@/components/AlmondMark";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { PostMeta } from "@/lib/posts";

const FACTS = [
  {
    variant: "accent-solid" as const,
    label: "Field note · 01",
    title: "Say it once",
    body: "The best teams decide things once. Everyone else decides the same thing every week and calls it culture.",
    art: "almond" as const,
    artPlacement: "-bottom-10 -right-10",
    artOpacity: 0.2,
  },
  {
    variant: "black-solid" as const,
    label: "Etym",
    title: "amygdala",
    body: "Greek for almond. The part of your brain that remembers before you do.",
    art: "arcs" as const,
    artPlacement: "-right-16 -bottom-16",
    artOpacity: 0.18,
  },
  {
    variant: "white-card" as const,
    label: "Pattern",
    title: "The why evaporates",
    body: "Decisions outlive their reasons. Six months later the answer is “it's always been that way.”",
    art: "branch" as const,
    artPlacement: "-right-10 -bottom-6",
    artOpacity: 0.22,
  },
  {
    variant: "grey-card" as const,
    label: "Cost · unmeasured",
    title: "The Monday tax",
    big: "∞",
    bigCaption: "times the same question gets answered before anyone writes it down.",
    art: "dots" as const,
    artPlacement: "-right-6 -top-6",
    artOpacity: 0.18,
  },
  {
    variant: "accent-light" as const,
    label: "What fades first",
    title: "Gone by Friday",
    chips: ["The reason", "The tradeoff", "The edge case", "Who said no", "Why not plan B"],
    art: "leaf" as const,
    artPlacement: "-right-10 -top-6",
    artOpacity: 0.2,
  },
  {
    variant: "accent-light" as const,
    label: "Field note · 02",
    title: "Alone, then together",
    body: "Almost nothing you know arrived while you were sitting by yourself. It arrived out loud, from someone a desk away.",
    art: "branch" as const,
    artPlacement: "-right-12 -bottom-10",
    artOpacity: 0.2,
  },
  {
    variant: "terminal" as const,
    label: "monday.log",
    title: "A decision's week",
    terminalLines: [
      { prompt: true, text: "cat monday.log" },
      { prompt: false, text: "Mon · decided" },
      { prompt: false, text: "Tue · questioned" },
      { prompt: false, text: "Wed · relitigated" },
      { prompt: false, text: "Thu · reversed" },
      { prompt: false, text: "Fri · “wait, why?”" },
    ],
    art: "hatch" as const,
    artPlacement: "-right-10 -bottom-10",
    artOpacity: 0.08,
  },
];

export function Hero({ latestPost }: { latestPost?: PostMeta }) {
  const chipLabel = latestPost
    ? `New post · ${latestPost.title}`
    : "New writing in the journal";
  const chipHref = latestPost ? `/blog/${latestPost.slug}` : "/blog";

  return (
    <section id="hero-section" className="relative w-full overflow-clip pb-[80px] pt-[140px] md:pt-[160px]">
      <HeroParallax strength={80} className="container-x">
        {/* Chip */}
        <Mount delay={0.05} y={10}>
          <Link
            href={chipHref}
            className="chip-accent inline-flex items-center gap-[8px]"
          >
            <span className="relative flex h-[7px] w-[7px]" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7b4019] opacity-60" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#7b4019]" />
            </span>
            <span>{chipLabel}</span>
            <AlmondGlyph size={12} />
          </Link>
        </Mount>

        {/* Heading */}
        <Mount delay={0.15} y={14} className="mt-[28px]">
          <h1 className="font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black">
            Almond AI
          </h1>
        </Mount>
        <Mount delay={0.25} y={14}>
          <p className="font-display text-[40px] font-normal leading-[48px] tracking-[-0.5px] text-black/55 md:text-[46px] md:leading-[54px]">
            Something worth remembering.
          </p>
        </Mount>

        {/* Waitlist */}
        <Mount delay={0.4} y={12} className="mt-[28px]">
          <WaitlistForm source="hero" />
        </Mount>
      </HeroParallax>

      {/* Fact card strip / auto-scrolling marquee */}
      <HeroParallax strength={32} fade={false}>
        <Mount
          delay={0.55}
          y={20}
          duration={0.9}
          className="marquee-mask mt-[48px] w-full py-6"
        >
          <div style={{ overflowX: "clip", overflowY: "visible" }}>
            <div className="marquee-track flex w-max">
              {[0, 1].map((set) => (
                <ul
                  key={set}
                  aria-hidden={set === 1}
                  className="flex shrink-0 gap-[24px] pr-[24px]"
                >
                  {FACTS.map((f, i) => (
                    <li key={i} className="shrink-0">
                      <FactCard {...f} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </Mount>
      </HeroParallax>
    </section>
  );
}

