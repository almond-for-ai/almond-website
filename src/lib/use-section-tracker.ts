"use client";

import { useEffect } from "react";
import { useSessionTrail } from "@/lib/session-trail";

/**
 * Tracks the currently dominant [data-section] element via IntersectionObserver
 * and reports it to the SessionTrail store. Also records the page visit on mount.
 */
export function useSectionTracker(page: string) {
  const recordPageVisit = useSessionTrail((s) => s.recordPageVisit);
  const recordSectionVisit = useSessionTrail((s) => s.recordSectionVisit);

  useEffect(() => {
    recordPageVisit(page);
  }, [page, recordPageVisit]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name) continue;
          ratios.set(name, entry.intersectionRatio);
        }
        // Pick dominant
        let bestName: string | undefined;
        let bestRatio = -1;
        ratios.forEach((r, n) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestName = n;
          }
        });
        if (bestName !== undefined && bestRatio > 0) {
          recordSectionVisit(page, bestName);
        }
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75, 0.95] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page, recordSectionVisit]);
}
