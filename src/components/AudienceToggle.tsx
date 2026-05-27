"use client";

import { motion } from "motion/react";
import { useAudience, type Audience } from "@/lib/audience";

const OPTIONS: { value: Audience; label: string }[] = [
  { value: "solo", label: "Solo" },
  { value: "team", label: "Team" },
];

type Variant = "light" | "dark";
type Size = "md" | "sm";

const SHELL: Record<Variant, string> = {
  light:
    "rounded-full border border-black/[0.08] bg-white/80 backdrop-blur",
  dark: "rounded-full bg-white/[0.06]",
};

const ACTIVE_BG: Record<Variant, string> = {
  light: "absolute inset-0 rounded-full bg-black",
  dark: "absolute inset-0 rounded-full bg-white",
};

const TEXT_ACTIVE: Record<Variant, string> = {
  light: "text-white",
  dark: "text-black",
};

const TEXT_IDLE: Record<Variant, string> = {
  light: "text-black/55",
  dark: "text-white/55",
};

const SIZE_HEIGHT: Record<Size, string> = {
  md: "h-[36px] p-[3px]",
  sm: "h-[26px] p-[2px]",
};

const SIZE_PILL_PADX: Record<Size, string> = {
  md: "px-[18px] text-[13px]",
  sm: "px-[12px] text-[11px]",
};

const SIZE_INNER_H: Record<Size, string> = {
  md: "h-[28px]",
  sm: "h-[20px]",
};

export function AudienceToggle({
  className,
  variant = "light",
  size,
}: {
  className?: string;
  variant?: Variant;
  size?: Size;
}) {
  const audience = useAudience((s) => s.audience);
  const setAudience = useAudience((s) => s.setAudience);

  // Dark variant defaults to sm; light defaults to md.
  const resolvedSize: Size = size ?? (variant === "dark" ? "sm" : "md");
  const layoutId =
    variant === "dark" ? "audience-active-dark" : "audience-active-light";

  return (
    <div
      role="radiogroup"
      aria-label="I'm building"
      className={`relative inline-grid grid-cols-2 items-center ${SHELL[variant]} ${SIZE_HEIGHT[resolvedSize]} ${className ?? ""}`}
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
            className={`relative isolate inline-flex items-center justify-center rounded-full font-medium leading-none tracking-[-0.005em] ${SIZE_PILL_PADX[resolvedSize]} ${SIZE_INNER_H[resolvedSize]}`}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                className={ACTIVE_BG[variant]}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            ) : null}
            <span
              className={`relative z-10 transition-colors ${active ? TEXT_ACTIVE[variant] : TEXT_IDLE[variant]}`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
