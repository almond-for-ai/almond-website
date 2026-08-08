"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Phase = "idle" | "flash" | "input" | "between" | "over" | "paused";

const GAME_DURATION = 60;
const FLASH_MS_START = 1200;
const FLASH_MS_MIN = 450;
const BETWEEN_MS = 600;
const STORAGE_KEY = "mindgame.best";

function pickIndices(total: number, count: number): number[] {
  const pool = Array.from({ length: total }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function useAudio(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const getCtx = useCallback(() => {
    if (!enabled) return null;
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }
    return ctxRef.current;
  }, [enabled]);

  return useCallback(
    (kind: "correct" | "wrong" | "flash" | "over" | "round") => {
      const ctx = getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const map = {
        correct: { f: 880, t: "sine" as const, d: 0.12, v: 0.18 },
        wrong: { f: 180, t: "square" as const, d: 0.18, v: 0.18 },
        flash: { f: 520, t: "triangle" as const, d: 0.08, v: 0.12 },
        round: { f: 660, t: "sine" as const, d: 0.18, v: 0.16 },
        over: { f: 220, t: "sawtooth" as const, d: 0.45, v: 0.2 },
      };
      const cfg = map[kind];
      osc.type = cfg.t;
      osc.frequency.setValueAtTime(cfg.f, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(cfg.v, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.d);
      osc.start(now);
      osc.stop(now + cfg.d + 0.02);
    },
    [getCtx]
  );
}

type Confetti = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
  size: number;
  life: number;
};

type MindGameProps = {
  /** Skip the idle title card and deal the first round on mount. */
  autoStart?: boolean;
  /** Drop the card chrome so the board sits directly on the host surface. */
  bare?: boolean;
  /** When present, the game-over state offers a way back out. */
  onExit?: () => void;
};

export function MindGame({ autoStart = false, bare = false, onExit }: MindGameProps = {}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [gridSize, setGridSize] = useState(5);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [pattern, setPattern] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [correctTaps, setCorrectTaps] = useState<Set<number>>(new Set());
  const [wrongTaps, setWrongTaps] = useState<Set<number>>(new Set());
  const [tapsLeft, setTapsLeft] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [newHigh, setNewHigh] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const play = useAudio(soundOn);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;
  const timerRef = useRef<number | null>(null);
  const flashTimeoutRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const highTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n)) setBest(n);
    }
  }, []);

  const flashDuration = useMemo(() => {
    return Math.max(FLASH_MS_MIN, FLASH_MS_START - (round - 1) * 60);
  }, [round]);

  const patternCount = useMemo(() => {
    return Math.min(Math.floor(gridSize * gridSize * 0.6), 3 + Math.floor((round - 1) / 1));
  }, [round, gridSize]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (flashTimeoutRef.current) {
      window.clearTimeout(flashTimeoutRef.current);
      flashTimeoutRef.current = null;
    }
  }, []);

  const startRound = useCallback(
    (r: number, size: number) => {
      const count = Math.min(Math.floor(size * size * 0.6), 3 + Math.floor((r - 1)));
      const dur = Math.max(FLASH_MS_MIN, FLASH_MS_START - (r - 1) * 60);
      const idx = pickIndices(size * size, count);
      setPattern(idx);
      setRevealed(new Set(idx));
      setCorrectTaps(new Set());
      setWrongTaps(new Set());
      setTapsLeft(count);
      setPhase("flash");
      play("flash");
      if (flashTimeoutRef.current) window.clearTimeout(flashTimeoutRef.current);
      flashTimeoutRef.current = window.setTimeout(() => {
        setRevealed(new Set());
        setPhase("input");
      }, dur);
    },
    [play]
  );

  const endGame = useCallback(
    (finalScore: number) => {
      clearTimers();
      setPhase("over");
      play("over");
      if (finalScore > best) {
        setBest(finalScore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, String(finalScore));
        }
        if (!highTriggeredRef.current) {
          highTriggeredRef.current = true;
          setNewHigh(true);
          launchConfetti();
        }
      }
    },
    [best, clearTimers, play]
  );

  const launchConfetti = useCallback(() => {
    const colors = ["#7B4019", "#A36740", "#22D3EE", "#F4E5D4", "#FFFFFF"];
    const pieces: Confetti[] = Array.from({ length: 80 }, (_, i) => ({
      id: Date.now() + i,
      x: 50,
      y: 50,
      vx: (Math.random() - 0.5) * 60,
      vy: -20 - Math.random() * 40,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
      life: 1,
    }));
    setConfetti(pieces);
  }, []);

  useEffect(() => {
    if (confetti.length === 0) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setConfetti((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt,
            y: p.y + p.vy * dt,
            vy: p.vy + 80 * dt,
            rot: p.rot + p.vr,
            life: p.life - dt * 0.4,
          }))
          .filter((p) => p.life > 0 && p.y < 130)
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [confetti.length]);

  const beginGame = useCallback(() => {
    clearTimers();
    highTriggeredRef.current = false;
    setNewHigh(false);
    setConfetti([]);
    setScore(0);
    setRound(1);
    setTimeLeft(GAME_DURATION);
    setGridSize(5);
    startRound(1, 5);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timerRef.current!);
          timerRef.current = null;
          setScore((s) => {
            endGame(s);
            return s;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [clearTimers, startRound, endGame]);

  const advanceRound = useCallback(() => {
    setPhase("between");
    play("round");
    window.setTimeout(() => {
      setRound((r) => {
        const next = r + 1;
        const nextSize = next >= 8 ? 6 : 5;
        setGridSize(nextSize);
        startRound(next, nextSize);
        return next;
      });
    }, BETWEEN_MS);
  }, [play, startRound]);

  const handleTap = useCallback(
    (i: number) => {
      if (phase !== "input") return;
      if (correctTaps.has(i) || wrongTaps.has(i)) return;

      const isCorrect = pattern.includes(i);
      if (isCorrect) {
        setCorrectTaps((s) => {
          const n = new Set(s);
          n.add(i);
          return n;
        });
        setScore((s) => s + 1);
        play("correct");
      } else {
        setWrongTaps((s) => {
          const n = new Set(s);
          n.add(i);
          return n;
        });
        setScore((s) => s - 1);
        play("wrong");
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(80);
        }
      }
      setTapsLeft((t) => {
        const next = t - 1;
        if (next <= 0) {
          advanceRound();
        }
        return next;
      });
    },
    [phase, pattern, correctTaps, wrongTaps, play, advanceRound]
  );

  const pause = useCallback(() => {
    if (phase !== "input" && phase !== "flash") return;
    pausedAtRef.current = Date.now();
    clearTimers();
    setPhase("paused");
  }, [phase, clearTimers]);

  const resume = useCallback(() => {
    if (phase !== "paused") return;
    setPhase("input");
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timerRef.current!);
          timerRef.current = null;
          setScore((s) => {
            endGame(s);
            return s;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [phase, endGame]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  /* Deal the first round on mount when the host asked for it. This reads the
     latest beginGame through a ref so the effect depends only on autoStart:
     depending on beginGame itself would restart the run every time a new best
     score changes its identity, and a one-shot ref guard would leave the board
     frozen after StrictMode's remount cleared the timers. */
  const beginGameRef = useRef(beginGame);
  beginGameRef.current = beginGame;
  useEffect(() => {
    if (!autoStart) return;
    beginGameRef.current();
    return () => clearTimers();
  }, [autoStart, clearTimers]);

  const cells = useMemo(
    () => Array.from({ length: gridSize * gridSize }, (_, i) => i),
    [gridSize]
  );

  const isPlaying =
    phase === "flash" || phase === "input" || phase === "between" || phase === "paused";

  return (
    <div className="relative h-full w-full">
      {/* HUD */}
      <div className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-4 pt-4 md:px-8 md:pt-6">
        <div className="flex gap-2 text-[11px] font-medium text-white/90 md:text-[12px]">
          <Stat label="Score" value={score} bare={bare} />
          <Stat label="Best" value={best} bare={bare} />
          <Stat label="Round" value={round} bare={bare} />
          <Stat label="Time" value={`${timeLeft}s`} highlight={timeLeft <= 10} bare={bare} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            aria-label={soundOn ? "Mute sound" : "Unmute sound"}
            className={CONTROL_BUTTON[bare ? "bare" : "card"]}
          >
            {soundOn ? <IconSound /> : <IconMute />}
          </button>
          {isPlaying && (
            <button
              type="button"
              onClick={phase === "paused" ? resume : pause}
              aria-label={phase === "paused" ? "Resume" : "Pause"}
              className={CONTROL_BUTTON[bare ? "bare" : "card"]}
            >
              {phase === "paused" ? <IconPlay /> : <IconPause />}
            </button>
          )}
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              aria-label="Close the game"
              className={CONTROL_BUTTON[bare ? "bare" : "card"]}
            >
              <IconClose />
            </button>
          )}
        </div>
      </div>

      {/* Board */}
      <div className="flex h-full w-full items-center justify-center px-4 pb-6 pt-20 md:pt-24">
        <div
          className="grid w-full max-w-[420px] gap-[6px] md:max-w-[440px] md:gap-[8px]"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {cells.map((i) => {
            const isLit = revealed.has(i) && phase === "flash";
            const isCorrect = correctTaps.has(i);
            const isWrong = wrongTaps.has(i);
            const tappable = phase === "input" && !isCorrect && !isWrong;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleTap(i)}
                disabled={!tappable}
                aria-label={`Tile ${i + 1}`}
                className={[
                  "relative aspect-square rounded-[10px] transition-all duration-150 md:rounded-[12px]",
                  isLit
                    ? "bg-white shadow-[0_0_24px_rgba(255,255,255,0.55)] scale-[1.04]"
                    : isCorrect
                    ? "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.55)]"
                    : isWrong
                    ? "bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.55)]"
                    : "bg-white/10 hover:bg-white/20 active:scale-95",
                  !tappable && !isLit && !isCorrect && !isWrong ? "cursor-default" : "",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      {/* Start overlay */}
      {phase === "idle" && !autoStart && (
        <Overlay bare={bare}>
          <h3 className="text-[24px] font-medium tracking-[-0.48px] text-white md:text-[28px]">
            Mind Snap
          </h3>
          <p className="mt-2 max-w-[320px] text-center text-[14px] leading-[20px] text-white/70">
            Watch the flash. Tap the same tiles from memory. 60 seconds.
          </p>
          <button
            type="button"
            onClick={beginGame}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-medium text-walnut-500 transition hover:bg-walnut-50"
          >
            Start Game
          </button>
        </Overlay>
      )}

      {/* Paused overlay */}
      {phase === "paused" && (
        <Overlay bare={bare}>
          <h3 className="text-[20px] font-medium text-white">Paused</h3>
          <button
            type="button"
            onClick={resume}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-[14px] font-medium text-walnut-500 hover:bg-walnut-50"
          >
            Resume
          </button>
        </Overlay>
      )}

      {/* Game over overlay */}
      {phase === "over" && (
        <Overlay bare={bare}>
          {newHigh && (
            <span className="mb-3 rounded-full bg-cyan-400/20 px-3 py-1 text-[12px] font-medium text-cyan-200">
              New High Score!
            </span>
          )}
          <h3 className="text-[24px] font-medium tracking-[-0.48px] text-white md:text-[28px]">
            Game Over
          </h3>
          <div className="mt-4 flex gap-6">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-white/60">Final</div>
              <div className="text-[28px] font-medium text-white">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-white/60">Best</div>
              <div className="text-[28px] font-medium text-white">{best}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={beginGame}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-medium text-walnut-500 hover:bg-walnut-50"
            >
              Play Again
            </button>
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="text-[12px] uppercase tracking-[0.18em] text-white/45 transition hover:text-white/75"
              >
                Back to the footer
              </button>
            )}
          </div>
        </Overlay>
      )}

      {/* Confetti layer */}
      {confetti.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          {confetti.map((p) => (
            <span
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size * 0.4,
                background: p.color,
                opacity: Math.max(0, p.life),
                transform: `rotate(${p.rot}deg)`,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      )}

      {/* hidden status for screen readers */}
      <div className="sr-only" aria-live="polite">
        {phase === "flash"
          ? `Memorize ${pattern.length} tiles`
          : phase === "input"
          ? `Your turn. ${tapsLeft} taps left.`
          : phase === "over"
          ? `Game over. Score ${score}.`
          : ""}
      </div>

      {/* round/flash subtle hint */}
      {phase === "input" && (
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 text-center text-[11px] font-medium uppercase tracking-wider text-white/50 md:text-[12px]">
          {tapsLeft} {tapsLeft === 1 ? "tap" : "taps"} left · flash {Math.round(flashDuration)}ms
        </div>
      )}
    </div>
  );
}

const CONTROL_BUTTON = {
  card: "flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25",
  bare: "flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/35 hover:text-white",
} as const;

function Stat({
  label,
  value,
  highlight,
  bare,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
  bare?: boolean;
}) {
  if (bare) {
    return (
      <div className="flex items-baseline gap-1.5 uppercase tracking-[0.14em]">
        <span className="text-white/35">{label}</span>
        <span className={highlight ? "font-medium text-red-300" : "font-medium text-white/85"}>
          {value}
        </span>
      </div>
    );
  }
  return (
    <div
      className={[
        "rounded-full px-3 py-1.5 leading-none backdrop-blur",
        highlight ? "bg-red-500/30 text-white" : "bg-white/15 text-white",
      ].join(" ")}
    >
      <span className="text-white/60">{label} </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Overlay({ children, bare }: { children: React.ReactNode; bare?: boolean }) {
  return (
    <div
      className={[
        "absolute inset-0 z-20 flex flex-col items-center justify-center px-6",
        bare ? "bg-black/70" : "bg-black/55 backdrop-blur-sm",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function IconSound() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
function IconMute() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}
