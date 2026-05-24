"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { AlmondMark } from "@/components/AlmondMark";

type Active = "game" | "blog";

const ITEMS: { key: Active; label: string; href: string }[] = [
  { key: "game", label: "Game", href: "/#game" },
  { key: "blog", label: "Blog", href: "/blog" },
];

import type { View } from "@/lib/view";

type Mode = "roasted" | "raw";
type RawFormat = "json" | "yaml";

export function SiteNavClient({ active }: { active?: Active }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const current: View = (sp.get("view") as View) || "roasted";
  const mode: Mode = current === "roasted" ? "roasted" : "raw";
  const rawFormat: RawFormat = current === "yaml" ? "yaml" : "json";

  function viewHref(view: View) {
    const params = new URLSearchParams(sp.toString());
    if (view === "roasted") params.delete("view");
    else params.set("view", view);
    const qs = params.toString();
    return `${pathname}${qs ? "?" + qs : ""}`;
  }

  function modeHref(target: Mode) {
    // Switching to raw defaults to current raw format (or json)
    return viewHref(target === "roasted" ? "roasted" : rawFormat);
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 md:top-6">
      <div className="container-x">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex w-full items-center justify-between rounded-full border border-black/[0.08] bg-white/80 px-3 py-2.5 backdrop-blur-xl"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
        {/* Left: logo */}
        <Link
          href="/"
          aria-label="Almond AI home"
          className="flex items-center pl-2"
        >
          <AlmondMark size={20} glyphSize={24} />
        </Link>

        {/* Right cluster: items + toggle */}
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="flex items-center gap-0.5">
            {ITEMS.map((it) => {
              const isActive = it.key === active;
              return (
                <Link
                  key={it.key}
                  href={it.href}
                  className={
                    isActive
                      ? "rounded-full bg-black px-4 py-2 text-[13px] font-medium leading-[18px] tracking-[-0.005em] text-white"
                      : "rounded-full px-4 py-2 text-[13px] font-medium leading-[18px] tracking-[-0.005em] text-black/55 transition-colors hover:text-black"
                  }
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-6 w-px bg-black/10" aria-hidden />

          {/* Roasted / Raw primary toggle */}
          <div
            className="relative flex items-center rounded-full bg-black/[0.04] p-0.5"
            role="group"
            aria-label="View mode"
          >
            {(["roasted", "raw"] as const).map((m) => {
              const isOn = mode === m;
              return (
                <Link
                  key={m}
                  href={modeHref(m)}
                  scroll={false}
                  title={
                    m === "roasted"
                      ? "Roasted view (styled site)"
                      : "Raw view (data)"
                  }
                  className="relative isolate inline-flex items-center"
                >
                  {isOn ? (
                    <motion.span
                      layoutId="nav-mode-active"
                      className="absolute inset-0 rounded-full bg-white"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
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
                      "relative z-10 rounded-full px-3 py-1.5 text-[11px] font-medium leading-[14px] tracking-[-0.005em] transition-colors " +
                      (isOn ? "text-black" : "text-black/50 hover:text-black")
                    }
                  >
                    {m === "roasted" ? "Roasted" : "Raw"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        </motion.header>
      </div>
    </div>
  );
}

