import { Suspense } from "react";
import { SiteNavClient } from "@/components/SiteNavClient";

export function SiteNav() {
  return (
    <Suspense fallback={null}>
      <SiteNavClient />
    </Suspense>
  );
}

export { getViewFromSearchParams } from "@/lib/view";
