"use client";

import {
  useScroll,
  useSpring,
  type MotionValue,
  type UseScrollOptions,
} from "motion/react";
import type { RefObject } from "react";

/** Smooth cubic ease, matched forward and backward. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Spring feel lifted from the full-website ConnectionConstellation rig:
// identical response forward and back, no visible settle wobble.
const SCRUB_SPRING = {
  stiffness: 70,
  damping: 26,
  mass: 0.5,
  restDelta: 0.0005,
};

/**
 * Spring-smoothed scroll progress (0..1) for a target element.
 * Returns the raw and smoothed MotionValues; compose with useTransform.
 */
export function useScrollScrub(
  target: RefObject<HTMLElement | null>,
  offset: UseScrollOptions["offset"] = ["start start", "end end"],
): { progress: MotionValue<number>; smooth: MotionValue<number> } {
  const { scrollYProgress } = useScroll({ target, offset });
  const smooth = useSpring(scrollYProgress, SCRUB_SPRING);
  return { progress: scrollYProgress, smooth };
}
