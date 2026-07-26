"use client";

import { motion, useReducedMotion } from "motion/react";
import { MOTION_EASE } from "@/lib/motion-tokens";

/**
 * Per-word reveal for display headlines: each word rises and fades in behind a
 * clipping mask, staggered left to right. Reads as typesetting settling into
 * place rather than a generic fade.
 *
 * The full string stays in the DOM as real text — words are plain spans, so
 * selection, search and screen readers are unaffected.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  as: Tag = "p",
  once = true,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
  once?: boolean;
  /** trigger when scrolled into view instead of on mount */
  inView?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");
  const MotionTag = motion[Tag];
  const trigger = inView
    ? ({ whileInView: "show", viewport: { once, margin: "-12% 0px" } } as const)
    : ({ animate: "show" } as const);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        // The space sits outside the mask so words never jam together.
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "108%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 0.72,
                    ease: [...MOTION_EASE.reveal],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}
