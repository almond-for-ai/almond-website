import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found · Almond AI" };
  return {
    title: `${post.title} · Almond AI`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-white">
      <SiteNav active="blog" />

      <article className="flex-1 pt-[140px] pb-[160px] md:pt-[160px]">
        <div className="container-x" style={{ maxWidth: 720 }}>
          <div className="text-[13px] uppercase tracking-[0.18em] text-black/50">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.author ? (
              <>
                <span aria-hidden> · </span>
                <span>{post.author}</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-[16px] font-sans text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-black">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-[16px] text-[18px] leading-[28px] tracking-[-0.36px] text-black/60">
              {post.description}
            </p>
          )}

          <div className="mt-[40px] h-px w-full bg-black/10" />

          <div
            className="prose-almond mt-[32px]"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
