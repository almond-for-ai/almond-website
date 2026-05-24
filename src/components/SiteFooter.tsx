import Link from "next/link";
import { AlmondGlyph } from "@/components/AlmondMark";
import { Reveal } from "@/components/Motion";

export const SOCIAL_LINKS = {
  x: "https://x.com/Hey_AlmondAI",
  linkedin: "https://www.linkedin.com/company/hey-almond-ai",
} as const;

export function SiteFooter() {
  return (
    <footer className="w-full bg-black pb-[40px] pt-[40px] text-white">
      <div className="container-x flex flex-col">
        {/* Top: link columns */}
        <div className="grid grid-cols-1 gap-[40px] md:grid-cols-2 md:gap-0">
          <div className="flex flex-col gap-[16px]">
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/50">
              About
            </span>
            <Link
              href="/blog"
              className="text-[15px] leading-[18px] text-white/80 hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/#game"
              className="text-[15px] leading-[18px] text-white/80 hover:text-white"
            >
              Test your Mind
            </Link>
          </div>

          <div className="flex flex-col gap-[16px] md:justify-self-end">
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/50">
              Contact
            </span>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[15px] leading-[18px] text-white/80 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[15px] leading-[18px] text-white/80 hover:text-white"
            >
              X
            </a>
          </div>
        </div>

        {/* Big glyph */}
        <Reveal y={28} duration={0.9} className="my-[80px] flex w-full justify-center text-white">
          <AlmondGlyph size={180} />
        </Reveal>

        {/* Copyright row */}
        <div className="flex flex-col items-start justify-between gap-2 text-[13px] tracking-[-0.484px] text-white/40 md:flex-row md:items-center">
          <span>© 2026 Almond AI</span>
          <span>Stay tuned for more info</span>
        </div>
      </div>
    </footer>
  );
}
