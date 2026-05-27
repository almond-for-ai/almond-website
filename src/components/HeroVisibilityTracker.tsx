"use client";

import { useEffect, useRef } from "react";
import { useHeroVisibility } from "@/lib/hero-visibility";

/**
 * Tracks an element (default: looks up `[data-hero-tracker]`) and reports
 * whether it is sufficiently in view. Drives audience-toggle migration.
 *
 * Mount once on the home page near the hero. Treats hero "visible" while
 * any portion is on screen; "out" once it scrolls off the top.
 */
export function HeroVisibilityTracker({
  selector = "[data-hero-tracker]",
}: {
  selector?: string;
}) {
  const setHeroVisible = useHeroVisibility((s) => s.setHeroVisible);
  const last = useRef<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;

    // Initial: assume visible (above the fold on first paint).
    setHeroVisible(true);
    last.current = true;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.05;
        if (last.current === visible) return;
        last.current = visible;
        setHeroVisible(visible);
      },
      { threshold: [0, 0.05, 0.2, 0.5] },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      // Leave heroVisible alone on unmount so non-home pages keep it false.
    };
  }, [selector, setHeroVisible]);

  // Reset to false when this tracker unmounts (route change off home).
  useEffect(() => {
    return () => setHeroVisible(false);
  }, [setHeroVisible]);

  return null;
}
