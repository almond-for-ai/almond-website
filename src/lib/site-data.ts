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
  game: {
    title: string;
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
        { label: "Test your mind", href: "/#game", kind: "secondary" },
        { label: "Read the notes", href: "/manifesto", kind: "secondary" },
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
    facts: [
      {
        label: "Fact · 01",
        title: "Drupe, not a nut",
        body: "Botanically a stone fruit. The seed sits inside the pit, kin to peach and cherry.",
      },
      {
        label: "Etym",
        title: "amygdala",
        body: "Greek for almond. The brain region named after the seed it resembles.",
      },
      {
        label: "Specimen",
        title: "Prunus dulcis",
        body: "Family Rosaceae. Origin Iran & Levant. Domesticated ~3000 BC.",
      },
      {
        label: "Supply · world",
        title: "One valley feeds the world",
        big: "80%",
        body: "of global almonds grown in California's Central Valley.",
      },
      {
        label: "Varieties",
        title: "Six names, one tree",
        chips: ["Nonpareil", "Mission", "Carmel", "Butte", "Padre", "Sonora"],
      },
      {
        label: "almond.log",
        title: "Timeline",
        body: "3000 BC Levant · 100 AD Roman trade · 1840 California · 1890 Van Gogh · today 80% supply CA",
      },
    ],
    game: {
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
