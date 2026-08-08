import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount } from "@/components/Motion";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Pricing · Almond AI",
  description: "Pricing is not final yet. Contact the team for more information.",
};

/**
 * What the page says while the tiers are undecided. The full PRICING_DATA
 * below is kept but not rendered: restore the sections that read from it once
 * the numbers are settled.
 */
const PRICING_TEASER = {
  chip: "Pricing",
  title: "Pricing is on the way.",
  body: "We are still settling the tiers, so we are not publishing numbers yet. Contact the team and we will walk you through what fits.",
  cta: { label: "Contact the team", href: "/contact" },
};

const PRICING_DATA = {
  hero: {
    chip: "Pricing",
    title: "One almond, a bunch, or an orchard.",
    solo: {
      subtitle:
        "Three shapes, from one person to a whole company. We are still settling the numbers, so talk to us and we will walk you through it.",
    },
    team: {
      subtitle:
        "Three shapes, from one team to a whole company. We are still settling the numbers, so talk to us and we will walk you through it.",
    },
  },
  demo: {
    solo: {
      heading: "See Almond on your stack.",
      body: "Wire up Claude Code and a real repo in minutes. Contact the team for more information.",
    },
    team: {
      heading: "See Almond on your team's stack.",
      body: "Bring Claude Code, Figma, and your real repo. Contact the team for more information.",
    },
  },
  tiers: [
    {
      slug: "single-almond",
      name: "Single Almond",
      tagline: "For solo founders + side projects.",
      price: "Contact team",
      priceCaption: "Contact the team for more information.",
      cta: { label: "Contact the team", href: "/contact" },
      kind: "secondary" as const,
      featured: false,
      features: [
        "1 user",
        "100 captured decisions / month",
        "Claude Code integration",
        "Community support",
        "7-day memory retention",
      ],
    },
    {
      slug: "bunch",
      name: "Bunch",
      tagline: "For teams shipping AI-native products.",
      price: "Contact team",
      priceCaption: "Contact the team for more information.",
      cta: { label: "Contact the team", href: "/contact" },
      kind: "primary" as const,
      featured: true,
      features: [
        "Unlimited users",
        "Unlimited captured decisions",
        "MCP server (the orchard)",
        "All integrations: Claude Code, Cursor, Figma, Figma Make",
        "BYO cloud (AWS, GCP, Azure)",
        "Priority support · SLA",
        "Unlimited memory retention",
      ],
    },
    {
      slug: "orchard",
      name: "Orchard",
      tagline: "For enterprises with security teams.",
      price: "Contact team",
      priceCaption: "Contact the team for more information.",
      cta: { label: "Contact the team", href: "/contact" },
      kind: "secondary" as const,
      featured: false,
      features: [
        "Everything in Bunch",
        "Self-host / air-gapped deploy",
        "SOC 2 (in progress)",
        "Custom data retention policies",
        "SSO + SCIM",
        "Dedicated solutions engineer",
        "On-prem MCP server",
      ],
    },
  ],
  compare: {
    rows: [
      { label: "Users", values: ["1", "Unlimited", "Unlimited"] },
      { label: "Captured decisions", values: ["100 / mo", "Unlimited", "Unlimited"] },
      { label: "Integrations", values: ["Claude Code", "All", "All"] },
      { label: "MCP server", values: ["·", "Managed", "On-prem"] },
      { label: "Deploy", values: ["Cloud", "BYO cloud", "Self-host"] },
      { label: "Support", values: ["Community", "Priority + SLA", "Dedicated SE"] },
      { label: "SOC 2", values: ["·", "·", "In progress"] },
    ],
  },
  faq: [
    {
      q: "Where does our data live?",
      a: "On Bunch you BYO cloud: AWS, GCP, or Azure. On Orchard you self-host or air-gap. Single Almond runs on Almond-managed infra.",
    },
    {
      q: "Can we try it before we commit?",
      a: "Yes. Every demo runs on your real stack, not a sandbox. Contact the team and we will set it up.",
    },
    {
      q: "What does each tier cost?",
      a: "We are still finalising the tiers, so we are not publishing numbers yet. Contact the team for more information.",
    },
    {
      q: "How is this billed?",
      a: "Per seat, with monthly and annual options. Exact terms are not settled yet, so contact the team for more information.",
    },
  ],
};

export default async function PricingPage({
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
        <PageRawView payload={PRICING_TEASER} format={view} scope="pricing" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
      <SiteNav />
      <SectionTracker page="/pricing" />

      {/* ── Holding page while the tiers are undecided ─────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[100px] md:pt-[180px] md:pb-[140px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{PRICING_TEASER.chip}</span>
          </Mount>
          <Mount delay={0.18} y={14} className="mt-[28px]">
            <h1 className="max-w-[820px] font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black md:text-[60px] md:leading-[64px] md:tracking-[-1.2px]">
              {PRICING_TEASER.title}
            </h1>
          </Mount>
          <Mount delay={0.26} y={12} className="mt-[20px]">
            <p className="max-w-[560px] text-[18px] leading-[28px] text-black/60 md:text-[20px] md:leading-[30px]">
              {PRICING_TEASER.body}
            </p>
          </Mount>
          <Mount delay={0.34} y={12} className="mt-[32px]">
            <Link href={PRICING_TEASER.cta.href} className="btn-primary">
              {PRICING_TEASER.cta.label}
            </Link>
          </Mount>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
