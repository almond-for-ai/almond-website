import { BoardCanvas, type Density } from "@/components/board/BoardCanvas";
import { Reveal } from "@/components/Motion";

const EYEBROW = "Multiplayer memory";
const HEADING = "Several minds. One memory.";
const LEAD =
  "Almond remembers for you. This one remembers for the room. Drag a card, pin the belief, and the threads follow.";
const HINT = "Drag anything. The threads stay welded.";

/**
 * The board, fitted to this site's section grammar: eyebrow, heading, lead,
 * then the live canvas. No pinned scroll scene and no background morph, so it
 * keeps the page's existing rhythm instead of interrupting it. Without a
 * `progress` value BoardCanvas renders assembled and immediately playable.
 */
export function BoardSection({
  density = "teaser",
  className = "w-full bg-grey-96 py-[100px] md:py-[140px]",
  id,
}: {
  density?: Density;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} data-section="Board" className={className}>
      <div className="container-x">
        <Reveal y={16}>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-walnut-500">
            {EYEBROW}
          </p>
        </Reveal>
        <Reveal y={20} delay={0.05}>
          <h2 className="mt-[16px] max-w-[640px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-black md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]">
            {HEADING}
          </h2>
        </Reveal>
        <Reveal y={16} delay={0.1}>
          <p className="mt-[18px] max-w-[560px] text-[16px] leading-[24px] text-black/65 md:text-[18px] md:leading-[28px]">
            {LEAD}
          </p>
        </Reveal>

        <Reveal y={24} delay={0.15} className="mt-[48px] md:mt-[56px]">
          <BoardCanvas density={density} />
        </Reveal>

        <p className="pointer-events-none mt-[16px] text-center font-mono text-[11px] uppercase tracking-[0.18em] text-walnut-500/70 md:text-[12px]">
          {HINT}
        </p>
      </div>
    </section>
  );
}
