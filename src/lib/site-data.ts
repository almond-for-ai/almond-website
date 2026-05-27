import type { PostMeta } from "@/lib/posts";

export type NavItem = { label: string; href: string };

export type AudienceCopyBlock = {
  body: string;
  finalCta: {
    heading: string;
    body: string;
  };
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
  tagline: string;
  quote: string;
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
  { label: "Pricing", href: "/pricing" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Blog", href: "/blog" },
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
      },
      team: {
        body: "Your team's memory, alive in every tool you ship in. Decisions persist where the work happens, not in a doc no one reads.",
        finalCta: {
          heading: "One brain for the whole team.",
          body: "Run a 30-minute demo on your real codebase.",
        },
      },
    },
    tagline:
      "We don't build another chat. We connect the ones you already use.",
    quote: "Memory, not models.",
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
            { label: "Pricing", href: "/pricing" },
            { label: "Manifesto", href: "/manifesto" },
          ],
        },
        {
          label: "Company",
          items: [
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          label: "Trust",
          items: [
            { label: "Security", href: "/contact" },
            { label: "Self-host", href: "/contact" },
            { label: "SOC 2 (in progress)", href: "/contact" },
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
