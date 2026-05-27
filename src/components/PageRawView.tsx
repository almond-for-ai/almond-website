import YAML from "yaml";
import { RawCode } from "@/components/RawCode";
import { RawFormatToggle } from "@/components/RawFormatToggle";

export type RawFormat = "json" | "yaml";

/**
 * Generic raw view for any page payload.
 * Accepts a serializable object and renders it as JSON/YAML.
 * Use this on sub-pages where per-page data lives inline.
 */
export function PageRawView({
  payload,
  format,
  scope,
}: {
  payload: unknown;
  format: RawFormat;
  scope: string;
}) {
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
