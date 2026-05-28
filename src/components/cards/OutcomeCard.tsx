"use client";

import { motion } from "motion/react";
import { CardFrame } from "@/components/cards/CardFrame";
import { CARD_EASE, CARD_ENTER_MS } from "@/components/cards/motion";
import type { OutcomeSlot } from "@/lib/site-data";

export function OutcomeCard({ slot }: { slot: OutcomeSlot }) {
  const { title, highlight, body, label } = slot;

  const idx = title.indexOf(highlight);
  const before = idx >= 0 ? title.slice(0, idx) : title;
  const target = idx >= 0 ? title.slice(idx, idx + highlight.length) : "";
  const after = idx >= 0 ? title.slice(idx + highlight.length) : "";

  return (
    <CardFrame tone="light">
      <div className="relative flex h-full flex-col gap-[24px] p-[28px] md:p-[32px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-walnut-500/0 transition-colors duration-500 ease-out group-hover/card:bg-walnut-500/[0.02]"
        />

        <div className="relative">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-walnut-500">
            {label}
          </span>
        </div>

        <div className="relative">
          <h3 className="text-[24px] font-medium leading-[32px] tracking-[-0.02em] text-black md:text-[26px] md:leading-[34px]">
            {before}
            {target ? (
              <span className="relative inline-block">
                <span>{target}</span>
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, scaleX: 0.6 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: CARD_ENTER_MS, ease: CARD_EASE }}
                  className="absolute bottom-[-4px] left-0 block h-[2px] w-full origin-left rounded-full bg-walnut-500/70"
                />
              </span>
            ) : null}
            {after}
          </h3>
          <p className="mt-[14px] text-[15px] leading-[22px] text-black/65 md:text-[16px] md:leading-[24px]">
            {body}
          </p>
        </div>
      </div>
    </CardFrame>
  );
}
