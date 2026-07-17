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
 * Depth wrapper for hero content: as its element scrolls off the top, the
 * content drifts down-relative (moves slower than the page) and fades, so the
 * next stacked panel visibly travels over it. Different strengths on copy vs
 * marquee give the hero two parallax layers.
 */
export function HeroParallax({
  children,
  className,
  strength = 70,
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  /** px the content lags behind the page over its own exit */
  strength?: number;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, strength]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, fade ? 0.25 : 1]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
