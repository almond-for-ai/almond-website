import { Suspense } from "react";
import { SiteNavClient } from "@/components/SiteNavClient";

type Active = "game" | "blog";

export function SiteNav({ active }: { active?: Active }) {
  return (
    <Suspense fallback={null}>
      <SiteNavClient active={active} />
    </Suspense>
  );
}

export { getViewFromSearchParams } from "@/lib/view";
