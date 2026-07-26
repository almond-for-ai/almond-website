"use client";

import {
  AnimatePresence,
  motion,
  motionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  BELIEF,
  CAPTIONS,
  CORE_CARDS,
  CURSORS,
  DISCOVERIES,
  EXTRA_CARDS,
  PEOPLE,
  SCRAPS,
  type BodyToken,
  type BoardCardData,
  type Discovery,
  type Pos,
} from "@/components/board/board-data";
import { MOTION_EASE } from "@/lib/motion-tokens";

/**
 * The board: several people's cards, threaded into the one belief they share.
 *
 * Two things make it a board rather than a picture of one.
 *
 * 1. Everything drags, and the threads are *derived* rather than authored —
 *    each card owns x/y motion values, resting centres are measured from
 *    layout, and the path `d` is composed from both. Move anything and the
 *    links stay welded to both ends; they cannot drift out of place the way
 *    hand-written path strings do.
 * 2. Nothing is explained up front. Captions are earned: drag a card, pin a
 *    belief, meet somebody else's cursor.
 *
 * `progress` (optional) scrubs the assembly for the pinned home scene. Without
 * it the board renders assembled and live, which is what the dedicated page
 * wants.
 */

const SETTLED = motionValue(1);

/** Below this board width the layout switches to the stacked cascade. */
const NARROW_AT = 620;

export type Density = "teaser" | "full";

type Anchor = { x: number; y: number };
type DragMV = { x: MotionValue<number>; y: MotionValue<number> };

export function BoardCanvas({
  progress,
  density = "teaser",
  className = "",
}: {
  progress?: MotionValue<number>;
  density?: Density;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const src = progress ?? SETTLED;

  const boardRef = useRef<HTMLDivElement>(null);
  const els = useRef<Record<string, HTMLDivElement | null>>({});
  const [anchors, setAnchors] = useState<Record<string, Anchor>>({});
  const [narrow, setNarrow] = useState(false);

  const cards = useMemo(
    () => (density === "full" ? [...CORE_CARDS, ...EXTRA_CARDS] : CORE_CARDS),
    [density],
  );

  // One pair of motion values per draggable, created once outside the render
  // graph so threads can read live positions without hooks in a loop.
  const drag = useRef<Record<string, DragMV>>({});
  if (Object.keys(drag.current).length === 0) {
    for (const c of [...CORE_CARDS, ...EXTRA_CARDS]) {
      drag.current[c.id] = { x: motionValue(0), y: motionValue(0) };
    }
    drag.current.belief = { x: motionValue(0), y: motionValue(0) };
    SCRAPS.forEach((_, i) => {
      drag.current[`scrap-${i}`] = { x: motionValue(0), y: motionValue(0) };
    });
  }

  const [live, setLive] = useState(() => !progress || src.get() > 0.6);
  useMotionValueEvent(src, "change", (v) => setLive(v > 0.6));

  const [active, setActive] = useState<string | null>(null);
  const [found, setFound] = useState<Discovery[]>([]);
  const [caption, setCaption] = useState<string>(CAPTIONS.idle);
  const [touched, setTouched] = useState(false);

  // Until someone takes over, the board shows itself working: each memory takes
  // a turn feeding the belief, so a thread is always alive.
  useEffect(() => {
    if (!live || touched || reduce) return;
    let i = 0;
    setActive(CORE_CARDS[0].id);
    const t = setInterval(() => {
      i = (i + 1) % CORE_CARDS.length;
      setActive(CORE_CARDS[i].id);
    }, 2800);
    return () => clearInterval(t);
  }, [live, touched, reduce]);

  const discover = useCallback((d: Discovery) => {
    setTouched(true);
    setFound((prev) => {
      if (prev.includes(d)) {
        setCaption(CAPTIONS[d]);
        return prev;
      }
      const next = [...prev, d];
      setCaption(
        next.length === DISCOVERIES.length ? CAPTIONS.done : CAPTIONS[d],
      );
      return next;
    });
  }, []);

  // Resting centres, measured from layout so threads never guess. Cards are
  // absolutely positioned children of the board, so offsetLeft/Top are already
  // board-relative and unaffected by any transform stacked on top.
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const measure = () => {
      setNarrow(board.clientWidth < NARROW_AT);
      const next: Record<string, Anchor> = {};
      for (const [id, el] of Object.entries(els.current)) {
        if (!el) continue;
        next[id] = {
          x: el.offsetLeft + el.offsetWidth / 2,
          y: el.offsetTop + el.offsetHeight / 2,
        };
      }
      setAnchors(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(board);
    return () => ro.disconnect();
  }, [cards.length, density, narrow]);

  const beliefPos = narrow
    ? density === "full"
      ? BELIEF.narrowFull
      : BELIEF.narrow
    : density === "full"
      ? BELIEF.wideFull
      : BELIEF.wide;

  // Aspect follows the *measured* layout, not a CSS breakpoint — otherwise a
  // 700px-wide window gets the wide card positions inside the tall box.
  const aspectRatio = narrow
    ? density === "full"
      ? "10 / 19"
      : "10 / 13"
    : density === "full"
      ? "10 / 7"
      : "16 / 10";

  return (
    <div className={className}>
      <div
        ref={boardRef}
        style={{ aspectRatio }}
        className="relative w-full touch-pan-y overflow-hidden rounded-[24px] border border-black/[0.07] bg-[#f5f2ee] md:rounded-[28px]"
      >
        <div className="halftone-bg absolute inset-0" aria-hidden />
        <Ticks />
        <Presence live={live} onMeet={() => discover("presence")} />

        {/* threads sit under the cards, so both ends vanish beneath them */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {cards.map((c) =>
            anchors[c.id] && anchors.belief ? (
              <Thread
                key={c.id}
                src={src}
                from={anchors[c.id]}
                to={anchors.belief}
                fromDrag={drag.current[c.id]}
                toDrag={drag.current.belief}
                color={PEOPLE[c.person].color}
                active={active === c.id}
              />
            ) : null,
          )}
        </svg>

        {/* loose scraps — wide layouts only, they'd crowd a phone */}
        {!narrow &&
          SCRAPS.map((s, i) => (
            <EntryWrap
              key={`scrap-${i}`}
              src={src}
              pos={s.wide}
              rotate={s.rotate}
              index={cards.length + i}
            >
              <Draggable
                live={live}
                boardRef={boardRef}
                mv={drag.current[`scrap-${i}`]}
                onDragStart={() => discover("drag")}
              >
                <div className="rounded-[10px] bg-walnut-100 px-[12px] py-[10px] text-[12px] leading-[16px] text-walnut-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  {s.text}
                </div>
              </Draggable>
            </EntryWrap>
          ))}

        {cards.map((card, i) => (
          <EntryWrap
            key={card.id}
            src={src}
            pos={
              narrow
                ? density === "full"
                  ? (card.narrowFull ?? card.narrow)
                  : card.narrow
                : card.wide
            }
            rotate={card.rotate}
            index={i}
            innerRef={(el) => {
              els.current[card.id] = el;
            }}
          >
            <Draggable
              live={live}
              boardRef={boardRef}
              mv={drag.current[card.id]}
              onDragStart={() => {
                setActive(card.id);
                discover("drag");
              }}
              onPick={() => {
                setActive((cur) => (cur === card.id ? null : card.id));
                discover("pin");
              }}
            >
              <MemoryCard card={card} active={active === card.id} />
            </Draggable>
          </EntryWrap>
        ))}

        <EntryWrap
          src={src}
          pos={beliefPos}
          rotate={0}
          index={-1}
          belief
          innerRef={(el) => {
            els.current.belief = el;
          }}
        >
          <Draggable
            live={live}
            boardRef={boardRef}
            mv={drag.current.belief}
            onDragStart={() => discover("drag")}
            onPick={() => discover("pin")}
          >
            <BeliefCard active={active} />
          </Draggable>
        </EntryWrap>

        {!reduce &&
          CURSORS.map((c) => (
            <Cursor
              key={c.person}
              data={c}
              narrow={narrow}
              src={src}
              onMeet={() => discover("presence")}
            />
          ))}
      </div>

      <Captions live={live} caption={caption} found={found} reduce={!!reduce} />
    </div>
  );
}

/* ============================================================
   Entry layer — scroll-driven assembly, kept apart from drag
   ============================================================ */

function EntryWrap({
  src,
  pos,
  rotate,
  index,
  belief = false,
  children,
  innerRef,
}: {
  src: MotionValue<number>;
  pos: Pos;
  rotate: number;
  index: number;
  belief?: boolean;
  children: ReactNode;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  // Cards drift in from past the edge they rest nearest; the belief simply
  // resolves in the middle once they have arrived.
  const start = belief ? 0.34 : 0.12 + Math.min(index, 5) * 0.035;
  const end = belief ? 0.5 : start + 0.18;

  const opacity = useTransform(src, [start, end], [0, 1]);
  const x = useTransform(
    src,
    [start, end],
    [belief ? 0 : (pos.left + pos.width / 2 - 50) * 5, 0],
  );
  const y = useTransform(src, [start, end], [belief ? 0 : (pos.top - 42) * 3.4, 0]);
  const scale = useTransform(src, [start, end], [belief ? 0.9 : 0.96, 1]);
  const rot = useTransform(src, [start, end], [rotate * 3, rotate]);

  return (
    <motion.div
      ref={innerRef}
      className="absolute"
      style={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        width: `${pos.width}%`,
        opacity,
        x,
        y,
        scale,
        rotate: rot,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Drag layer
   ============================================================ */

function Draggable({
  live,
  boardRef,
  mv,
  onDragStart,
  onPick,
  children,
}: {
  live: boolean;
  boardRef: RefObject<HTMLDivElement | null>;
  mv: DragMV;
  onDragStart?: () => void;
  /** tap that wasn't a drag */
  onPick?: () => void;
  children: ReactNode;
}) {
  const dragged = useRef(false);

  return (
    <motion.div
      drag={live}
      dragConstraints={boardRef}
      dragMomentum={false}
      dragElastic={0.12}
      onDragStart={() => {
        dragged.current = true;
        onDragStart?.();
      }}
      onTap={() => {
        // A drag ends with a pointer-up too; don't let it count as a pick.
        if (dragged.current) {
          dragged.current = false;
          return;
        }
        onPick?.();
      }}
      whileDrag={{ scale: 1.03, zIndex: 30 }}
      style={{ x: mv.x, y: mv.y }}
      className={live ? "cursor-grab active:cursor-grabbing" : ""}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Threads — path composed from measured centres + live drag
   ============================================================ */

function Thread({
  src,
  from,
  to,
  fromDrag,
  toDrag,
  color,
  active,
}: {
  src: MotionValue<number>;
  from: Anchor;
  to: Anchor;
  fromDrag: DragMV;
  toDrag: DragMV;
  color: string;
  active: boolean;
}) {
  const x1 = useTransform(fromDrag.x, (v) => from.x + v);
  const y1 = useTransform(fromDrag.y, (v) => from.y + v);
  const x2 = useTransform(toDrag.x, (v) => to.x + v);
  const y2 = useTransform(toDrag.y, (v) => to.y + v);

  // Control point: midpoint pushed along the perpendicular, so the thread sags
  // like slack wire instead of reading as a ruled line.
  const cx = useTransform(
    [x1, y1, x2, y2],
    ([a, b, c, d]: number[]) => (a + c) / 2 + (d - b) * 0.08,
  );
  const cy = useTransform(
    [x1, y1, x2, y2],
    ([a, b, c, d]: number[]) => (b + d) / 2 - (c - a) * 0.08,
  );

  const d = useMotionTemplate`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
  const opacity = useTransform(src, [0.4, 0.54], [0, active ? 0.9 : 0.32]);

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={active ? 2 : 1.1}
      strokeDasharray="3 6"
      strokeLinecap="round"
      style={{ opacity }}
      animate={active ? { strokeDashoffset: [0, -18] } : { strokeDashoffset: 0 }}
      transition={
        active
          ? { duration: 1.1, repeat: Infinity, ease: "linear" }
          : { duration: 0.3 }
      }
    />
  );
}

/* ============================================================
   Pieces
   ============================================================ */

function MemoryCard({ card, active }: { card: BoardCardData; active: boolean }) {
  const p = PEOPLE[card.person];
  return (
    <div
      className="select-none rounded-[14px] border bg-white p-[11px] transition-shadow duration-300 md:p-[12px]"
      style={{
        borderColor: active ? p.color : "rgba(0,0,0,0.08)",
        boxShadow: active
          ? "0 8px 24px rgba(123,64,25,0.16)"
          : "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-[5px]">
        <span
          className="h-[7px] w-[7px] shrink-0 rounded-full"
          style={{ background: p.color }}
        />
        <span className="truncate font-mono text-[9.5px] uppercase tracking-[0.14em] text-black/45 md:text-[10px]">
          {p.name}
          {card.source ? ` · ${card.source}` : ""}
        </span>
        {card.sourceBar ? <Redacted w={card.sourceBar} /> : null}
        <span className="ml-auto whitespace-nowrap font-mono text-[9.5px] text-black/30 md:text-[10px]">
          {card.when}
        </span>
      </div>
      <p className="mt-[7px] flex flex-wrap items-center gap-x-[5px] gap-y-[5px] text-[12px] leading-[17px] text-black/70 md:text-[12.5px]">
        {card.body.map((t: BodyToken, i) =>
          typeof t === "string" ? <span key={i}>{t}</span> : <Redacted key={i} w={t} />,
        )}
      </p>
    </div>
  );
}

function BeliefCard({ active }: { active: string | null }) {
  return (
    <div className="select-none rounded-[16px] bg-walnut-500 p-[14px] text-white shadow-[0_12px_36px_rgba(123,64,25,0.22)] md:rounded-[18px] md:p-[16px]">
      <div className="flex items-center gap-[6px]">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/60 md:text-[10px]">
          {BELIEF.label}
        </span>
        <span className="ml-auto flex items-center gap-[5px]">
          {CORE_CARDS.map((c) => (
            <span
              key={c.id}
              className="h-[6px] w-[6px] rounded-full bg-white transition-opacity duration-300"
              style={{ opacity: active === c.id ? 1 : 0.35 }}
            />
          ))}
        </span>
      </div>
      <p className="mt-[8px] font-display text-[18px] leading-[1.2] tracking-[-0.01em] md:text-[22px]">
        {BELIEF.claim}
      </p>
      <p className="mt-[9px] font-mono text-[10px] leading-[15px] text-white/55 md:text-[10.5px]">
        {BELIEF.meta}
      </p>
    </div>
  );
}

/** A blacked-out run. Fixed widths keep server and client identical. */
function Redacted({ w }: { w: number }) {
  return (
    <span
      aria-hidden
      className="inline-block h-[8px] shrink-0 rounded-[2px] bg-black/[0.13] align-middle"
      style={{ width: w }}
    />
  );
}

function Cursor({
  data,
  narrow,
  src,
  onMeet,
}: {
  data: (typeof CURSORS)[number];
  narrow: boolean;
  src: MotionValue<number>;
  onMeet: () => void;
}) {
  const p = PEOPLE[data.person];
  const opacity = useTransform(src, [0.5, 0.62], [0, 1]);
  const path = narrow ? data.narrowPath : data.path;

  return (
    <motion.div
      key={narrow ? "n" : "w"}
      className="pointer-events-none absolute z-20"
      style={{ opacity }}
      initial={{ left: `${path[0].x}%`, top: `${path[0].y}%` }}
      animate={{
        left: path.map((pt) => `${pt.x}%`),
        top: path.map((pt) => `${pt.y}%`),
      }}
      transition={{ duration: data.dur, repeat: Infinity, ease: "easeInOut" }}
    >
      <Pointer color={p.color} />
      <span
        onMouseEnter={onMeet}
        className="pointer-events-auto ml-[9px] mt-[1px] inline-block rounded-[4px] px-[5px] py-[1px] font-mono text-[9px] text-white md:text-[9.5px]"
        style={{ background: p.color }}
      >
        {p.name}
      </span>
    </motion.div>
  );
}

function Pointer({ color }: { color: string }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
      <path
        d="M1 1l11 6.2-4.8 1.3L5.4 14 1 1z"
        fill={color}
        stroke="#fff"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Presence({ live, onMeet }: { live: boolean; onMeet: () => void }) {
  return (
    // Hovering a 20px cursor that keeps moving is a coin flip, so the static
    // roster counts as meeting the room too.
    <div
      onMouseEnter={onMeet}
      className="absolute left-[14px] top-[14px] z-20 flex items-center gap-[7px]"
    >
      <span className="flex -space-x-[5px]">
        {CURSORS.map((c) => (
          <span
            key={c.person}
            className="h-[14px] w-[14px] rounded-full border border-[#f5f2ee]"
            style={{ background: PEOPLE[c.person].color }}
          />
        ))}
      </span>
      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-black/35">
        {live ? "3 in here" : " "}
      </span>
    </div>
  );
}

function Captions({
  live,
  caption,
  found,
  reduce,
}: {
  live: boolean;
  caption: string;
  found: Discovery[];
  reduce: boolean;
}) {
  return (
    <div className="mt-[14px] flex h-[18px] items-center gap-[10px] px-[4px]">
      <span className="flex items-center gap-[5px]">
        {DISCOVERIES.map((d) => (
          <span
            key={d}
            className="h-[5px] w-[5px] rounded-full transition-colors duration-300"
            style={{
              background: found.includes(d)
                ? "var(--color-walnut-500)"
                : "rgba(0,0,0,0.12)",
            }}
          />
        ))}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={live ? caption : "idle"}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [...MOTION_EASE.reveal] }}
          className="font-mono text-[11px] tracking-[0.02em] text-black/40 md:text-[12px]"
        >
          {live ? caption : " "}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Ticks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {[
        "right-[14px] top-[14px]",
        "left-[14px] bottom-[14px]",
        "right-[14px] bottom-[14px]",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute font-mono text-[11px] leading-none text-black/15 ${pos}`}
        >
          +
        </span>
      ))}
    </div>
  );
}
