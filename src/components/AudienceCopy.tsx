"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useAudience, type Audience } from "@/lib/audience";

/**
 * Renders one of two variants based on the current audience setting.
 * Fades between variants when toggle changes.
 */
type AudienceCopyAs = "div" | "p" | "h1" | "h2" | "h3" | "span";

export function AudienceCopy({
  solo,
  team,
  className,
  as = "div",
}: {
  solo: ReactNode;
  team: ReactNode;
  className?: string;
  /** Semantic wrapper - avoids invalid nesting (e.g. div inside p). */
  as?: AudienceCopyAs;
}) {
  const audience: Audience = useAudience((s) => s.audience);
  const current = audience === "solo" ? solo : team;
  const MotionTag = motion[as];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionTag
        key={audience}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {current}
      </MotionTag>
    </AnimatePresence>
  );
}
