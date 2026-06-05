import Link from "next/link";
import type { Metadata } from "next";
import { RawView } from "@/components/RawView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { getAllPosts } from "@/lib/posts";
import { formatPostDate, getPostCover } from "@/lib/postFormat";
import { buildSiteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Blog · Almond AI",
  description: "Notes on attention, memory, and taste.",
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const posts = await getAllPosts();
  const sp = await searchParams;
  const view = getViewFromSearchParams(sp);

  if (view !== "roasted") {
    const data = buildSiteData(posts);
    return (
      <main className="relative flex min-h-dvh w-full flex-col bg-white">
        <SiteNav />
        <RawView data={data} format={view} scope="blog" />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-white">
      <SiteNav />

      {/* Hero */}
      <section className="w-full pt-[160px] pb-[64px] md:pt-[200px]">
        <div className="container-x">
          <span className="chip-accent">Notes &amp; essays</span>
          <h1 className="mt-[28px] font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black">
            Notes on attention,
            <br />
            <span className="text-black/50">memory, and taste</span>
          </h1>
        </div>
      </section>

      {/* Cards */}
      <section className="w-full flex-1 pb-[240px]">
        <div className="container-x">
          {posts.length === 0 ? (
            <p className="text-[15px] text-black/50">
              No posts yet. Check back soon.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-black"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url(${getPostCover(post.slug, post.cover)})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[50%] to-black to-[88%]" />
                    <div className="absolute inset-x-0 bottom-0 p-[20px]">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                        {formatPostDate(post.date)}
                        {post.author ? ` · ${post.author}` : ""}
                      </div>
                      <h3 className="mt-[8px] font-sans text-[18px] font-medium leading-[24px] tracking-[-0.36px] text-white">
                        {post.title}
                      </h3>
                      {post.description ? (
                        <p className="mt-[4px] line-clamp-2 text-[12px] font-normal leading-[18px] tracking-[-0.12px] text-white/55">
                          {post.description}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
