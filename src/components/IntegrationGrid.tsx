import { CardFrame } from "@/components/cards/CardFrame";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { LOGO_BY_KEY, LOGO_NAME } from "@/components/tool-logos";
import type { ToolKey } from "@/lib/site-data";

/**
 * Integration showcase grid, grouped by category. Each entry shows the tool,
 * one line on what memory does there, and a status badge. Pure layout; the
 * page above supplies any audience-aware copy.
 */

type Status = "live" | "next" | "mcp" | "soon";

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
  soon: "Coming soon",
};

const STATUS_CLASS: Record<Status, string> = {
  live: "border-walnut-500/30 bg-walnut-500/[0.08] text-walnut-500",
  next: "border-black/[0.12] bg-black/[0.03] text-black/55",
  mcp: "border-black/[0.10] bg-transparent text-black/45",
  soon: "border-black/[0.10] bg-transparent text-black/45",
};

export const INTEGRATION_CATEGORIES: Category[] = [
  {
    label: "Editors + agents",
    items: [
      { tool: "claude-code", does: "Memory injected into every prompt context.", status: "live" },
      { tool: "cursor", does: "Past decisions surface inline as you type.", status: "live" },
      { tool: "devin", does: "Shared context across every flow.", status: "mcp" },
      { tool: "cline", does: "Recalled constraints in the agent loop.", status: "mcp" },
      { tool: "antigravity", does: "IDE workspace where memory shapes generations.", status: "mcp" },
      { tool: "codex", does: "Memory grounding OpenAI coding tasks.", status: "live" },
    ],
  },
  {
    label: "Design",
    items: [
      { tool: "figma-make", does: "Prompts build on the decisions already made.", status: "live" },
      { tool: "v0", does: "Generations grounded in your token set.", status: "mcp" },
      { tool: "lovable", does: "Builds that respect prior intent.", status: "mcp" },
    ],
  },
  {
    label: "Knowledge + planning",
    items: [
      { tool: "notion", does: "Docs cite the decision as it stands today.", status: "soon" },
      { tool: "linear", does: "Issues trace to the decision that spawned them.", status: "soon" },
      { tool: "github", does: "PRs carry the reasoning, not just the diff.", status: "soon" },
      { tool: "confluence", does: "Team wikis enriched with live decisions.", status: "soon" },
      { tool: "google-drive", does: "Docs, sheets, and slides informed by memory.", status: "soon" },
      { tool: "granola", does: "Meeting notes tied to the decisions they produced.", status: "soon" },
    ],
  },
  {
    label: "Chat models",
    items: [
      { tool: "chatgpt", does: "Context loaded before you ask.", status: "mcp" },
      { tool: "claude", does: "Your stack and constraints, preloaded.", status: "live" },
      { tool: "gemini", does: "Context surfaced in multimodal threads.", status: "soon" },
      { tool: "grok", does: "Decisions recalled in xAI conversations.", status: "soon" },
    ],
  },
  {
    label: "Communication",
    items: [
      { tool: "slack", does: "Channel threads grounded in team decisions.", status: "soon" },
      { tool: "discord", does: "Server context prefilled from memory.", status: "soon" },
      { tool: "gmail", does: "Email threads surfacing relevant past context.", status: "soon" },
      { tool: "calendar", does: "Meetings pre-loaded with decision history.", status: "soon" },
    ],
  },
  {
    label: "Task management",
    items: [
      { tool: "jira", does: "Tickets trace back to the decisions that spawned them.", status: "mcp" },
    ],
  },
];

function IntegrationItem({ item }: { item: Integration }) {
  const Logo = LOGO_BY_KEY[item.tool];
  const isLive = item.status === "live";
  return (
    <CardFrame
      tone={isLive ? "cream" : "light"}
      className={isLive ? "ring-1 ring-walnut-500/25" : undefined}
      style={
        isLive
          ? { boxShadow: "0 8px 28px rgba(123,64,25,0.10)" }
          : undefined
      }
    >
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
