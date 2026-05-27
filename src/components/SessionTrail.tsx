"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSessionTrail } from "@/lib/session-trail";

function pageLabel(page: string): string {
  if (!page || page === "/") return "Home";
  const seg = page.replace(/^\/+/, "").split("/")[0] ?? "";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

function pageHref(page: string): string {
  if (!page) return "/";
  return page.startsWith("/") ? page : `/${page}`;
}

export function SessionTrail() {
  const visits = useSessionTrail((s) => s.visits);
  const currentPage = useSessionTrail((s) => s.currentPage);
  const currentSection = useSessionTrail((s) => s.currentSection);
  const dismissed = useSessionTrail((s) => s.dismissed);
  const dismiss = useSessionTrail((s) => s.dismiss);

  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => setMounted(true), []);

  // Only reveal after the user scrolls a bit. Keeps the hero clean on first load.
  useEffect(() => {
    if (!mounted) return;
    function onScroll() {
      if (window.scrollY > 200) setShown(true);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // Build de-duped recent-pages list (most recent first, excluding current)
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
  if (dismissed) return null;
  if (!shown) return null;

  const breadcrumb = currentSection
    ? `${pageLabel(currentPage)} · ${currentSection}`
    : pageLabel(currentPage);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center md:bottom-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/85 px-2 py-1.5 text-white backdrop-blur-xl"
        style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
      >
        {/* breadcrumb */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-[5px] font-mono text-[11px] uppercase tracking-[0.16em] text-white/85">
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
        </span>

        {/* recent-page dots */}
        {recentPages.length > 0 ? (
          <div className="hidden items-center gap-1 pl-1 sm:flex">
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
                    aria-label={`Go back to ${pageLabel(p)}`}
                    className="group relative inline-flex h-[18px] w-[18px] items-center justify-center"
                  >
                    <span className="block h-[6px] w-[6px] rounded-full bg-white/45 transition-all group-hover:h-[8px] group-hover:w-[8px] group-hover:bg-white" />
                  </Link>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        ) : null}

        {/* dismiss */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss session trail"
          className="ml-0.5 inline-flex h-[24px] w-[24px] items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
          >
            <path
              d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
