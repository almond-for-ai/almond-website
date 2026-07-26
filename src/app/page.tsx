import { BlogTeaserSection } from "@/components/BlogTeaserSection";
import { BoardScene } from "@/components/BoardScene";
import { Hero } from "@/components/Hero";
import { MindGameSection } from "@/components/MindGameSection";
import { OrbitScene } from "@/components/OrbitScene";
import { RawView } from "@/components/RawView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { getAllPosts } from "@/lib/posts";
import { buildSiteData } from "@/lib/site-data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const posts = await getAllPosts();
  const sp = await searchParams;
  const view = getViewFromSearchParams(sp);
  const data = buildSiteData(posts);

  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-white">
      <SiteNav />
      {view === "roasted" ? (
        <>
          <Hero latestPost={posts[0]} />
          <OrbitScene />
          <MindGameSection />
          <BoardScene />
          <BlogTeaserSection posts={posts} />
        </>
      ) : (
        <RawView data={data} format={view} scope="home" />
      )}
      <SiteFooter />
    </main>
  );
}
