"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { AlmondMark } from "@/components/AlmondMark";
import { NavBetaCTA } from "@/components/NavBetaCTA";
import { SITE_NAV } from "@/lib/site-data";
import type { View } from "@/lib/view";

type SectionLabel = string;

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function pageLabelFromPath(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/integrations")) return "Integrations";
  if (pathname.startsWith("/product")) return "Product";
  if (pathname.startsWith("/pricing")) return "Pricing";
  if (pathname.startsWith("/manifesto")) return "Manifesto";
  if (pathname.startsWith("/contact")) return "Contact";
  if (pathname.startsWith("/blog")) return "Blog";
  return "Almond";
}

export function SiteNavClient() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const router = useRouter();
  const wrapperRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionLabel, setSectionLabel] = useState<SectionLabel>(() =>
    pageLabelFromPath(pathname),
  );

  const current: View = (sp.get("view") as View) || "roasted";
  const isRaw = current !== "roasted";
  const isHome = pathname === "/";

  function viewHref(view: View) {
    const params = new URLSearchParams(sp.toString());
    if (view === "roasted") params.delete("view");
    else params.set("view", view);
    const qs = params.toString();
    return `${pathname}${qs ? "?" + qs : ""}`;
  }

  function toggleView() {
    router.push(isRaw ? viewHref("roasted") : viewHref("json"), {
      scroll: false,
    });
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, sp]);

  useEffect(() => {
    if (!menuOpen) return;
    function onDown(e: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menuOpen]);

  // Scroll-based section tracking (home page, roasted only)
  useEffect(() => {
    if (!isHome || isRaw) {
      setSectionLabel(pageLabelFromPath(pathname));
      return;
    }

    const SECTIONS: { id: string; label: SectionLabel }[] = [
      { id: "hero-section", label: "Home" },
      { id: "product-section", label: "Product" },
      { id: "differentiator-section", label: "Why" },
      { id: "blog-posts-section", label: "Blog" },
    ];

    const ratios: Record<string, number> = {};

    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          let best: { id: string; ratio: number } = { id: "", ratio: -1 };
          for (const [k, r] of Object.entries(ratios)) {
            if (r > best.ratio) best = { id: k, ratio: r };
          }
          const match = SECTIONS.find((s) => s.id === best.id);
          if (match) setSectionLabel(match.label);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [pathname, isRaw, isHome]);

  const breadcrumbSection = sectionLabel;
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
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Link
            href="/"
            aria-label="Almond AI home"
            className="flex shrink-0 items-center pl-1"
          >
            <AlmondMark size={20} glyphSize={24} />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <nav aria-label="Primary" className="flex items-center gap-0.5">
              {SITE_NAV.map((it) => {
                const active = isActive(it.href, pathname);
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={
                      active
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

            <button
              type="button"
              onClick={toggleView}
              role="switch"
              aria-checked={isRaw}
              aria-label={`Switch to ${isRaw ? "Roasted" : "Raw"} view`}
              className="relative grid h-[30px] cursor-pointer grid-cols-2 items-center rounded-full bg-black/[0.04] p-[3px]"
            >
              <motion.span
                className="pointer-events-none absolute inset-y-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-white"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
                animate={{ x: isRaw ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
              <span
                className={`relative z-10 select-none px-3 text-center text-[11px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                  !isRaw ? "text-black" : "text-black/40"
                }`}
              >
                Roasted
              </span>
              <span
                className={`relative z-10 select-none px-3 text-center text-[11px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                  isRaw ? "text-black" : "text-black/40"
                }`}
              >
                Raw
              </span>
            </button>

            <div className="h-5 w-px bg-black/10" aria-hidden />

            <NavBetaCTA />
          </div>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 4h10M2 7h10M2 10h10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {menuOpen && (
            <div
              id="mobile-nav-menu"
              role="dialog"
              aria-label="Navigation"
              className="absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden"
            >
              <p className="mb-2.5 px-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/35">
                Navigate
              </p>
              <nav
                aria-label="Mobile primary"
                className="grid grid-cols-2 gap-2"
              >
                {SITE_NAV.map((it) => {
                  const active = isActive(it.href, pathname);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      className={`rounded-[10px] py-2.5 text-center text-[13px] font-medium leading-none tracking-[-0.005em] transition-colors ${
                        active
                          ? "bg-black text-white"
                          : "bg-black/[0.04] text-black/65 hover:bg-black/[0.08] hover:text-black"
                      }`}
                    >
                      {it.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-3">
                <NavBetaCTA layout="stack" />
              </div>

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
