"use client";

/**
 * Infinite-scroll outcome chip strip. The visible row contains the chip set
 * twice in a row; the wrapping flex translates -50% over ~38s, linear,
 * infinite, so the loop returns cleanly to its start.
 *
 * Reduced-motion: animation paused (chips remain visible as a static row).
 * A11y: the cloned half is aria-hidden so screen readers read once.
 *
 * The marquee is full-bleed; CSS edge mask fades chips to transparent at the
 * left and right edges so they dissolve into the section bg.
 */
export function OutcomeMarquee({ chips }: { chips: string[] }) {
  return (
    <div
      aria-label="Outcomes"
      className="relative w-full overflow-hidden py-[18px] [mask-image:linear-gradient(to_right,transparent_0,black_64px,black_calc(100%-64px),transparent_100%)]"
    >
      <div className="flex w-max items-center gap-[14px] animate-marquee-x motion-reduce:!animate-none">
        <ChipRow chips={chips} />
        <ChipRow chips={chips} ariaHidden />
      </div>
    </div>
  );
}

function ChipRow({
  chips,
  ariaHidden,
}: {
  chips: string[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-[14px]"
      aria-hidden={ariaHidden ? true : undefined}
    >
      {chips.map((chip, i) => (
        <li key={`${chip}-${i}`} className="flex items-center gap-[14px]">
          <span className="inline-flex items-center gap-[8px] rounded-full border border-walnut-500/15 bg-white px-[14px] py-[6px] font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-700">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-walnut-500" />
            {chip}
          </span>
          <span className="inline-block h-[3px] w-[3px] rounded-full bg-walnut-300/70" />
        </li>
      ))}
    </ul>
  );
}
