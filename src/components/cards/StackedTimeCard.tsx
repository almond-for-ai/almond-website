"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { CardFrame } from "@/components/cards/CardFrame";
import { CARD_EASE } from "@/components/cards/motion";
import type { StackedSlot } from "@/lib/site-data";

export function StackedTimeCard({ slot }: { slot: StackedSlot }) {
  const { total, beforeFilled, afterFilled, label, caption } = slot;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const fillCount = useMotionValue(beforeFilled);
  const unit = label.toLowerCase();
  const captionVal = useTransform(
    fillCount,
    (v) => `${Math.round(v)} / ${total} ${unit}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(fillCount, afterFilled, {
      duration: 1.2,
      ease: CARD_EASE,
    });
    return controls.stop;
  }, [inView, fillCount, afterFilled]);

  return (
    <CardFrame tone="cream">
      <div ref={ref} className="flex h-full flex-col gap-[20px] p-[28px] md:p-[32px]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-walnut-500">
            {label}
          </span>
          <p className="mt-[6px] text-[14px] leading-[20px] text-black/65">{caption}</p>
        </div>

        <div className="flex flex-col gap-[6px]">
          {Array.from({ length: total }, (_, i) => {
            const wasFilled = i < beforeFilled;
            const willBeFilled = i < afterFilled;
            return (
              <motion.div
                key={i}
                initial={{ opacity: wasFilled ? 0.95 : 0.4 }}
                animate={
                  inView
                    ? {
                        opacity: willBeFilled ? 0.95 : 0.4,
                        backgroundColor: willBeFilled ? "#7b4019" : "#d6cdc1",
                      }
                    : undefined
                }
                transition={{
                  duration: 0.5,
                  delay: 0.08 + i * 0.05,
                  ease: CARD_EASE,
                }}
                style={{ backgroundColor: wasFilled ? "#7b4019" : "#d6cdc1" }}
                className="h-[10px] w-full rounded-full"
              />
            );
          })}
        </div>

        <motion.p
          className="mt-auto font-display text-[22px] font-normal leading-[1] tracking-[-0.01em] text-walnut-500 md:text-[24px]"
          aria-live="polite"
        >
          {captionVal}
        </motion.p>
      </div>
    </CardFrame>
  );
}
