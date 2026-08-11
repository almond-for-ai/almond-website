import type { Metadata } from "next";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageRawView } from "@/components/PageRawView";
import { Mount, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { AudienceToggle } from "@/components/AudienceToggle";
import { AudienceCopy } from "@/components/AudienceCopy";
import { EmailCopy } from "@/components/EmailCopy";
import { SOCIAL_LINKS } from "@/components/SiteFooter";
import { SectionTracker } from "@/components/SectionTracker";

export const metadata: Metadata = {
  title: "Contact · Almond AI",
  description:
    "Book a demo of Almond's shared multiplayer memory. 30 minutes on your real stack: Claude Code, Figma, Figma Make.",
};

const CONTACT_DATA = {
  hero: {
    chip: "Talk to us",
    title: "Book a demo.",
    solo: {
      subtitle:
        "30 minutes on your real stack. We'll show one shared memory your whole team's tools can draw from, and decisions you forgot you made.",
    },
    team: {
      subtitle:
        "30 minutes. Bring your real codebase. We'll show you decisions your team forgot it made.",
    },
  },
  expect: [
    {
      n: "01",
      title: "Intro · 5 min",
      body: "Tell us what you're building and where memory is leaking today.",
    },
    {
      n: "02",
      title: "Walkthrough · 20 min",
      body: "Live demo of capture, compile, and inject on your stack. Not a slide deck.",
    },
    {
      n: "03",
      title: "Trial · 14 days",
      body: "Walk out with a working instance. Bring it back, or don't.",
    },
  ],
  channels: [
    // Cal.com scheduling and the phone line are hidden until they are ready.
    {
      label: "Email",
      value: "contact@almondai.tech",
      kind: "email" as const,
      href: "mailto:contact@almondai.tech",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/company/hey-almond-ai",
      kind: "link" as const,
      href: SOCIAL_LINKS.linkedin,
    },
    {
      label: "X",
      value: "@Hey_AlmondAI",
      kind: "link" as const,
      href: SOCIAL_LINKS.x,
    },
  ],
};

export default async function ContactPage({
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
        <PageRawView payload={CONTACT_DATA} format={view} scope="contact" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-white">
      <SiteNav />
      <SectionTracker page="/contact" />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section data-section="Hero" className="w-full pt-[140px] pb-[64px] md:pt-[200px] md:pb-[80px]">
        <div className="container-x">
          <Mount delay={0.05} y={10}>
            <span className="chip-accent">{CONTACT_DATA.hero.chip}</span>
          </Mount>
          <Mount delay={0.12} y={12} className="mt-[24px]">
            <AudienceToggle variant="light" size="md" />
          </Mount>
          <Mount delay={0.18} y={14} className="mt-[28px]">
            <h1 className="font-sans text-[34px] font-medium leading-[38px] tracking-[-0.68px] text-black md:text-[48px] md:leading-[52px] md:tracking-[-0.96px]">
              {CONTACT_DATA.hero.title}
            </h1>
          </Mount>
          <AudienceCopy
            as="p"
            className="mt-[20px] max-w-[640px] text-[18px] leading-[28px] text-black/60 md:text-[20px] md:leading-[30px]"
            solo={CONTACT_DATA.hero.solo.subtitle}
            team={CONTACT_DATA.hero.team.subtitle}
          />
        </div>
      </section>

      {/* ── 2-col: Schedule + channels ──────────────────────── */}
      <section data-section="Schedule" className="w-full pb-[80px] md:pb-[120px]">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-[24px] md:grid-cols-[1.2fr_1fr] md:gap-[40px]">
            {/* Email us. The scheduler is hidden until it is ready. */}
            <Reveal y={20}>
              <div className="flex h-full flex-col rounded-[24px] border border-black/[0.08] bg-black p-[28px] text-white md:rounded-[32px] md:p-[40px]">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-300">
                  Book a demo
                </span>
                <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[32px] tracking-[-0.56px] md:text-[32px] md:leading-[36px] md:tracking-[-0.64px]">
                  Email us.
                </h2>
                <p className="mt-[12px] text-[15px] leading-[22px] text-white/65">
                  Send two times that work and we will confirm within 24 hours.
                </p>

                <div className="mt-[28px] flex flex-1 items-end">
                  <div className="w-full rounded-[16px] border border-white/[0.1] bg-white/[0.04] p-[20px]">
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                      Write to
                    </div>
                    <a
                      href="mailto:contact@almondai.tech?subject=Almond%20demo"
                      className="mt-[10px] block break-all font-sans text-[20px] font-medium leading-[26px] tracking-[-0.2px] text-white transition-opacity hover:opacity-75 md:text-[24px] md:leading-[30px]"
                    >
                      contact@almondai.tech
                    </a>
                  </div>
                </div>

                <a
                  href="mailto:contact@almondai.tech?subject=Almond%20demo"
                  className="mt-[28px] inline-flex w-fit items-center justify-center rounded-full bg-white px-[24px] py-[10px] text-[15px] font-medium leading-[18px] tracking-[-0.3px] text-black transition-opacity hover:opacity-90"
                >
                  Email to schedule
                </a>
              </div>
            </Reveal>

            {/* Channels */}
            <Stagger
              as="ul"
              className="grid grid-cols-1 gap-[12px]"
            >
              {CONTACT_DATA.channels.map((c) => (
                <StaggerItem
                  key={c.label}
                  as="li"
                  className="rounded-[20px] border border-black/[0.08] bg-white p-[20px] md:p-[24px]"
                >
                  <div className="flex items-start justify-between gap-[16px]">
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-500">
                        {c.label}
                      </div>
                      {c.kind === "email" ? (
                        <EmailCopy
                          email={c.value}
                          label={c.value}
                          className="mt-[8px] block truncate text-left font-sans text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-black hover:text-walnut-500"
                        />
                      ) : (
                        <a
                          href={c.href}
                          target={c.kind === "link" ? "_blank" : undefined}
                          rel={c.kind === "link" ? "noreferrer noopener" : undefined}
                          className="mt-[8px] block truncate font-sans text-[16px] font-medium leading-[22px] tracking-[-0.16px] text-black hover:text-walnut-500"
                        >
                          {c.value}
                        </a>
                      )}
                    </div>
                    <span className="shrink-0 text-black/30" aria-hidden>
                      ↗
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── What to expect ─────────────────────────────────── */}
      <section data-section="Expect" className="w-full bg-grey-96 py-[80px] md:py-[120px]">
        <div className="container-x">
          <Reveal y={16}>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
              What to expect
            </p>
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h2 className="mt-[16px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]">
              30 minutes. No deck.
            </h2>
          </Reveal>

          <Stagger
            as="ul"
            className="mt-[48px] grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3"
          >
            {CONTACT_DATA.expect.map((e) => (
              <StaggerItem
                key={e.n}
                as="li"
                className="bg-white p-[24px] md:p-[32px]"
              >
                <div className="font-display text-[40px] font-normal leading-[40px] tracking-[-0.8px] text-walnut-500">
                  {e.n}
                </div>
                <h3 className="mt-[16px] font-sans text-[18px] font-medium leading-[24px] tracking-[-0.36px] text-black">
                  {e.title}
                </h3>
                <p className="mt-[10px] text-[14px] leading-[22px] text-black/65">
                  {e.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
