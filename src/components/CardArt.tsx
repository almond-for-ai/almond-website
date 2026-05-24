import type { ReactElement } from "react";

export type ArtKind = "almond" | "dots" | "arcs" | "leaf" | "hatch" | "branch";

export function CardArt({
  kind,
  className = "",
  opacity = 0.12,
}: {
  kind: ArtKind;
  className?: string;
  opacity?: number;
}) {
  const Inner = ART[kind];
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <Inner />
    </div>
  );
}

const ART: Record<ArtKind, () => ReactElement> = {
  almond: AlmondLine,
  dots: DotField,
  arcs: ArcsField,
  leaf: LeafCurve,
  hatch: HatchPattern,
  branch: BranchSprig,
};

function AlmondLine() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* Almond seed silhouette + inner curve */}
      <path d="M90 18 C 140 30 160 90 130 150 C 100 170 70 168 50 150 C 20 110 40 30 90 18 Z" />
      <path
        d="M90 36 C 122 50 138 95 118 138"
        strokeDasharray="2 4"
      />
      <circle cx="70" cy="92" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="100" cy="118" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="86" cy="58" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DotField() {
  const dots: { x: number; y: number; r: number }[] = [];
  // Deterministic pseudo-random scatter
  const seed = [11, 23, 37, 53, 71, 89, 103, 127, 149, 167];
  for (let i = 0; i < 36; i++) {
    const x = ((seed[i % seed.length]! * (i + 7)) % 170) + 5;
    const y = ((seed[(i * 3) % seed.length]! * (i + 13)) % 170) + 5;
    const r = (i % 5 === 0 ? 1.8 : 0.9) + (i % 3 === 0 ? 0.4 : 0);
    dots.push({ x, y, r });
  }
  return (
    <svg width="200" height="200" viewBox="0 0 180 180" fill="currentColor">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} />
      ))}
    </svg>
  );
}

function ArcsField() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="110" cy="110" r="30" />
      <circle cx="110" cy="110" r="58" strokeDasharray="2 4" />
      <circle cx="110" cy="110" r="86" />
      <circle cx="110" cy="110" r="108" strokeDasharray="1 5" />
      <line x1="0" y1="110" x2="220" y2="110" strokeDasharray="1 6" />
      <line x1="110" y1="0" x2="110" y2="220" strokeDasharray="1 6" />
    </svg>
  );
}

function LeafCurve() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* leaf */}
      <path d="M30 170 C 50 110 100 60 170 40 C 165 100 130 145 70 170 Z" />
      <path d="M40 165 C 80 130 130 90 165 50" strokeDasharray="1 4" />
      {/* tiny veins */}
      <path d="M70 150 L 90 130" />
      <path d="M85 140 L 105 120" />
      <path d="M100 130 L 120 110" />
      <path d="M115 120 L 135 100" />
    </svg>
  );
}

function HatchPattern() {
  const lines: number[] = [];
  for (let i = -180; i < 220; i += 10) lines.push(i);
  return (
    <svg width="220" height="200" viewBox="0 0 220 200" fill="none" stroke="currentColor" strokeWidth="0.8">
      {lines.map((x, i) => (
        <line key={i} x1={x} y1="0" x2={x + 200} y2="200" />
      ))}
    </svg>
  );
}

function BranchSprig() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M20 200 C 60 160 110 130 180 60" />
      {/* leaves */}
      <ellipse cx="80" cy="148" rx="10" ry="4" transform="rotate(-30 80 148)" />
      <ellipse cx="110" cy="120" rx="10" ry="4" transform="rotate(-32 110 120)" />
      <ellipse cx="140" cy="92" rx="10" ry="4" transform="rotate(-34 140 92)" />
      <ellipse cx="170" cy="68" rx="10" ry="4" transform="rotate(-36 170 68)" />
      {/* almond at tip */}
      <path d="M180 60 C 188 56 196 60 196 70 C 196 80 184 78 180 70 Z" />
    </svg>
  );
}
