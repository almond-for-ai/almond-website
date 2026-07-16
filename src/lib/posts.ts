import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

type FallbackPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  content: string;
};

const FALLBACK_POSTS: FallbackPost[] = [
  {
    slug: "hello-almond",
    title: "Hello, Almond",
    description: "A short first note from a quiet workshop.",
    date: "2026-01-14",
    author: "The Almond Team",
    content: `
We started with a name. The rest will come slowly.

An almond is the seed inside the stone of a drupe, the part the tree spent its
summer protecting. The shell is dense, deliberate. You have to mean it, to get
to what's inside.

That kind of patience is hard to find on a screen.

## Why the name

There's a small almond-shaped cluster of nuclei buried near the base of every
brain. The Greeks named it after the seed it resembles, _amygdala_. It's
quiet. It's old. It notices things before the rest of you has caught up.

We liked that.

## What this place is

A notebook. Notes from the workshop. Some weeks it will be one line, some
weeks longer.

We're not in a rush.

If you found this, thank you for being early.
`.trim(),
  },
  {
    slug: "notes-on-taste",
    title: "Notes on taste",
    description: "A few observations from a quiet week.",
    date: "2026-01-08",
    author: "The Almond Team",
    content: `
A handful of things kept turning over this week. None of them are conclusions.

## On the shell

> Some forms are slow on purpose.

The almond doesn't open itself for everyone. That seems closer to the truth of
most things worth keeping.

## On attention

There's a difference between what gets your eyes and what stays in your hands.
The first is loud. The second is rare.

## On weight

A small object, held well, can outlast a large one given thoughtlessly. We've
been thinking about that a lot.

## On time

Most of an almond's life is invisible. The hull, the husk, the season, the
soil: all of that has already happened by the time it shows up in someone's
palm.

It seems right to be patient with the things still under the husk.

---

Back to the workshop.
`.trim(),
  },
];

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
};

export type Post = PostMeta & {
  html: string;
};

async function listPostFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR);
    return entries.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

function toSlug(filename: string): string {
  return filename.replace(/\.(md|mdx)$/i, "");
}

function fallbackMeta(): PostMeta[] {
  return FALLBACK_POSTS.map(({ content: _content, ...meta }) => meta).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

async function markdownToHtml(content: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);

  return String(processed);
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await listPostFiles();
  if (files.length === 0) {
    return fallbackMeta();
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      const slug = toSlug(file);
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? new Date().toISOString(),
        author: data.author as string | undefined,
      } satisfies PostMeta;
    }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = await listPostFiles();
  const file = files.find((f) => toSlug(f) === slug);
  if (file) {
    const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      date: (data.date as string) ?? new Date().toISOString(),
      author: data.author as string | undefined,
      html: await markdownToHtml(content),
    };
  }

  const fallback = FALLBACK_POSTS.find((post) => post.slug === slug);
  if (!fallback) return null;

  return {
    slug: fallback.slug,
    title: fallback.title,
    description: fallback.description,
    date: fallback.date,
    author: fallback.author,
    html: await markdownToHtml(fallback.content),
  };
}

export { formatPostDate } from "./postFormat";
