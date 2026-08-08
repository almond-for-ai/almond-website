"use client";

import { CardFrame } from "@/components/cards/CardFrame";
import { Stagger, StaggerItem } from "@/components/Motion";

/**
 * Scenario cards for /use-cases. Each card runs problem -> how Almond sits in
 * the loop -> outcome. The whole set swaps for solo vs team.
 */

type Scenario = {
  step: string;
  problem: string;
  loop: string;
  outcome: string;
};

const SOLO_SCENARIOS: Scenario[] = [
  {
    step: "Every session",
    problem: "The model gets the same explanation. Again.",
    loop: "Almond recalls settled decisions into Claude Code and Cursor before you type a word.",
    outcome: "No re-explaining",
  },
  {
    step: "Switching tools",
    problem: "Context dies between ChatGPT, Figma, and your editor.",
    loop: "The thread follows you. What you decided in one tool shows up in the next.",
    outcome: "One thread",
  },
  {
    step: "Cold start",
    problem: "New project, new person, the settled patterns are gone.",
    loop: "Almond surfaces the conventions and tradeoffs already settled, to whoever opens the tool.",
    outcome: "3 days to 1 hour",
  },
];

const TEAM_SCENARIOS: Scenario[] = [
  {
    step: "New hire",
    problem: "Weeks of ramp on tribal knowledge nobody wrote down.",
    loop: "The team's decisions surface inside the tools the new hire already opens.",
    outcome: "1 day onboarded",
  },
  {
    step: "Decisions",
    problem: "What you agreed dies in a thread no one re-reads.",
    loop: "Ratified decisions live in the editor, the frame, the issue, citable and current.",
    outcome: "Decisions persist",
  },
  {
    step: "Design + eng",
    problem: "Intent drifts between the people who decide and who build.",
    loop: "One shared memory keeps every tool pointed at the same settled intent.",
    outcome: "2 weeks to 20 min",
  },
];

function ScenarioCard({ s, index }: { s: Scenario; index: number }) {
  return (
    <CardFrame tone="light">
      <div className="flex h-full flex-col gap-[16px] p-[24px] md:p-[28px]">
        <div className="flex items-center gap-[10px]">
          <span className="font-display text-[28px] font-normal leading-none tracking-[-0.56px] text-walnut-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/45">
            {s.step}
          </span>
        </div>
        <h3 className="font-sans text-[18px] font-medium leading-[24px] tracking-[-0.18px] text-black">
          {s.problem}
        </h3>
        <p className="flex-1 text-[14px] leading-[22px] text-black/60">
          {s.loop}
        </p>
        <span className="inline-flex w-fit items-center rounded-full border border-walnut-500/30 bg-walnut-500/[0.08] px-[12px] py-[5px] font-mono text-[10px] uppercase tracking-[0.16em] text-walnut-500">
          {s.outcome}
        </span>
      </div>
    </CardFrame>
  );
}

export function ScenarioCards() {
  return (
    <Stagger
      as="ul"
      className="grid grid-cols-1 gap-[16px] md:grid-cols-3"
    >
      {SOLO_SCENARIOS.map((s, i) => (
        <StaggerItem key={s.step} as="li">
          <ScenarioCard s={s} index={i} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
