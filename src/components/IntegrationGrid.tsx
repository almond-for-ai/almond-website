import { CardFrame } from "@/components/cards/CardFrame";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { LOGO_BY_KEY, LOGO_NAME } from "@/components/tool-logos";
import type { ToolKey } from "@/lib/site-data";

/**
 * Integration showcase grid, grouped by category. Each entry shows the tool,
 * one line on what memory does there, and a status badge. Pure layout; the
 * page above supplies any audience-aware copy.
 */

type Status = "live" | "next" | "mcp";

type Integration = {
  tool: ToolKey;
  does: string;
  status: Status;
};

type Category = {
  label: string;
  items: Integration[];
};

const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  next: "Next",
  mcp: "via MCP",
};

const STATUS_CLASS: Record<Status, string> = {
  live: "border-walnut-500/30 bg-walnut-500/[0.08] text-walnut-500",
  next: "border-black/[0.12] bg-black/[0.03] text-black/55",
  mcp: "border-black/[0.10] bg-transparent text-black/45",
};

export const INTEGRATION_CATEGORIES: Category[] = [
  {
    label: "Editors + agents",
    items: [
      { tool: "claude-code", does: "Memory injected into every prompt context.", status: "live" },
      { tool: "cursor", does: "Past decisions surface inline as you type.", status: "next" },
      { tool: "windsurf", does: "Shared context across every flow.", status: "mcp" },
      { tool: "cline", does: "Recalled constraints in the agent loop.", status: "mcp" },
    ],
  },
  {
    label: "Design",
    items: [
      { tool: "figma", does: "Decisions annotated on the frame itself.", status: "live" },
      { tool: "v0", does: "Generations grounded in your token set.", status: "mcp" },
      { tool: "lovable", does: "Builds that respect prior intent.", status: "mcp" },
    ],
  },
  {
    label: "Knowledge + planning",
    items: [
      { tool: "notion", does: "Docs cite the decision as it stands today.", status: "next" },
      { tool: "linear", does: "Issues trace to the decision that spawned them.", status: "next" },
      { tool: "github", does: "PRs carry the reasoning, not just the diff.", status: "mcp" },
    ],
  },
  {
    label: "Chat models",
    items: [
      { tool: "chatgpt", does: "Context loaded before you ask.", status: "mcp" },
      { tool: "claude", does: "Your stack and constraints, preloaded.", status: "mcp" },
    ],
  },
];

function IntegrationItem({ item }: { item: Integration }) {
  const Logo = LOGO_BY_KEY[item.tool];
  return (
    <CardFrame tone="light">
      <div className="flex h-full flex-col gap-[14px] p-[20px] md:p-[24px]">
        <div className="flex items-center gap-[10px]">
          <span className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center">
            <Logo size={22} />
          </span>
          <span className="font-sans text-[15px] font-medium tracking-[-0.16px] text-black">
            {LOGO_NAME[item.tool]}
          </span>
          <span
            className={`ml-auto rounded-full border px-[8px] py-[2px] font-mono text-[9px] uppercase tracking-[0.16em] ${STATUS_CLASS[item.status]}`}
          >
            {STATUS_LABEL[item.status]}
          </span>
        </div>
        <p className="text-[14px] leading-[21px] text-black/60">{item.does}</p>
      </div>
    </CardFrame>
  );
}

export function IntegrationGrid() {
  return (
    <div className="flex flex-col gap-[56px]">
      {INTEGRATION_CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <Reveal y={14}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-walnut-500">
              {cat.label}
            </p>
          </Reveal>
          <Stagger
            as="ul"
            className="mt-[20px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3"
          >
            {cat.items.map((item) => (
              <StaggerItem key={item.tool} as="li">
                <IntegrationItem item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      ))}
    </div>
  );
}
