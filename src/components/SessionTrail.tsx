"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSessionTrail, type Visit } from "@/lib/session-trail";
import { useHeroVisibility } from "@/lib/hero-visibility";
import { AudienceToggle } from "@/components/AudienceToggle";

function pageLabel(page: string): string {
  if (!page || page === "/") return "Home";
  const seg = page.replace(/^\/+/, "").split("/")[0] ?? "";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

function pageHref(page: string): string {
  if (!page) return "/";
  return page.startsWith("/") ? page : `/${page}`;
}

function timeAgo(ms: number): string {
  const sec = Math.max(0, Math.floor((Date.now() - ms) / 1000));
  if (sec < 5) return "now";
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const d = Math.floor(hr / 24);
  return `${d}d`;
}

const SPRING = { type: "spring" as const, stiffness: 320, damping: 30 };
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function SessionTrail() {
  const pathname = usePathname();
  const visits = useSessionTrail((s) => s.visits);
  const currentPage = useSessionTrail((s) => s.currentPage);
  const currentSection = useSessionTrail((s) => s.currentSection);

  const heroVisible = useHeroVisibility((s) => s.heroVisible);
  const isHome = pathname === "/";

  // Audience toggle migrates into pill when hero is out of view (home) or always on non-home.
  const showAudienceInPill = !isHome || !heroVisible;

  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    function onScroll() {
      if (window.scrollY > 200) setShown(true);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // Close panel on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Close panel on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Reverse-chrono visits for the log
  const reverseVisits = useMemo(() => {
    return [...visits].reverse();
  }, [visits]);

  // Distinct recent-page chips (excludes current, capped 5)
  const recentPages = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (let i = visits.length - 1; i >= 0 && out.length < 5; i--) {
      const p = visits[i].page;
      if (!p || p === currentPage) continue;
      if (seen.has(p)) continue;
      seen.add(p);
      out.push(p);
    }
    return out;
  }, [visits, currentPage]);

  if (!mounted) return null;
  if (isHome && !shown) return null;
  if (!isHome && !shown) {
    // On non-home pages, still want it visible. Force shown after mount.
    // Use a tiny effect-free flip: render immediately.
    // (We intentionally rely on the scroll listener to set shown for home,
    //  and short-circuit it here for non-home.)
  }

  const visible = isHome ? shown : true;
  if (!visible) return null;

  const breadcrumb = currentSection
    ? `${pageLabel(currentPage)} · ${currentSection}`
    : pageLabel(currentPage);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center md:bottom-6">
      <div ref={wrapperRef} className="pointer-events-auto relative">
        {/* ── Log panel (above pill) ────────────────────────────── */}
        <AnimatePresence>
          {open ? (
            <motion.div
              key="trail-panel"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="absolute bottom-[calc(100%+10px)] left-1/2 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/92 p-2 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                  Session trail · {reverseVisits.length}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close log"
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path
                      d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <ul className="max-h-[40vh] overflow-y-auto">
                {reverseVisits.length === 0 ? (
                  <li className="px-2 py-3 text-[12px] text-white/45">
                    No history yet. Scroll a little.
                  </li>
                ) : (
                  reverseVisits.map((v: Visit, i: number) => (
                    <li key={`${v.page}-${v.section ?? "_"}-${v.t}-${i}`}>
                      <Link
                        href={pageHref(v.page)}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.06]"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className="inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-walnut-300"
                            aria-hidden
                          />
                          <span className="truncate text-[13px] text-white/90">
                            {pageLabel(v.page)}
                            {v.section ? (
                              <span className="text-white/45"> · {v.section}</span>
                            ) : null}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                          {timeAgo(v.t)}
                        </span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* ── Pill ──────────────────────────────────────────────── */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={SPRING}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/85 px-1.5 py-1.5 text-white backdrop-blur-xl"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
        >
          {/* breadcrumb (click-to-open) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Show session trail"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-[6px] font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 transition-colors hover:bg-white/[0.1]"
          >
            <span
              className="inline-block h-[6px] w-[6px] rounded-full bg-walnut-300"
              aria-hidden
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={breadcrumb}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.22 }}
                className="block"
              >
                {breadcrumb}
              </motion.span>
            </AnimatePresence>
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.22 }}
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              aria-hidden
              className="text-white/50"
            >
              <path
                d="M2 5L4 3L6 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>

          {/* recent-page dots */}
          {recentPages.length > 0 ? (
            <div className="hidden items-center gap-1 pl-0.5 sm:flex">
              <AnimatePresence>
                {recentPages.map((p) => (
                  <motion.span
                    key={p}
                    layout
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={pageHref(p)}
                      title={pageLabel(p)}
                      aria-label={`Go to ${pageLabel(p)}`}
                      className="group inline-flex h-[18px] w-[18px] items-center justify-center"
                    >
                      <span className="block h-[6px] w-[6px] rounded-full bg-white/45 transition-all group-hover:h-[8px] group-hover:w-[8px] group-hover:bg-white" />
                    </Link>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          ) : null}

          {/* Audience toggle - slides in when hero leaves viewport (home) or always (non-home) */}
          <AnimatePresence initial={false}>
            {showAudienceInPill ? (
              <motion.div
                key="pill-audience"
                initial={{ opacity: 0, scale: 0.85, width: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  width: "auto",
                  transition: {
                    width: { duration: 0.45, ease: EASE },
                    opacity: { duration: 0.35, delay: 0.15, ease: EASE },
                    scale: { duration: 0.45, ease: EASE, delay: 0.1 },
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  width: 0,
                  transition: {
                    width: { duration: 0.35, ease: EASE, delay: 0.1 },
                    opacity: { duration: 0.2, ease: EASE },
                    scale: { duration: 0.3, ease: EASE },
                  },
                }}
                className="flex items-center overflow-hidden"
              >
                <span className="mx-1 h-4 w-px shrink-0 bg-white/15" />
                <AudienceToggle variant="dark" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
