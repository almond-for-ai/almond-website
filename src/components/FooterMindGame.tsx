"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

const MindGame = dynamic(
  () => import("@/components/MindGame").then((m) => m.MindGame),
  { ssr: false },
);

const STORAGE_KEY = "mindgame.best";

/* Enough cells to fill the widest viewport at the largest cell size; the
   band clips whatever overflows, so the lattice always reads as edge to edge. */
const LATTICE_CELLS = 260;

/**
 * The footer's top band. At rest it is ambience: a faint lattice of tiles that
 * breathe behind the footer, masked into the black at both edges so there is no
 * card, no border, no seam. Pressing play turns that same lattice into the
 * Mind Snap board in place, so the game is the footer rather than a box sitting
 * on top of it.
 */
export function FooterMindGame() {
  const [live, setLive] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n > 0) setBest(n);
  }, []);

  // The band grows well past the viewport when it wakes up, so follow it down
  // once the height transition has settled.
  const play = () => {
    setLive(true);
    window.setTimeout(() => {
      bandRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 720);
  };

  // Re-read the best score whenever the board closes, so the resting state
  // reflects the run that just finished.
  const exit = () => {
    setLive(false);
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const n = raw ? parseInt(raw, 10) : NaN;
    if (!Number.isNaN(n) && n > 0) setBest(n);
  };

  return (
    <div
      ref={bandRef}
      className={[
        "relative w-full overflow-hidden transition-[height] duration-700 ease-out motion-reduce:transition-none",
        live ? "h-[560px] md:h-[640px]" : "h-[200px] md:h-[260px]",
      ].join(" ")}
    >
      <LatticeBackdrop dimmed={live} />

      {live ? (
        <div className="container-x relative z-10 h-full">
          <MindGame autoStart bare onExit={exit} />
        </div>
      ) : (
        <RestingInvite best={best} onPlay={play} />
      )}
    </div>
  );
}

/* ============================================================
   Resting state: a quiet line, not a hero
============================================================ */

function RestingInvite({ best, onPlay }: { best: number | null; onPlay: () => void }) {
  return (
    <div className="container-x relative z-10 flex h-full flex-col items-center justify-center gap-[10px] text-center">
      <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">
        Mind Snap
      </span>
      <p className="max-w-[380px] text-[14px] leading-[20px] text-white/55">
        Watch the flash. Tap it back from memory.
      </p>
      <div className="mt-[6px] flex items-center gap-[14px]">
        <button
          type="button"
          onClick={onPlay}
          className="rounded-full border border-white/20 px-[20px] py-[9px] text-[13px] font-medium text-white/80 transition hover:border-white/45 hover:text-white"
        >
          Play
        </button>
        {best !== null && (
          <span className="text-[12px] uppercase tracking-[0.16em] text-white/30">
            Best {best}
          </span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Ambient lattice
============================================================ */

function LatticeBackdrop({ dimmed }: { dimmed: boolean }) {
  // Index-derived so server and client render byte-identical markup.
  const cells = useMemo(
    () =>
      Array.from({ length: LATTICE_CELLS }, (_, i) => ({
        i,
        // A sparse, non-repeating-looking subset breathes; the rest sit still.
        breathes: i % 7 === 3 || i % 11 === 5,
        delay: `${((i * 137) % 4200) / 1000}s`,
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 z-0 transition-opacity duration-700",
        // Dissolve into the black at both edges: this is what removes the seam.
        "[mask-image:linear-gradient(to_bottom,transparent,#000_38%,#000_62%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_38%,#000_62%,transparent)]",
        dimmed ? "opacity-[0.12]" : "opacity-100",
      ].join(" ")}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-[8px] p-[8px] md:grid-cols-[repeat(auto-fill,minmax(56px,1fr))] md:gap-[10px]">
        {cells.map((c) => (
          <span
            key={c.i}
            className={[
              "aspect-square rounded-[10px] bg-white/[0.045] md:rounded-[12px]",
              c.breathes ? "lattice-breathe" : "",
            ].join(" ")}
            style={c.breathes ? { animationDelay: c.delay } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
