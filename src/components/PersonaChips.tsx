"use client";

import { motion } from "motion/react";
import { useAudience } from "@/lib/audience";

type Persona = {
  label: string;
  emphasis?: "solo" | "team";
};

const PERSONAS: Persona[] = [
  { label: "Solo founder", emphasis: "solo" },
  { label: "Engineering team", emphasis: "team" },
  { label: "Design team", emphasis: "team" },
  { label: "Whole company", emphasis: "team" },
];

export function PersonaChips({ className }: { className?: string }) {
  const audience = useAudience((s) => s.audience);

  return (
    <ul
      aria-label="Built for"
      className={`flex flex-wrap items-center gap-[8px] ${className ?? ""}`}
    >
      {PERSONAS.map((p, i) => {
        const active =
          (audience === "solo" && p.emphasis === "solo") ||
          (audience === "team" && p.emphasis === "team");
        return (
          <motion.li
            key={p.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05 * i,
            }}
            className={
              active
                ? "inline-flex items-center rounded-full border border-walnut-500/30 bg-walnut-tint px-[12px] py-[5px] text-[12px] font-medium tracking-[-0.12px] text-walnut-500 transition-all"
                : "inline-flex items-center rounded-full border border-black/[0.08] bg-white px-[12px] py-[5px] text-[12px] font-medium tracking-[-0.12px] text-black/55 transition-all"
            }
          >
            {p.label}
          </motion.li>
        );
      })}
    </ul>
  );
}
