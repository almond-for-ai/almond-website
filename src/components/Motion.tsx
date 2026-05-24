"use client";

import { motion, type Transition, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ============================================================
   Reveal — single element fade + slide up when in viewport
   ============================================================ */

export function Reveal({
  children,
  delay = 0,
  y = 20,
  duration = 0.7,
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
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   Mount — fade + slide up on mount (no scroll trigger)
   ============================================================ */

export function Mount({
  children,
  delay = 0,
  y = 16,
  duration = 0.7,
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
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   Stagger — parent that staggers its motion children
   Pair with StaggerItem inside.
   ============================================================ */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE } as Transition,
  },
};

export function Stagger({
  children,
  className,
  as = "div",
  amount = 0.2,
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
                  staggerChildren: 0.08,
                  delayChildren: delay,
                },
              },
            }
          : containerVariants
      }
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "-60px" }}
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
