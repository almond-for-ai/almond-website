"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CardFrame } from "@/components/cards/CardFrame";
import { CARD_EASE, CARD_ENTER_MS } from "@/components/cards/motion";
import type { CascadeRow, CascadeSlot } from "@/lib/site-data";

/**
 * Context cascade: a hand-off chain where context degrades each step.
 *
 * Rows reveal top-to-bottom with a 200 ms stagger when scrolled into view.
 * Each row pairs a name box with a "what survived" pill; both the connector
 * line and the pill fade down the chain until the last row keeps nothing.
 */

const LEVEL = {
  0: {
    line: "bg-white/35",
    pill: "border-walnut-400/50 bg-walnut-500/85 text-white",
    name: "border-white/20 text-white/90",
  },
  1: {
    line: "bg-white/22",
    pill: "border-walnut-400/25 bg-walnut-500/35 text-white/80",
    name: "border-white/14 text-white/80",
  },
  2: {
    line: "bg-white/12",
    pill: "border-white/12 bg-white/[0.05] text-white/45",
    name: "border-white/10 text-white/60",
  },
  3: {
    line: "bg-white/[0.06]",
    pill: "border-white/[0.06] bg-white/[0.02] text-white/30",
    name: "border-white/[0.07] text-white/45",
  },
} as const;

export function CascadeCard({ slot }: { slot: CascadeSlot }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <CardFrame tone="dark">
      <div
        ref={ref}
        className="flex h-full flex-col gap-[24px] p-[24px] md:p-[32px]"
      >
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-walnut-300">
            {slot.label}
          </span>
          <h3 className="mt-[8px] text-[20px] font-medium leading-[26px] tracking-[-0.02em] text-white md:text-[22px] md:leading-[28px]">
            {slot.title}
          </h3>
        </div>

        <div className="flex flex-col gap-[14px] md:gap-[16px]">
          {slot.rows.map((row, i) => (
            <CascadeRowItem
              key={row.name}
              row={row}
              delay={i * 0.2}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </CardFrame>
  );
}

function CascadeRowItem({
  row,
  delay,
  inView,
}: {
  row: CascadeRow;
  delay: number;
  inView: boolean;
}) {
  const styles = LEVEL[row.level];
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: CARD_ENTER_MS, delay, ease: CARD_EASE }}
      className="flex items-center gap-[12px] md:gap-[16px]"
    >
      <span
        className={[
          "shrink-0 rounded-[8px] border px-[12px] py-[8px] font-mono text-[12px] tracking-[-0.01em] md:text-[13px]",
          styles.name,
        ].join(" ")}
      >
        {row.name}
      </span>

      <span className={`h-px flex-1 ${styles.line}`} />

      <span
        className={[
          "shrink-0 rounded-[8px] border px-[12px] py-[7px] font-mono text-[12px] tracking-[-0.01em] md:text-[13px]",
          styles.pill,
        ].join(" ")}
      >
        {row.survived}
      </span>
    </motion.div>
  );
}
