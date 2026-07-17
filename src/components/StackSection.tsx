"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useScrollScrub } from "@/lib/use-scroll-scrub";

/**
 * Layered stacking-card panel. Each section is an opaque, round-topped panel
 * that slides up and overlaps the previous one (negative margin + upward
 * shadow), while scrub-driven scale/opacity gives it a continuous "rise into
 * place" as it enters — the stacked-card handoff, but height-agnostic (no
 * sticky pin, so tall/interactive sections like the game are never clipped or
 * remounted).
 *
 * Under reduced motion it renders as a plain block with the panel styling only.
 */
export function StackSection({
  id,
  children,
  className = "",
  bgClassName = "bg-white",
  radius = 44,
  overlap = 0,
  first = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bgClassName?: string;
  /** top corner radius of the panel, px */
  radius?: number;
  /** how far this panel slides over the previous one, px */
  overlap?: number;
  /** first panel: no overlap/shadow/rounding above the fold */
  first?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { smooth } = useScrollScrub(ref, ["start end", "start center"]);

  const scale = useTransform(smooth, [0, 1], [0.985, 1]);
  const y = useTransform(smooth, [0, 1], [40, 0]);

  const panelStyle = first
    ? undefined
    : {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        marginTop: -overlap,
        boxShadow: "0 -24px 60px rgba(0,0,0,0.10)",
      };

  if (reduce) {
    return (
      <div
        id={id}
        className={`relative ${bgClassName} ${className}`}
        style={panelStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`relative ${bgClassName} ${className}`}
      style={{ ...panelStyle, scale, y, transformOrigin: "center top" }}
    >
      {children}
    </motion.div>
  );
}
