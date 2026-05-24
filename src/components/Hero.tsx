import Link from "next/link";
import { FactCard } from "@/components/FactCard";
import { Mount } from "@/components/Motion";
import type { PostMeta } from "@/lib/posts";

const FACTS = [
  {
    variant: "accent-solid" as const,
    label: "Fact · 01",
    title: "Drupe, not a nut",
    body: "Botanically a stone fruit. The seed sits inside the pit, kin to peach and cherry.",
    art: "almond" as const,
    artPlacement: "-bottom-10 -right-10",
    artOpacity: 0.2,
  },
  {
    variant: "black-solid" as const,
    label: "Etym",
    title: "amygdala",
    body: "Greek for almond. The brain region named after the seed it resembles.",
    art: "arcs" as const,
    artPlacement: "-right-16 -bottom-16",
    artOpacity: 0.18,
  },
  {
    variant: "white-card" as const,
    label: "Specimen",
    title: "Prunus dulcis",
    body: "Family Rosaceae. Origin Iran & Levant. Domesticated ~3000 BC. Tree life 20–25 yrs.",
    art: "branch" as const,
    artPlacement: "-right-10 -bottom-6",
    artOpacity: 0.22,
  },
  {
    variant: "grey-card" as const,
    label: "Supply · world",
    title: "One valley feeds the world",
    big: "80%",
    bigCaption: "of global almonds grown in California's Central Valley.",
    art: "dots" as const,
    artPlacement: "-right-6 -top-6",
    artOpacity: 0.18,
  },
  {
    variant: "accent-light" as const,
    label: "Varieties",
    title: "Six names, one tree",
    chips: ["Nonpareil", "Mission", "Carmel", "Butte", "Padre", "Sonora"],
    art: "leaf" as const,
    artPlacement: "-right-10 -top-6",
    artOpacity: 0.2,
  },
  {
    variant: "terminal" as const,
    label: "almond.log",
    title: "Timeline",
    terminalLines: [
      { prompt: true, text: "cat almond.log" },
      { prompt: false, text: "3000 BC · Levant" },
      { prompt: false, text: " 100 AD · Roman trade" },
      { prompt: false, text: "1840    · California" },
      { prompt: false, text: "1890    · Van Gogh" },
      { prompt: false, text: "today   · 80% supply, CA" },
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
    <section className="relative w-full overflow-clip pb-[80px] pt-[140px] md:pt-[160px]">
      <div className="container-x">
        {/* Chip */}
        <Mount delay={0.05} y={10}>
          <Link
            href={chipHref}
            className="chip-accent inline-flex items-center gap-[6px]"
          >
            <span>{chipLabel}</span>
            <ChevronRight />
          </Link>
        </Mount>

        {/* Heading */}
        <Mount delay={0.15} y={14} className="mt-[28px]">
          <h1 className="font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black">
            Almond AI
          </h1>
        </Mount>
        <Mount delay={0.25} y={14}>
          <p className="text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-black/50">
            Coming Soon
          </p>
        </Mount>

        {/* CTAs */}
        <Mount delay={0.4} y={12} className="mt-[28px]">
          <div className="flex items-center gap-[12px]">
            <Link href="/#game" className="btn-primary">
              Test your mind
            </Link>
            <Link href="/blog" className="btn-secondary">
              Blogs
            </Link>
          </div>
        </Mount>
      </div>

      {/* Fact card strip / auto-scrolling marquee */}
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
    </section>
  );
}

function ChevronRight() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="2.5" cy="1.5" r="1.5" fill="currentColor" />
      <circle cx="2.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="6.5" cy="4.5" r="1.5" fill="currentColor" />
    </svg>
  );
}
