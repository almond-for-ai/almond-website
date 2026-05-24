"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { AlmondMark } from "@/components/AlmondMark";
import type { View } from "@/lib/view";

type Active = "game" | "blog";
type Mode = "roasted" | "raw";
type RawFormat = "json" | "yaml";

const NAV_ITEMS: { key: Active; label: string; href: string }[] = [
  { key: "game", label: "Game", href: "/#game" },
  { key: "blog", label: "Blog", href: "/blog" },
];

export function SiteNavClient({ active }: { active?: Active }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLElement>(null);

  const current: View = (sp.get("view") as View) || "roasted";
  const mode: Mode = current === "roasted" ? "roasted" : "raw";
  const rawFormat: RawFormat = current === "yaml" ? "yaml" : "json";

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, sp]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  function viewHref(view: View) {
    const params = new URLSearchParams(sp.toString());
    if (view === "roasted") params.delete("view");
    else params.set("view", view);
    const qs = params.toString();
    return `${pathname}${qs ? "?" + qs : ""}`;
  }

  function modeHref(target: Mode) {
    return viewHref(target === "roasted" ? "roasted" : rawFormat);
  }

  // Status label for mobile breadcrumb pill
  const pageLabel = active === "blog" ? "Blog" : "Game";
  const viewLabel =
    current === "roasted" ? "Roasted" : current === "yaml" ? "YAML" : "JSON";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 md:top-6">
      <div className="container-x">
        <motion.header
          ref={wrapperRef}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto relative flex w-full items-center justify-between rounded-full border border-black/[0.08] bg-white/80 px-3 py-2.5 backdrop-blur-xl"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)" }}
        >
          {/* ─── Logo ─────────────────────────────────────── */}
          <Link href="/" aria-label="Almond AI home" className="flex shrink-0 items-center pl-1">
            <AlmondMark size={20} glyphSize={24} />
          </Link>

          {/* ─── Desktop nav (≥ md) ───────────────────────── */}
          <div className="hidden items-center gap-2 md:flex">
            <nav aria-label="Primary" className="flex items-center gap-0.5">
              {NAV_ITEMS.map((it) => {
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

            <div className="h-5 w-px bg-black/10" aria-hidden />

            {/* Roasted / Raw segmented control */}
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
                    className="relative isolate inline-flex items-center"
                  >
                    {isOn && (
                      <motion.span
                        layoutId="nav-mode-pill"
                        className="absolute inset-0 rounded-full bg-white"
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
                      />
                    )}
                    <span
                      className={
                        "relative z-10 rounded-full px-3 py-1.5 text-[11px] font-medium leading-[14px] tracking-[-0.005em] transition-colors " +
                        (isOn ? "text-black" : "text-black/45 hover:text-black")
                      }
                    >
                      {m === "roasted" ? "Roasted" : "Raw"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── Mobile right cluster (< md) ─────────────── */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            {/* Breadcrumb status — shows current page & view */}
            <span className="rounded-full bg-black/[0.04] px-2.5 py-[5px] text-[11px] font-medium leading-none tracking-[-0.005em] text-black/55">
              {pageLabel} · {viewLabel}
            </span>

            {/* Menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-controls="mobile-nav-menu"
              className="inline-flex h-[30px] items-center gap-1 rounded-full border border-black/[0.1] bg-white px-3 text-[12px] font-medium leading-none tracking-[-0.005em] text-black transition-colors hover:bg-black/[0.03]"
            >
              Menu
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
                className="transition-transform duration-200"
                style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path
                  d="M2 4L5 7L8 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* ─── Mobile dropdown menu ─────────────────────── */}
          {menuOpen && (
            <div
              id="mobile-nav-menu"
              role="dialog"
              aria-label="Navigation"
              className="absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden"
            >
              {/* Page links */}
              <p className="mb-2.5 px-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/35">
                Navigate
              </p>
              <nav aria-label="Mobile primary" className="flex gap-2">
                {NAV_ITEMS.map((it) => {
                  const isActive = it.key === active;
                  return (
                    <Link
                      key={it.key}
                      href={it.href}
                      className={`flex-1 rounded-[10px] py-2.5 text-center text-[13px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-black/[0.04] text-black/65 hover:bg-black/[0.08] hover:text-black"
                      }`}
                    >
                      {it.label}
                    </Link>
                  );
                })}
              </nav>

              {/* View mode */}
              <p className="mb-2.5 mt-4 px-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/35">
                View
              </p>
              <div className="flex gap-2">
                {(["roasted", "raw"] as const).map((m) => {
                  const isOn = mode === m;
                  return (
                    <Link
                      key={m}
                      href={modeHref(m)}
                      scroll={false}
                      className={`flex-1 rounded-[10px] py-2.5 text-center text-[13px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                        isOn
                          ? "bg-black text-white"
                          : "bg-black/[0.04] text-black/65 hover:bg-black/[0.08] hover:text-black"
                      }`}
                    >
                      {m === "roasted" ? "Roasted" : "Raw"}
                    </Link>
                  );
                })}
              </div>

              {/* Raw format: JSON / YAML — only when Raw is active */}
              {mode === "raw" && (
                <div className="mt-2 flex gap-2">
                  {(["json", "yaml"] as const).map((fmt) => {
                    const isOn = current === fmt;
                    return (
                      <Link
                        key={fmt}
                        href={viewHref(fmt)}
                        scroll={false}
                        className={`flex-1 rounded-[10px] py-2 text-center text-[12px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                          isOn
                            ? "bg-walnut-500 text-white"
                            : "bg-walnut-50 text-walnut-600 hover:bg-walnut-100"
                        }`}
                      >
                        {fmt.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </motion.header>
      </div>
    </div>
  );
}
