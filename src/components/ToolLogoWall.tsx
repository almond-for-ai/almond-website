"use client";

import {
  LOGO_BY_KEY,
  LOGO_NAME,
  TOOL_WORDMARK,
  type LogoComponent,
} from "@/components/tool-logos";
import type { ToolKey } from "@/lib/site-data";

/**
 * Infinite-scroll integration row. Logos + brand wordmarks drift horizontally;
 * edge mask fades items at the borders. Pauses on hover. Reduced-motion: static row.
 */
export function ToolLogoWall({
  label,
  tools,
}: {
  label: string;
  tools: ToolKey[];
}) {
  return (
    <div className="group/marquee relative">
      <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 bg-grey-96 px-[12px] font-mono text-[10px] uppercase tracking-[0.22em] text-walnut-500">
        {label}
      </span>

      <div className="overflow-hidden border-t border-b border-black/[0.08] py-[26px] [mask-image:linear-gradient(to_right,transparent_0,black_56px,black_calc(100%-56px),transparent_100%)] motion-reduce:overflow-visible motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-marquee-logos motion-reduce:hidden group-hover/marquee:[animation-play-state:paused]">
          <LogoRow tools={tools} />
          <LogoRow tools={tools} ariaHidden />
        </div>
        <ul className="hidden flex-wrap items-center justify-center gap-x-[36px] gap-y-[16px] motion-reduce:flex">
          {tools.map((key) => (
            <li key={key}>
              <LogoItem toolKey={key} Logo={LOGO_BY_KEY[key]} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LogoRow({
  tools,
  ariaHidden,
}: {
  tools: ToolKey[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden ? true : undefined}
    >
      {tools.map((key, i) => {
        const Logo = LOGO_BY_KEY[key];
        return (
          <li key={`${key}-${i}`} className="flex items-center">
            <LogoItem toolKey={key} Logo={Logo} />
            <span
              aria-hidden
              className="inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-black/15"
            />
          </li>
        );
      })}
    </ul>
  );
}

function LogoItem({
  toolKey,
  Logo,
}: {
  toolKey: ToolKey;
  Logo: LogoComponent;
}) {
  return (
    <span className="group/logo inline-flex items-center gap-[10px] px-[28px] md:px-[36px]">
      <span className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center grayscale opacity-55 transition-[filter,opacity] duration-500 ease-out group-hover/logo:grayscale-0 group-hover/logo:opacity-100">
        <Logo size={24} />
      </span>
      <span
        className={[
          TOOL_WORDMARK[toolKey],
          "whitespace-nowrap text-black/50 transition-colors duration-500 ease-out group-hover/logo:text-black/90",
        ].join(" ")}
      >
        {LOGO_NAME[toolKey]}
      </span>
    </span>
  );
}
