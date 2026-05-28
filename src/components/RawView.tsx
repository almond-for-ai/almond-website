import YAML from "yaml";
import { RawCode } from "@/components/RawCode";
import { RawFormatToggle } from "@/components/RawFormatToggle";
import type { SiteData } from "@/lib/site-data";

export type RawFormat = "json" | "yaml";

export function RawView({
  data,
  format,
  scope,
}: {
  data: SiteData;
  format: RawFormat;
  scope: "home" | "blog" | "post";
}) {
  const payload = pickScope(data, scope);
  const serialized =
    format === "json"
      ? JSON.stringify(payload, null, 2)
      : YAML.stringify(payload);

  return (
    <section className="pt-[140px] pb-[120px] md:pt-[160px]">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[13px] text-black/55">
              /{scope}.{format}
            </span>
          </div>
          <RawFormatToggle current={format} />
        </div>
        <RawCode format={format} content={serialized} />
      </div>
    </section>
  );
}

function pickScope(data: SiteData, scope: "home" | "blog" | "post"): unknown {
  switch (scope) {
    case "home":
      return {
        brand: data.brand,
        nav: data.nav,
        hero: data.hero,
        audience: data.audience,
        outcomes: data.outcomes,
        terminalLines: data.terminalLines,
        impact: data.impact,
        tagline: data.tagline,
        quote: data.quote,
        blog: {
          heading: data.blog.heading,
          posts: data.blog.posts.slice(0, 3),
        },
        footer: data.footer,
      };
    case "blog":
      return { brand: data.brand, nav: data.nav, blog: data.blog };
    case "post":
      return { brand: data.brand, post: data.blog.posts[0] };
  }
}
