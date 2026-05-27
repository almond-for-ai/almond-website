"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cycles a list of words at the end of a headline.
 * Uses AnimatePresence for soft swap. Respects reduced motion.
 */
export function RotatingWord({
  words,
  intervalMs = 2400,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // hold on first word
    if (paused) return;
    const t = window.setInterval(
      () => setI((prev) => (prev + 1) % words.length),
      intervalMs,
    );
    return () => window.clearInterval(t);
  }, [words.length, intervalMs, paused]);

  const word = words[i] ?? words[0] ?? "";

  return (
    <span
      className={`relative inline-block align-baseline ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // reserve some min width so the line height doesn't jump
      style={{ minWidth: "1ch" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
