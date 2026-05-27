"use client";

import { motion } from "motion/react";
import { AlmondGlyph } from "@/components/AlmondMark";

/**
 * Line-art animated diagram. Central almond, tool labels in orbit,
 * edges draw in from center to each tool, dots travel along edges
 * to suggest memory moving between tools.
 *
 * No deps beyond inline SVG + Framer Motion (already in the project).
 */

const TOOLS = [
  { id: "claude", label: "Claude Code" },
  { id: "figma", label: "Figma" },
  { id: "cursor", label: "Cursor" },
  { id: "linear", label: "Linear" },
  { id: "notion", label: "Notion" },
  { id: "github", label: "GitHub" },
];

const SIZE = 560; // intrinsic viewbox size
const CENTER = SIZE / 2;
const ORBIT_R = 220;

// Pre-compute tool positions around the orbit
const POSITIONS = TOOLS.map((t, i) => {
  const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
  return {
    ...t,
    x: CENTER + ORBIT_R * Math.cos(a),
    y: CENTER + ORBIT_R * Math.sin(a),
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
        {/* outer dashed orbit */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_R}
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={1}
          strokeDasharray="2 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_R - 60}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={1}
          strokeDasharray="1 7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />

        {/* edges + traveling dots */}
        {POSITIONS.map((p, i) => (
          <g key={p.id}>
            <motion.line
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="rgba(0,0,0,0.18)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* traveling dot from center → tool, loops */}
            <motion.circle
              r={3}
              fill="#7b4019"
              initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
              animate={{
                cx: [CENTER, p.x],
                cy: [CENTER, p.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 1.2,
                delay: 1.2 + i * 0.2,
                ease: "easeInOut",
              }}
            />
            {/* return dot tool → center */}
            <motion.circle
              r={2}
              fill="rgba(0,0,0,0.45)"
              initial={{ cx: p.x, cy: p.y, opacity: 0 }}
              animate={{
                cx: [p.x, CENTER],
                cy: [p.y, CENTER],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 1.2,
                delay: 2.2 + i * 0.2,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        {/* tool nodes */}
        {POSITIONS.map((p, i) => (
          <motion.g
            key={`node-${p.id}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.6 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <circle cx={p.x} cy={p.y} r={28} fill="#ffffff" />
            <circle
              cx={p.x}
              cy={p.y}
              r={28}
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth={1}
            />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontFamily="var(--font-inter), Inter, sans-serif"
              fontSize="11"
              fontWeight={500}
              fill="rgba(0,0,0,0.7)"
              style={{ letterSpacing: "-0.005em" }}
            >
              {p.label}
            </text>
          </motion.g>
        ))}

        {/* center halo */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={56}
          fill="rgba(123,64,25,0.05)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={70}
          fill="none"
          stroke="rgba(123,64,25,0.2)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
      </svg>

      {/* central almond glyph + label, absolutely positioned over the SVG center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-walnut-500"
          style={{ width: 110, height: 110 }}
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
