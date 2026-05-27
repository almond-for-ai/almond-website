"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

type Metric = {
  /** Display value when not animated, e.g. "1", "∞", "0", "100%" */
  value: string;
  /** If numeric, count up to this number from 0 */
  numeric?: number;
  suffix?: string;
  label: string;
};

const METRICS: Metric[] = [
  { value: "1", numeric: 1, label: "Memory" },
  { value: "∞", label: "Tools" },
  { value: "0", numeric: 0, label: "Chat windows" },
];

function MetricItem({ m, inView }: { m: Metric; inView: boolean }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) => {
    if (m.numeric === undefined) return m.value;
    return `${Math.round(latest)}${m.suffix ?? ""}`;
  });

  useEffect(() => {
    if (!inView) return;
    if (m.numeric === undefined) return;
    const controls = animate(mv, m.numeric, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, m.numeric, mv]);

  return (
    <div className="flex flex-col items-start">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[64px] font-normal leading-none tracking-[-0.04em] text-black md:text-[120px]"
      >
        {m.numeric !== undefined ? <motion.span>{display}</motion.span> : m.value}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-[12px] font-mono text-[12px] uppercase tracking-[0.18em] text-black/55"
      >
        {m.label}
      </motion.div>
    </div>
  );
}

export function MetricStrip({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-[40px] md:grid-cols-3 md:gap-[24px] ${className ?? ""}`}
    >
      {METRICS.map((m) => (
        <MetricItem key={m.label} m={m} inView={inView} />
      ))}
    </div>
  );
}
