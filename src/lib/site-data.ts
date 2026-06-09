import type { PostMeta } from "@/lib/posts";

export type NavItem = { label: string; href: string };

export type ToolKey =
  | "claude-code"
  | "cursor"
  | "figma"
  | "chatgpt"
  | "claude"
  | "linear"
  | "github"
  | "notion"
  | "windsurf"
  | "v0"
  | "cline"
  | "antigravity"
  | "lovable"
  | "gemini"
  | "grok"
  | "codex"
  | "confluence"
  | "google-drive"
  | "granola"
  | "slack"
  | "discord"
  | "gmail"
  | "calendar"
  | "jira";

export type StatSlot = {
  label: string;
  number: string; // string so "∞" or "1" both work
  suffix?: string; // e.g. "hrs", "day"
  caption: string;
  logoTrail: ToolKey[];
};

export type CompareSlot = {
  label: string;
  before: { name: string; value: string };
  after: { name: string; value: string };
  numeric?: { before: number; after: number; unit?: string }; // optional for bar widths
};

export type OrbitSlot = {
  title: string;
  logos: ToolKey[];
};

export type OutcomeSlot = {
  label: string;
  title: string;
  highlight: string; // substring of title that gets the animated underline
  body: string;
};

export type StackedSlot = {
  label: string;
  caption: string;
  beforeFilled: number; // 0..total
  afterFilled: number; // 0..total
  total: number; // typically 10
};

export type CascadeRow = {
  name: string;
  survived: string;
  level: 0 | 1 | 2 | 3; // 0 = full context, 3 = nothing left
};

export type CascadeSlot = {
  label: string;
  title: string;
  rows: CascadeRow[];
};

export type ValueBlock = {
  heading: string;
  lead: string;
  slots: {
    stat: StatSlot;
    compare: CompareSlot;
    orbit: OrbitSlot;
    outcome: OutcomeSlot;
    stacked: StackedSlot;
    cascade: CascadeSlot;
  };
};

export type AudienceCopyBlock = {
  body: string;
  finalCta: {
    heading: string;
    body: string;
  };
  value: ValueBlock;
};

export type SiteData = {
  brand: { name: string; status: string };
  nav: NavItem[];
  hero: {
    chip: string;
    chipHref: string;
    titleLead: string;
    rotatingWords: string[];
    ctas: { label: string; href: string; kind: "primary" | "secondary" }[];
  };
  audience: {
    solo: AudienceCopyBlock;
    team: AudienceCopyBlock;
  };
  outcomes: string[]; // marquee chips
  terminalLines: string[]; // shared TerminalCard slot
  impact: {
    eyebrow: string;
    logoWallLabel: string;
    logoWallTools: ToolKey[];
  };
  tagline: string;
  quote: string;
  network: {
    eyebrow: string;
    solo: { heading: string; body: string };
    team: { heading: string; body: string };
  };
  blog: {
    heading: string;
    viewAll: string;
    posts: {
      slug: string;
      title: string;
      description: string;
      date: string;
      author?: string;
    }[];
  };
  footer: {
    columns: { label: string; items: { label: string; href: string }[] }[];
    wordmark: string;
    copyright: string;
    compliance: string;
  };
};

export const SITE_NAV: NavItem[] = [
  { label: "Product", href: "/product" },
  { label: "Integration", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
];

export const SITE_CTA = { label: "Book demo", href: "/contact" };

export const ROTATING_TOOLS = [
  "Claude Code",
  "Figma",
  "Cursor",
  "Linear",
  "Notion",
  "your stack",
];

export function buildSiteData(posts: PostMeta[]): SiteData {
  return {
    brand: { name: "Almond AI", status: "Private beta" },
    nav: SITE_NAV,
    hero: {
      chip: "Read the manifesto",
      chipHref: "/manifesto",
      titleLead: "One memory for",
      rotatingWords: ROTATING_TOOLS,
      ctas: [
        { label: "Book demo", href: "/contact", kind: "primary" },
        { label: "Read the manifesto", href: "/manifesto", kind: "secondary" },
      ],
    },
    audience: {
      solo: {
        body: "Your Claude Code, your Figma, your Cursor. Finally sharing memory. Stop re-explaining the same context every session.",
        finalCta: {
          heading: "Memory across every tool you open.",
          body: "Set it up in ten minutes. Bring your own stack.",
        },
        value: {
          heading: "Your time back. Your focus back.",
          lead: "You stop re-explaining. You stop re-prompting. You stop losing the thread between Cursor, Figma, and Claude Code.",
          slots: {
            stat: {
              label: "Time",
              number: "10",
              suffix: "hrs",
              caption: "back every week",
              logoTrail: ["cursor", "claude-code", "figma"],
            },
            compare: {
              label: "Onboarding a new project",
              before: { name: "Without Almond", value: "3 days" },
              after: { name: "With Almond", value: "1 hour" },
              numeric: { before: 72, after: 1, unit: "hr" },
            },
            orbit: {
              title: "Your stack, but it remembers.",
              logos: [
                "claude-code",
                "cursor",
                "figma",
                "chatgpt",
                "linear",
                "github",
              ],
            },
            outcome: {
              label: "Continuity",
              title: "Your context survives the prompt.",
              highlight: "survives the prompt",
              body: "Switch editors. Switch laptops. Your memory follows you.",
            },
            stacked: {
              label: "Hours",
              caption: "actually spent building",
              beforeFilled: 3,
              afterFilled: 9,
              total: 10,
            },
            cascade: {
              label: "The hand-off",
              title: "Context fades down the chain",
              rows: [
                { name: "ChatGPT", survived: "full intent · scope · decisions", level: 0 },
                { name: "Figma AI", survived: "intent · partial scope", level: 1 },
                { name: "Cursor", survived: "vague brief", level: 2 },
                { name: "Claude Code", survived: "nothing ∅", level: 3 },
              ],
            },
          },
        },
      },
      team: {
        body: "Your team's memory, alive in every tool you ship in. Decisions persist where the work happens, not in a doc no one reads.",
        finalCta: {
          heading: "One brain for the whole team.",
          body: "Run a 30-minute demo on your real codebase.",
        },
        value: {
          heading: "One brain for the whole team.",
          lead: "Decisions persist. Context stays. New hires ramp on what the team actually built, not the doc nobody updated.",
          slots: {
            stat: {
              label: "Ramp",
              number: "1",
              suffix: "day",
              caption: "to fully onboarded",
              logoTrail: ["linear", "github", "claude-code", "notion"],
            },
            compare: {
              label: "Time to ship a decision again",
              before: { name: "Without Almond", value: "2 weeks" },
              after: { name: "With Almond", value: "20 min" },
              numeric: { before: 336, after: 0.33, unit: "hr" },
            },
            orbit: {
              title: "Every tool your team opens. One memory across all of them.",
              logos: [
                "claude-code",
                "cursor",
                "figma",
                "linear",
                "github",
                "notion",
                "chatgpt",
                "claude",
              ],
            },
            outcome: {
              label: "Persistence",
              title: "Decisions still alive next quarter.",
              highlight: "still alive",
              body: "What you decided last sprint shows up in next sprint's prompts. Citable, searchable, real.",
            },
            stacked: {
              label: "Decisions",
              caption: "still active after one quarter",
              beforeFilled: 2,
              afterFilled: 9,
              total: 10,
            },
            cascade: {
              label: "The hand-off",
              title: "Context fades down the chain",
              rows: [
                { name: "Director", survived: "full intent · scope · decisions", level: 0 },
                { name: "Staff Director / PM", survived: "intent · partial scope", level: 1 },
                { name: "Designer", survived: "vague brief", level: 2 },
                { name: "Developer", survived: "nothing ∅", level: 3 },
              ],
            },
          },
        },
      },
    },
    outcomes: [
      "10 hrs/week back",
      "1 day onboarding",
      "0 context resets",
      "Decisions persist",
      "Memory across every tool",
      "5× faster ramp",
      "Stop re-explaining",
      "Context survives the prompt",
      "Your stack stays yours",
      "On-prem in one command",
      "Every choice searchable",
      "No new tool to open",
      "One brain, every editor",
      "Tribal knowledge becomes structure",
    ],
    terminalLines: [
      "> almond connect claude-code",
      "✓ MCP wired",
      "✓ memory streaming",
      "> almond status",
      "running · on-prem · 12 tools",
    ],
    impact: {
      eyebrow: "Impact",
      logoWallLabel: "Works inside",
      logoWallTools: [
        "claude-code",
        "cursor",
        "figma",
        "chatgpt",
        "linear",
        "github",
        "notion",
        "windsurf",
        "v0",
        "claude",
        "cline",
        "lovable",
      ],
    },
    tagline:
      "We don't build another chat. We connect the ones you already use.",
    quote: "Memory, not models.",
    network: {
      eyebrow: "The network",
      solo: {
        heading: "Your tools. Your work. One thread.",
        body: "Almond sits between you and the stack you already run. Context follows both.",
      },
      team: {
        heading: "Every person. Every tool. One company memory.",
        body: "Founders, designers, engineers. Claude Code, Figma, Linear. Almond connects them.",
      },
    },
    blog: {
      heading: "Notes on memory, models, and the company brain",
      viewAll: "/blog",
      posts: posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        author: p.author,
      })),
    },
    footer: {
      columns: [
        {
          label: "Product",
          items: [
            { label: "How it works", href: "/product" },
            { label: "Integrations", href: "/integrations" },
            { label: "Use cases", href: "/use-cases" },
            { label: "Pricing", href: "/pricing" },
            { label: "Manifesto", href: "/manifesto" },
          ],
        },
        {
          label: "Company",
          items: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          label: "Trust",
          items: [
            { label: "Security", href: "/security" },
            { label: "Self-host", href: "/self-host" },
            { label: "SOC 2 (in progress)", href: "/security" },
          ],
        },
        {
          label: "Connect",
          items: [
            { label: "LinkedIn", href: "https://www.linkedin.com/company/hey-almond-ai" },
            { label: "X", href: "https://x.com/Hey_AlmondAI" },
            { label: "Email", href: "mailto:contact.almondai@gmail.com" },
          ],
        },
      ],
      wordmark: "Almond",
      copyright: "© 2026 Almond AI",
      compliance: "amygdala (n.) · Greek for \"almond.\"",
    },
  };
}
