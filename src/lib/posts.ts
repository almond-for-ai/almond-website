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
    description:
      "A small note on what we're building, and why it's named after the part of your brain that feels first.",
    date: "2026-01-14",
    author: "The Almond Team",
    content: `
The **amygdala** is an almond-shaped cluster of nuclei sitting deep in your
brain. It processes the things that matter before you have words for them:
fear, salience, the quiet sense that something is important.

We named the company after it for a reason.

## Why "Almond"

Most AI today reasons quickly and feels nothing. We think the next leap is the
other direction: software that pays attention to what *matters* to you, not
just what's true in general.

That's a long road. This blog is where we'll write about the work along the
way: short notes, longer essays, occasional product updates.

## What's next

- A first product preview in the coming weeks.
- Notes on how we're thinking about evaluation, memory, and taste.
- Open roles for people who want to build the thing with us.

Until then, stay tuned.
`.trim(),
  },
  {
    slug: "notes-on-taste",
    title: "Notes on taste",
    description:
      "A short list of opinions that are shaping the first version of Almond.",
    date: "2026-01-08",
    author: "The Almond Team",
    content: `
A few opinions we keep coming back to while building the first version of
Almond. These aren't laws. They're the things we currently believe enough to
ship against.

## On surface area

> The best tools have a small front door and a deep back room.

The product should feel obvious in the first ten seconds and surprising in the
first ten days. If it requires a tour, we got something wrong.

## On taste vs. preference

Preference is what you click. Taste is what you'd choose if you slowed down.
We want to optimize for the second one, even when it costs us a little of the
first.

## On speed

Latency is a feature. So is restraint. Not every input deserves an answer,
and the model should know the difference.

## On honesty

If we don't know, the product should say so. If we're guessing, it should look
like a guess. Confidence theater is the easiest way to lose someone's trust,
and the hardest way to win it back.

---

These will change. That's the point of writing them down.
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
