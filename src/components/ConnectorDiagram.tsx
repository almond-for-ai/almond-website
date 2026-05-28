"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AlmondGlyph } from "@/components/AlmondMark";

const TOOLS = [
  { id: "claude", label: "Claude" },
  { id: "figma", label: "Figma" },
  { id: "cursor", label: "Cursor" },
  { id: "linear", label: "Linear" },
  { id: "notion", label: "Notion" },
  { id: "github", label: "GitHub" },
];

const SIZE = 560;
const CENTER = SIZE / 2;
const ORBIT_R = 220;

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
  const [isHeld, setIsHeld] = useState(false);
  const release = () => setIsHeld(false);

  return (
    <div className={`relative w-full ${className ?? ""}`} style={style}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block h-auto w-full"
        aria-hidden
      >
        {/* outer dashed orbit: static, no entrance animation */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_R}
          fill="none"
          strokeWidth={1}
          strokeDasharray="2 6"
          animate={{ stroke: isHeld ? "rgba(123,64,25,0.3)" : "rgba(0,0,0,0.12)" }}
          transition={{ duration: 0.2 }}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_R - 60}
          fill="none"
          strokeWidth={1}
          strokeDasharray="1 7"
          animate={{ stroke: isHeld ? "rgba(123,64,25,0.18)" : "rgba(0,0,0,0.06)" }}
          transition={{ duration: 0.2 }}
        />

        {/* edges + traveling dots */}
        {POSITIONS.map((p, i) => (
          <g key={p.id}>
            {/* spoke line: colors on hold, staggered outward */}
            <motion.line
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              strokeWidth={1}
              animate={{
                stroke: isHeld ? "rgba(123,64,25,0.7)" : "rgba(0,0,0,0.18)",
              }}
              transition={{ duration: 0.15, delay: isHeld ? i * 0.05 : 0 }}
            />

            {/* outbound dot: center → tool, only while held */}
            <motion.circle
              r={3}
              fill="#7b4019"
              initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
              animate={
                isHeld
                  ? { cx: [CENTER, p.x], cy: [CENTER, p.y], opacity: [0, 1, 0] }
                  : { cx: CENTER, cy: CENTER, opacity: 0 }
              }
              transition={
                isHeld
                  ? {
                      duration: 1.4,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }
                  : { duration: 0.15 }
              }
            />

            {/* inbound dot: tool → center, only while held */}
            <motion.circle
              r={2}
              fill="rgba(0,0,0,0.5)"
              initial={{ cx: p.x, cy: p.y, opacity: 0 }}
              animate={
                isHeld
                  ? { cx: [p.x, CENTER], cy: [p.y, CENTER], opacity: [0, 1, 0] }
                  : { cx: p.x, cy: p.y, opacity: 0 }
              }
              transition={
                isHeld
                  ? {
                      duration: 1.4,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      delay: 0.5 + i * 0.12,
                      ease: "easeInOut",
                    }
                  : { duration: 0.15 }
              }
            />
          </g>
        ))}

        {/* tool nodes */}
        {POSITIONS.map((p, i) => (
          <g key={`node-${p.id}`}>
            {/* white background */}
            <circle cx={p.x} cy={p.y} r={28} fill="#ffffff" />
            {/* colored border on hold */}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={28}
              fill="none"
              strokeWidth={1}
              animate={{
                stroke: isHeld ? "rgba(123,64,25,0.6)" : "rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.15, delay: isHeld ? 0.05 + i * 0.05 : 0 }}
            />
            {/* label: shifts to walnut on hold */}
            <motion.text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontFamily="var(--font-inter), Inter, sans-serif"
              fontSize="11"
              fontWeight={500}
              style={{ letterSpacing: "-0.005em" }}
              animate={{ fill: isHeld ? "#7b4019" : "rgba(0,0,0,0.7)" }}
              transition={{ duration: 0.15, delay: isHeld ? 0.05 + i * 0.05 : 0 }}
            >
              {p.label}
            </motion.text>
          </g>
        ))}

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
          onPointerDown={() => setIsHeld(true)}
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
