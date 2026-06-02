"use client";

import {
  CascadeCard,
  CompareCard,
  LogoOrbitCard,
  OutcomeCard,
  StackedTimeCard,
  StatCard,
  TerminalCard,
} from "@/components/cards";
import type { SiteData } from "@/lib/site-data";

export function ValueCardsGrid({
  audienceBlocks,
  terminalLines,
}: {
  audienceBlocks: SiteData["audience"];
  terminalLines: string[];
}) {
  const audience = "solo" as const;
  const slots = audienceBlocks[audience].value.slots;

  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
      <SwapCell
        audience={audience}
        keyName="cascade"
        className="md:col-span-2 lg:col-span-3"
      >
        <CascadeCard slot={slots.cascade} />
      </SwapCell>

      <SwapCell audience={audience} keyName="stat">
        <StatCard slot={slots.stat} />
      </SwapCell>

      <SwapCell audience={audience} keyName="compare">
        <CompareCard slot={slots.compare} />
      </SwapCell>

      <SwapCell audience={audience} keyName="orbit">
        <LogoOrbitCard slot={slots.orbit} />
      </SwapCell>

      <SwapCell audience={audience} keyName="outcome">
        <OutcomeCard slot={slots.outcome} />
      </SwapCell>

      <SwapCell audience={audience} keyName="stacked">
        <StackedTimeCard slot={slots.stacked} />
      </SwapCell>

      <div className="h-full">
        <TerminalCard lines={terminalLines} />
      </div>
    </div>
  );
}

function SwapCell({
  className,
  children,
}: {
  audience?: string;
  keyName?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`h-full ${className ?? ""}`}>{children}</div>;
}
