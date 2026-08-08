import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

/**
 * "The pain" stats band: three real numbers that frame why shared memory
 * matters, with source footnotes. Lighter than MetricStrip (no card frames),
 * meant to sit near the problem/decay section.
 */

type Stat = {
  value: string;
  caption: string;
  note?: string; // footnote marker, e.g. "1"
};

const STATS: Stat[] = [
  {
    value: "75%",
    caption: "of knowledge workers use AI at work.",
    note: "1",
  },
  {
    value: "9",
    caption: "AI tools the average team switches between, daily.",
    note: "2",
  },
  {
    value: "0%",
    caption: "of those tools share memory with each other, or with the person sitting next to you.",
  },
];

export function PainStats() {
  return (
    <div>
      <Stagger className="grid grid-cols-1 gap-[32px] md:grid-cols-3 md:gap-[24px]">
        {STATS.map((s) => (
          <StaggerItem key={s.value}>
            <div className="flex h-full flex-col">
              <span className="font-display text-[64px] font-normal leading-none tracking-[-0.04em] text-walnut-500 md:text-[80px]">
                {s.value}
              </span>
              <div className="mt-[20px] h-px w-full bg-black/[0.08]" />
              <p className="mt-[14px] text-[15px] leading-[22px] tracking-[-0.01em] text-black/60 md:text-[16px] md:leading-[24px]">
                {s.caption}
                {s.note ? (
                  <sup className="ml-[2px] text-black/35">{s.note}</sup>
                ) : null}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal y={12} delay={0.1}>
        <p className="mt-[40px] font-mono text-[11px] leading-[18px] tracking-[0.02em] text-black/35">
          <sup>1</sup> Microsoft Work Trend Index &nbsp;·&nbsp; <sup>2</sup> Anthropic internal estimate
        </p>
      </Reveal>
    </div>
  );
}
