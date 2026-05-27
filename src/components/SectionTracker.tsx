"use client";

import { useSectionTracker } from "@/lib/use-section-tracker";

/**
 * Tiny client wrapper. Drop near the top of each page tree:
 *   <SectionTracker page="home" />
 */
export function SectionTracker({ page }: { page: string }) {
  useSectionTracker(page);
  return null;
}
