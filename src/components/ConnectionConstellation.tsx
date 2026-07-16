"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AudienceCopy } from "@/components/AudienceCopy";
import { CARD_EASE, CARD_ENTER_MS, CARD_STAGGER } from "@/components/cards/motion";
import { LOGO_BY_KEY, LOGO_NAME } from "@/components/tool-logos";
import type { ToolKey } from "@/lib/site-data";

type NetworkCopy = {
  eyebrow: string;
  solo: { heading: string; body: string };
  team: { heading: string; body: string };
};

type PersonNode = {
  kind: "person";
  id: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  desktopOnly?: boolean;
};

type GifNode = {
  kind: "gif";
  id: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  desktopOnly?: boolean;
};

type ToolNode = {
  kind: "tool";
  id: string;
  tool: ToolKey;
  x: number;
  y: number;
  size: number;
  rotate: number;
  desktopOnly?: boolean;
};

type Node = PersonNode | GifNode | ToolNode;

/** Portrait tiles - narrower and taller than the original landscape cards. */
const PEOPLE: PersonNode[] = [
  {
    kind: "person",
    id: "p1",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&h=320&fit=crop&auto=format",
    x: 6,
    y: 14,
    w: 88,
    h: 118,
    rotate: -2,
  },
  {
    kind: "person",
    id: "p2",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&h=320&fit=crop&auto=format",
    x: 20,
    y: 68,
    w: 84,
    h: 112,
    rotate: 1,
  },
  {
    kind: "person",
    id: "p3",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&h=320&fit=crop&auto=format",
    x: 5,
    y: 90,
    w: 80,
    h: 108,
    rotate: -1,
    desktopOnly: true,
  },
  {
    kind: "person",
    id: "p4",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=320&fit=crop&auto=format",
    x: 92,
    y: 12,
    w: 86,
    h: 116,
    rotate: 2,
  },
  {
    kind: "person",
    id: "p5",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=320&fit=crop&auto=format",
    x: 95,
    y: 52,
    w: 82,
    h: 110,
    rotate: -2,
  },
  {
    kind: "person",
    id: "p6",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=320&fit=crop&auto=format",
    x: 88,
    y: 86,
    w: 84,
    h: 114,
    rotate: 1,
    desktopOnly: true,
  },
  {
    kind: "person",
    id: "p7",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&h=320&fit=crop&auto=format",
    x: 8,
    y: 8,
    w: 78,
    h: 104,
    rotate: -1,
    desktopOnly: true,
  },
];

const TEAM_GIF: GifNode = {
  kind: "gif",
  id: "talking-gif",
  src: "https://media.giphy.com/media/3o7buirRaGw5PmCFMs/giphy.gif",
  x: 14,
  y: 10,
  w: 80,
  h: 108,
  rotate: 0,
};

const SOLO_TOOLS: ToolNode[] = [
  { kind: "tool", id: "t1", tool: "cursor", x: 8, y: 16, size: 72, rotate: 0 },
  { kind: "tool", id: "t2", tool: "figma", x: 16, y: 54, size: 70, rotate: -2 },
  { kind: "tool", id: "t3", tool: "claude-code", x: 6, y: 82, size: 68, rotate: 1 },
  { kind: "tool", id: "t4", tool: "linear", x: 92, y: 14, size: 70, rotate: -1 },
  { kind: "tool", id: "t5", tool: "github", x: 94, y: 44, size: 68, rotate: 2 },
  { kind: "tool", id: "t6", tool: "notion", x: 90, y: 76, size: 66, rotate: -1 },
  { kind: "tool", id: "t7", tool: "chatgpt", x: 10, y: 36, size: 66, rotate: 1 },
  { kind: "tool", id: "t8", tool: "v0", x: 88, y: 60, size: 64, rotate: -2 },
];

/** Mobile arrangement: smaller tiles framing the top and bottom of the
 *  viewport, clear of the vertical band the headline + CTAs occupy on narrow
 *  screens. Same ids as SOLO_TOOLS so tiles morph in place across the
 *  breakpoint instead of remounting. */
const SOLO_TOOLS_MOBILE: ToolNode[] = [
  { kind: "tool", id: "t1", tool: "cursor", x: 12, y: 14, size: 52, rotate: -2 },
  { kind: "tool", id: "t7", tool: "chatgpt", x: 35, y: 23, size: 46, rotate: 1 },
  { kind: "tool", id: "t4", tool: "linear", x: 65, y: 21, size: 46, rotate: -1 },
  { kind: "tool", id: "t5", tool: "github", x: 88, y: 13, size: 52, rotate: 2 },
  { kind: "tool", id: "t3", tool: "claude-code", x: 14, y: 84, size: 50, rotate: 1 },
  { kind: "tool", id: "t2", tool: "figma", x: 35, y: 91, size: 44, rotate: -2 },
  { kind: "tool", id: "t8", tool: "v0", x: 65, y: 90, size: 44, rotate: 2 },
  { kind: "tool", id: "t6", tool: "notion", x: 86, y: 85, size: 50, rotate: -1 },
];

const TEAM_TOOLS: ToolNode[] = [
  { kind: "tool", id: "t1", tool: "cursor", x: 12, y: 40, size: 58, rotate: 0 },
  { kind: "tool", id: "t2", tool: "figma", x: 22, y: 84, size: 54, rotate: -2 },
  { kind: "tool", id: "t3", tool: "claude-code", x: 80, y: 28, size: 56, rotate: 1 },
  { kind: "tool", id: "t4", tool: "linear", x: 88, y: 72, size: 52, rotate: -1 },
  {
    kind: "tool",
    id: "t5",
    tool: "github",
    x: 12,
    y: 50,
    size: 50,
    rotate: 2,
    desktopOnly: true,
  },
  {
    kind: "tool",
    id: "t6",
    tool: "notion",
    x: 22,
    y: 22,
    size: 48,
    rotate: -1,
    desktopOnly: true,
  },
  {
    kind: "tool",
    id: "t7",
    tool: "chatgpt",
    x: 68,
    y: 14,
    size: 50,
    rotate: 1,
    desktopOnly: true,
  },
  {
    kind: "tool",
    id: "t8",
    tool: "v0",
    x: 90,
    y: 40,
    size: 48,
    rotate: -2,
    desktopOnly: true,
  },
];

const HUB = { x: 50, y: 50 };

/** Pin scroll distance after viewport (vh) - scales with layer count.
 *  Tuned: enough runway for spring + cubic easing to feel cinematic,
 *  short enough that headline-only tail before footer stays minimal. */
const SCROLL_RUNWAY_VH = { solo: 75, team: 95 } as const;

function distFromHub(node: Node) {
  return Math.hypot(node.x - HUB.x, node.y - HUB.y);
}

/** Outermost ring exits first, hub-adjacent last. */
function assignExitLayers(nodes: Node[]): Map<string, number> {
  const sorted = [...nodes].sort((a, b) => distFromHub(b) - distFromHub(a));
  const layerCount = Math.max(3, Math.min(6, Math.ceil(nodes.length / 2)));
  const map = new Map<string, number>();
  sorted.forEach((n, i) => {
    map.set(n.id, Math.floor((i / sorted.length) * layerCount));
  });
  return map;
}

function layerTiming(layer: number, totalLayers: number) {
  // Each layer runs over a long slice with heavy overlap so motion feels continuous.
  // Outermost (layer 0) starts immediately; innermost finishes at the very end.
  const denom = Math.max(1, totalLayers - 1);
  const staggerSpan = 0.32;
  const duration = 0.68;
  const start = (layer / denom) * staggerSpan;
  const end = Math.min(start + duration, 1);
  return { start, end };
}

/** Symmetric ease - smoother than smoothstep at both endpoints, identical forward and back. */
function easeInOutCubic(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

function exitTravelPx(
  node: Node,
  viewportH: number,
  layer: number,
  totalLayers: number,
) {
  const layerFactor = 1 - layer / totalLayers;
  const lift = viewportH * (0.42 + layerFactor * 0.38 + (node.y / 100) * 0.12);
  const spread = (node.x - 50) * (viewportH * 0.0012);
  return { x: spread, y: lift };
}

function useLayerScroll(
  scrollYProgress: MotionValue<number>,
  layer: number,
  totalLayers: number,
  travel: { x: number; y: number },
  reduceMotion: boolean | null,
) {
  const { start, end } = layerTiming(layer, totalLayers);

  const scrollX = useTransform(scrollYProgress, (progress) => {
    if (reduceMotion || progress <= start) return 0;
    if (progress >= end) return travel.x;
    const t = easeInOutCubic((progress - start) / (end - start));
    return t * travel.x;
  });

  const scrollY = useTransform(scrollYProgress, (progress) => {
    if (reduceMotion || progress <= start) return 0;
    if (progress >= end) return -travel.y;
    const t = easeInOutCubic((progress - start) / (end - start));
    return -(t * travel.y);
  });

  const x = useMotionTemplate`calc(-50% + ${scrollX}px)`;
  const y = useMotionTemplate`calc(-50% + ${scrollY}px)`;

  return { x, y };
}

function hashSeed(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * (i + 1)) % 997;
  return h;
}

/** Slow elliptical drift - amplitude scales down smoothly as scroll begins. */
function IdleOrbit({
  id,
  reduceMotion,
  children,
}: {
  id: string;
  reduceMotion: boolean | null;
  children: ReactNode;
}) {
  if (reduceMotion) return <>{children}</>;

  const seed = hashSeed(id);
  const r = 4 + (seed % 3) * 1.25;
  const duration = 30 + (seed % 4) * 3;
  const delay = (seed % 10) * 0.35;

  return (
    <motion.div
      animate={{
        x: [0, r, 0, -r, 0],
        y: [-r * 0.6, 0, r * 0.6, 0, -r * 0.6],
        rotate: [0, 0.14, 0, -0.14, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function nodesForAudience(audience: "solo" | "team"): Node[] {
  if (audience === "solo") return SOLO_TOOLS;
  return [TEAM_GIF, ...PEOPLE, ...TEAM_TOOLS];
}

/**
 * Constellation: tools (solo) or people + GIF + tools (team).
 * Scroll drifts floating tiles; center copy stays fixed until the section ends.
 */
export function ConnectionConstellation({ copy }: { copy: NetworkCopy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [isMobile, setIsMobile] = useState(false);
  const nodes = useMemo(
    () => (isMobile ? SOLO_TOOLS_MOBILE : SOLO_TOOLS),
    [isMobile],
  );
  const exitLayers = useMemo(() => assignExitLayers(nodes), [nodes]);
  const totalLayers = useMemo(
    () => Math.max(1, ...Array.from(exitLayers.values())) + 1,
    [exitLayers],
  );
  const runwayVh = SCROLL_RUNWAY_VH["solo"] + totalLayers * 0.6;
  const [viewportH, setViewportH] = useState(900);

  useLayoutEffect(() => {
    const sync = () => setViewportH(window.innerHeight);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed progress: lags real scroll, settles with physics.
  // Same spring drives forward and reverse → identical feel both directions.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.5,
    restDelta: 0.0005,
  });

  const connectorOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.42],
    reduceMotion ? [1, 1, 1] : [1, 0.5, 0],
  );

  const sectionHeight = reduceMotion
    ? "100dvh"
    : `calc(100dvh + ${runwayVh}vh)`;

  return (
    <section
      ref={sectionRef}
      aria-label="People and tools connected by Almond"
      className="relative bg-white"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-[100dvh] min-h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.45] motion-reduce:opacity-0"
        />

        <div className="relative mx-auto h-full w-full max-w-[1280px] px-[24px] md:px-[40px]">
          {/* Hairline connectors */}
          <motion.svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            aria-hidden
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            style={{ opacity: connectorOpacity }}
          >
            <AnimatePresence mode="sync">
              {nodes.map((node) => (
                <ConnectorLine
                  key={`line-${node.id}`}
                  node={node}
                />
              ))}
            </AnimatePresence>
          </motion.svg>

          {/* Drifting tiles - ring around center copy */}
          <div className="pointer-events-none absolute inset-0 z-[1] block">
            <AnimatePresence mode="popLayout">
              {nodes.map((node, i) => (
                <ConstellationTile
                  key={node.id}
                  node={node}
                  inView={inView}
                  delay={i * CARD_STAGGER}
                  scrollYProgress={smoothProgress}
                  exitLayer={exitLayers.get(node.id) ?? 0}
                  totalLayers={totalLayers}
                  reduceMotion={reduceMotion}
                  viewportH={viewportH}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Center copy - vertically centered, above tiles */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-[24px] text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(48vh,380px)] w-[min(92%,680px)] -translate-x-1/2 -translate-y-1/2 rounded-[48px] bg-white/75 blur-[40px]"
            />
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: CARD_ENTER_MS, delay: 0.1, ease: CARD_EASE }}
            >
              <AudienceCopy
                as="h2"
                className="max-w-[640px] font-sans text-[32px] font-medium leading-[1.08] tracking-[-0.64px] text-black md:text-[48px] md:leading-[52px] md:tracking-[-0.96px]"
                solo={<>{copy.solo.heading}</>}
                team={<>{copy.team.heading}</>}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: CARD_ENTER_MS, delay: 0.16, ease: CARD_EASE }}
              className="relative mt-[32px] flex flex-wrap items-center justify-center gap-[12px]"
            >
              <Link href="/contact" className="btn-primary">
                Book demo
              </Link>
              <Link href="/product" className="btn-secondary">
                See the product
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectorLine({ node }: { node: Node }) {
  return (
    <motion.line
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: CARD_EASE }}
      x1={node.x}
      y1={node.y}
      x2={HUB.x}
      y2={HUB.y}
      stroke="rgba(123,64,25,0.08)"
      strokeWidth="0.12"
      vectorEffect="non-scaling-stroke"
      className={node.desktopOnly ? "hidden lg:inline" : undefined}
    />
  );
}

function ConstellationTile({
  node,
  inView,
  delay,
  scrollYProgress,
  exitLayer,
  totalLayers,
  reduceMotion,
  viewportH,
}: {
  node: Node;
  inView: boolean;
  delay: number;
  scrollYProgress: MotionValue<number>;
  exitLayer: number;
  totalLayers: number;
  reduceMotion: boolean | null;
  viewportH: number;
}) {
  const visibility = node.desktopOnly ? "hidden lg:block" : "block";
  const travel = exitTravelPx(node, viewportH, exitLayer, totalLayers);
  const { x, y } = useLayerScroll(
    scrollYProgress,
    exitLayer,
    totalLayers,
    travel,
    reduceMotion,
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: CARD_ENTER_MS, delay, ease: CARD_EASE }}
      className={`absolute ${visibility}`}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        x,
        y,
        width:
          node.kind === "tool"
            ? node.size
            : node.kind === "person" || node.kind === "gif"
              ? node.w
              : undefined,
        height:
          node.kind === "tool"
            ? node.size
            : node.kind === "person" || node.kind === "gif"
              ? node.h
              : undefined,
        rotate: node.rotate,
      }}
    >
      <IdleOrbit
        id={node.id}
        reduceMotion={reduceMotion}
      >
        {node.kind === "person" ? (
          <PersonTile src={node.src} w={node.w} h={node.h} />
        ) : node.kind === "gif" ? (
          <GifTile src={node.src} w={node.w} h={node.h} />
        ) : (
          <ToolTile tool={node.tool} size={node.size} />
        )}
      </IdleOrbit>
    </motion.div>
  );
}

function PersonTile({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <div
      className="overflow-hidden rounded-[12px] border border-black/[0.08] bg-white shadow-[0_16px_48px_-20px_rgba(0,0,0,0.18)]"
      style={{ width: w, height: h }}
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt=""
          fill
          sizes={`${w}px`}
          className="object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        <div className="absolute left-[8px] top-[8px] flex gap-[4px]">
          <span className="h-[5px] w-[5px] rounded-full bg-white/70" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/50" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  );
}

function GifTile({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <div
      className="overflow-hidden rounded-[12px] border border-black/[0.08] bg-white shadow-[0_16px_48px_-20px_rgba(0,0,0,0.18)]"
      style={{ width: w, height: h }}
    >
      <div className="relative h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute left-[8px] top-[8px] flex gap-[4px]">
          <span className="h-[5px] w-[5px] rounded-full bg-white/70" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/50" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/35" />
        </div>
        <span className="absolute bottom-[8px] left-[8px] rounded-[4px] bg-black/55 px-[6px] py-[2px] font-mono text-[8px] uppercase tracking-[0.14em] text-white/90">
          Live
        </span>
      </div>
    </div>
  );
}

function ToolTile({ tool, size }: { tool: ToolKey; size: number }) {
  const Logo = LOGO_BY_KEY[tool];
  return (
    <div
      className="flex items-center justify-center rounded-[12px] border border-black/[0.08] bg-white shadow-[0_12px_36px_-18px_rgba(123,64,25,0.22)]"
      style={{ width: size, height: size }}
      title={LOGO_NAME[tool]}
    >
      <Logo size={Math.round(size * 0.42)} />
      <span className="sr-only">{LOGO_NAME[tool]}</span>
    </div>
  );
}
