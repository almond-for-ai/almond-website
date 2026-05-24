# Almond AI — Teaser site

A small Next.js teaser site for Almond AI, plus a file-based markdown blog.

## Stack

- [Next.js 15 App Router](https://nextjs.org/docs/app) + React 19
- TypeScript
- Tailwind CSS v4 (CSS-first config)
- Crimson Pro + Source Serif 4 via `next/font/google`
- Markdown blog (`gray-matter` + `remark` → HTML)

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Project layout

```
src/
  app/
    layout.tsx          # fonts + global metadata
    page.tsx            # landing teaser (matches Figma)
    icon.svg            # browser favicon
    globals.css         # Tailwind v4 + design tokens
    blog/
      page.tsx          # blog index (lists all posts)
      [slug]/page.tsx   # individual post (renders markdown)
  components/
    AlmondMark.tsx      # logo + "Almond AI" wordmark
    SiteFooter.tsx      # bottom bar: X / LinkedIn / Blog
  content/
    blog/*.md           # blog posts (frontmatter + markdown)
  lib/
    posts.ts            # markdown loader + parser
public/
  almond-logo.svg       # almond mark
```

## Editing the site

### Social links

The X and LinkedIn URLs live at the top of
[`src/components/SiteFooter.tsx`](src/components/SiteFooter.tsx). Update the
`SOCIAL_LINKS` object with the real account URLs.

### Adding a blog post

Drop a new `.md` file into `src/content/blog/`. The filename becomes the URL
slug (`my-post.md` → `/blog/my-post`). Each file needs frontmatter:

```md
---
title: Your title here
description: A one-line subtitle that appears on the index and post header.
date: 2026-06-01
author: Your name (optional)
---

Markdown body goes here. GitHub-Flavored Markdown is supported (tables,
strikethrough, autolinks, task lists).
```

Posts are sorted by `date` (newest first).

## Build for production

```bash
npm run build
npm run start
```

## Deploy

This is a standard Next.js app — deploy to Vercel by importing the repo, no
extra configuration needed. The `/blog` and individual `/blog/[slug]` pages
are statically generated at build time.
