import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

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

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await listPostFiles();
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
  if (!file) return null;

  const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? new Date().toISOString(),
    author: data.author as string | undefined,
    html: String(processed),
  };
}

export { formatPostDate } from "./postFormat";
