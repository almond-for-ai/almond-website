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
            className="flex h-[52px] items-center gap-[12px] rounded-full border border-black/[0.09] bg-white pl-[16px] pr-[20px]"
          >
            <Check reduce={!!reduce} />
            <p className="min-w-0 truncate text-[14px] leading-[20px] tracking-[-0.14px] text-black/70">
              <span className="font-medium text-black">
                {alreadyIn ? "Already on the list." : "You're on the list."}
              </span>{" "}
              <span className="text-black/45">We&apos;ll email {email}.</span>
            </p>
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

/** Small walnut tick that draws itself in, sized to sit inline in the strip. */
function Check({ reduce }: { reduce: boolean }) {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-walnut-500">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
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
