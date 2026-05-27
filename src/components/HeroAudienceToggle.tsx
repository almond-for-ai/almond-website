"use client";

import { AnimatePresence, motion } from "motion/react";
import { AudienceToggle } from "@/components/AudienceToggle";
import { useHeroVisibility } from "@/lib/hero-visibility";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * AudienceToggle as it appears in the home hero. Animates out cinematically
 * when the hero leaves view (the toggle then re-enters inside the SessionTrail
 * pill via a parallel AnimatePresence).
 */
export function HeroAudienceToggle({ className }: { className?: string }) {
  const heroVisible = useHeroVisibility((s) => s.heroVisible);

  return (
    <AnimatePresence initial={false}>
      {heroVisible ? (
        <motion.div
          key="hero-audience"
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.5, ease: EASE },
          }}
          exit={{
            opacity: 0,
            y: 24,
            scale: 0.9,
            filter: "blur(4px)",
            transition: { duration: 0.45, ease: EASE },
          }}
          className={className}
        >
          <AudienceToggle variant="light" size="md" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
