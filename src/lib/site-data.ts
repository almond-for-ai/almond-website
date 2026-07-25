import type { PostMeta } from "@/lib/posts";

export type SiteData = {
  brand: { name: string; status: string };
  nav: { label: string; href: string }[];
  hero: {
    chip: string;
    title: string;
    subtitle: string;
    ctas: { label: string; href: string; kind: "primary" | "secondary" }[];
  };
  facts: {
    label: string;
    title: string;
    body?: string;
    big?: string;
    chips?: string[];
  }[];
  waitlist: {
    heading: string;
    microcopy: string;
    button: string;
  };
  manifesto: {
    title: string;
    href: string;
    stanzas: string[];
  };
  grove: {
    title: string;
    href: string;
    lines: string[];
  };
  game: {
    eyebrow: string;
    title: string;
    note: string;
    rules: { title: string; desc: string }[];
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

export function buildSiteData(posts: PostMeta[]): SiteData {
  return {
    brand: { name: "Almond AI", status: "Coming Soon" },
    nav: [
      { label: "Game", href: "/#game" },
      { label: "Grove", href: "/grove" },
      { label: "Manifesto", href: "/manifesto" },
      { label: "Blog", href: "/blog" },
    ],
    hero: {
      chip: posts[0]
        ? `New post · ${posts[0].title}`
        : "New writing in the journal",
      title: "Almond AI",
      subtitle: "Something worth remembering.",
      ctas: [
        { label: "Save my seat", href: "/#waitlist", kind: "primary" },
      ],
    },
    waitlist: {
      heading: "Save my seat",
      microcopy: "Be there when the shell cracks. No spam, ever.",
      button: "Save my seat",
    },
    manifesto: {
      title: "Under the husk.",
      href: "/manifesto",
      stanzas: [
        "Most of an almond's life is invisible.",
        "We named the company after a part of your brain.",
        "Attention is expensive. Forgetting is more expensive.",
        "Good things are grown, not launched.",
        "We remember who showed up first.",
      ],
    },
    grove: {
      title: "One is a seed. Several make a grove.",
      href: "/grove",
      lines: [
        "A seed is a private thing.",
        "Thinking is not a solo sport.",
        "Remembering is still the point.",
        "Something is growing next to it.",
      ],
    },
    facts: [
      {
        label: "Field note · 01",
        title: "Say it once",
        body: "The best teams decide things once. Everyone else decides the same thing every week and calls it culture.",
      },
      {
        label: "Etym",
        title: "amygdala",
        body: "Greek for almond. The part of your brain that remembers before you do.",
      },
      {
        label: "Pattern",
        title: "The why evaporates",
        body: "Decisions outlive their reasons. Six months later the answer is “it's always been that way.”",
      },
      {
        label: "Cost · unmeasured",
        title: "The Monday tax",
        big: "∞",
        body: "times the same question gets answered before anyone writes it down.",
      },
      {
        label: "What fades first",
        title: "Gone by Friday",
        chips: ["The reason", "The tradeoff", "The edge case", "Who said no", "Why not plan B"],
      },
      {
        label: "Field note · 02",
        title: "Alone, then together",
        body: "Almost nothing you know arrived while you were sitting by yourself. It arrived out loud, from someone a desk away.",
      },
      {
        label: "monday.log",
        title: "A decision's week",
        body: "Mon decided · Tue questioned · Wed relitigated · Thu reversed · Fri “wait, why?”",
      },
    ],
    game: {
      eyebrow: "The name was not an accident",
      note: "We have been thinking about minds for a while now. More than one at a time, lately.",
      title: "Test your memory with a mind game",
      rules: [
        { title: "Tap matching pairs", desc: "Find the twin almonds." },
        { title: "Beat the clock", desc: "Faster runs score higher." },
        {
          title: "No misses allowed",
          desc: "Three strikes restart the board.",
        },
        { title: "Climb the streak", desc: "Daily reps build muscle memory." },
      ],
    },
    blog: {
      heading: "Notes on attention, memory, and taste",
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
          label: "About",
          items: [
            { label: "Manifesto", href: "/manifesto" },
            { label: "The grove", href: "/grove" },
            { label: "Blog", href: "/blog" },
            { label: "Test your Mind", href: "/#game" },
          ],
        },
        {
          label: "Contact",
          items: [
            { label: "LinkedIn", href: "https://www.linkedin.com/company/hey-almond-ai" },
            { label: "X", href: "https://x.com/Hey_AlmondAI" },
          ],
        },
      ],
      wordmark: "Almond",
      copyright: "© 2026 Almond AI",
      compliance: "Stay tuned for more info",
    },
  };
}
