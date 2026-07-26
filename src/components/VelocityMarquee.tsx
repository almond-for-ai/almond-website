"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

/** Keep a value inside [min,max), wrapping around — for seamless looping. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return (((v - min) % range) + range) % range + min;
}

/**
 * Horizontal marquee whose speed and skew respond to scroll velocity.
 *
 * Replaces the pure-CSS `.marquee-track` animation: scrolling fast pushes the
 * strip along and shears it very slightly, so the row feels physically
 * connected to the page instead of drifting at a constant rate. Direction also
 * follows scroll direction.
 *
 * `children` must be exactly the repeated track content — it is rendered twice
 * so the loop is seamless, and the wrap point is -50%.
 */
export function VelocityMarquee({
  children,
  baseVelocity = -1.4,
  className = "",
}: {
  children: ReactNode;
  /** percent of the track width per second at rest; negative scrolls left */
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // clamp:false lets fast flicks overshoot the mapped range for extra punch
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  // A touch of shear in the direction of travel — reads as speed, not tilt.
  const skew = useTransform(smoothVelocity, [-1500, 0, 1500], [1.6, 0, -1.6], {
    clamp: true,
  });
  const smoothSkew = useSpring(skew, { damping: 40, stiffness: 200 });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;

    moveBy += moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  if (reduce) {
    return (
      <div className={className}>
        <div className="flex w-max">{children}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div className="flex w-max" style={{ x, skewX: smoothSkew }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}
