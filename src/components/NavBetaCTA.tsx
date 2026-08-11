"use client";

/**
 * Header CTA cluster: an almond-logo button that opens a demo video, and a
 * "Join the beta" button that expands into a compact name + email form.
 * Replaces the old "Book demo" button in the nav.
 *
 * The demo video is a placeholder until a real file exists — set
 * DEMO_VIDEO_SRC to the video URL (e.g. "/almond/demo.mp4") to go live.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlmondGlyph } from "@/components/AlmondMark";

const DEMO_VIDEO_SRC = ""; // e.g. "/almond/demo.mp4" — empty shows a placeholder
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "done" | "error";

export function NavBetaCTA({
  layout = "bar",
}: {
  /** "bar" = desktop dropdown · "stack" = inline (mobile menu) */
  layout?: "bar" | "stack";
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  function openVideo() {
    setFormOpen(false);
    setVideoOpen(true);
  }

  // Close the dropdown on outside click / Escape (bar layout only).
  useEffect(() => {
    if (!formOpen || layout !== "bar") return;
    function onDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFormOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFormOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [formOpen, layout]);

  const isStack = layout === "stack";

  return (
    <div
      ref={wrapRef}
      className={isStack ? "relative w-full" : "relative flex items-center gap-2"}
    >
      <div className={isStack ? "flex items-center gap-2" : "contents"}>
        {/* Almond-logo → demo video */}
        <button
          type="button"
          onClick={openVideo}
          aria-label="Watch the Almond demo"
          className={
            isStack
              ? "inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border border-black/[0.1] bg-white transition-colors hover:bg-black/[0.03]"
              : "inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-black/[0.1] bg-white transition-colors hover:bg-black/[0.03]"
          }
        >
          <AlmondGlyph size={isStack ? 22 : 18} />
        </button>

        {/* Join the beta */}
        <button
          type="button"
          onClick={() => setFormOpen((v) => !v)}
          aria-expanded={formOpen}
          className={
            isStack
              ? "inline-flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-walnut-500 text-[13px] font-medium leading-none tracking-[-0.005em] text-white"
              : "inline-flex items-center justify-center rounded-full bg-walnut-500 px-4 py-2 text-[13px] font-medium leading-[18px] tracking-[-0.005em] text-white transition-opacity hover:opacity-90"
          }
        >
          Join the beta
        </button>
      </div>

      {/* Signup form: dropdown (bar) or inline (stack) */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            key="beta-form"
            initial={{ opacity: 0, y: isStack ? -6 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className={
              isStack
                ? "mt-2 w-full rounded-[14px] border border-black/[0.08] bg-white p-4"
                : "absolute right-0 top-[calc(100%+10px)] z-50 w-[320px] rounded-[16px] border border-black/[0.08] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
            }
          >
            <BetaForm onClose={() => setFormOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo video modal — portalled to <body> so `fixed` escapes the
          transformed header and covers the full viewport. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

/* ─── The compact name + email form ─────────────────────────────────────── */

function BetaForm({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [alreadyIn, setAlreadyIn] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("That doesn't look like an email.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        alreadyIn?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setAlreadyIn(Boolean(data.alreadyIn));
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Network hiccup. Try again.");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="flex items-center gap-[10px]"
      >
        <MiniCheck reduce={!!reduce} />
        <p className="min-w-0 flex-1 text-[13px] leading-[19px] tracking-[-0.13px] text-black/70">
          <span className="font-medium text-black">
            {alreadyIn ? "Already on the list." : "You're on the list."}
          </span>{" "}
          <span className="text-black/45">We&apos;ll be in touch.</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="shrink-0 text-[12px] font-medium text-black/40 transition-colors hover:text-walnut-500"
        >
          Done
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit}>
      <p className="mb-3 font-sans text-[14px] font-semibold tracking-[-0.14px] text-black">
        Join the private beta
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        aria-label="Your name"
        className="mb-2 h-[42px] w-full rounded-[10px] border border-black/[0.12] bg-white px-3.5 text-[14px] tracking-[-0.14px] text-black outline-none transition-colors placeholder:text-black/35 focus:border-walnut-500/50"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="you@email.com"
        aria-label="Email address"
        className="h-[42px] w-full rounded-[10px] border border-black/[0.12] bg-white px-3.5 text-[14px] tracking-[-0.14px] text-black outline-none transition-colors placeholder:text-black/35 focus:border-walnut-500/50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-3 flex h-[42px] w-full items-center justify-center rounded-[10px] bg-walnut-500 text-[13px] font-medium tracking-[-0.005em] text-white transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {status === "loading" ? "Joining…" : "Join the beta"}
      </button>
      <div className="mt-2 min-h-[16px] text-center">
        {status === "error" ? (
          <span className="text-[12px] text-red-600">{message}</span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/40">
            Private beta · no spam
          </span>
        )}
      </div>
    </form>
  );
}

/* ─── Demo video modal (placeholder until DEMO_VIDEO_SRC is set) ─────────── */

function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="pointer-events-auto fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Almond demo video"
    >
      <motion.div
        className="relative w-full max-w-[880px] overflow-hidden rounded-[20px] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.28, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="aspect-video w-full">
          {DEMO_VIDEO_SRC ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={DEMO_VIDEO_SRC} controls autoPlay className="h-full w-full" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#7B2D12] via-[#B4471F] to-[#D97742]">
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur">
                <AlmondGlyph size={42} />
              </div>
              <div className="text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
                  Preview
                </p>
                <p className="mt-2 font-display text-[26px] font-normal tracking-[-0.26px] text-white md:text-[30px]">
                  Demo coming soon.
                </p>
                <p className="mt-2 font-sans text-[14px] text-white/65">
                  A walkthrough of Almond will live here.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── tiny tick for the success state ───────────────────────────────────── */

function MiniCheck({ reduce }: { reduce: boolean }) {
  return (
    <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-walnut-500">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
        <motion.path
          d="M2.5 6.3 L4.9 8.7 L9.5 3.6"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.32, ease: EASE, delay: 0.08 }}
        />
      </svg>
    </span>
  );
}
