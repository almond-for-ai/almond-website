"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useRef } from "react";

/**
 * Pinned "grove" scene — sibling to OrbitScene, deliberately shorter so two
 * pinned scenes don't exhaust the page.
 *
 * Three seed-clusters sit apart on a shared plane. Scroll draws them toward
 * each other, dotted threads appear between them, and a few soft presences
 * drift across. Abstract on purpose: several things thinking in the same
 * place, nothing named.
 */

const VIEW_W = 640;
const VIEW_H = 360;

type Sat = { dx: number; dy: number; r: number; kind: "seed" | "husk" };

type Cluster = {
  id: string;
  x: number;
  y: number;
  /** travel toward the shared centre, px */
  tx: number;
  ty: number;
  hubR: number;
  sats: Sat[];
};

// Rest positions spread across the plane; tx/ty carry each cluster ~16% of the
// way to the centroid so they gather without ever merging into one blob.
const CLUSTERS: Cluster[] = [
  {
    id: "a",
    x: 120,
    y: 200,
    tx: 32,
    ty: -4,
    hubR: 13,
    sats: [
      { dx: -44, dy: -26, r: 6, kind: "seed" },
      { dx: -52, dy: 22, r: 5, kind: "husk" },
      { dx: 18, dy: 44, r: 5.5, kind: "seed" },
    ],
  },
  {
    id: "b",
    x: 320,
    y: 120,
    tx: 0,
    ty: 9,
    hubR: 15,
    sats: [
      { dx: -40, dy: -34, r: 5.5, kind: "husk" },
      { dx: 46, dy: -22, r: 6, kind: "seed" },
      { dx: 34, dy: 38, r: 5, kind: "husk" },
      { dx: -30, dy: 42, r: 5.5, kind: "seed" },
    ],
  },
  {
    id: "c",
    x: 520,
    y: 210,
    tx: -32,
    ty: -5,
    hubR: 13,
    sats: [
      { dx: 44, dy: -28, r: 6, kind: "husk" },
      { dx: 50, dy: 20, r: 5, kind: "seed" },
      { dx: -20, dy: 42, r: 5.5, kind: "husk" },
    ],
  },
];

// Threads are drawn between the *converged* hub positions and only fade in
// late, once the clusters have effectively arrived — so they never appear
// detached from where the hubs actually are.
const THREADS = [
  "M152 196 Q236 150 320 129",
  "M320 129 Q404 152 488 205",
  "M152 196 Q320 302 488 205",
];

// Soft presences drifting across the shared plane. Never labelled.
const PRESENCES = [
  { from: [80, 96], to: [520, 250], dur: 13, delay: 0 },
  { from: [560, 90], to: [140, 268], dur: 16, delay: 2.4 },
  { from: [300, 320], to: [420, 70], dur: 15, delay: 5.1 },
];

function GrovePlane({
  src,
  animate,
}: {
  src: MotionValue<number>;
  animate: boolean;
}) {
  const threadOpacity = useTransform(src, [0.55, 0.85], [0, 0.5]);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="block h-auto w-full"
      aria-hidden
    >
      {/* threads between clusters */}
      <motion.g style={{ opacity: threadOpacity }}>
        {THREADS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(123,64,25,0.45)"
            strokeWidth={1}
            strokeDasharray="2 6"
          />
        ))}
      </motion.g>

      {CLUSTERS.map((c) => (
        <ClusterGroup key={c.id} cluster={c} src={src} />
      ))}

      {/* drifting presences */}
      {animate &&
        PRESENCES.map((p, i) => (
          <motion.circle
            key={i}
            r={4}
            fill="#7b4019"
            initial={{ cx: p.from[0], cy: p.from[1], opacity: 0 }}
            animate={{
              cx: [p.from[0], p.to[0], p.from[0]],
              cy: [p.from[1], p.to[1], p.from[1]],
              opacity: [0, 0.32, 0.32, 0],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.55, 1],
            }}
          />
        ))}
    </svg>
  );
}

function ClusterGroup({
  cluster,
  src,
}: {
  cluster: Cluster;
  src: MotionValue<number>;
}) {
  const x = useTransform(src, [0, 0.7], [0, cluster.tx]);
  const y = useTransform(src, [0, 0.7], [0, cluster.ty]);
  const opacity = useTransform(src, [0.05, 0.35], [0, 1]);
  const scale = useTransform(src, [0.05, 0.35], [0.88, 1]);

  return (
    <motion.g
      style={{
        x,
        y,
        opacity,
        scale,
        transformBox: "view-box",
        transformOrigin: `${cluster.x}px ${cluster.y}px`,
      }}
    >
      {/* hairlines hub -> satellite */}
      {cluster.sats.map((s, i) => (
        <line
          key={`l-${i}`}
          x1={cluster.x}
          y1={cluster.y}
          x2={cluster.x + s.dx}
          y2={cluster.y + s.dy}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={1}
          strokeDasharray="2 6"
        />
      ))}

      {/* hub */}
      <circle
        cx={cluster.x}
        cy={cluster.y}
        r={cluster.hubR + 8}
        fill="#7b4019"
        opacity={0.06}
      />
      <circle cx={cluster.x} cy={cluster.y} r={cluster.hubR} fill="#ffffff" />
      <circle
        cx={cluster.x}
        cy={cluster.y}
        r={cluster.hubR}
        fill="none"
        stroke="rgba(123,64,25,0.5)"
        strokeWidth={1}
      />
      <circle
        cx={cluster.x}
        cy={cluster.y}
        r={cluster.hubR * 0.4}
        fill="rgba(123,64,25,0.7)"
      />

      {/* satellites: seeds filled, husks hollow */}
      {cluster.sats.map((s, i) => (
        <g key={`s-${i}`}>
          <circle
            cx={cluster.x + s.dx}
            cy={cluster.y + s.dy}
            r={s.r}
            fill="#ffffff"
          />
          <circle
            cx={cluster.x + s.dx}
            cy={cluster.y + s.dy}
            r={s.r}
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth={1}
          />
          {s.kind === "seed" ? (
            <circle
              cx={cluster.x + s.dx}
              cy={cluster.y + s.dy}
              r={s.r * 0.42}
              fill="rgba(0,0,0,0.3)"
            />
          ) : (
            <circle
              cx={cluster.x + s.dx}
              cy={cluster.y + s.dy}
              r={s.r * 0.46}
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth={1.2}
            />
          )}
        </g>
      ))}
    </motion.g>
  );
}

export function GroveScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0005,
  });

  // Reduced motion renders the fully-gathered plane with no pin and no scrub.
  const settled = useMotionValue(1);
  const src = reduce ? settled : smooth;

  const backgroundColor = useTransform(
    smooth,
    [0, 0.2, 0.8, 1],
    ["#ffffff", "#f5f2ee", "#f5f2ee", "#ffffff"],
  );
  const halftoneOpacity = useTransform(smooth, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const copyOpacity = useTransform(smooth, [0.6, 0.78], [0, 1]);
  const copyY = useTransform(smooth, [0.6, 0.78], [16, 0]);

  const copy = (
    <>
      <p className="font-display text-[26px] leading-[1.2] tracking-[-0.01em] text-black md:text-[32px]">
        One is a seed. Several make a grove.
      </p>
      <p className="mt-[10px] max-w-[420px] text-[15px] leading-[23px] text-black/50">
        Remembering is half of it. The other half is who else was in the room.
      </p>
      <Link
        href="/grove"
        className="mt-[18px] inline-block text-[14px] tracking-[0.01em] text-[#7b4019] underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        See what&rsquo;s growing
      </Link>
    </>
  );

  if (reduce) {
    return (
      <section className="w-full pb-[80px] pt-[24px]">
        <div className="container-x">
          <div className="capsule-50 relative bg-[#f5f2ee] px-[24px] pb-[48px] pt-[56px] md:px-[64px]">
            <div className="halftone-bg absolute inset-0" aria-hidden />
            <div className="relative mx-auto max-w-[560px]">
              <GrovePlane src={src} animate={false} />
            </div>
            <div className="relative mt-[24px] text-center">{copy}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[200vh] w-full">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-svh w-full flex-col items-center justify-center overflow-clip"
      >
        <motion.div
          aria-hidden
          className="halftone-bg absolute inset-0"
          style={{ opacity: halftoneOpacity }}
        />
        <div className="relative w-full max-w-[min(620px,88vw)] px-[24px]">
          <GrovePlane src={src} animate />
        </div>
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="relative mt-[4px] px-[24px] text-center"
        >
          {copy}
        </motion.div>
      </motion.div>
    </section>
  );
}
