"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CardFrame } from "@/components/cards/CardFrame";
import { CARD_EASE } from "@/components/cards/motion";
import type { CompareSlot } from "@/lib/site-data";

export function CompareCard({ slot }: { slot: CompareSlot }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const numeric = slot.numeric;
  const beforeFrac = numeric
    ? clamp(numeric.before / Math.max(numeric.before, numeric.after) || 1, 0.2, 1)
    : 0.92;
  const afterFrac = numeric
    ? clamp(numeric.after / Math.max(numeric.before, numeric.after) || 1, 0.08, 1)
    : 0.18;

  return (
    <CardFrame tone="light">
      <div ref={ref} className="flex h-full flex-col gap-[24px] p-[28px] md:p-[32px]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-walnut-500">
            Compare
          </span>
          <h3 className="mt-[8px] text-[20px] font-medium leading-[26px] tracking-[-0.02em] text-black md:text-[22px] md:leading-[28px]">
            {slot.label}
          </h3>
        </div>

        <div className="mt-auto flex flex-col gap-[18px]">
          <CompareBar
            label={slot.before.name}
            value={slot.before.value}
            frac={beforeFrac}
            delay={0}
            tone="grey"
            inView={inView}
          />
          <CompareBar
            label={slot.after.name}
            value={slot.after.value}
            frac={afterFrac}
            delay={0.2}
            tone="walnut"
            inView={inView}
          />
        </div>
      </div>
    </CardFrame>
  );
}

function CompareBar({
  label,
  value,
  frac,
  delay,
  tone,
  inView,
}: {
  label: string;
  value: string;
  frac: number;
  delay: number;
  tone: "grey" | "walnut";
  inView: boolean;
}) {
  const isAfter = tone === "walnut";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/55">
          {label}
        </span>
        <span
          className={[
            "font-display text-[20px] font-normal leading-[1] tracking-[-0.02em] md:text-[24px]",
            isAfter ? "text-walnut-500" : "text-black/55",
          ].join(" ")}
        >
          {value}
        </span>
      </div>
      <div className="mt-[8px] h-[10px] w-full overflow-hidden rounded-full bg-black/[0.04]">
        <motion.div
          className={[
            "h-full rounded-full origin-left",
            isAfter ? "bg-walnut-500" : "bg-black/20",
          ].join(" ")}
          style={{ width: `${Math.round(frac * 100)}%` }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.1, delay, ease: CARD_EASE }}
        />
      </div>
    </div>
  );
}

function clamp(n: number, lo: number, hi: number) {
  if (!Number.isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}
