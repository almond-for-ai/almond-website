"use client";

import {
  forwardRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useRef,
} from "react";

/**
 * Shared base for every value card.
 *
 * Hover: border brightens subtly. No lift, no bounce.
 * Spotlight: faint cursor-follow on desktop only, low opacity.
 */

export type CardTone = "light" | "dark" | "accent" | "cream";

const TONE: Record<CardTone, string> = {
  light: "bg-white text-black border-black/[0.08]",
  dark: "bg-black text-white border-white/[0.10]",
  accent: "bg-walnut-500 text-white border-walnut-600/40",
  cream: "bg-[#fbf6ef] text-black border-walnut-500/[0.18]",
};

const HOVER_BORDER: Record<CardTone, string> = {
  light: "hover:border-black/[0.14]",
  dark: "hover:border-white/[0.16]",
  accent: "hover:border-walnut-400/55",
  cream: "hover:border-walnut-500/30",
};

const SPOTLIGHT_BY_TONE: Record<CardTone, string> = {
  light:
    "[background:radial-gradient(280px_200px_at_var(--mx,50%)_var(--my,50%),rgba(123,64,25,0.06),transparent_65%)]",
  dark: "[background:radial-gradient(280px_200px_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.05),transparent_65%)]",
  accent:
    "[background:radial-gradient(280px_200px_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.08),transparent_65%)]",
  cream:
    "[background:radial-gradient(280px_200px_at_var(--mx,50%)_var(--my,50%),rgba(123,64,25,0.07),transparent_65%)]",
};

export type CardFrameProps = {
  tone?: CardTone;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
  role?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export const CardFrame = forwardRef<HTMLDivElement, CardFrameProps>(
  function CardFrame(
    {
      tone = "light",
      className = "",
      style,
      fill = true,
      role,
      ariaLabel,
      children,
    },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement | null>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
      const el = innerRef.current;
      if (!el || e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    }, []);

    const onPointerLeave = useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    }, []);

    return (
      <div
        ref={setRef}
        role={role}
        aria-label={ariaLabel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={style}
        className={[
          "group/card relative overflow-hidden rounded-[24px] border",
          fill ? "h-full" : "",
          TONE[tone],
          HOVER_BORDER[tone],
          "transition-[border-color,box-shadow] duration-500 ease-out",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-walnut-300/50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100 motion-reduce:opacity-0",
            SPOTLIGHT_BY_TONE[tone],
          ].join(" ")}
        />
        <div className="relative">{children}</div>
      </div>
    );
  },
);
