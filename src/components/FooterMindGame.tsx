"use client";

import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MindGame = dynamic(
  () => import("@/components/MindGame").then((m) => m.MindGame),
  { ssr: false },
);

const STORAGE_KEY = "mindgame.best";

/* Enough cells to fill the widest viewport at the largest cell size; the
   band clips whatever overflows, so the lattice always reads as edge to edge. */
const LATTICE_CELLS = 260;

/* Total time for the wake flash to sweep from the first cell to the last. */
const WAKE_SWEEP_MS = 900;
/* Longest single-cell flash duration, so the tail cell finishes cleanly. */
const WAKE_CELL_MS = 620;

/**
 * The footer's top band. At rest it is ambience: a faint lattice of tiles that
 * breathe behind the footer, masked into the black at both edges so there is no
 * card, no border, no seam. Pressing play turns that same lattice into the
 * Mind Snap board in place, so the game is the footer rather than a box sitting
 * on top of it.
 *
 * Every time the band scrolls into view, the lattice wakes: a flash sweeps
 * across the tiles, the Play button gets a double pulse, and a soft chime
 * plays (best-effort — browsers that haven't seen a user gesture yet will
 * just skip the audio). It re-arms once the band leaves view, so scrolling
 * past it and back triggers it again rather than firing continuously while
 * it sits on screen.
 */
export function FooterMindGame() {
  const [live, setLive] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const [waking, setWaking] = useState(false);
  const bandRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef(false);
  liveRef.current = live;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n > 0) setBest(n);
  }, []);

  const playChime = useCallback(() => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const notes: [number, number][] = [
        [523.25, 0],
        [783.99, 0.09],
      ];
      notes.forEach(([freq, offset]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.connect(gain);
        gain.connect(ctx.destination);
        const start = ctx.currentTime + offset;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.1, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
        osc.start(start);
        osc.stop(start + 0.32);
      });
      window.setTimeout(() => ctx.close(), 700);
    } catch {
      // Autoplay-restricted or no audio support: the wave and pulse still land.
    }
  }, []);

  // Edge-triggered: fire when the band crosses into view, not while it sits
  // there. wasInView tracks the previous state so scroll jitter around the
  // threshold doesn't retrigger, but leaving and coming back does.
  const wasInView = useRef(false);
  const wakingRef = useRef(false);
  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    const el = bandRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        if (inView && !wasInView.current && !wakingRef.current && !liveRef.current) {
          wakingRef.current = true;
          setWaking(true);
          playChime();
          window.setTimeout(() => {
            wakingRef.current = false;
            setWaking(false);
          }, WAKE_SWEEP_MS + WAKE_CELL_MS + 200);
        }
        wasInView.current = inView;
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, playChime]);

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
      <LatticeBackdrop dimmed={live} waking={waking} />

      {live ? (
        <div className="container-x relative z-10 h-full">
          <MindGame autoStart bare onExit={exit} />
        </div>
      ) : (
        <RestingInvite best={best} onPlay={play} waking={waking} />
      )}
    </div>
  );
}

/* ============================================================
   Resting state: a quiet line, not a hero
============================================================ */

function RestingInvite({
  best,
  onPlay,
  waking,
}: {
  best: number | null;
  onPlay: () => void;
  waking: boolean;
}) {
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
          className={[
            "rounded-full border border-white/20 px-[20px] py-[9px] text-[13px] font-medium text-white/80 transition hover:border-white/45 hover:text-white",
            waking ? "button-wake-pulse" : "",
          ].join(" ")}
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

function LatticeBackdrop({
  dimmed,
  waking,
}: {
  dimmed: boolean;
  waking: boolean;
}) {
  // Index-derived so server and client render byte-identical markup. Grid
  // auto-flow places items left-to-right, row by row, so spreading the wake
  // delay linearly by index reads as a wave crossing the lattice.
  const cells = useMemo(
    () =>
      Array.from({ length: LATTICE_CELLS }, (_, i) => ({
        i,
        // A sparse, non-repeating-looking subset breathes; the rest sit still.
        breathes: i % 7 === 3 || i % 11 === 5,
        breatheDelay: `${((i * 137) % 4200) / 1000}s`,
        wakeDelay: `${Math.round((i / LATTICE_CELLS) * WAKE_SWEEP_MS)}ms`,
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
              waking ? "lattice-wake" : c.breathes ? "lattice-breathe" : "",
            ].join(" ")}
            style={
              waking
                ? { animationDelay: c.wakeDelay }
                : c.breathes
                  ? { animationDelay: c.breatheDelay }
                  : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
