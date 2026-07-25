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
    slug: "next-to-it",
    title: "Next to it",
    description: "There has been a second thing growing beside the first one.",
    date: "2026-07-26",
    author: "The Almond Team",
    content: `
We've written a fair amount here about remembering. That's still the spine of
what we're doing, and nothing about it has changed.

This note is about the thing growing next to it.

## Two rows, not one

An orchard isn't one tree repeated. Rows get planted in different seasons for
different reasons, and the ones planted second are usually planted because the
first row taught you something.

That's roughly what happened to us. We spent a long time on the problem of a
thing that forgets, and somewhere in the middle of that we kept running into a
second problem standing right behind it.

## The second problem

Almost nothing you know arrived while you were sitting alone.

It arrived out loud. Someone was working the same thing a desk away, said the
half-formed version of it, and you took it from there. The good part wasn't
written down anywhere, because at the time nobody thought of it as a thing to
write down. It was just two people in a room.

Most of what gets built for thinking quietly assumes the opposite: one person,
one screen, one train of thought, and everyone else finds out later.

## What we're doing about it

Growing the second row.

We're not going to explain the shape of it yet, for the same reason we haven't
explained the first one. But it's real, it's being built, and it belongs to the
same orchard.

If you want the slightly longer version, it's [over here](/grove).

---

Back to the workshop.
`.trim(),
  },
  {
    slug: "a-partial-answer",
    title: "A partial answer",
    description:
      "People keep asking what we're building. Here's an honest non-answer.",
    date: "2026-07-16",
    author: "The Almond Team",
    content: `
People keep asking what we're building. Fair. Here's the most honest answer we
can give right now: a partial one.

## The problem, sideways

Every craft has a version of this. The carpenter re-measures a board she
already measured, because the pencil mark stayed in yesterday's pocket. The
cook tastes the sauce again, not because it changed, but because he forgot
what he decided about it on Tuesday.

Nobody bills for that minute. Nobody puts it in a report. It just happens,
quietly, everywhere, a thousand times a week.

## Starting from zero

Watch anyone begin their morning. The first hour is rarely new work. It's
reconstruction: rebuilding a state of mind that existed, complete and warm,
at five o'clock yesterday.

The work wasn't lost. The **why** of it was.

We think that's one of the most expensive things in the world, and one of the
least measured. Attention is expensive. Forgetting is more expensive.

## What we can say

We're building something for that gap: the one between deciding a thing and
still knowing why, a season later.

A few things it is not:

- It is not louder. The world has enough things that ping.
- It is not another place to write things down. Those exist, and they're where
  good intentions go to sleep.
- It is not something you'll have to remember to use. That would be a little
  ironic.

There's an almond-shaped part of your brain that notices things before you do
and never asks for credit. We named the company after it. Build for the quiet
part, we keep telling ourselves. The quiet part is the one doing the work.

## When

When it's ready. The orchard doesn't rush, and the fruit is better for it.

If you want to be there when the shell cracks, the
[waitlist](/#hero-section) is open. We remember who showed up first,
of course we do.

---

Back to the workshop.
`.trim(),
  },
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
