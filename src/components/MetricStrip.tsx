"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { CardFrame, type CardTone } from "@/components/cards/CardFrame";
import { Stagger, StaggerItem } from "@/components/Motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Metric = {
  index: string;
  value: string;
  numeric?: number;
  suffix?: string;
  label: string;
  caption: string;
  tone: CardTone;
};

const METRICS: Metric[] = [
  {
    index: "01",
    value: "1",
    numeric: 1,
    label: "Memory",
    caption: "One compiled layer. Not ten silos.",
    tone: "accent",
  },
  {
    index: "02",
    value: "∞",
    label: "Tools",
    caption: "Every app you already open. No rip-and-replace.",
    tone: "dark",
  },
  {
    index: "03",
    value: "0",
    numeric: 0,
    label: "Chat windows",
    caption: "Context where work happens. Not another tab.",
    tone: "cream",
  },
];

function MetricCard({ m }: { m: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) => {
    if (m.numeric === undefined) return m.value;
    return `${Math.round(latest)}${m.suffix ?? ""}`;
  });

  useEffect(() => {
    if (!inView || m.numeric === undefined) return;
    const controls = animate(mv, m.numeric, {
      duration: 1,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, m.numeric, mv]);

  const labelTone =
    m.tone === "dark" || m.tone === "accent"
      ? "text-white/55"
      : "text-black/45";
  const captionTone =
    m.tone === "dark" || m.tone === "accent"
      ? "text-white/70"
      : "text-black/55";
  const indexTone =
    m.tone === "dark" || m.tone === "accent"
      ? "text-white/35"
      : "text-black/30";
  const dividerTone =
    m.tone === "dark" || m.tone === "accent"
      ? "bg-white/[0.10]"
      : "bg-black/[0.08]";

  return (
    <CardFrame tone={m.tone} ariaLabel={`${m.label}: ${m.value}`}>
      <div
        ref={ref}
        className="flex min-h-[280px] flex-col p-[28px] md:min-h-[320px] md:p-[32px]"
      >
        {/* Specimen header */}
        <div className="flex items-start justify-between gap-[16px]">
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.22em] ${labelTone}`}
          >
            {m.label}
          </span>
          <span className={`font-mono text-[11px] tracking-[0.12em] ${indexTone}`}>
            {m.index}
          </span>
        </div>

        {/* Hero number */}
        <div className="relative my-auto flex flex-1 items-center py-[24px] md:py-[32px]">
          {/* Soft radial glow behind the stat */}
          <div
            aria-hidden
            className={[
              "pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]",
              m.tone === "accent"
                ? "bg-white/[0.12]"
                : m.tone === "dark"
                  ? "bg-walnut-400/20"
                  : "bg-walnut-500/[0.08]",
            ].join(" ")}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className={[
              "relative font-display text-[72px] font-normal leading-none tracking-[-0.04em] md:text-[96px]",
              m.value === "∞" ? "motion-reduce:animate-none" : "",
            ].join(" ")}
          >
            {m.numeric !== undefined ? (
              <motion.span aria-hidden>{display}</motion.span>
            ) : (
              <motion.span
                aria-hidden
                animate={
                  m.value === "∞" && inView
                    ? { opacity: [0.85, 1, 0.85] }
                    : undefined
                }
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="motion-reduce:!opacity-100"
              >
                {m.value}
              </motion.span>
            )}
            <span className="sr-only">{m.value}</span>
          </motion.div>
        </div>

        {/* Caption */}
        <div>
          <div className={`mb-[14px] h-px w-full ${dividerTone}`} />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
            className={`text-[14px] leading-[20px] tracking-[-0.01em] md:text-[15px] md:leading-[22px] ${captionTone}`}
          >
            {m.caption}
          </motion.p>
        </div>
      </div>
    </CardFrame>
  );
}

export function MetricStrip({ className }: { className?: string }) {
  return (
    <Stagger
      className={`grid grid-cols-1 gap-[16px] md:grid-cols-3 md:gap-[20px] ${className ?? ""}`}
    >
      {METRICS.map((m) => (
        <StaggerItem key={m.label}>
          <MetricCard m={m} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
