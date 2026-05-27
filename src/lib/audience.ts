"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Audience = "solo" | "team";

type AudienceState = {
  audience: Audience;
  setAudience: (a: Audience) => void;
};

export const useAudience = create<AudienceState>()(
  persist(
    (set) => ({
      audience: "solo",
      setAudience: (a) => set({ audience: a }),
    }),
    {
      name: "almond-audience-v1",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
