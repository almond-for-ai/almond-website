"use client";

import { motion } from "motion/react";

const PERSONAS = [
  "Solo founder",
  "Engineering team",
  "Design team",
  "Whole company",
];

export function PersonaChips({ className }: { className?: string }) {
  return (
    <ul
      aria-label="Built for"
      className={`flex flex-wrap items-center gap-[8px] ${className ?? ""}`}
    >
      {PERSONAS.map((label, i) => (
        <motion.li
          key={label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.05 * i,
          }}
          className="inline-flex items-center rounded-full border border-black/[0.08] bg-white px-[12px] py-[5px] text-[12px] font-medium tracking-[-0.12px] text-black/55"
        >
          {label}
        </motion.li>
      ))}
    </ul>
  );
}
