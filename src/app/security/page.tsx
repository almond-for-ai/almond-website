import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { AudienceToggle } from "@/components/AudienceToggle";
import { AudienceCopy } from "@/components/AudienceCopy";
import { DeploymentMatrix } from "@/components/DeploymentMatrix";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Security · Almond AI",
  description:
    "Your company's memory, under your control. Encryption, deployment options, access controls, and compliance status.",
};

const SECURITY_DATA = {
  hero: {
    chip: "Security",
    title: "Your memory, under your control.",
    solo: {
      subtitle:
        "Encrypted, private by default, and yours to place, managed, your own cloud, or air-gapped behind your firewall.",
    },
    team: {
      subtitle:
        "Run it where your security team needs it. Encryption everywhere, role-scoped access, and an audit trail on every read.",
    },
  },
  handling: {
    eyebrow: "Data handling",
    heading: "How your memory is handled.",
    items: [
      {
        title: "Encrypted end to end",
        body: "TLS in transit, AES-256 at rest. Keys you can rotate, or bring your own.",
      },
      {
        title: "Yours to place",
        body: "Managed, your own cloud, or fully self-hosted. Your memory lives where you decide.",
      },
      {
        title: "Zero-retention option",
        body: "On self-host, nothing leaves your perimeter. No telemetry you don't opt into.",
      },
    ],
  },
  deploy: {
    eyebrow: "Deployment",
    heading: "Where your memory lives.",
    body: "Three modes, mapped to the tiers. Move up the moment your requirements do.",
  },
  access: {
    eyebrow: "Access",
    solo: {
      heading: "Private by default. Scoped when you share.",
      body: "Memory starts private to you. Add people and access follows your org structure, with every read attributable.",
      points: [
        "Single-account isolation by default",
        "Role-scoped access · SSO + SCIM on Orchard",
        "Export or delete anytime",
      ],
    },
    team: {
      heading: "Scoped to your org.",
      body: "Access follows your team structure. Every read is attributable.",
      points: [
        "SSO + SCIM on Orchard",
        "Role-scoped memory access",
        "Full audit trail on reads",
      ],
    },
  },
  compliance: {
    eyebrow: "Compliance",
    heading: "Where we stand, honestly.",
    items: [
      { label: "SOC 2", status: "In progress" },
      { label: "Encryption", status: "In transit + at rest" },
      { label: "Data residency", status: "Your cloud or on-prem" },
      { label: "Sub-processors", status: "Disclosed on request" },
    ],
  },
};

export default async function SecurityPage({
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
        <PageRawView payload={SECURITY_DATA} format={view} scope="security" />
        <SiteFooter />
      </main>
    );
  }

  const access = SECURITY_DATA.access;

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      <SectionTracker page="/security" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        data-section="Hero"
        className="w-full pt-[140px] pb-[56px] md:pt-[180px] md:pb-[72px]"
      >
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{SECURITY_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.12} y={12} className="mt-[24px]">
            <AudienceToggle variant="light" size="md" />
          </Mount>
          <Mount delay={0.18} y={14} className="mt-[28px]">
            <h1 className="max-w-[820px] font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black md:text-[60px] md:leading-[64px] md:tracking-[-1.2px]">
              {SECURITY_DATA.hero.title}
            </h1>
          </Mount>
          <AudienceCopy
            as="p"
            className="mt-[20px] max-w-[640px] text-[18px] leading-[28px] tracking-[-0.18px] text-black/60 md:text-[20px] md:leading-[30px]"
            solo={SECURITY_DATA.hero.solo.subtitle}
            team={SECURITY_DATA.hero.team.subtitle}
          />
        </div>
      </section>

      {/* ── Data handling ────────────────────────────────────── */}
      <section
        data-section="Handling"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {SECURITY_DATA.handling.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
              {SECURITY_DATA.handling.heading}
            </h2>
          </Reveal>
          <Stagger
            as="ul"
            className="mt-[40px] grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3"
          >
            {SECURITY_DATA.handling.items.map((it) => (
              <StaggerItem key={it.title} as="li" className="bg-white p-[28px] md:p-[32px]">
                <h3 className="font-sans text-[18px] font-medium leading-[24px] tracking-[-0.18px] text-black">
                  {it.title}
                </h3>
                <p className="mt-[12px] text-[14px] leading-[22px] text-black/60">
                  {it.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Deployment matrix ────────────────────────────────── */}
      <section data-section="Deploy" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {SECURITY_DATA.deploy.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
              {SECURITY_DATA.deploy.heading}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.08}>
            <p className="mt-[16px] max-w-[520px] text-[16px] leading-[26px] text-black/60">
              {SECURITY_DATA.deploy.body}{" "}
              <Link
                href="/self-host"
                className="text-walnut-500 underline-offset-4 hover:underline"
              >
                Read on self-hosting
              </Link>
              .
            </p>
          </Reveal>
          <div className="mt-[40px]">
            <DeploymentMatrix />
          </div>
        </div>
      </section>

      {/* ── Access controls (audience-aware) ─────────────────── */}
      <section
        data-section="Access"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {access.eyebrow}
            </p>
          </Reveal>
          <AudienceCopy
            as="h2"
            className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]"
            solo={access.solo.heading}
            team={access.team.heading}
          />
          <AudienceCopy
            as="p"
            className="mt-[16px] max-w-[560px] text-[16px] leading-[26px] text-black/60"
            solo={access.solo.body}
            team={access.team.body}
          />
          <AudienceCopy
            as="div"
            solo={<AccessPoints points={access.solo.points} />}
            team={<AccessPoints points={access.team.points} />}
          />
        </div>
      </section>

      {/* ── Compliance status ────────────────────────────────── */}
      <section data-section="Compliance" className="w-full py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              {SECURITY_DATA.compliance.eyebrow}
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
              {SECURITY_DATA.compliance.heading}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <div className="mt-[40px] overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
              {SECURITY_DATA.compliance.items.map((it, i) => (
                <div
                  key={it.label}
                  className={[
                    "flex items-center justify-between px-[24px] py-[18px]",
                    i < SECURITY_DATA.compliance.items.length - 1
                      ? "border-b border-black/[0.06]"
                      : "",
                  ].join(" ")}
                >
                  <span className="text-[15px] font-medium text-black">
                    {it.label}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-black/55">
                    {it.status}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        data-section="CTA"
        className="w-full bg-grey-96 py-[80px] md:py-[120px]"
      >
        <div className="container-x">
          <Reveal y={28} duration={0.8}>
            <div className="overflow-hidden rounded-[32px] bg-white px-[28px] py-[56px] text-center md:rounded-[48px] md:px-[80px] md:py-[80px]">
              <h2 className="font-display text-[36px] font-normal leading-[40px] tracking-[-0.72px] text-black md:text-[52px] md:leading-[56px] md:tracking-[-1.04px]">
                Have a security review?
              </h2>
              <p className="mx-auto mt-[20px] max-w-[480px] text-[16px] leading-[24px] text-black/60">
                Send it over. We answer questionnaires and walk your team through the architecture.
              </p>
              <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
                <Link href="/contact" className="btn-primary">
                  Talk to us
                </Link>
                <Link href="/self-host" className="btn-secondary">
                  Self-hosting
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

function AccessPoints({ points }: { points: string[] }) {
  return (
    <ul className="mt-[28px] flex flex-col gap-[12px]">
      {points.map((p) => (
        <li
          key={p}
          className="flex items-start gap-[12px] text-[15px] leading-[22px] text-black/70"
        >
          <span className="mt-[8px] inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-walnut-500" />
          {p}
        </li>
      ))}
    </ul>
  );
}
