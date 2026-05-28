"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  CascadeCard,
  CompareCard,
  LogoOrbitCard,
  OutcomeCard,
  StackedTimeCard,
  StatCard,
  TerminalCard,
} from "@/components/cards";
import { CARD_EASE } from "@/components/cards/motion";
import { useAudience } from "@/lib/audience";
import type { SiteData } from "@/lib/site-data";

export function ValueCardsGrid({
  audienceBlocks,
  terminalLines,
}: {
  audienceBlocks: SiteData["audience"];
  terminalLines: string[];
}) {
  const audience = useAudience((s) => s.audience);
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
  audience,
  keyName,
  className,
  children,
}: {
  audience: string;
  keyName: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${keyName}-${audience}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: CARD_EASE }}
        className={`h-full ${className ?? ""}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
