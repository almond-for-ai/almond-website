"use client";

import { create } from "zustand";

/**
 * Tracks whether the home hero (above-the-fold) is in view.
 * When the user scrolls past the hero, this flips to false and the
 * audience toggle migrates from the hero into the SessionTrail pill.
 *
 * Non-home pages can leave this as `false` so the pill always shows
 * the toggle.
 */
type HeroVisibilityState = {
  heroVisible: boolean;
  setHeroVisible: (v: boolean) => void;
};

export const useHeroVisibility = create<HeroVisibilityState>((set) => ({
  heroVisible: false,
  setHeroVisible: (v) => set({ heroVisible: v }),
}));
