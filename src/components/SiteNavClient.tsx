"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { AlmondMark } from "@/components/AlmondMark";
import type { View } from "@/lib/view";

type Active = "game" | "blog";
type SectionLabel = "Home" | "Game" | "Blog";

const NAV_ITEMS: { key: Active; label: string; href: string }[] = [
  { key: "game", label: "Game", href: "/#game" },
  { key: "blog", label: "Blog", href: "/blog" },
];

export function SiteNavClient({ active }: { active?: Active }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const router = useRouter();
  const wrapperRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionLabel, setSectionLabel] = useState<SectionLabel>("Home");

  const current: View = (sp.get("view") as View) || "roasted";
  const isRaw = current !== "roasted";

  // Build href for each view mode
  function viewHref(view: View) {
    const params = new URLSearchParams(sp.toString());
    if (view === "roasted") params.delete("view");
    else params.set("view", view);
    const qs = params.toString();
    return `${pathname}${qs ? "?" + qs : ""}`;
  }

  // Single click toggles between roasted and raw (json)
  function toggleView() {
    router.push(isRaw ? viewHref("roasted") : viewHref("json"), { scroll: false });
  }

  // Close menu on route / search-param change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, sp]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function onDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menuOpen]);

  // ── Scroll-based section tracking (home page, roasted view only) ──────────
  useEffect(() => {
    if (pathname !== "/" || isRaw) {
      // On the blog page the label is always "Blog"; on raw it doesn't change
      if (active === "blog") setSectionLabel("Blog");
      return;
    }

    const SECTIONS: { id: string; label: SectionLabel }[] = [
      { id: "hero-section", label: "Home" },
      { id: "game", label: "Game" },
      { id: "blog-posts-section", label: "Blog" },
    ];

    // Track how much of each section is visible; pick the dominant one
    const ratios: Record<string, number> = {};

    const observers = SECTIONS.map(({ id, label: _ }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          // Pick the section with the highest visible ratio
          let best: { id: string; ratio: number } = { id: "", ratio: -1 };
          for (const [k, r] of Object.entries(ratios)) {
            if (r > best.ratio) best = { id: k, ratio: r };
          }
          if (best.id === "game") setSectionLabel("Game");
          else if (best.id === "blog-posts-section") setSectionLabel("Blog");
          else setSectionLabel("Home");
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [pathname, isRaw, active]);

  // Label shown in the breadcrumb pill
  const breadcrumbSection: SectionLabel =
    active === "blog" ? "Blog" : sectionLabel;
  const viewLabel = isRaw ? "Raw" : "Roasted";

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
          {/* ─── Logo ───────────────────────────────────────── */}
          <Link href="/" aria-label="Almond AI home" className="flex shrink-0 items-center pl-1">
            <AlmondMark size={20} glyphSize={24} />
          </Link>

          {/* ─── Desktop nav (md+) ──────────────────────────── */}
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

            {/* Roasted / Raw — true toggle switch */}
            <button
              type="button"
              onClick={toggleView}
              role="switch"
              aria-checked={isRaw}
              aria-label={`Switch to ${isRaw ? "Roasted" : "Raw"} view`}
              className="relative flex h-[30px] cursor-pointer items-center rounded-full bg-black/[0.04] p-[3px]"
            >
              {/* Sliding pill — same width as each label half */}
              <motion.span
                className="absolute inset-y-[3px] w-[calc(50%-1.5px)] rounded-full bg-white"
                style={{ left: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
                animate={{ x: isRaw ? "calc(100% + 3px)" : "0px" }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
              <span
                className={`relative z-10 flex-1 select-none px-3 text-center text-[11px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                  !isRaw ? "text-black" : "text-black/40"
                }`}
              >
                Roasted
              </span>
              <span
                className={`relative z-10 flex-1 select-none px-3 text-center text-[11px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                  isRaw ? "text-black" : "text-black/40"
                }`}
              >
                Raw
              </span>
            </button>
          </div>

          {/* ─── Mobile: breadcrumb + Menu (< md) ──────────── */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            {/* Dynamic breadcrumb pill */}
            <motion.span
              key={`${breadcrumbSection}-${viewLabel}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-full bg-black/[0.04] px-2.5 py-[5px] text-[11px] font-medium leading-none tracking-[-0.005em] text-black/55"
            >
              {breadcrumbSection} · {viewLabel}
            </motion.span>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-black/[0.1] bg-white text-black transition-colors hover:bg-black/[0.03]"
            >
              {menuOpen ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          {/* ─── Mobile dropdown ────────────────────────────── */}
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

              {/* View toggle */}
              <p className="mb-2.5 mt-4 px-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/35">
                View
              </p>
              <button
                type="button"
                onClick={toggleView}
                role="switch"
                aria-checked={isRaw}
                aria-label={`Switch to ${isRaw ? "Roasted" : "Raw"} view`}
                className="relative flex h-[44px] w-full cursor-pointer items-center rounded-[10px] bg-black/[0.04] p-1"
              >
                {/* Sliding pill */}
                <motion.span
                  className="absolute inset-y-1 rounded-[8px] bg-white"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
                  animate={
                    isRaw
                      ? { left: "calc(50%)", right: "4px" }
                      : { left: "4px", right: "calc(50%)" }
                  }
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
                <span
                  className={`relative z-10 flex-1 select-none text-center text-[13px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                    !isRaw ? "text-black" : "text-black/40"
                  }`}
                >
                  Roasted
                </span>
                <span
                  className={`relative z-10 flex-1 select-none text-center text-[13px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                    isRaw ? "text-black" : "text-black/40"
                  }`}
                >
                  Raw
                </span>
              </button>
            </div>
          )}
        </motion.header>
      </div>
    </div>
  );
}
