"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Visit = {
  page: string;
  section?: string;
  t: number;
};

type TrailState = {
  visits: Visit[];
  currentPage: string;
  currentSection?: string;
  dismissed: boolean;
  recordPageVisit: (page: string) => void;
  recordSectionVisit: (page: string, section?: string) => void;
  dismiss: () => void;
  resetDismiss: () => void;
  clear: () => void;
};

const MAX_VISITS = 12;

export const useSessionTrail = create<TrailState>()(
  persist(
    (set, get) => ({
      visits: [],
      currentPage: "",
      currentSection: undefined,
      dismissed: false,

      recordPageVisit: (page) => {
        const now = Date.now();
        const last = get().visits[get().visits.length - 1];
        if (last && last.page === page) {
          set({ currentPage: page });
          return;
        }
        const next = [...get().visits, { page, t: now }].slice(-MAX_VISITS);
        set({ visits: next, currentPage: page, currentSection: undefined });
      },

      recordSectionVisit: (page, section) => {
        if (!section) {
          set({ currentSection: undefined });
          return;
        }
        if (get().currentSection === section) return;
        const now = Date.now();
        const v = [...get().visits, { page, section, t: now }].slice(
          -MAX_VISITS,
        );
        set({ visits: v, currentSection: section, currentPage: page });
      },

      dismiss: () => set({ dismissed: true }),
      resetDismiss: () => set({ dismissed: false }),
      clear: () =>
        set({ visits: [], currentSection: undefined, dismissed: false }),
    }),
    {
      name: "almond-trail-v1",
      storage: createJSONStorage(() => localStorage),
      // dismissed should reset on full reload. Only persist visits.
      partialize: (state) => ({ visits: state.visits }),
    },
  ),
);
