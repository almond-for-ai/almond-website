"use client";

import dynamic from "next/dynamic";
import { Suspense, type CSSProperties } from "react";
import type { MemoryGraphProps } from "./MemoryGraph";

/**
 * Lazy-load 3D illustrations with ssr:false so the three.js bundle
 * is split out of the initial server response. Keeps Cloudflare /
 * OpenNext server bundles thin.
 */

type IllustrationName = "MemoryGraph";

type LazyProps = MemoryGraphProps & {
  name: IllustrationName;
  fallbackStyle?: CSSProperties;
};

const COMPONENTS: Record<
  IllustrationName,
  ReturnType<typeof dynamic<MemoryGraphProps>>
> = {
  MemoryGraph: dynamic(
    () => import("./MemoryGraph").then((m) => ({ default: m.MemoryGraph })),
    {
      ssr: false,
      loading: () => (
        <div
          aria-hidden
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      ),
    },
  ),
};

export function Lazy3D({ name, fallbackStyle, ...rest }: LazyProps) {
  const C = COMPONENTS[name];
  if (!C) return null;
  return (
    <Suspense
      fallback={
        <div
          aria-hidden
          style={{ width: "100%", height: "100%", ...fallbackStyle }}
        />
      }
    >
      <C {...rest} />
    </Suspense>
  );
}
