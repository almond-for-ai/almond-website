"use client";

/**
 * ContextPassAnimation
 *
 * A memory card travels from tool to tool — Claude → ChatGPT → Figma → Cursor —
 * arriving unchanged at each, proving that Almond's context persists everywhere.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ClaudeLogo, ChatGPTLogo, FigmaLogo, CursorLogo } from "@/components/tool-logos";
import { MOTION_EASE } from "@/lib/motion-tokens";

/* ─── Tool definitions ──────────────────────────────────────────────────── */

const TOOLS = [
  { key: "claude",  label: "Claude",  Logo: ClaudeLogo },
  { key: "chatgpt", label: "ChatGPT", Logo: ChatGPTLogo },
  { key: "figma",   label: "Figma",   Logo: FigmaLogo },
  { key: "cursor",  label: "Cursor",  Logo: CursorLogo },
] as const;

/* ─── Timing (ms) ───────────────────────────────────────────────────────── */

const DWELL       = 1600;
const TRAVEL      = 700;
const RESET_PAUSE = 350;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/* ─── Memory card ───────────────────────────────────────────────────────── */

function MemoryCard() {
  return (
    <div className="w-[240px] overflow-hidden rounded-[18px] border border-black/[0.07] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] md:w-[280px]">
      {/* top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-walnut-500/80 to-walnut-500/20" />
      <div className="px-[18px] py-[16px]">
        {/* eyebrow */}
        <div className="flex items-center gap-[6px]">
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-walnut-500" />
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-walnut-500">
            Memory · Design system
          </p>
        </div>
        {/* body */}
        <p className="mt-[10px] text-[14px] font-semibold leading-[20px] tracking-[-0.14px] text-black">
          Button padding updated:<br />12px → 16px
        </p>
        <p className="mt-[6px] text-[12px] leading-[17px] text-black/45">
          Applies to all primary CTAs across product.
        </p>
        {/* divider + meta */}
        <div className="mt-[12px] flex items-center gap-[8px] border-t border-black/[0.06] pt-[10px]">
          <span className="rounded-full bg-black/[0.04] px-[8px] py-[3px] font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">
            Design tokens
          </span>
          <span className="rounded-full bg-black/[0.04] px-[8px] py-[3px] font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">
            v2.4
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Chevron arrow ─────────────────────────────────────────────────────── */

function Chevron({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className="shrink-0"
      animate={{ opacity: active ? 1 : 0.25 }}
      transition={{ duration: 0.4 }}
    >
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className="text-walnut-500" />
    </motion.svg>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */

export function ContextPassAnimation() {
  const prefersReduced = useReducedMotion();

  const nodeRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardX,       setCardX]       = useState<number | null>(null);
  const [dotX,        setDotX]        = useState<number | null>(null);
  const [dotVisible,  setDotVisible]  = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const [traveling,   setTraveling]   = useState(false);

  /* center-x of node i relative to containerRef */
  const measureX = (i: number): number | null => {
    const node = nodeRefs.current[i];
    const box  = containerRef.current;
    if (!node || !box) return null;
    const nr = node.getBoundingClientRect();
    const br = box.getBoundingClientRect();
    return nr.left - br.left + nr.width / 2;
  };

  /* card left edge so it centers over the node */
  const cardLeft = (cx: number, cardW: number) => cx - cardW / 2;

  useEffect(() => {
    if (prefersReduced) return;
    let cancelled = false;

    const run = async () => {
      await sleep(400);

      while (!cancelled) {
        for (let i = 0; i < TOOLS.length; i++) {
          if (cancelled) break;

          const cx = measureX(i);
          if (cx === null) continue;

          if (i === 0) {
            // snap card + dot to first tool on loop start
            setCardX(cardLeft(cx, 260));
            setDotX(cx);
            setCardVisible(true);
            setDotVisible(true);
            setTraveling(false);
          } else {
            // animate card + dot traveling
            setTraveling(true);
            setCardX(cardLeft(cx, 260));
            setDotX(cx);
            await sleep(TRAVEL);
            setTraveling(false);
          }

          setActiveIndex(i);
          await sleep(DWELL);
        }

        if (!cancelled) {
          // fade out, reset
          setCardVisible(false);
          setDotVisible(false);
          setTraveling(false);
          await sleep(RESET_PAUSE);
          const cx0 = measureX(0);
          if (cx0 !== null) {
            setCardX(cardLeft(cx0, 260));
            setDotX(cx0);
          }
          setActiveIndex(0);
          await sleep(80);
        }
      }
    };

    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced]);

  /* ── reduced-motion static view ───────────────────────────────────────── */

  if (prefersReduced) {
    return (
      <div className="rounded-[28px] bg-grey-96 px-[32px] py-[48px]">
        <div className="flex flex-col items-center gap-[40px]">
          <MemoryCard />
          <div className="flex flex-wrap items-center justify-center gap-[24px] md:gap-[48px]">
            {TOOLS.map(({ key, label, Logo }) => (
              <div key={key} className="flex flex-col items-center gap-[10px]">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                  <Logo size={30} />
                </div>
                <span className="text-[13px] font-medium tracking-[-0.13px] text-black/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── animated view ─────────────────────────────────────────────────────── */

  return (
    <div className="rounded-[28px] bg-grey-96 px-[24px] py-[48px] md:px-[48px] md:py-[64px]">
      <div ref={containerRef} className="relative flex flex-col items-center gap-[0px]">

        {/* ── Floating memory card ── */}
        <div className="relative h-[168px] w-full md:h-[180px]">
          {cardX !== null && (
            <motion.div
              className="absolute top-0"
              initial={false}
              animate={{
                x: cardX,
                opacity: cardVisible ? 1 : 0,
                y: cardVisible ? 0 : -12,
                scale: cardVisible ? 1 : 0.96,
              }}
              transition={{
                x: {
                  duration: TRAVEL / 1000,
                  ease: traveling ? MOTION_EASE.reveal : [1, 1, 1, 1],
                },
                opacity: { duration: 0.3 },
                y:       { duration: 0.3 },
                scale:   { duration: 0.3 },
              }}
            >
              <MemoryCard />
            </motion.div>
          )}
        </div>

        {/* ── Vertical stem: card → active node ── */}
        <div className="relative h-[36px] w-full">
          {dotX !== null && (
            <motion.div
              className="absolute top-0 flex flex-col items-center"
              initial={false}
              animate={{ x: dotX - 1, opacity: cardVisible ? 1 : 0 }}
              transition={{
                x: { duration: TRAVEL / 1000, ease: MOTION_EASE.reveal },
                opacity: { duration: 0.3 },
              }}
            >
              {/* dashed vertical stem */}
              <div
                className="w-px"
                style={{
                  height: 28,
                  background:
                    "repeating-linear-gradient(to bottom, rgba(123,64,25,0.4) 0px, rgba(123,64,25,0.4) 4px, transparent 4px, transparent 8px)",
                }}
              />
              {/* arrowhead */}
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="shrink-0">
                <path d="M4 5L0 0h8L4 5z" fill="rgba(123,64,25,0.5)" />
              </svg>
            </motion.div>
          )}
        </div>

        {/* ── Tool row + rail ── */}
        <div className="relative w-full">
          {/* rail line */}
          <div className="absolute top-[36px] left-0 right-0 flex items-center justify-center">
            <div className="h-px w-full max-w-[520px] bg-black/[0.08]" />
          </div>

          {/* traveling dot on rail */}
          {dotX !== null && (
            <motion.div
              className="absolute top-[33px] z-10 h-[6px] w-[6px] rounded-full bg-walnut-500 shadow-[0_0_0_3px_rgba(123,64,25,0.15)]"
              initial={false}
              animate={{
                x: dotX - 3,
                opacity: dotVisible ? 1 : 0,
                scale: dotVisible ? 1 : 0,
              }}
              transition={{
                x: { duration: TRAVEL / 1000, ease: MOTION_EASE.reveal },
                opacity: { duration: 0.25 },
                scale:   { duration: 0.25 },
              }}
            />
          )}

          {/* nodes row */}
          <div className="flex items-start justify-center gap-[0px]">
            {TOOLS.map(({ key, label, Logo }, i) => (
              <div key={key} className="flex items-center">
                {/* tool node */}
                <div
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className="relative flex flex-col items-center gap-[10px] px-[16px] md:px-[28px]"
                >
                  {/* outer glow ring */}
                  <motion.div
                    className="absolute top-[-4px] rounded-full"
                    style={{ left: "50%", transform: "translateX(-50%)", width: 80, height: 80 }}
                    animate={
                      activeIndex === i
                        ? {
                            boxShadow: [
                              "0 0 0 0px rgba(123,64,25,0)",
                              "0 0 0 8px rgba(123,64,25,0.12)",
                              "0 0 0 14px rgba(123,64,25,0)",
                            ],
                          }
                        : { boxShadow: "0 0 0 0px rgba(123,64,25,0)" }
                    }
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />

                  {/* logo disc */}
                  <motion.div
                    className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border bg-white"
                    animate={
                      activeIndex === i
                        ? {
                            borderColor: "rgba(123,64,25,0.30)",
                            boxShadow: "0 6px 28px rgba(123,64,25,0.18)",
                            scale: 1.08,
                          }
                        : {
                            borderColor: "rgba(0,0,0,0.08)",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                            scale: 1,
                          }
                    }
                    transition={{ duration: 0.35, ease: MOTION_EASE.hover }}
                  >
                    <Logo size={30} />
                  </motion.div>

                  {/* label */}
                  <motion.span
                    className="font-sans text-[13px] font-medium tracking-[-0.13px]"
                    animate={
                      activeIndex === i
                        ? { color: "rgba(0,0,0,0.85)" }
                        : { color: "rgba(0,0,0,0.45)" }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {label}
                  </motion.span>
                </div>

                {/* chevron between tools */}
                {i < TOOLS.length - 1 && (
                  <Chevron active={activeIndex > i} />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
