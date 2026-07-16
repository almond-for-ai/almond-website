import { CardArt, type ArtKind } from "@/components/CardArt";

type Variant =
  | "accent-solid"
  | "accent-light"
  | "black-solid"
  | "white-card"
  | "grey-card"
  | "terminal";

type Props = {
  variant: Variant;
  label: string;
  title: string;
  body?: string;
  big?: string; // optional big stat
  bigCaption?: string;
  chips?: string[]; // for variety variant
  terminalLines?: { prompt: boolean; text: string }[];
  art?: ArtKind;
  artPlacement?: string; // tailwind position classes
  artOpacity?: number;
};

const TONES: Record<
  Variant,
  { bg: string; fg: string; labelBg: string; labelFg: string; accent: string }
> = {
  "accent-solid": {
    bg: "#7b4019",
    fg: "#ffffff",
    labelBg: "rgba(255,255,255,0.16)",
    labelFg: "#ffffff",
    accent: "#ffffff",
  },
  "accent-light": {
    bg: "#a36740",
    fg: "#ffffff",
    labelBg: "rgba(255,255,255,0.18)",
    labelFg: "#ffffff",
    accent: "#ffffff",
  },
  "black-solid": {
    bg: "#000000",
    fg: "#ffffff",
    labelBg: "rgba(163,103,64,0.22)",
    labelFg: "#d6a578",
    accent: "#a36740",
  },
  "white-card": {
    bg: "#ffffff",
    fg: "#000000",
    labelBg: "rgba(123,64,25,0.08)",
    labelFg: "#7b4019",
    accent: "#7b4019",
  },
  "grey-card": {
    bg: "#f5f5f5",
    fg: "#000000",
    labelBg: "rgba(0,0,0,0.06)",
    labelFg: "rgba(0,0,0,0.6)",
    accent: "#7b4019",
  },
  terminal: {
    bg: "#0e0e0e",
    fg: "#e8e8e8",
    labelBg: "rgba(255,255,255,0.08)",
    labelFg: "rgba(255,255,255,0.6)",
    accent: "#d6a578",
  },
};

export function FactCard({
  variant,
  label,
  title,
  body,
  big,
  bigCaption,
  chips,
  terminalLines,
  art,
  artPlacement = "-bottom-8 -right-8",
  artOpacity = 0.14,
}: Props) {
  const t = TONES[variant];
  const isCardBorder = variant === "white-card" || variant === "grey-card";

  return (
    <article
      className="group relative flex h-[403px] w-[340px] shrink-0 flex-col overflow-hidden rounded-[32px] p-7 transition-[transform,box-shadow] duration-500 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_28px_64px_rgba(0,0,0,0.14)]"
      style={{
        background: t.bg,
        color: t.fg,
        border: isCardBorder ? "1px solid rgba(0,0,0,0.06)" : "none",
      }}
    >
      {art ? (
        <CardArt kind={art} className={artPlacement} opacity={artOpacity} />
      ) : null}
      {/* content wrapper above art */}
      <div className="relative z-10 flex h-full flex-col">
      {/* Label */}
      <div
        className="font-mono inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] transition-transform duration-500 ease-out group-hover:-translate-y-[2px]"
        style={{ background: t.labelBg, color: t.labelFg }}
      >
        {label}
      </div>

      {/* Title */}
      <h3
        className="mt-5 font-sans text-[24px] font-medium leading-[28px] tracking-[-0.48px]"
        style={{ color: t.fg }}
      >
        {title}
      </h3>

      {/* Optional body */}
      {body ? (
        <p
          className="mt-3 text-[14px] leading-[20px] tracking-[-0.14px]"
          style={{ color: variant === "black-solid" || variant === "accent-solid" || variant === "accent-light" || variant === "terminal" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
        >
          {body}
        </p>
      ) : null}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Big stat */}
      {big ? (
        <div>
          <div
            className="font-display text-[72px] font-medium leading-none tracking-[-0.04em]"
            style={{ color: t.accent }}
          >
            {big}
          </div>
          {bigCaption ? (
            <div
              className="mt-2 text-[13px] leading-[18px] tracking-[-0.13px]"
              style={{ color: variant === "black-solid" || variant === "accent-solid" || variant === "accent-light" || variant === "terminal" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
            >
              {bigCaption}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Variety chips */}
      {chips ? (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span
              key={c}
              className="font-mono inline-flex items-center rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.16em]"
              style={{
                background: t.labelBg,
                color: t.labelFg,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      ) : null}

      {/* Terminal lines */}
      {terminalLines ? (
        <div className="space-y-0.5 font-mono text-[11px] leading-[16px]">
          {terminalLines.map((l, i) => (
            <div
              key={i}
              style={{
                color: l.prompt ? t.accent : "rgba(255,255,255,0.7)",
              }}
            >
              {l.prompt ? "~ $ " : ""}
              {l.text}
              {i === terminalLines.length - 1 ? (
                <span
                  className="terminal-caret ml-[3px] inline-block h-[11px] w-[6px] translate-y-[1.5px]"
                  style={{ background: t.accent }}
                  aria-hidden
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
      </div>
    </article>
  );
}
