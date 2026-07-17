import { BlogTeaserSection } from "@/components/BlogTeaserSection";
import { Hero } from "@/components/Hero";
import { HuskOrbitSection } from "@/components/HuskOrbitSection";
import { MindGameSection } from "@/components/MindGameSection";
import { RawView } from "@/components/RawView";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, getViewFromSearchParams } from "@/components/SiteNav";
import { StackSection } from "@/components/StackSection";
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
          <ScrollBackdrop />
          <StackSection bgClassName="bg-white" first>
            <Hero latestPost={posts[0]} />
          </StackSection>
          <StackSection bgClassName="bg-[#f5f2ee]" overlap={56} radius={44}>
            <HuskOrbitSection />
          </StackSection>
          <StackSection bgClassName="bg-white" overlap={56} radius={44}>
            <MindGameSection />
          </StackSection>
          <StackSection bgClassName="bg-black" overlap={56} radius={44}>
            <BlogTeaserSection posts={posts} />
          </StackSection>
        </>
      ) : (
        <RawView data={data} format={view} scope="home" />
      )}
      <SiteFooter />
    </main>
  );
}
