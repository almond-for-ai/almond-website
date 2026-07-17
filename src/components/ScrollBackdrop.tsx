"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Fixed full-viewport colour wash that morphs with page scroll, sitting behind
 * every section. Sections are opaque, so this mostly reads through the rounded
 * top corners where each stacking panel slides over the previous — tying the
 * white -> cream -> walnut -> black rhythm together as one continuous surface.
 */
export function ScrollBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    mass: 0.4,
  });

  const background = useTransform(
    smooth,
    [0, 0.35, 0.7, 1],
    ["#ffffff", "#f5f2ee", "#a36740", "#000000"],
  );

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background }}
    />
  );
}
