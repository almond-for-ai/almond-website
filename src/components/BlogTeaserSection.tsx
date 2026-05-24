import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import type { PostMeta } from "@/lib/posts";
import { formatPostDate } from "@/lib/postFormat";

const COVERS = [
  "/almond/avatar-2.png",
  "/almond/avatar-4.png",
  "/almond/avatar-3.png",
];

export function BlogTeaserSection({ posts }: { posts: PostMeta[] }) {
  const top = posts.slice(0, 3);

  return (
    <section id="blog-posts-section" className="w-full bg-black py-[80px] md:py-[100px]">
      <div className="container-x">
        {/* Header row */}
        <Reveal y={24}>
          <div>
            <h2 className="font-sans text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-white md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
              Notes on attention,
              <br />
              memory, and taste
            </h2>
            <Link href="/blog" className="btn-ghost-dark mt-6 md:mt-[28px]">
              View All
            </Link>
          </div>
        </Reveal>

        {/* Cards */}
        {top.length > 0 ? (
          <Stagger
            as="ul"
            className="mt-[40px] grid grid-cols-1 gap-[16px] md:mt-[56px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-3"
          >
            {top.map((post, i) => (
              <StaggerItem as="li" key={post.slug}>
                <PostCard post={post} cover={COVERS[i % COVERS.length]!} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <ul className="mt-[40px] grid grid-cols-1 gap-[16px] md:mt-[56px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="aspect-[4/3] w-full rounded-[24px] border border-white/15 bg-black"
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function PostCard({ post, cover }: { post: PostMeta; cover: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-white/15 bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${cover})` }}
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
  );
}
