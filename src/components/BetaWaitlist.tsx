"use client";

/**
 * BetaWaitlist — email capture for the private beta, with an on-brand
 * "you're in the orchard" success state (a seed sprouts, plus a real spot
 * number returned by /api/waitlist). Reuses the site's terminal + almond motifs.
 */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Status = "idle" | "loading" | "done" | "error";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function BetaWaitlist({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [alreadyIn, setAlreadyIn] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        alreadyIn?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setAlreadyIn(Boolean(data.alreadyIn));
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Network hiccup. Try again.");
    }
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="success"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative overflow-hidden rounded-[18px] border border-walnut-500/20 bg-walnut-500/[0.05] p-[22px] md:p-[26px]"
          >
            {/* seed sprout */}
            <div className="flex items-center gap-[16px]">
              <Sprout reduce={!!reduce} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-walnut-500">
                  {alreadyIn ? "Already planted" : "You're in the orchard"}
                </p>
                <p className="mt-[6px] font-sans text-[20px] font-medium leading-[26px] tracking-[-0.2px] text-black md:text-[24px]">
                  {alreadyIn ? "You're already on the list." : "You're on the list."}
                </p>
                <p className="mt-[6px] text-[14px] leading-[21px] text-black/55">
                  We&apos;ll email <span className="text-black/80">{email}</span> when
                  your access is ready. No spam, nothing else.
                </p>
              </div>
            </div>

            {/* drifting seeds */}
            {!reduce && (
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute h-[6px] w-[6px] rounded-full bg-walnut-500/40"
                    style={{ left: `${12 + i * 19}%`, top: "60%" }}
                    initial={{ opacity: 0, y: 0, scale: 0.6 }}
                    animate={{ opacity: [0, 1, 0], y: -60 - i * 8, scale: 1 }}
                    transition={{
                      duration: 1.4,
                      delay: 0.25 + i * 0.08,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={false}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="w-full"
          >
            <div className="flex w-full flex-col gap-[10px] sm:flex-row">
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
                /* flex-1 is sm-only: the parent stacks to a column on mobile,
                   where flex-basis:0% would collapse the field's height. */
                className="h-[52px] w-full shrink-0 rounded-full border border-black/[0.12] bg-white px-[20px] text-[15px] tracking-[-0.15px] text-black outline-none transition-colors placeholder:text-black/35 focus:border-walnut-500/50 sm:flex-1 sm:shrink"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary h-[52px] shrink-0 justify-center px-[24px] disabled:opacity-70"
              >
                {status === "loading" ? "Joining…" : "Join the beta"}
              </button>
            </div>
            <div className="mt-[10px] min-h-[18px] pl-[4px]">
              {status === "error" ? (
                <span className="text-[13px] text-red-600">{message}</span>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40">
                  Private beta · no spam · unsubscribe anytime
                </span>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/** A little almond seed that sprouts a stem + leaf on mount. */
function Sprout({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(123,64,25,0.14)]">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
        {/* stem */}
        <motion.path
          d="M15 26 C15 20 15 17 15 14"
          stroke="#7B4019"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        />
        {/* leaf */}
        <motion.path
          d="M15 16 C18 15 21 12 21 8 C17 8 15 11 15 15"
          fill="#7B4019"
          fillOpacity="0.85"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ transformOrigin: "15px 12px" }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.4 }}
        />
        {/* almond seed */}
        <motion.ellipse
          cx="15"
          cy="24"
          rx="4.5"
          ry="3"
          fill="#D9975C"
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 16, delay: 0.05 }}
        />
      </svg>
    </div>
  );
}
