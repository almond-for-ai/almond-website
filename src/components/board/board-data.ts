/**
 * Content and layout for the shared board scene.
 *
 * Everything here is deliberately static: redaction bar widths are hardcoded
 * rather than random so server and client render identically, and positions are
 * percentages of the canvas box so the same data drives every breakpoint.
 */

export type PersonId = "maya" | "dev" | "rhea" | "ana" | "kit" | "you";

export const PEOPLE: Record<PersonId, { name: string; color: string }> = {
  maya: { name: "maya", color: "#7b4019" },
  dev: { name: "dev", color: "#a36740" },
  rhea: { name: "rhea", color: "#4a260e" },
  ana: { name: "ana", color: "#623213" },
  kit: { name: "kit", color: "#8f5730" },
  you: { name: "you", color: "#321a09" },
};

/** A body is a run of readable clauses and redaction bars (width in px). */
export type BodyToken = string | number;

export type Pos = { left: number; top: number; width: number };

export type BoardCardData = {
  id: string;
  person: PersonId;
  when: string;
  /** readable label after the name, or null when the source is redacted */
  source: string | null;
  sourceBar?: number;
  body: BodyToken[];
  rotate: number;
  wide: Pos;
  narrow: Pos;
  /** the busier board needs its own stacking on a phone */
  narrowFull?: Pos;
};

/** The three that carry the belief — present at every density. */
export const CORE_CARDS: BoardCardData[] = [
  {
    id: "c1",
    person: "maya",
    when: "14 Mar",
    source: null,
    sourceBar: 46,
    body: [58, "scale with the room,", 34, "not the file.", 22],
    rotate: -1.4,
    wide: { left: 4, top: 9, width: 26 },
    narrow: { left: 3, top: 8, width: 60 },
    narrowFull: { left: 3, top: 5, width: 62 },
  },
  {
    id: "c2",
    person: "dev",
    when: "2 Apr",
    source: "#—————",
    body: [40, "reopened this morning.", 30, "closed again, same reason.", 26],
    rotate: 1.6,
    wide: { left: 65, top: 12, width: 28 },
    narrow: { left: 35, top: 26, width: 62 },
    narrowFull: { left: 33, top: 15, width: 64 },
  },
  {
    id: "c3",
    person: "rhea",
    when: "9 Jun",
    source: null,
    sourceBar: 62,
    body: [30, "nobody had to ask twice.", 44, 20],
    rotate: -1.1,
    wide: { left: 57, top: 66, width: 30 },
    narrow: { left: 22, top: 71, width: 68 },
    narrowFull: { left: 24, top: 46, width: 68 },
  },
];

/** Extra weight for the dedicated page — a busier room. */
export const EXTRA_CARDS: BoardCardData[] = [
  {
    id: "c4",
    person: "ana",
    when: "21 Apr",
    source: null,
    sourceBar: 38,
    body: [44, "still true in June.", 28],
    rotate: 2.1,
    wide: { left: 3, top: 56, width: 25 },
    narrow: { left: 3, top: 84, width: 60 },
    narrowFull: { left: 3, top: 62, width: 62 },
  },
  {
    id: "c5",
    person: "kit",
    when: "3 May",
    source: "—————",
    body: [52, "asked, answered, filed.", 24],
    rotate: -2.3,
    wide: { left: 31, top: 74, width: 26 },
    narrow: { left: 28, top: 92, width: 62 },
    narrowFull: { left: 28, top: 76, width: 64 },
  },
];

export const BELIEF = {
  label: "Belief",
  claim: "The room already decided this.",
  meta: "held by 3 · unchanged since Mar",
  wide: { left: 34, top: 36, width: 31 },
  narrow: { left: 6, top: 48, width: 72 },
  wideFull: { left: 34, top: 28, width: 30 },
  narrowFull: { left: 6, top: 30, width: 72 },
};

export type ScrapData = { text: string; rotate: number; wide: Pos };

export const SCRAPS: ScrapData[] = [
  { text: "ask the room, not the doc", rotate: 2.4, wide: { left: 31, top: 4, width: 18 } },
  { text: "thu 4pm · decide it once", rotate: -2.8, wide: { left: 8, top: 71, width: 17 } },
];

export type CursorData = {
  person: PersonId;
  path: { x: number; y: number }[];
  /** stacked layouts leave only the margins free */
  narrowPath: { x: number; y: number }[];
  dur: number;
};

export const CURSORS: CursorData[] = [
  {
    person: "maya",
    path: [
      { x: 12, y: 28 },
      { x: 22, y: 42 },
      { x: 8, y: 47 },
      { x: 12, y: 28 },
    ],
    narrowPath: [
      { x: 6, y: 22 },
      { x: 14, y: 30 },
      { x: 4, y: 36 },
      { x: 6, y: 22 },
    ],
    dur: 17,
  },
  {
    person: "dev",
    path: [
      { x: 78, y: 36 },
      { x: 87, y: 46 },
      { x: 74, y: 44 },
      { x: 78, y: 36 },
    ],
    narrowPath: [
      { x: 82, y: 66 },
      { x: 74, y: 72 },
      { x: 86, y: 76 },
      { x: 82, y: 66 },
    ],
    dur: 21,
  },
  {
    person: "rhea",
    path: [
      { x: 40, y: 72 },
      { x: 50, y: 84 },
      { x: 36, y: 80 },
      { x: 40, y: 72 },
    ],
    narrowPath: [
      { x: 8, y: 90 },
      { x: 18, y: 96 },
      { x: 5, y: 84 },
      { x: 8, y: 90 },
    ],
    dur: 19,
  },
];

/** The ask bar: type a question, get a card on the board. */
export const ASK = {
  placeholder: "Ask the room: “why did we decide this?”",
  hint: "spawns a card",
  /** used when someone hits send on an empty bar */
  fallback: "why did we decide this?",
};

/** Where a newly asked card lands before you move it. */
export const SPAWN_SLOTS: { wide: Pos; narrow: Pos }[] = [
  {
    wide: { left: 7, top: 33, width: 24 },
    narrow: { left: 6, top: 36, width: 62 },
  },
  {
    wide: { left: 40, top: 70, width: 25 },
    narrow: { left: 22, top: 12, width: 62 },
  },
  {
    wide: { left: 73, top: 58, width: 23 },
    narrow: { left: 8, top: 60, width: 62 },
  },
];

export const MAX_SPAWNS = SPAWN_SLOTS.length;

/**
 * The explainer ladder. Nothing is stated up front — each line is earned by
 * doing the thing it describes, so the board teaches itself.
 */
export type Discovery = "drag" | "pin" | "presence" | "ask";

export const CAPTIONS: Record<"idle" | Discovery | "done", string> = {
  idle: "drag anything. or ask the room something.",
  drag: "move it wherever. the room sees it.",
  pin: "three people. one claim.",
  presence: "someone else is already in here.",
  ask: "now yours is on the board too.",
  done: "and it remembers who said it first.",
};

export const DISCOVERIES: Discovery[] = ["drag", "pin", "presence", "ask"];
