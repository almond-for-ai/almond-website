"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { AlmondGlyph } from "@/components/AlmondMark";
import {
  AntigravityLogo,
  ChatGPTLogo,
  ClaudeCodeLogo,
  ClaudeLogo,
  ClineLogo,
  CursorLogo,
  FigmaLogo,
  GitHubLogo,
  LinearLogo,
  NotionLogo,
  V0Logo,
  WindsurfLogo,
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

// Three concentric rings: radius + node disc + logo sizing per ring.
const RINGS = [
  { r: 118, discR: 28, logoSize: 22 },
  { r: 185, discR: 25, logoSize: 20 },
  { r: 246, discR: 22, logoSize: 17 },
];

// Revolution speed per ring in degrees/second. Alternating sign = reversed
// direction per ring. All slow.
const RING_SPEED = [5, -3.5, 2.5];

const TOOLS: Tool[] = [
  // Inner orbit: primary surfaces
  { id: "claude-code", Logo: ClaudeCodeLogo, ring: 0, angle: 0 },
  { id: "cursor", Logo: CursorLogo, ring: 0, angle: 120 },
  { id: "figma", Logo: FigmaLogo, ring: 0, angle: 240 },

  // Mid orbit: agents + knowledge
  { id: "claude", Logo: ClaudeLogo, ring: 1, angle: 45 },
  { id: "linear", Logo: LinearLogo, ring: 1, angle: 135 },
  { id: "github", Logo: GitHubLogo, ring: 1, angle: 225 },
  { id: "chatgpt", Logo: ChatGPTLogo, ring: 1, angle: 315 },

  // Outer orbit: emerging surfaces
  { id: "windsurf", Logo: WindsurfLogo, ring: 2, angle: 18 },
  { id: "v0", Logo: V0Logo, ring: 2, angle: 90 },
  { id: "cline", Logo: ClineLogo, ring: 2, angle: 162 },
  { id: "antigravity", Logo: AntigravityLogo, ring: 2, angle: 234 },
  { id: "notion", Logo: NotionLogo, ring: 2, angle: 306 },
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
              {nodes.map((p) => (
                <g key={p.id}>
                  {/* spoke line: colors on hold, propagates outward */}
                  <motion.line
                    x1={CENTER}
                    y1={CENTER}
                    x2={p.x}
                    y2={p.y}
                    strokeWidth={1}
                    animate={{
                      stroke: isHeld
                        ? "rgba(123,64,25,0.6)"
                        : "rgba(0,0,0,0.16)",
                    }}
                    transition={{
                      duration: 0.15,
                      delay: isHeld ? propDelay(p.ringIndex) : 0,
                    }}
                  />

                  {/* outbound dot: center -> tool, only while held */}
                  <motion.circle
                    r={3}
                    fill="#7b4019"
                    initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
                    animate={
                      isHeld
                        ? {
                            cx: [CENTER, p.x],
                            cy: [CENTER, p.y],
                            opacity: [0, 1, 0],
                          }
                        : { cx: CENTER, cy: CENTER, opacity: 0 }
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

                  {/* inbound dot: tool -> center, only while held */}
                  <motion.circle
                    r={2}
                    fill="rgba(0,0,0,0.45)"
                    initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                    animate={
                      isHeld
                        ? {
                            cx: [p.x, CENTER],
                            cy: [p.y, CENTER],
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
              ))}

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
                  {/* logo: rides with the disc as one rigid entity */}
                  <svg
                    x={p.x - p.ring.logoSize / 2}
                    y={p.y - p.ring.logoSize / 2}
                    width={p.ring.logoSize}
                    height={p.ring.logoSize}
                    overflow="visible"
                  >
                    <p.Logo size={p.ring.logoSize} />
                  </svg>
                </g>
              ))}
            </motion.g>
          );
        })}

        {/* center halo fill: breathes while idle, strengthens on hold */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={56}
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
          r={70}
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
          <span className="mt-[6px] font-mono text-[10px] uppercase tracking-[0.2em] text-walnut-500">
            almond
          </span>
        </motion.div>
      </div>
    </div>
  );
}
