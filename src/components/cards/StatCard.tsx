"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { CardFrame } from "@/components/cards/CardFrame";
import { CARD_EASE, CARD_ENTER_MS } from "@/components/cards/motion";
import { LOGO_BY_KEY, LOGO_NAME } from "@/components/tool-logos";
import type { StatSlot } from "@/lib/site-data";

export function StatCard({ slot }: { slot: StatSlot }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const target = parseFloat(slot.number);
  const isNumeric = Number.isFinite(target);
  const rounded = useTransform(motionVal, (v) =>
    Math.round(v).toLocaleString("en-US"),
  );

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(motionVal, target, {
      duration: 1.4,
      ease: CARD_EASE,
    });
    return controls.stop;
  }, [inView, isNumeric, motionVal, target]);

  return (
    <CardFrame tone="accent" ariaLabel={`${slot.label}: ${slot.number} ${slot.suffix ?? ""}`}>
      <div ref={ref} className="flex h-full flex-col justify-between gap-[28px] p-[28px] md:p-[32px]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
            {slot.label}
          </span>
        </div>

        <div className="relative">
          <div className="flex items-baseline gap-[10px]">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: CARD_ENTER_MS, ease: CARD_EASE }}
              className="block font-display text-[64px] font-normal leading-[1] tracking-[-0.04em] text-white md:text-[88px]"
            >
              {isNumeric ? (
                <motion.span aria-hidden>{rounded}</motion.span>
              ) : (
                <span aria-hidden>{slot.number}</span>
              )}
              <span className="sr-only">{slot.number}</span>
            </motion.span>
            {slot.suffix ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: CARD_ENTER_MS, delay: 0.08, ease: CARD_EASE }}
                className="font-display text-[24px] font-normal leading-[1] tracking-[-0.01em] text-white/85 md:text-[28px]"
              >
                {slot.suffix}
              </motion.span>
            ) : null}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: CARD_ENTER_MS, delay: 0.12, ease: CARD_EASE }}
            className="mt-[10px] text-[14px] leading-[20px] text-white/85"
          >
            {slot.caption}
          </motion.p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            across
          </p>
          <ul className="mt-[10px] flex flex-wrap items-center gap-[8px]">
            {slot.logoTrail.map((key) => {
              const Logo = LOGO_BY_KEY[key];
              return (
                <li
                  key={key}
                  className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white opacity-85 transition-opacity duration-500 ease-out group-hover/card:opacity-100"
                  title={LOGO_NAME[key]}
                >
                  <Logo size={18} />
                  <span className="sr-only">{LOGO_NAME[key]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </CardFrame>
  );
}
