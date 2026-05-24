"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Suspense } from "react";

function RawFormatToggleInner({ current }: { current: "json" | "yaml" }) {
  const pathname = usePathname();
  const sp = useSearchParams();

  function href(fmt: "json" | "yaml") {
    const params = new URLSearchParams(sp.toString());
    params.set("view", fmt);
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div
      className="relative inline-flex items-center rounded-full bg-walnut-500/10 p-0.5"
      role="group"
      aria-label="Raw format"
    >
      {(["json", "yaml"] as const).map((fmt) => {
        const isOn = fmt === current;
        return (
          <Link
            key={fmt}
            href={href(fmt)}
            scroll={false}
            className="relative isolate inline-flex items-center"
          >
            {isOn ? (
              <motion.span
                layoutId="raw-format-active"
                className="absolute inset-0 rounded-full bg-walnut-500"
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 36,
                  mass: 0.6,
                }}
              />
            ) : null}
            <span
              className={
                "relative z-10 rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors " +
                (isOn
                  ? "text-white"
                  : "text-walnut-500/70 hover:text-walnut-500")
              }
            >
              {fmt}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function RawFormatToggle({ current }: { current: "json" | "yaml" }) {
  return (
    <Suspense
      fallback={
        <div className="inline-flex h-7 w-[88px] items-center rounded-full bg-walnut-500/10" />
      }
    >
      <RawFormatToggleInner current={current} />
    </Suspense>
  );
}
