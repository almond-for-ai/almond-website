"use client";

import { motion } from "motion/react";
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
 * Connector solar system.
 *
 * Central almond "sun", three orbital rings, real product logos placed on
 * each ring as planet discs. Each orbit rotates at a different cadence;
 * each logo counter-rotates so it stays upright. Beam lines from the sun
 * to each planet pulse with traveling dots to suggest memory in motion.
 */

type Planet = {
  id: string;
  label: string;
  Logo: React.ComponentType<{ size?: number; className?: string }>;
  ring: 0 | 1 | 2;
  angle: number; // degrees, clockwise from 12 o'clock
};

const PLANETS: Planet[] = [
  // Inner orbit - primary surfaces
  { id: "claude-code", label: "Claude Code", Logo: ClaudeCodeLogo, ring: 0, angle: 0 },
  { id: "cursor", label: "Cursor", Logo: CursorLogo, ring: 0, angle: 120 },
  { id: "figma", label: "Figma", Logo: FigmaLogo, ring: 0, angle: 240 },

  // Mid orbit - agents + knowledge
  { id: "chatgpt", label: "ChatGPT", Logo: ChatGPTLogo, ring: 1, angle: 45 },
  { id: "claude", label: "Claude", Logo: ClaudeLogo, ring: 1, angle: 135 },
  { id: "linear", label: "Linear", Logo: LinearLogo, ring: 1, angle: 225 },
  { id: "github", label: "GitHub", Logo: GitHubLogo, ring: 1, angle: 315 },

  // Outer orbit - emerging surfaces
  { id: "windsurf", label: "Windsurf", Logo: WindsurfLogo, ring: 2, angle: 18 },
  { id: "v0", label: "v0", Logo: V0Logo, ring: 2, angle: 90 },
  { id: "cline", label: "Cline", Logo: ClineLogo, ring: 2, angle: 162 },
  { id: "antigravity", label: "Antigravity", Logo: AntigravityLogo, ring: 2, angle: 234 },
  { id: "notion", label: "Notion", Logo: NotionLogo, ring: 2, angle: 306 },
];

const SIZE = 800;
const CENTER = SIZE / 2;

const RINGS = [
  { r: 170, duration: 90, dir: 1, discR: 32, logoSize: 22 },
  { r: 270, duration: 140, dir: -1, discR: 30, logoSize: 20 },
  { r: 360, duration: 200, dir: 1, discR: 28, logoSize: 18 },
];

const EASE_LINEAR = "linear";

// Round to 2 decimals so server- and client-stringified numbers match.
const round = (n: number) => Math.round(n * 100) / 100;

// Pre-compute static cartesian positions for stuff outside orbit groups.
const PLANET_POSITIONS = PLANETS.map((p) => {
  const ring = RINGS[p.ring];
  const a = (p.angle - 90) * (Math.PI / 180);
  return {
    ...p,
    ring,
    x: round(CENTER + ring.r * Math.cos(a)),
    y: round(CENTER + ring.r * Math.sin(a)),
  };
});

// A handful of background "stars" - small walnut-tinted dots scattered around.
const STARS = Array.from({ length: 36 }, (_, i) => {
  const t = i / 36;
  const ang = t * Math.PI * 2 + (i % 3) * 0.6;
  const rad = 60 + ((i * 53) % 320);
  return {
    x: round(CENTER + rad * Math.cos(ang)),
    y: round(CENTER + rad * Math.sin(ang)),
    r: round(0.6 + ((i * 7) % 11) * 0.12),
    o: round(0.08 + ((i * 13) % 9) * 0.03),
  };
});

export function ConnectorDiagram({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`relative w-full ${className ?? ""}`} style={style}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block h-auto w-full"
        aria-hidden
      >
        <defs>
          {/* Soft warm halo for the central almond */}
          <radialGradient id="sun-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a36740" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#a36740" stopOpacity="0.10" />
            <stop offset="70%" stopColor="#a36740" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#a36740" stopOpacity="0" />
          </radialGradient>

          {/* Subtle background warmth */}
          <radialGradient id="bg-warmth" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#f7eee6" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Beam: walnut at the center, fading to transparent at the planet edge */}
          <radialGradient
            id="beam"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="userSpaceOnUse"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#7b4019" stopOpacity="0.32" />
            <stop offset="40%" stopColor="#7b4019" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#7b4019" stopOpacity="0" />
          </radialGradient>

          {/* Planet disc: subtle inner shadow + warmth */}
          <radialGradient id="planet-fill" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fbf7f3" />
            <stop offset="100%" stopColor="#f1ebe3" />
          </radialGradient>

          {/* Drop shadow filter for planet discs */}
          <filter id="planet-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor="#7b4019"
              floodOpacity="0.10"
            />
          </filter>

          {/* Ring of light for active glow */}
          <linearGradient id="orbit-stroke" x1="0" y1="0" x2={SIZE} y2={SIZE}>
            <stop offset="0%" stopColor="#7b4019" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#7b4019" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7b4019" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Background warmth */}
        <rect x="0" y="0" width={SIZE} height={SIZE} fill="url(#bg-warmth)" />

        {/* Faint background stars */}
        {STARS.map((s, i) => (
          <circle
            key={`star-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#7b4019"
            opacity={s.o}
          />
        ))}

        {/* Orbit rings */}
        {RINGS.map((ring, i) => (
          <motion.circle
            key={`orbit-${i}`}
            cx={CENTER}
            cy={CENTER}
            r={ring.r}
            fill="none"
            stroke="url(#orbit-stroke)"
            strokeWidth={1}
            strokeDasharray="2 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.6,
              delay: 0.1 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Sun halo: pulsing radial bloom */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={150}
          fill="url(#sun-halo)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* Inner sun ring (warm hairline) */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={72}
          fill="none"
          stroke="#7b4019"
          strokeOpacity={0.22}
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={88}
          fill="none"
          stroke="#7b4019"
          strokeOpacity={0.12}
          strokeWidth={1}
          strokeDasharray="1 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        />

        {/* Connection beams + traveling memory pulses */}
        {PLANET_POSITIONS.map((p, i) => {
          const dx = p.x - CENTER;
          const dy = p.y - CENTER;
          const dist = Math.hypot(dx, dy);
          const ux = dx / dist;
          const uy = dy / dist;
          // Stop the beam just shy of the planet edge so it tucks under
          const tipX = round(p.x - ux * (p.ring.discR + 2));
          const tipY = round(p.y - uy * (p.ring.discR + 2));
          // Beam starts just outside the sun core
          const startX = round(CENTER + ux * 70);
          const startY = round(CENTER + uy * 70);

          return (
            <g key={`beam-${p.id}`}>
              <motion.line
                x1={startX}
                y1={startY}
                x2={tipX}
                y2={tipY}
                stroke="#7b4019"
                strokeWidth={0.9}
                strokeLinecap="round"
                strokeOpacity={0.18}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.5 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {/* Outgoing memory dot */}
              <motion.circle
                r={2.4}
                fill="#7b4019"
                initial={{ cx: startX, cy: startY, opacity: 0 }}
                animate={{
                  cx: [startX, tipX],
                  cy: [startY, tipY],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  delay: 1.6 + (i % 4) * 0.4,
                  ease: "easeInOut",
                }}
              />
              {/* Incoming reflection dot */}
              <motion.circle
                r={1.6}
                fill="#a36740"
                initial={{ cx: tipX, cy: tipY, opacity: 0 }}
                animate={{
                  cx: [tipX, startX],
                  cy: [tipY, startY],
                  opacity: [0, 0.85, 0],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  delay: 2.8 + (i % 4) * 0.4,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* Orbiting planet groups (each ring rotates as a whole) */}
        {RINGS.map((ring, ringIdx) => (
          <motion.g
            key={`ring-group-${ringIdx}`}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 * ring.dir }}
            transition={{
              duration: ring.duration,
              repeat: Infinity,
              ease: EASE_LINEAR,
            }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          >
            {PLANET_POSITIONS.filter((p) => p.ring.r === ring.r).map((p, i) => (
              <motion.g
                key={p.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + ringIdx * 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Counter-rotate so the logo stays upright */}
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 * ring.dir }}
                  transition={{
                    duration: ring.duration,
                    repeat: Infinity,
                    ease: EASE_LINEAR,
                  }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                >
                  {/* Outer soft halo */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.ring.discR + 8}
                    fill="#7b4019"
                    opacity={0.05}
                  />
                  {/* Planet disc */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.ring.discR}
                    fill="url(#planet-fill)"
                    filter="url(#planet-shadow)"
                  />
                  {/* Disc hairline */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.ring.discR}
                    fill="none"
                    stroke="#7b4019"
                    strokeOpacity={0.18}
                    strokeWidth={0.8}
                  />
                  {/* Logo, centered via nested svg viewport */}
                  <svg
                    x={p.x - p.ring.logoSize / 2}
                    y={p.y - p.ring.logoSize / 2}
                    width={p.ring.logoSize}
                    height={p.ring.logoSize}
                    overflow="visible"
                  >
                    <p.Logo size={p.ring.logoSize} />
                  </svg>
                </motion.g>
              </motion.g>
            ))}
          </motion.g>
        ))}
      </svg>

      {/* Central almond glyph, perfectly centered over the SVG */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-walnut-500"
          style={{ width: 130, height: 130 }}
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <AlmondGlyph size={52} />
            <span className="mt-[8px] font-mono text-[10px] uppercase tracking-[0.22em] text-walnut-500/80">
              almond
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
