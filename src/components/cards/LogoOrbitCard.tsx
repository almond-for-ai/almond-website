"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CardFrame } from "@/components/cards/CardFrame";
import { CARD_EASE, CARD_ENTER_MS } from "@/components/cards/motion";
import { LOGO_BY_KEY, LOGO_NAME } from "@/components/tool-logos";
import type { OrbitSlot } from "@/lib/site-data";

export function LogoOrbitCard({ slot }: { slot: OrbitSlot }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <CardFrame tone="light">
      <div
        ref={ref}
        className="flex h-full flex-col gap-[24px] p-[28px] md:p-[32px]"
      >
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-walnut-500">
            Integrations
          </span>
          <h3 className="mt-[8px] text-[20px] font-medium leading-[26px] tracking-[-0.02em] text-black md:text-[22px] md:leading-[28px]">
            {slot.title}
          </h3>
        </div>

        <ul className="mt-auto grid grid-cols-2 gap-x-[16px] border-t border-black/[0.06] pt-[4px]">
          {slot.logos.map((key, i) => {
            const Logo = LOGO_BY_KEY[key];
            return (
              <motion.li
                key={key}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{
                  duration: CARD_ENTER_MS,
                  delay: i * 0.04,
                  ease: CARD_EASE,
                }}
                className="flex items-center gap-[10px] border-b border-black/[0.06] py-[11px]"
              >
                <span className="inline-flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-grey-96 transition-colors duration-500 ease-out group-hover/card:bg-white">
                  <Logo size={18} />
                </span>
                <span className="truncate text-[13px] font-medium leading-[16px] tracking-[-0.01em] text-black/70 transition-colors duration-500 ease-out group-hover/card:text-black/90">
                  {LOGO_NAME[key]}
                </span>
              </motion.li>
            );
          })}
        </ul>

        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
          {slot.logos.length} tools · one memory layer
        </p>
      </div>
    </CardFrame>
  );
}
