"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { AlmondGlyph } from "@/components/AlmondMark";
import {
  AntigravityLogo,
  ChatGPTLogo,
  ClaudeCodeLogo,
  ClaudeLogo,
  ClineLogo,
  CursorLogo,
  DevinLogo,
  FigmaLogo,
  GitHubLogo,
  LinearLogo,
  NotionLogo,
  V0Logo,
} from "@/components/tool-logos";

/**
 * Static connector diagram with a heartbeat center.
 *
 * Almond sits at the center and pulses like a slow heartbeat while idle.
 * Press and hold the almond to bring the system alive: traveling dots run
 * along every spoke, walnut color propagates outward ring by ring, and the
 * three orbits begin a slow revolution (alternating direction per ring).
 * Releasing freezes the orbits in place and returns to the idle heartbeat.
 *
 * Three concentric orbits share one center. Tool nodes sit on the rings and
 * show real product logos instead of text. Each disc + logo revolves as one
 * rigid entity with its ring.
 */

type LogoComponent = React.ComponentType<{ size?: number; className?: string }>;

type Tool = {
  id: string;
  Logo: LogoComponent;
  ring: 0 | 1 | 2;
  angle: number; // degrees, clockwise from 12 o'clock
};

const SIZE = 560;
const CENTER = SIZE / 2;

/** Radius of the brown circle ring - spokes start from its edge, not the center. */
const HUB_R = 52;

/** Compute the point on the hub circle edge in the direction of (tx, ty). */
function hubEdge(tx: number, ty: number) {
  const dx = tx - CENTER;
  const dy = ty - CENTER;
  const len = Math.hypot(dx, dy);
  return { ex: round(CENTER + (dx / len) * HUB_R), ey: round(CENTER + (dy / len) * HUB_R) };
}

// Three concentric rings: radius + node disc + logo sizing per ring.
const RINGS = [
  { r: 118, discR: 28, logoSize: 22 },
  { r: 185, discR: 25, logoSize: 20 },
  { r: 246, discR: 22, logoSize: 17 },
];

// Revolution speed per ring in degrees/second.
// Alternating sign = reversed direction per ring (solar-system feel).
// Idle: completely still. Rotation only while held.
const RING_SPEED = [5, -3.5, 2.5];

// 12 nodes evenly spread at 30° each. Sorted by angle, no two adjacent nodes
// share a ring → max angular separation between same-ring siblings, and no
// radial overlap clusters between rings.
const TOOLS: Tool[] = [
  // 0°   - ring 0
  { id: "claude-code", Logo: ClaudeCodeLogo, ring: 0, angle: 0 },
  // 30°  - ring 1
  { id: "claude", Logo: ClaudeLogo, ring: 1, angle: 30 },
  // 60°  - ring 2
  { id: "devin", Logo: DevinLogo, ring: 2, angle: 60 },
  // 90°  - ring 1
  { id: "linear", Logo: LinearLogo, ring: 1, angle: 90 },
  // 120° - ring 0
  { id: "cursor", Logo: CursorLogo, ring: 0, angle: 120 },
  // 150° - ring 2
  { id: "v0", Logo: V0Logo, ring: 2, angle: 150 },
  // 180° - ring 1
  { id: "chatgpt", Logo: ChatGPTLogo, ring: 1, angle: 180 },
  // 210° - ring 2
  { id: "cline", Logo: ClineLogo, ring: 2, angle: 210 },
  // 240° - ring 0
  { id: "figma", Logo: FigmaLogo, ring: 0, angle: 240 },
  // 270° - ring 1
  { id: "github", Logo: GitHubLogo, ring: 1, angle: 270 },
  // 300° - ring 2
  { id: "antigravity", Logo: AntigravityLogo, ring: 2, angle: 300 },
  // 330° - ring 2
  { id: "notion", Logo: NotionLogo, ring: 2, angle: 330 },
];

// Round to 2 decimals so server- and client-stringified numbers match
// (avoids React hydration mismatches from float precision drift).
const round = (n: number) => Math.round(n * 100) / 100;

const POSITIONS = TOOLS.map((t) => {
  const ring = RINGS[t.ring];
  const a = (t.angle - 90) * (Math.PI / 180);
  return {
    id: t.id,
    Logo: t.Logo,
    ringIndex: t.ring,
    ring,
    x: round(CENTER + ring.r * Math.cos(a)),
    y: round(CENTER + ring.r * Math.sin(a)),
  };
});

// Color/motion propagates outward: inner ring first, then mid, then outer.
const propDelay = (ringIndex: number) => ringIndex * 0.12;

export function ConnectorDiagram({
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

  // Per-ring revolution angle. Advances only while held, so it starts on
  // press and freezes in place on release (no rewind, resumes next press).
  const rot0 = useMotionValue(0);
  const rot1 = useMotionValue(0);
  const rot2 = useMotionValue(0);
  const ringRot = [rot0, rot1, rot2];

  useAnimationFrame((_, delta) => {
    if (!heldRef.current) return;
    const ds = delta / 1000;
    rot0.set(rot0.get() + ds * RING_SPEED[0]);
    rot1.set(rot1.get() + ds * RING_SPEED[1]);
    rot2.set(rot2.get() + ds * RING_SPEED[2]);
  });

  return (
    <div className={`relative w-full ${className ?? ""}`} style={style}>
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

        {/* one revolving group per ring: spokes, dots, and nodes */}
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
              {/* spokes + traveling dots */}
              {nodes.map((p) => {
                const { ex, ey } = hubEdge(p.x, p.y);
                return (
                <g key={p.id}>
                  {/* spoke line: starts from brown circle edge.
                      Lighter + dotted to match orbit rings; solid + walnut on hold. */}
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

                  {/* outbound dot: hub edge -> tool, only while held */}
                  <motion.circle
                    r={3}
                    fill="#7b4019"
                    initial={{ cx: ex, cy: ey, opacity: 0 }}
                    animate={
                      isHeld
                        ? {
                            cx: [ex, p.x],
                            cy: [ey, p.y],
                            opacity: [0, 1, 0],
                          }
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

                  {/* inbound dot: tool -> hub edge, only while held */}
                  <motion.circle
                    r={2}
                    fill="rgba(0,0,0,0.45)"
                    initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                    animate={
                      isHeld
                        ? {
                            cx: [p.x, ex],
                            cy: [p.y, ey],
                            opacity: [0, 1, 0],
                          }
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

              {/* tool nodes: white disc + real logo (logo counter-rotates) */}
              {nodes.map((p) => (
                <g key={`node-${p.id}`}>
                  {/* soft halo for depth */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.ring.discR + 7}
                    fill="#7b4019"
                    opacity={0.05}
                  />
                  {/* white disc background */}
                  <circle cx={p.x} cy={p.y} r={p.ring.discR} fill="#ffffff" />
                  {/* hairline border: walnut on hold, propagates outward */}
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={p.ring.discR}
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
                  {/* Logos are rendered OUTSIDE this rotating group
                      (see `<OrbitingLogo>` layer below) so they translate
                      with the orbit but never rotate themselves. */}
                </g>
              ))}
            </motion.g>
          );
        })}

        {/* logos layer: each logo tracks its rotated orbit position via
            useTransform but renders OUTSIDE the rotating ring group, so
            it translates with the orbit and never rotates itself. */}
        {POSITIONS.map((p) => (
          <OrbitingLogo
            key={`logo-${p.id}`}
            node={p}
            ringRot={ringRot[p.ringIndex]}
          />
        ))}

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

      {/* central almond glyph: pointer-events-none on wrapper, interactive on inner */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="pointer-events-auto flex cursor-pointer select-none flex-col items-center justify-center text-walnut-500"
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

/**
 * Logo positioned at the rotated orbit coordinate.
 *
 * Reads the ring's revolution angle via `useTransform` and computes the
 * new (x, y) for the logo's center each frame. The logo itself is never
 * rotated - only translated - so logos always stay upright while their
 * orbit ring spins around the center.
 */
type OrbitNode = (typeof POSITIONS)[number];

function OrbitingLogo({
  node,
  ringRot,
}: {
  node: OrbitNode;
  ringRot: ReturnType<typeof useMotionValue<number>>;
}) {
  const dx = node.x - CENTER;
  const dy = node.y - CENTER;
  const size = node.ring.logoSize;
  const gRef = useRef<SVGGElement>(null);

  // Subscribe to ringRot and write the SVG `transform` attribute on
  // every change. Bypasses motion's CSS-only path - SVG transform
  // attribute takes `translate(x y)` without units.
  useEffect(() => {
    const apply = (deg: number) => {
      const a = (deg * Math.PI) / 180;
      const cx = CENTER + dx * Math.cos(a) - dy * Math.sin(a);
      const cy = CENTER + dx * Math.sin(a) + dy * Math.cos(a);
      gRef.current?.setAttribute("transform", `translate(${cx} ${cy})`);
    };
    apply(ringRot.get());
    return ringRot.on("change", apply);
  }, [ringRot, dx, dy]);

  const Logo = node.Logo;
  // Inner <svg> centered on (0,0) so the transform moves the logo to
  // its disc center exactly. Logo never rotates → always upright.
  return (
    <g ref={gRef}>
      <svg
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
        overflow="visible"
      >
        <Logo size={size} />
      </svg>
    </g>
  );
}
