"use client";

import { motion } from "motion/react";
import { useAudience, type Audience } from "@/lib/audience";

const OPTIONS: { value: Audience; label: string }[] = [
  { value: "solo", label: "Solo" },
  { value: "team", label: "Team" },
];

export function AudienceToggle({ className }: { className?: string }) {
  const audience = useAudience((s) => s.audience);
  const setAudience = useAudience((s) => s.setAudience);

  return (
    <div
      role="radiogroup"
      aria-label="I'm building"
      className={`relative inline-grid h-[36px] grid-cols-2 items-center rounded-full border border-black/[0.08] bg-white/80 p-[3px] backdrop-blur ${className ?? ""}`}
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === audience;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setAudience(opt.value)}
            className="relative isolate inline-flex h-[30px] items-center justify-center rounded-full px-[18px] text-[13px] font-medium leading-none tracking-[-0.005em]"
          >
            {active ? (
              <motion.span
                layoutId="audience-active"
                className="absolute inset-0 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            ) : null}
            <span
              className={`relative z-10 transition-colors ${active ? "text-white" : "text-black/55"}`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
