"use client";

import { CardFrame, type CardTone } from "@/components/cards/CardFrame";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { LOGO_BY_KEY, LOGO_NAME } from "@/components/tool-logos";
import type { ToolKey } from "@/lib/site-data";

/**
 * The product page's signature section: memory shown *inside* the tools you
 * already open. No chat window (D-008). Each card is a small in-context surface
 * (an annotation, a recalled block, a linked decision) styled to read like it
 * lives in that tool, not in Almond.
 *
 * Audience-aware: the lead tool set swaps for solo vs team.
 */

type Surface = {
  tool: ToolKey;
  /** where the memory shows up, in that tool */
  where: string;
  /** the surfaced lines - reads like an in-tool annotation, not a chat reply */
  lines: string[];
  tone: CardTone;
};

const SOLO_SURFACES: Surface[] = [
  {
    tool: "claude-code",
    where: "in your prompt context",
    lines: [
      "almond · recalled",
      "auth → JWT in httpOnly cookie",
      "never → tokens in localStorage",
    ],
    tone: "dark",
  },
  {
    tool: "cursor",
    where: "inline, as you type",
    lines: [
      "almond · this matches",
      "the error shape you set",
      "in api/errors.ts last week",
    ],
    tone: "light",
  },
  {
    tool: "figma",
    where: "on the frame",
    lines: [
      "almond · note",
      "spacing uses the 8pt scale",
      "decided in your last pass",
    ],
    tone: "cream",
  },
  {
    tool: "chatgpt",
    where: "before you ask",
    lines: [
      "almond · context loaded",
      "stack, constraints, and the",
      "three things you already ruled out",
    ],
    tone: "light",
  },
];

const TEAM_SURFACES: Surface[] = [
  {
    tool: "claude-code",
    where: "in every engineer's prompt",
    lines: [
      "almond · team memory",
      "API contract frozen v2",
      "owner → platform · ratified",
    ],
    tone: "dark",
  },
  {
    tool: "figma",
    where: "on the shared frame",
    lines: [
      "almond · decision",
      "uses the token set design",
      "ratified in the sync, not a guess",
    ],
    tone: "cream",
  },
  {
    tool: "linear",
    where: "on the issue",
    lines: [
      "almond · linked",
      "traces to the decision that",
      "spawned this · last quarter",
    ],
    tone: "light",
  },
  {
    tool: "notion",
    where: "in the doc",
    lines: [
      "almond · live, not stale",
      "this block cites the decision",
      "as it stands today",
    ],
    tone: "light",
  },
];

function SurfaceCard({ surface }: { surface: Surface }) {
  const Logo = LOGO_BY_KEY[surface.tool];
  const dark = surface.tone === "dark";
  const promptColor = dark ? "text-walnut-300" : "text-walnut-500";
  const bodyColor = dark ? "text-white/80" : "text-black/70";
  const ruleColor = dark ? "bg-white/10" : "bg-black/10";
  const whereColor = dark ? "text-white/45" : "text-black/45";

  return (
    <CardFrame tone={surface.tone}>
      <div className="flex h-full flex-col gap-[18px] p-[24px] md:p-[28px]">
        <div className="flex items-center gap-[10px]">
          <span className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center">
            <Logo size={24} />
          </span>
          <span className="font-sans text-[15px] font-medium tracking-[-0.16px]">
            {LOGO_NAME[surface.tool]}
          </span>
          <span
            className={`ml-auto font-mono text-[10px] uppercase tracking-[0.16em] ${whereColor}`}
          >
            {surface.where}
          </span>
        </div>

        <div className={`h-px w-full ${ruleColor}`} />

        <div className="flex flex-col gap-[4px] font-mono text-[12.5px] leading-[20px]">
          {surface.lines.map((line, i) => (
            <span
              key={i}
              className={i === 0 ? promptColor : bodyColor}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </CardFrame>
  );
}

export function InToolSurfaces() {
  return (
    <Stagger
      as="ul"
      className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4"
    >
      {SOLO_SURFACES.map((s) => (
        <StaggerItem key={s.tool} as="li">
          <SurfaceCard surface={s} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
