"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";
import {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
} from "@/lib/motion-tokens";

const EASE = MOTION_EASE.reveal;

/* ============================================================
   Reveal: single element fade + slide up when in viewport
   ============================================================ */

export function Reveal({
  children,
  delay = 0,
  y = 16,
  duration = MOTION_DURATION.enter,
  className,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "header" | "li" | "span";
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: MOTION_VIEWPORT.margin }}
      transition={{ duration: reduce ? 0 : duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   Mount: fade + slide up on mount (no scroll trigger)
   ============================================================ */

export function Mount({
  children,
  delay = 0,
  y = 12,
  duration = MOTION_DURATION.mount,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "header" | "li" | "span" | "h1" | "h2" | "p" | "a";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   Stagger: parent that staggers its motion children
   ============================================================ */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: MOTION_STAGGER,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.enter, ease: EASE } as Transition,
  },
};

export function Stagger({
  children,
  className,
  as = "div",
  amount = 0.15,
  once = true,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
  amount?: number;
  once?: boolean;
  delay?: number;
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      variants={
        delay > 0
          ? {
              ...containerVariants,
              show: {
                transition: {
                  staggerChildren: MOTION_STAGGER,
                  delayChildren: delay,
                },
              },
            }
          : containerVariants
      }
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: MOTION_VIEWPORT.margin }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "h1" | "h2" | "h3" | "p" | "span" | "a";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag variants={itemVariants} className={className}>
      {children}
    </Tag>
  );
}
