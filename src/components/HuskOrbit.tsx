"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { AlmondGlyph } from "@/components/AlmondMark";
import { useScrollScrub } from "@/lib/use-scroll-scrub";

/**
 * Abstract orbit diagram with a heartbeat center.
 *
 * The almond sits at the center and pulses like a slow heartbeat while
 * idle. Press and hold to bring the system alive: traveling dots run
 * along every spoke, walnut color propagates outward ring by ring, and
 * the three orbits begin a slow revolution (alternating direction per
 * ring). Releasing freezes the orbits in place.
 *
 * Every node is anonymous — a seed, not a name. What orbits the almond
 * stays under the husk.
 */

type Node = {
  id: string;
  ring: 0 | 1 | 2;
  angle: number; // degrees, clockwise from 12 o'clock
  kind: "seed" | "husk"; // solid dot vs hollow disc
};

const SIZE = 560;
const CENTER = SIZE / 2;

/** Radius of the brown hub circle — spokes start from its edge. */
const HUB_R = 52;

function hubEdge(tx: number, ty: number) {
  const dx = tx - CENTER;
  const dy = ty - CENTER;
  const len = Math.hypot(dx, dy);
  return {
    ex: round(CENTER + (dx / len) * HUB_R),
    ey: round(CENTER + (dy / len) * HUB_R),
  };
}

const RINGS = [
  { r: 118, discR: 13 },
  { r: 185, discR: 11 },
  { r: 246, discR: 9 },
];

// Revolution speed per ring in degrees/second; alternating direction.
const RING_SPEED = [5, -3.5, 2.5];

// Extra degrees of revolution contributed by scrolling the section through
// the viewport — alternating direction per ring, subtle enough to read as
// drift rather than spin. Press-and-hold rotation is added on top.
const SCROLL_DEG = [26, -18, 12];

// 12 anonymous nodes at 30° spacing; no two adjacent nodes share a ring.
const NODES: Node[] = [
  { id: "n0", ring: 0, angle: 0, kind: "seed" },
  { id: "n1", ring: 1, angle: 30, kind: "husk" },
  { id: "n2", ring: 2, angle: 60, kind: "seed" },
  { id: "n3", ring: 1, angle: 90, kind: "seed" },
  { id: "n4", ring: 0, angle: 120, kind: "husk" },
  { id: "n5", ring: 2, angle: 150, kind: "husk" },
  { id: "n6", ring: 1, angle: 180, kind: "seed" },
  { id: "n7", ring: 2, angle: 210, kind: "seed" },
  { id: "n8", ring: 0, angle: 240, kind: "seed" },
  { id: "n9", ring: 1, angle: 270, kind: "husk" },
  { id: "n10", ring: 2, angle: 300, kind: "seed" },
  { id: "n11", ring: 2, angle: 330, kind: "husk" },
];

// Round to 2 decimals so server- and client-stringified numbers match.
const round = (n: number) => Math.round(n * 100) / 100;

const POSITIONS = NODES.map((n) => {
  const ring = RINGS[n.ring];
  const a = (n.angle - 90) * (Math.PI / 180);
  return {
    ...n,
    ringIndex: n.ring,
    discR: ring.discR,
    x: round(CENTER + ring.r * Math.cos(a)),
    y: round(CENTER + ring.r * Math.sin(a)),
  };
});

// Color/motion propagates outward: inner ring first, then mid, then outer.
const propDelay = (ringIndex: number) => ringIndex * 0.12;

export function HuskOrbit({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isHeld, setIsHeld] = useState(false);
  const heldRef = useRef(false);
  const press = () => {
    heldRef.current = true;
    setIsHeld(true);
  };
  const release = () => {
    heldRef.current = false;
    setIsHeld(false);
  };

  // Per-ring revolution angle: advances only while held, freezes on release.
  const rot0 = useMotionValue(0);
  const rot1 = useMotionValue(0);
  const rot2 = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (!heldRef.current) return;
    const ds = delta / 1000;
    rot0.set(rot0.get() + ds * RING_SPEED[0]);
    rot1.set(rot1.get() + ds * RING_SPEED[1]);
    rot2.set(rot2.get() + ds * RING_SPEED[2]);
  });

  // Scroll drift layered on top of the hold rotation.
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { smooth } = useScrollScrub(containerRef, ["start end", "end start"]);
  const drift = reduce ? 0 : 1;
  const spin0 = useTransform(
    [rot0, smooth],
    ([r, s]: number[]) => r! + s! * SCROLL_DEG[0] * drift,
  );
  const spin1 = useTransform(
    [rot1, smooth],
    ([r, s]: number[]) => r! + s! * SCROLL_DEG[1] * drift,
  );
  const spin2 = useTransform(
    [rot2, smooth],
    ([r, s]: number[]) => r! + s! * SCROLL_DEG[2] * drift,
  );
  const ringRot = [spin0, spin1, spin2];

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className ?? ""}`}
      style={style}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block h-auto w-full"
        aria-hidden
      >
        {/* concentric orbit rings: static, brighten on hold */}
        {RINGS.map((ring, i) => (
          <motion.circle
            key={`orbit-${i}`}
            cx={CENTER}
            cy={CENTER}
            r={ring.r}
            fill="none"
            strokeWidth={1}
            strokeDasharray="2 6"
            animate={{
              stroke: isHeld
                ? `rgba(123,64,25,${0.3 - i * 0.07})`
                : `rgba(0,0,0,${0.12 - i * 0.03})`,
            }}
            transition={{ duration: 0.2, delay: isHeld ? propDelay(i) : 0 }}
          />
        ))}

        {/* one revolving group per ring: spokes, traveling dots, nodes */}
        {RINGS.map((_, ri) => {
          const nodes = POSITIONS.filter((p) => p.ringIndex === ri);
          return (
            <motion.g
              key={`ring-${ri}`}
              style={{
                rotate: ringRot[ri],
                transformBox: "view-box",
                transformOrigin: `${CENTER}px ${CENTER}px`,
              }}
            >
              {nodes.map((p) => {
                const { ex, ey } = hubEdge(p.x, p.y);
                return (
                  <g key={p.id}>
                    {/* spoke: dotted while idle, solid walnut on hold */}
                    <motion.line
                      x1={ex}
                      y1={ey}
                      x2={p.x}
                      y2={p.y}
                      strokeWidth={1}
                      strokeDasharray={isHeld ? "0" : "2 6"}
                      animate={{
                        stroke: isHeld
                          ? "rgba(123,64,25,0.55)"
                          : `rgba(0,0,0,${0.1 - p.ringIndex * 0.02})`,
                      }}
                      transition={{
                        duration: 0.15,
                        delay: isHeld ? propDelay(p.ringIndex) : 0,
                      }}
                    />

                    {/* outbound dot: hub -> node, only while held */}
                    <motion.circle
                      r={3}
                      fill="#7b4019"
                      initial={{ cx: ex, cy: ey, opacity: 0 }}
                      animate={
                        isHeld
                          ? { cx: [ex, p.x], cy: [ey, p.y], opacity: [0, 1, 0] }
                          : { cx: ex, cy: ey, opacity: 0 }
                      }
                      transition={
                        isHeld
                          ? {
                              duration: 1.4,
                              repeat: Infinity,
                              repeatDelay: 0.3,
                              delay: propDelay(p.ringIndex),
                              ease: "easeInOut",
                            }
                          : { duration: 0.15 }
                      }
                    />

                    {/* inbound dot: node -> hub, only while held */}
                    <motion.circle
                      r={2}
                      fill="rgba(0,0,0,0.45)"
                      initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                      animate={
                        isHeld
                          ? { cx: [p.x, ex], cy: [p.y, ey], opacity: [0, 1, 0] }
                          : { cx: p.x, cy: p.y, opacity: 0 }
                      }
                      transition={
                        isHeld
                          ? {
                              duration: 1.4,
                              repeat: Infinity,
                              repeatDelay: 0.3,
                              delay: 0.5 + propDelay(p.ringIndex),
                              ease: "easeInOut",
                            }
                          : { duration: 0.15 }
                      }
                    />
                  </g>
                );
              })}

              {/* anonymous nodes: seeds (solid) and husks (hollow) */}
              {nodes.map((p) => (
                <g key={`node-${p.id}`}>
                  {/* soft halo */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.discR + 7}
                    fill="#7b4019"
                    opacity={0.05}
                  />
                  {/* disc background */}
                  <circle cx={p.x} cy={p.y} r={p.discR} fill="#ffffff" />
                  {/* hairline border: walnut on hold, propagates outward */}
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={p.discR}
                    fill="none"
                    strokeWidth={1}
                    animate={{
                      stroke: isHeld
                        ? "rgba(123,64,25,0.55)"
                        : "rgba(0,0,0,0.1)",
                    }}
                    transition={{
                      duration: 0.15,
                      delay: isHeld ? propDelay(p.ringIndex) : 0,
                    }}
                  />
                  {/* inner mark: seed = filled kernel, husk = hollow ring */}
                  {p.kind === "seed" ? (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={p.discR * 0.38}
                      animate={{
                        fill: isHeld
                          ? "rgba(123,64,25,0.75)"
                          : "rgba(0,0,0,0.25)",
                      }}
                      transition={{
                        duration: 0.15,
                        delay: isHeld ? propDelay(p.ringIndex) : 0,
                      }}
                    />
                  ) : (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={p.discR * 0.42}
                      fill="none"
                      strokeWidth={1.4}
                      animate={{
                        stroke: isHeld
                          ? "rgba(123,64,25,0.65)"
                          : "rgba(0,0,0,0.22)",
                      }}
                      transition={{
                        duration: 0.15,
                        delay: isHeld ? propDelay(p.ringIndex) : 0,
                      }}
                    />
                  )}
                </g>
              ))}
            </motion.g>
          );
        })}

        {/* center halo fill: breathes while idle, strengthens on hold */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={42}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={
            isHeld
              ? { fill: "rgba(123,64,25,0.18)", scale: 1, opacity: 1 }
              : {
                  fill: "rgba(123,64,25,0.1)",
                  scale: [1, 1.14, 1.06, 1.12, 1],
                  opacity: [0.9, 1, 0.95, 1, 0.9],
                }
          }
          transition={
            isHeld
              ? { duration: 0.15 }
              : {
                  duration: 1.4,
                  repeat: Infinity,
                  repeatDelay: 0.35,
                  ease: "easeOut",
                  times: [0, 0.14, 0.26, 0.4, 1],
                }
          }
        />
        {/* center halo ring: breathes in sync while idle */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={52}
          fill="none"
          strokeWidth={1}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={
            isHeld
              ? { stroke: "rgba(123,64,25,0.7)", scale: 1 }
              : {
                  stroke: "rgba(123,64,25,0.4)",
                  scale: [1, 1.07, 1.03, 1.06, 1],
                }
          }
          transition={
            isHeld
              ? { duration: 0.15 }
              : {
                  duration: 1.4,
                  repeat: Infinity,
                  repeatDelay: 0.35,
                  ease: "easeOut",
                  times: [0, 0.14, 0.26, 0.4, 1],
                }
          }
        />
      </svg>

      {/* central almond glyph: press-and-hold target */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="pointer-events-auto flex cursor-pointer select-none flex-col items-center justify-center text-[#7b4019]"
          style={{ width: 110, height: 110 }}
          onPointerDown={press}
          onPointerUp={release}
          onPointerLeave={release}
          onPointerCancel={release}
        >
          <AlmondGlyph size={42} />
        </motion.div>
      </div>
    </div>
  );
}
