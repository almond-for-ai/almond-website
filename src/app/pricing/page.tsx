import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { AudienceToggle } from "@/components/AudienceToggle";
import { AudienceCopy } from "@/components/AudienceCopy";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Pricing · Almond AI",
  description:
    "Single Almond, Bunch, or Orchard. Pricing for solo founders, teams, and enterprises.",
};

const PRICING_DATA = {
  hero: {
    chip: "Pricing",
    title: "One almond, a bunch, or an orchard.",
    solo: {
      subtitle:
        "Start free, forever. Bring your own stack and keep your memory yours. Upgrade only when you add people.",
    },
    team: {
      subtitle:
        "Start free. Scale to the whole team when you're ready. Talk to us when you need it on-prem.",
    },
  },
  demo: {
    solo: {
      heading: "See Almond on your machine.",
      body: "Free to start. Wire up Claude Code and your real repo in minutes.",
    },
    team: {
      heading: "See Almond on your team's stack.",
      body: "14-day trial on Bunch. Bring Claude Code, Figma, and your real repo.",
    },
  },
  tiers: [
    {
      slug: "single-almond",
      name: "Single Almond",
      tagline: "For solo founders + side projects.",
      price: "Free",
      priceCaption: "Forever. No card.",
      cta: { label: "Start free", href: "/contact" },
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
      price: "Contact",
      priceCaption: "Per-seat pricing. Contact for details.",
      cta: { label: "Talk to sales", href: "/contact" },
      kind: "primary" as const,
      featured: true,
      features: [
        "Unlimited users",
        "Unlimited captured decisions",
        "MCP server (the orchard)",
        "All integrations: Claude Code, Figma, Figma Make",
        "BYO cloud (AWS, GCP, Azure)",
        "Priority support · SLA",
        "Unlimited memory retention",
      ],
    },
    {
      slug: "orchard",
      name: "Orchard",
      tagline: "For enterprises with security teams.",
      price: "Enterprise",
      priceCaption: "Custom. Annual contracts.",
      cta: { label: "Book a call", href: "/contact" },
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
      q: "Is there a free trial of paid tiers?",
      a: "Yes. Every Bunch demo starts with a 14-day no-strings trial. Bring your real stack.",
    },
    {
      q: "Why no public pricing on Bunch?",
      a: "Because team size, retention window, and integration count drive cost wildly. Five-minute call gets you a number.",
    },
    {
      q: "How is this billed?",
      a: "Per seat, monthly or annual. Annual saves ~20%. Orchard is custom.",
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
        <PageRawView payload={PRICING_DATA} format={view} scope="pricing" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
      <SiteNav />
      <SectionTracker page="/pricing" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section data-section="Hero" className="w-full pt-[140px] pb-[64px] md:pt-[180px] md:pb-[80px]">
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{PRICING_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.12} y={12} className="mt-[24px]">
            <AudienceToggle variant="light" size="md" />
          </Mount>
          <Mount delay={0.18} y={14} className="mt-[28px]">
            <h1 className="max-w-[860px] font-sans text-[44px] font-medium leading-[48px] tracking-[-0.88px] text-black md:text-[64px] md:leading-[68px] md:tracking-[-1.28px]">
              {PRICING_DATA.hero.title}
            </h1>
          </Mount>
          <AudienceCopy
            as="p"
            className="mt-[20px] max-w-[640px] text-[18px] leading-[28px] text-black/60 md:text-[20px] md:leading-[30px]"
            solo={PRICING_DATA.hero.solo.subtitle}
            team={PRICING_DATA.hero.team.subtitle}
          />
        </div>
      </section>

      {/* ── Tiers ──────────────────────────────────────────── */}
      <section data-section="Tiers" className="w-full pb-[80px] md:pb-[120px]">
        <div className="container-x">
          <Stagger
            as="ul"
            className="grid grid-cols-1 gap-[20px] md:grid-cols-3"
          >
            {PRICING_DATA.tiers.map((tier) => {
              const isFeatured = tier.featured;
              return (
                <StaggerItem
                  key={tier.slug}
                  as="li"
                  className={
                    isFeatured
                      ? "relative flex flex-col rounded-[28px] bg-black p-[28px] text-white md:p-[36px]"
                      : "relative flex flex-col rounded-[28px] border border-black/[0.08] bg-white p-[28px] text-black md:p-[36px]"
                  }
                >
                  {isFeatured ? (
                    <span className="absolute right-[20px] top-[20px] rounded-full bg-walnut-500 px-[10px] py-[4px] font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                      Popular
                    </span>
                  ) : null}
                  <h3 className="font-sans text-[22px] font-medium leading-[28px] tracking-[-0.44px]">
                    {tier.name}
                  </h3>
                  <p
                    className={
                      isFeatured
                        ? "mt-[6px] text-[14px] leading-[20px] text-white/60"
                        : "mt-[6px] text-[14px] leading-[20px] text-black/55"
                    }
                  >
                    {tier.tagline}
                  </p>

                  <div className="mt-[24px]">
                    <div className="font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px]">
                      {tier.price}
                    </div>
                    <div
                      className={
                        isFeatured
                          ? "mt-[6px] text-[13px] leading-[18px] text-white/55"
                          : "mt-[6px] text-[13px] leading-[18px] text-black/50"
                      }
                    >
                      {tier.priceCaption}
                    </div>
                  </div>

                  <ul className="mt-[28px] flex flex-1 flex-col gap-[10px]">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className={
                          isFeatured
                            ? "flex items-start gap-[10px] text-[14px] leading-[22px] text-white/80"
                            : "flex items-start gap-[10px] text-[14px] leading-[22px] text-black/70"
                        }
                      >
                        <span
                          className={
                            isFeatured
                              ? "mt-[8px] inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-walnut-300"
                              : "mt-[8px] inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-walnut-500"
                          }
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.cta.href}
                    className={
                      isFeatured
                        ? "mt-[32px] inline-flex items-center justify-center rounded-full bg-white px-[24px] py-[10px] text-[15px] font-medium leading-[18px] tracking-[-0.3px] text-black transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
                        : "btn-secondary mt-[32px]"
                    }
                  >
                    {tier.cta.label}
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── Compare table ─────────────────────────────────── */}
      <section data-section="Compare" className="w-full bg-grey-96 py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              Compare
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
              Tier by tier.
            </h2>
          </Reveal>

          <Reveal y={20} delay={0.1}>
            <div className="mt-[40px] overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-black/[0.08]">
                    <th className="px-[20px] py-[16px] text-left font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">
                      Feature
                    </th>
                    {PRICING_DATA.tiers.map((t) => (
                      <th
                        key={t.slug}
                        className="px-[20px] py-[16px] text-left font-mono text-[11px] uppercase tracking-[0.18em] text-black/50"
                      >
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICING_DATA.compare.rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={[
                        "pricing-row",
                        i < PRICING_DATA.compare.rows.length - 1
                          ? "border-b border-black/[0.06]"
                          : "",
                      ].join(" ")}
                    >
                      <td className="px-[20px] py-[14px] text-[14px] font-medium text-black">
                        {row.label}
                      </td>
                      {row.values.map((v, j) => (
                        <td
                          key={j}
                          className="px-[20px] py-[14px] text-[14px] text-black/70"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mid-page demo CTA ─────────────────────────────── */}
      <section data-section="Demo" className="w-full pb-[80px] md:pb-[100px]">
        <div className="container-x">
          <Reveal y={16} duration={0.5}>
            <div className="flex flex-col items-start justify-between gap-[28px] rounded-[32px] border border-black/[0.08] bg-white px-[28px] py-[40px] md:flex-row md:items-center md:px-[48px] md:py-[48px]">
              <div className="max-w-[520px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-500">
                  Live demo
                </p>
                <AudienceCopy
                  as="h2"
                  className="mt-[12px] font-sans text-[24px] font-medium leading-[30px] tracking-[-0.48px] text-black md:text-[32px] md:leading-[38px]"
                  solo={PRICING_DATA.demo.solo.heading}
                  team={PRICING_DATA.demo.team.heading}
                />
                <AudienceCopy
                  as="p"
                  className="mt-[10px] text-[15px] leading-[24px] text-black/60"
                  solo={PRICING_DATA.demo.solo.body}
                  team={PRICING_DATA.demo.team.body}
                />
              </div>
              <Link href="/contact" className="btn-primary shrink-0">
                Book demo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section data-section="FAQ" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              FAQ
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
              Asked + answered.
            </h2>
          </Reveal>

          <div className="mt-[40px] grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-2">
            {PRICING_DATA.faq.map((f) => (
              <div key={f.q} className="bg-white p-[24px] md:p-[28px]">
                <h3 className="font-sans text-[16px] font-semibold leading-[22px] tracking-[-0.16px] text-black">
                  {f.q}
                </h3>
                <p className="mt-[10px] text-[14px] leading-[22px] text-black/65">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section data-section="CTA" className="w-full bg-grey-96 py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="overflow-hidden rounded-[32px] bg-walnut-500 px-[28px] py-[56px] text-center text-white md:rounded-[48px] md:px-[80px] md:py-[96px]">
              <h2 className="font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] md:text-[64px] md:leading-[64px] md:tracking-[-1.28px]">
                Pick the tier that fits today.
              </h2>
              <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-white/75">
                Upgrade when the team needs it. Not before.
              </p>
              <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-[24px] py-[10px] text-[15px] font-medium leading-[18px] tracking-[-0.3px] text-black transition-opacity hover:opacity-90"
                >
                  Book demo
                </Link>
                <Link
                  href="/product"
                  className="btn-ghost-dark"
                >
                  How it works
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
