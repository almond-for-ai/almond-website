"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Card-stack section. The outer wrapper carries the anchor `id` and reserves
 * scroll length; the inner panel sticks to the top of the viewport and, as the
 * NEXT section scrolls up over it, scales down, rounds its corners and dims —
 * an Apple/Linear-style stacked-card handoff.
 *
 * Each section drives its own exit from its own scroll progress, so there is no
 * cross-section coupling. Under reduced motion it renders as a plain block.
 */
export function StackSection({
  id,
  children,
  className = "",
  panelClassName = "",
  radius = 40,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress over the section's own exit: 0 while pinned, ramping to 1 as the
  // section's bottom leaves the top of the viewport (i.e. the next panel covers
  // it). "end end" -> "end start" is exactly that final viewport-height of travel.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, radius]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  if (reduce) {
    return (
      <section id={id} className={className}>
        <div className={panelClassName}>{children}</div>
      </section>
    );
  }

  return (
    <div ref={ref} id={id} className={`relative ${className}`}>
      <motion.div
        className={`sticky top-0 overflow-hidden ${panelClassName}`}
        style={{ scale, borderRadius, filter, transformOrigin: "center top" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
