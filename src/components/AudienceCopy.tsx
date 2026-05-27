"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useAudience, type Audience } from "@/lib/audience";

/**
 * Renders one of two variants based on the current audience setting.
 * Fades between variants when toggle changes.
 */
export function AudienceCopy({
  solo,
  team,
  className,
}: {
  solo: ReactNode;
  team: ReactNode;
  className?: string;
}) {
  const audience: Audience = useAudience((s) => s.audience);
  const current = audience === "solo" ? solo : team;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={audience}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {current}
      </motion.div>
    </AnimatePresence>
  );
}
