import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { AlmondGlyph } from "@/components/AlmondMark";
import { FlowTabs } from "@/components/FlowTabs";
import { InToolSurfaces } from "@/components/InToolSurfaces";
import { AudienceToggle } from "@/components/AudienceToggle";
import { AudienceCopy } from "@/components/AudienceCopy";
import { ToolLogoWall } from "@/components/ToolLogoWall";
import { SectionTracker } from "@/components/SectionTracker";
import type { ToolKey } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Product · Almond AI",
  description:
    "Memory that lives inside the tools you already open. No chat window. Almond captures decisions, compiles them into structure, and injects them back where you work.",
};

const LOGO_TOOLS: ToolKey[] = [
  "claude-code",
  "cursor",
  "figma",
  "chatgpt",
  "linear",
  "github",
  "notion",
  "windsurf",
  "v0",
  "claude",
  "cline",
  "lovable",
];

const PRODUCT_DATA = {
  hero: {
    chip: "Product · private beta",
    solo: {
      title: "Memory that lives inside your tools.",
      subtitle:
        "No chat window to babysit. Almond surfaces what you already decided right inside Claude Code, Cursor, and Figma. You stop re-explaining yourself.",
    },
    team: {
      title: "Your team's memory, in every tool you ship in.",
      subtitle:
        "No new app to adopt. Decisions surface where the work happens: the editor, the frame, the issue. The whole team builds on what was already settled.",
    },
    ctas: [
      { label: "Book demo", href: "/contact", kind: "primary" as const },
      { label: "See pricing", href: "/pricing", kind: "secondary" as const },
    ],
  },
  surfaces: {
    eyebrow: "Inside your tools",
    solo: {
      heading: "Not a chat. A layer underneath the tools you open.",
      lead: "Almond never asks you to switch context. The memory shows up in the surface you're already working in.",
    },
    team: {
      heading: "Not a doc nobody reads. Memory where the work happens.",
      lead: "Every decision the team makes surfaces back inside the tool that needs it, the moment it's needed. No archaeology.",
    },
  },
  flow: {
    eyebrow: "The mechanism",
    heading: "How the memory moves.",
  },
  captured: {
    eyebrow: "What gets captured",
    solo: {
      heading: "Your artifacts. Not your chatter.",
    },
    team: {
      heading: "The team's decisions. Not the noise.",
    },
    items: [
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
  },
  integrations: {
    label: "Works inside",
    line: "Almond plugs into the stack you already run. Anything that speaks MCP connects.",
  },
  faq: {
    shared: [
      {
        q: "Does Almond have a chat interface?",
        a: "No. Almond is a layer, not a tool. Memory shows up inside the tools you already use.",
      },
      {
        q: "Which tools work today?",
        a: "Claude Code, Figma, and Figma Make are live. Cursor, Linear, and Notion are next. Anything that speaks MCP plugs in.",
      },
    ],
    solo: [
      {
        q: "Where does my data live?",
        a: "Managed by default, on Almond infra. You can move to your own cloud the moment you want to.",
      },
      {
        q: "Is my memory private to me?",
        a: "Yes. On a solo plan your memory is yours alone. Nothing is shared until you add people.",
      },
    ],
    team: [
      {
        q: "Where does our data live?",
        a: "BYO cloud on Bunch (AWS, GCP, Azure). Self-hosted or air-gapped on Orchard.",
      },
      {
        q: "How do roles and access work?",
        a: "SSO and SCIM on Orchard. Memory scopes follow your team structure, with an audit trail on every read.",
      },
    ],
  },
  cta: {
    solo: {
      heading: "Run it on your machine.",
      body: "A 30-minute demo on your real tools. Bring Claude Code and a repo you know.",
    },
    team: {
      heading: "Run it on your team's stack.",
      body: "A 30-minute demo on your real codebase. We'll show decisions you forgot you made.",
    },
  },
};

type Faq = { q: string; a: string };

function FaqGrid({ items }: { items: Faq[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-2">
      {items.map((f) => (
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
  );
}

export default async function ProductPage({
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
        <PageRawView payload={PRODUCT_DATA} format={view} scope="product" />
        <SiteFooter />
      </main>
    );
  }

  const soloFaq = [...PRODUCT_DATA.faq.shared, ...PRODUCT_DATA.faq.solo];
  const teamFaq = [...PRODUCT_DATA.faq.shared, ...PRODUCT_DATA.faq.team];

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/product" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[56px] md:pt-[180px] md:pb-[72px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent inline-flex items-center gap-[6px]">
              <span>{PRODUCT_DATA.hero.chip}</span>
              <AlmondGlyph size={12} />
            </span>
          </Mount>
          <Mount delay={0.12} y={12} className="mt-[24px]">
            <AudienceToggle variant="light" size="md" />
          </Mount>
          <AudienceCopy
            as="h1"
            className="mt-[28px] max-w-[820px] font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black md:text-[60px] md:leading-[64px] md:tracking-[-1.2px]"
            solo={PRODUCT_DATA.hero.solo.title}
            team={PRODUCT_DATA.hero.team.title}
          />
          <AudienceCopy
            as="p"
            className="mt-[20px] max-w-[640px] text-[18px] leading-[28px] tracking-[-0.18px] text-black/60 md:text-[20px] md:leading-[30px]"
            solo={PRODUCT_DATA.hero.solo.subtitle}
            team={PRODUCT_DATA.hero.team.subtitle}
          />
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

      {/* ── In-tool surfaces (signature section) ─────────────── */}
      <section
        data-section="Surfaces"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {PRODUCT_DATA.surfaces.eyebrow}
            </p>
          </Reveal>
          <AudienceCopy
            as="h2"
            className="mt-[16px] max-w-[760px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]"
            solo={PRODUCT_DATA.surfaces.solo.heading}
            team={PRODUCT_DATA.surfaces.team.heading}
          />
          <AudienceCopy
            as="p"
            className="mt-[16px] max-w-[600px] text-[16px] leading-[26px] text-black/60"
            solo={PRODUCT_DATA.surfaces.solo.lead}
            team={PRODUCT_DATA.surfaces.team.lead}
          />
          <div className="mt-[48px]">
            <InToolSurfaces />
          </div>
        </div>
      </section>

      {/* ── FlowTabs (the mechanism, product-exclusive) ──────── */}
      <section data-section="Flow" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {PRODUCT_DATA.flow.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
              {PRODUCT_DATA.flow.heading}
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
              {PRODUCT_DATA.captured.eyebrow}
            </p>
          </Reveal>
          <AudienceCopy
            as="h2"
            className="mt-[20px] max-w-[760px] font-sans text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-white md:text-[44px] md:leading-[52px] md:tracking-[-0.88px]"
            solo={PRODUCT_DATA.captured.solo.heading}
            team={PRODUCT_DATA.captured.team.heading}
          />
          <Stagger as="ul" className="mt-[40px] flex flex-wrap gap-[10px]">
            {PRODUCT_DATA.captured.items.map((c) => (
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

      {/* ── Integrations strip ───────────────────────────────── */}
      <section
        data-section="Integrations"
        className="w-full bg-grey-96 py-[80px] md:py-[100px]"
      >
        <div className="container-x">
          <Reveal y={16} className="mb-[40px] max-w-[560px]">
            <p className="text-[18px] leading-[28px] tracking-[-0.18px] text-black/70">
              {PRODUCT_DATA.integrations.line}{" "}
              <Link
                href="/integrations"
                className="text-walnut-500 underline-offset-4 hover:underline"
              >
                See every integration
              </Link>
              .
            </p>
          </Reveal>
          <Reveal y={16} delay={0.05}>
            <ToolLogoWall
              label={PRODUCT_DATA.integrations.label}
              tools={LOGO_TOOLS}
            />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ (audience-aware) ─────────────────────────────── */}
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
          <div className="mt-[40px]">
            <AudienceCopy
              as="div"
              solo={<FaqGrid items={soloFaq} />}
              team={<FaqGrid items={teamFaq} />}
            />
          </div>
        </div>
      </section>

      {/* ── Security teaser ──────────────────────────────────── */}
      <section data-section="Security" className="w-full pb-[80px] md:pb-[100px]">
        <div className="container-x">
          <Reveal y={20} duration={0.6}>
            <div className="flex flex-col items-start justify-between gap-[20px] rounded-[24px] border border-black/[0.08] bg-white px-[28px] py-[32px] md:flex-row md:items-center md:px-[40px] md:py-[36px]">
              <div className="max-w-[560px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-500">
                  Trust
                </p>
                <h2 className="mt-[12px] font-sans text-[22px] font-medium leading-[28px] tracking-[-0.44px] text-black md:text-[26px] md:leading-[32px]">
                  Your memory stays under your control.
                </h2>
                <p className="mt-[10px] text-[15px] leading-[24px] text-black/60">
                  Managed, BYO cloud, or fully self-hosted. Encryption in transit and at rest.
                </p>
              </div>
              <Link href="/security" className="btn-secondary shrink-0">
                Read on security
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA (audience-aware) ─────────────────────────────── */}
      <section
        data-section="CTA"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="overflow-hidden rounded-[32px] bg-white px-[28px] py-[56px] text-center md:rounded-[48px] md:px-[80px] md:py-[96px]">
              <AudienceCopy
                as="h2"
                className="font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] text-black md:text-[64px] md:leading-[64px] md:tracking-[-1.28px]"
                solo={PRODUCT_DATA.cta.solo.heading}
                team={PRODUCT_DATA.cta.team.heading}
              />
              <AudienceCopy
                as="p"
                className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-black/60"
                solo={PRODUCT_DATA.cta.solo.body}
                team={PRODUCT_DATA.cta.team.body}
              />
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
