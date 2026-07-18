"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { HuskOrbit } from "@/components/HuskOrbit";

/**
 * Apple-product-page-style pinned scene. The wrapper reserves ~2.3 viewports
 * of scroll; the inner frame pins fullscreen while scroll scrubs the orbit
 * assembly — hub pops first, rings draw in outward with a slow rotation into
 * place, then the caption lands. Background crossfades white -> cream -> white
 * so both boundaries hand off seamlessly to normally-scrolling sections.
 *
 * Press-and-hold on the almond stays live the whole time it's pinned.
 * Reduced motion: no pin, no scrub — the previous static capsule layout.
 */
export function OrbitScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const backgroundColor = useTransform(
    smooth,
    [0, 0.18, 0.82, 1],
    ["#ffffff", "#f5f2ee", "#f5f2ee", "#ffffff"],
  );
  const halftoneOpacity = useTransform(smooth, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const orbitScale = useTransform(smooth, [0, 1], [0.95, 1.02]);
  const captionOpacity = useTransform(smooth, [0.62, 0.78], [0, 1]);
  const captionY = useTransform(smooth, [0.62, 0.78], [14, 0]);

  if (reduce) {
    return (
      <section className="w-full pb-[80px] pt-[24px]">
        <div className="container-x">
          <div className="capsule-50 relative bg-[#f5f2ee] px-[24px] pb-[48px] pt-[56px] md:px-[64px]">
            <div className="halftone-bg absolute inset-0" aria-hidden />
            <div className="relative mx-auto max-w-[520px]">
              <HuskOrbit />
            </div>
            <p className="relative mt-[20px] text-center text-[13px] tracking-[0.02em] text-black/40">
              Press and hold the almond. That&rsquo;s all we can show you for
              now.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[230vh] w-full">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-svh w-full flex-col items-center justify-center overflow-clip"
      >
        <motion.div
          aria-hidden
          className="halftone-bg absolute inset-0"
          style={{ opacity: halftoneOpacity }}
        />
        <motion.div
          style={{ scale: orbitScale }}
          className="relative w-full max-w-[min(440px,74svh)] px-[24px] md:max-w-[min(500px,76svh)]"
        >
          <HuskOrbit assemble={smooth} />
        </motion.div>
        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="relative mt-[8px] px-[24px] text-center text-[13px] tracking-[0.02em] text-black/40"
        >
          Press and hold the almond. That&rsquo;s all we can show you for now.
        </motion.p>
      </motion.div>
    </section>
  );
}
