export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// All available cover images, in order. The cover for a given post is
// deterministic: the same slug always resolves to the same image across
// the home page teaser, the blog index, and the post detail page.
export const POST_COVERS = [
  "/almond/avatar-2.png",
  "/almond/avatar-4.png",
  "/almond/avatar-3.png",
  "/almond/avatar-5.png",
  "/almond/avatar-1.png",
] as const;

// Simple deterministic hash so any slug maps to a stable cover index.
export function getPostCover(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % POST_COVERS.length;
  return POST_COVERS[idx]!;
}
