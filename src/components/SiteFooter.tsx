import Link from "next/link";
import { AlmondGlyph } from "@/components/AlmondMark";
import { EmailCopy } from "@/components/EmailCopy";
import { Reveal } from "@/components/Motion";
import { WaitlistForm } from "@/components/WaitlistForm";

export const SOCIAL_LINKS = {
  x: "https://x.com/Hey_AlmondAI",
  linkedin: "https://www.linkedin.com/company/hey-almond-ai",
  email: "contact.almondai@gmail.com",
} as const;

export function SiteFooter() {
  return (
    <footer className="w-full bg-black pb-[40px] pt-[40px] text-white">
      <div className="container-x flex flex-col">
        {/* Top: link columns + waitlist */}
        <div className="grid grid-cols-1 gap-[40px] md:grid-cols-3 md:gap-[24px]">
          <div className="flex flex-col gap-[16px]">
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/50">
              About
            </span>
            <Link
              href="/manifesto"
              className="footer-link text-[15px] leading-[18px] text-white/80"
            >
              Manifesto
            </Link>
            <Link
              href="/blog"
              className="footer-link text-[15px] leading-[18px] text-white/80"
            >
              Blog
            </Link>
            <Link
              href="/#game"
              className="footer-link text-[15px] leading-[18px] text-white/80"
            >
              Test your Mind
            </Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/50">
              Contact
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

          <div className="flex flex-col gap-[16px]">
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/50">
              Waitlist
            </span>
            <p className="text-[14px] leading-[20px] text-white/60">
              First taste goes to the list.
            </p>
            <WaitlistForm source="footer" variant="dark" />
          </div>
        </div>

        {/* Big glyph */}
        <Reveal y={28} duration={0.9} className="my-[80px] flex w-full justify-center text-white">
          <AlmondGlyph size={180} />
        </Reveal>

        {/* Copyright row */}
        <div className="flex flex-col items-start justify-between gap-2 text-[13px] tracking-[-0.484px] text-white/40 md:flex-row md:items-center">
          <span>© 2026 Almond AI</span>
          <span>amygdala (n.) · Greek &ldquo;almond.&rdquo;</span>
        </div>
      </div>
    </footer>
  );
}
