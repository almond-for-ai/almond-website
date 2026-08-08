import Link from "next/link";
import { AlmondGlyph } from "@/components/AlmondMark";
import { EmailCopy } from "@/components/EmailCopy";
import { FooterMindGame } from "@/components/FooterMindGame";
import { Reveal } from "@/components/Motion";

export const SOCIAL_LINKS = {
  x: "https://x.com/Hey_AlmondAI",
  linkedin: "https://www.linkedin.com/company/hey-almond-ai",
  email: "contact@almondai.tech",
} as const;

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { label: string; links: FooterLink[] };

const COLUMNS: FooterColumn[] = [
  {
    label: "Product",
    links: [
      { label: "How it works", href: "/product" },
      { label: "Integrations", href: "/integrations" },
      { label: "Use cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
      { label: "Manifesto", href: "/manifesto" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Self-host", href: "/self-host" },
      { label: "SOC 2 (in progress)", href: "/security" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-black pb-[40px] text-white">
      {/* Mind Snap lives in the footer's own surface: ambient at rest, playable
          in place, with no card edge between it and the links below. */}
      <FooterMindGame />

      <div className="container-x flex flex-col">
        {/* Top: link columns */}
        <div className="grid grid-cols-2 gap-[40px] md:grid-cols-4 md:gap-[24px]">
          {COLUMNS.map((col) => (
            <div key={col.label} className="flex flex-col gap-[16px]">
              <span className="text-[13px] uppercase tracking-[0.18em] text-white/50">
                {col.label}
              </span>
              {col.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footer-link text-[15px] leading-[18px] text-white/80"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="footer-link text-[15px] leading-[18px] text-white/80"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}

          {/* Connect column: socials + email-copy */}
          <div className="flex flex-col gap-[16px]">
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/50">
              Connect
            </span>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link text-[15px] leading-[18px] text-white/80"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link text-[15px] leading-[18px] text-white/80"
            >
              X
            </a>
            <EmailCopy
              email={SOCIAL_LINKS.email}
              className="footer-link cursor-pointer text-left text-[15px] leading-[18px] text-white/80"
            />
          </div>
        </div>

        {/* Big glyph */}
        <Reveal
          y={28}
          duration={0.9}
          className="mt-[72px] mb-[72px] flex w-full justify-center text-white"
        >
          <AlmondGlyph size={180} />
        </Reveal>

        {/* Copyright row */}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/[0.08] pt-[24px] text-[13px] tracking-[-0.484px] text-white/40 md:flex-row md:items-center">
          <span>© 2026 Almond AI</span>
          <span>amygdala (n.) · Greek for &ldquo;almond.&rdquo;</span>
        </div>
      </div>
    </footer>
  );
}
