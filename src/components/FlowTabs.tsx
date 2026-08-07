"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState, type FC } from "react";

type TabId = "capture" | "understand" | "inject";

type Tab = {
  id: TabId;
  label: string;
  title: string;
  body: string;
};

const TABS: Tab[] = [
  {
    id: "capture",
    label: "01 · Capture",
    title: "Read what your tools already see.",
    body: "Edits, frames, comments, commits. Almond watches what your stack produces, quietly, where you already work.",
  },
  {
    id: "understand",
    label: "02 · Structure",
    title: "Compile decisions into structure.",
    body: "Every captured signal lands as a typed node: linked, versioned, queryable. Not chat. A graph.",
  },
  {
    id: "inject",
    label: "03 · Inject",
    title: "Memory in the loop.",
    body: "Surfaces in the next prompt, the next file, the next frame. The tool you're using gets sharper.",
  },
];

const VARIANTS = {
  enter: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Per-tab line-art SVG illustrations ───────────────────────
type ArtProps = { live?: boolean };

function CaptureArt({ live = true }: ArtProps) {
  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full" aria-hidden>
      {/* source rectangles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={20}
          y={30 + i * 38}
          width={90}
          height={22}
          rx={4}
          fill="none"
          stroke="rgba(0,0,0,0.22)"
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
        />
      ))}
      {/* stream particles to almond */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`p${i}`}
          r={3}
          fill="#7b4019"
          initial={{ cx: 110, cy: 40 + i * 38, opacity: 0 }}
          animate={
            live
              ? {
                  cx: [110, 230],
                  cy: [40 + i * 38, 110],
                  opacity: [0, 1, 0],
                }
              : { cx: 170, cy: 110, opacity: 0 }
          }
          transition={
            live
              ? {
                  duration: 2.2,
                  delay: 0.4 + i * 0.18,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: "easeInOut",
                }
              : { duration: 0 }
          }
        />
      ))}
      {/* almond node */}
      <circle
        cx={246}
        cy={110}
        r={38}
        fill="none"
        stroke="rgba(123,64,25,0.45)"
        strokeWidth={1.2}
      />
      <circle cx={246} cy={110} r={6} fill="#7b4019" />
      <text
        x={246}
        y={170}
        textAnchor="middle"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="10"
        fill="rgba(123,64,25,0.7)"
        style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
      >
        almond
      </text>
    </svg>
  );
}

function UnderstandArt({ live = true }: ArtProps) {
  // small node graph being assembled
  const NODES = [
    { x: 80, y: 60 },
    { x: 160, y: 40 },
    { x: 240, y: 80 },
    { x: 110, y: 130 },
    { x: 200, y: 150 },
    { x: 260, y: 170 },
  ];
  const EDGES: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [1, 4],
    [4, 5],
    [2, 5],
  ];
  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full" aria-hidden>
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="rgba(0,0,0,0.32)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={6}
          fill="#7b4019"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.05 + i * 0.08,
            ease: EASE,
          }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={n.x}
          cy={n.y}
          r={6}
          fill="none"
          stroke="rgba(123,64,25,0.4)"
          strokeWidth={1}
          initial={{ scale: 1, opacity: 0 }}
          animate={
            live
              ? { scale: [1, 2.2, 1], opacity: [0, 0.5, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={
            live
              ? {
                  duration: 2,
                  delay: 1 + i * 0.15,
                  repeat: Infinity,
                  ease: "easeOut",
                }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}

function InjectArt({ live = true }: ArtProps) {
  // rays from almond to surfaces
  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full" aria-hidden>
      {/* almond */}
      <circle
        cx={70}
        cy={110}
        r={38}
        fill="none"
        stroke="rgba(123,64,25,0.45)"
        strokeWidth={1.2}
      />
      <circle cx={70} cy={110} r={6} fill="#7b4019" />
      {/* target rectangles */}
      {[
        { y: 30, label: "IDE" },
        { y: 90, label: "Frame" },
        { y: 150, label: "Prompt" },
      ].map((t, i) => (
        <g key={i}>
          <motion.rect
            x={200}
            y={t.y}
            width={100}
            height={40}
            rx={6}
            fill="none"
            stroke="rgba(0,0,0,0.22)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
          />
          <text
            x={250}
            y={t.y + 25}
            textAnchor="middle"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="10"
            fill="rgba(0,0,0,0.55)"
            style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            {t.label}
          </text>
        </g>
      ))}
      {/* rays */}
      {[50, 110, 170].map((y, i) => (
        <g key={i}>
          <motion.line
            x1={108}
            y1={110}
            x2={200}
            y2={y}
            stroke="rgba(123,64,25,0.35)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: EASE }}
          />
          <motion.circle
            r={3}
            fill="#7b4019"
            initial={{ cx: 108, cy: 110, opacity: 0 }}
            animate={
              live
                ? {
                    cx: [108, 200],
                    cy: [110, y],
                    opacity: [0, 1, 0],
                  }
                : { cx: 154, cy: y, opacity: 0 }
            }
            transition={
              live
                ? {
                    duration: 1.6,
                    delay: 0.8 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut",
                  }
                : { duration: 0 }
            }
          />
        </g>
      ))}
    </svg>
  );
}

const ARTS: Record<TabId, FC<ArtProps>> = {
  capture: CaptureArt,
  understand: UnderstandArt,
  inject: InjectArt,
};

export function FlowTabs({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<TabId>("capture");
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: false, margin: "-15% 0px" });
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];
  const Art = ARTS[activeId];

  return (
    <div className={className}>
      {/* tab bar */}
      <div
        role="tablist"
        aria-label="How Almond works"
        className="relative flex flex-wrap items-center gap-1 rounded-full border border-black/[0.08] bg-white p-[4px]"
      >
        {TABS.map((t) => {
          const on = t.id === activeId;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActiveId(t.id)}
              className="relative isolate inline-flex items-center rounded-full px-[14px] py-[8px] text-[12px] font-medium tracking-[-0.005em]"
            >
              {on ? (
                <motion.span
                  layoutId="flowtab-active"
                  className="absolute inset-0 rounded-full bg-black"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                />
              ) : null}
              <span
                className={`relative z-10 transition-colors ${on ? "text-white" : "text-black/55"}`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div
        ref={panelRef}
        className="capsule-50 mt-[24px] grid grid-cols-1 gap-[24px] overflow-hidden border border-black/[0.08] bg-grey-96 md:grid-cols-[1.1fr_1fr] md:gap-0"
      >
        <div className="flex flex-col justify-center p-[28px] md:p-[40px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={VARIANTS}
              initial="enter"
              animate="show"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-500">
                {active.label}
              </p>
              <h3 className="mt-[14px] font-sans text-[24px] font-medium leading-[30px] tracking-[-0.48px] text-black md:text-[32px] md:leading-[38px] md:tracking-[-0.64px]">
                {active.title}
              </h3>
              <p className="mt-[16px] text-[15px] leading-[24px] text-black/65 md:text-[16px] md:leading-[26px]">
                {active.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center bg-white p-[20px] md:p-[28px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={VARIANTS}
              initial="enter"
              animate="show"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE }}
              className="w-full"
            >
              <Art live={inView} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
