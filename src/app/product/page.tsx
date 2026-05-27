import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { AlmondGlyph } from "@/components/AlmondMark";
import { FlowTabs } from "@/components/FlowTabs";
import { ConnectorDiagram } from "@/components/ConnectorDiagram";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Product · Almond AI",
  description:
    "How Almond connects every tool you already use into one shared memory.",
};

const PRODUCT_DATA = {
  hero: {
    chip: "Product · private beta",
    title: "One memory. Every tool.",
    subtitle:
      "Almond is the connective layer across your stack. The tools you already use share memory through it.",
    ctas: [
      { label: "Book demo", href: "/contact", kind: "primary" as const },
      { label: "See pricing", href: "/pricing", kind: "secondary" as const },
    ],
  },
  captured: [
    "Decisions",
    "Constraints",
    "Contracts",
    "Component variants",
    "Design intent",
    "Naming conventions",
    "API shapes",
    "Auth flows",
    "Failure modes",
    "Tradeoffs",
    "Things rejected",
    "Who owns what",
  ],
  faq: [
    {
      q: "Does Almond have a chat interface?",
      a: "No. Almond is a layer, not a tool. Memory shows up inside the tools you already use.",
    },
    {
      q: "Where does the data live?",
      a: "Managed by default. BYO cloud on Bunch. Self-hosted on Orchard.",
    },
    {
      q: "Which tools work today?",
      a: "Claude Code, Figma, and Figma Make are live. Cursor, Linear, and Notion are next. Anything that speaks MCP plugs in.",
    },
  ],
};

export default async function ProductPage({
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
        <PageRawView payload={PRODUCT_DATA} format={view} scope="product" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
      <SiteNav />
      <SectionTracker page="/product" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[60px] md:pt-[180px] md:pb-[80px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent inline-flex items-center gap-[6px]">
              <span>{PRODUCT_DATA.hero.chip}</span>
              <AlmondGlyph size={12} />
            </span>
          </Mount>
          <Mount delay={0.15} y={14} className="mt-[28px]">
            <h1 className="font-sans text-[44px] font-medium leading-[48px] tracking-[-0.88px] text-black md:text-[64px] md:leading-[68px] md:tracking-[-1.28px]">
              {PRODUCT_DATA.hero.title}
            </h1>
          </Mount>
          <Mount delay={0.25} y={14} className="mt-[20px] max-w-[640px]">
            <p className="text-[18px] leading-[28px] tracking-[-0.18px] text-black/60 md:text-[20px] md:leading-[30px]">
              {PRODUCT_DATA.hero.subtitle}
            </p>
          </Mount>
          <Mount delay={0.4} y={12} className="mt-[32px]">
            <div className="flex flex-wrap items-center gap-[12px]">
              {PRODUCT_DATA.hero.ctas.map((cta) => (
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
        </div>
      </section>

      {/* ── Connector diagram ──────────────────────────────── */}
      <section data-section="Connector" className="w-full pb-[40px] md:pb-[80px]">
        <div className="container-x">
          <Reveal y={24} duration={0.9}>
            <div className="mx-auto max-w-[760px]">
              <ConnectorDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FlowTabs (Capture / Understand / Inject) ───────── */}
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

      {/* ── What gets captured ───────────────────────────────── */}
      <section
        data-section="Captured"
        className="w-full bg-black py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-400">
              What gets captured
            </p>
          </Reveal>
          <Reveal y={24} delay={0.05}>
            <h2 className="mt-[20px] max-w-[760px] font-sans text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-white md:text-[44px] md:leading-[52px] md:tracking-[-0.88px]">
              Artifacts. Not chatter.
            </h2>
          </Reveal>
          <Stagger as="ul" className="mt-[40px] flex flex-wrap gap-[10px]">
            {PRODUCT_DATA.captured.map((c) => (
              <StaggerItem
                key={c}
                as="li"
                className="rounded-full border border-white/15 bg-white/[0.04] px-[14px] py-[8px] text-[13px] tracking-[-0.13px] text-white/80"
              >
                {c}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section data-section="FAQ" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              Common questions
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
              Quick answers.
            </h2>
          </Reveal>
          <div className="mt-[40px] grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3">
            {PRODUCT_DATA.faq.map((f) => (
              <div key={f.q} className="bg-white p-[24px] md:p-[28px]">
                <h3 className="font-sans text-[16px] font-semibold leading-[22px] tracking-[-0.16px] text-black">
                  {f.q}
                </h3>
                <p className="mt-[12px] text-[14px] leading-[22px] text-black/60">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section
        data-section="CTA"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="overflow-hidden rounded-[32px] bg-white px-[28px] py-[56px] text-center md:rounded-[48px] md:px-[80px] md:py-[96px]">
              <h2 className="font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] text-black md:text-[64px] md:leading-[64px] md:tracking-[-1.28px]">
                Run it on your stack.
              </h2>
              <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-black/60">
                30-minute demo on your real tools.
              </p>
              <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
                <Link href="/contact" className="btn-primary">
                  Book demo
                </Link>
                <Link href="/manifesto" className="btn-secondary">
                  Read the manifesto
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
