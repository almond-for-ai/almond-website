# Almond — UI Creation Context

A single source of truth for designing new product UI in the Almond
visual language. Every token, font, motion curve, and pattern listed
here is already wired up in `src/app/globals.css`, the Tailwind v4
`@theme` block, the `FactCard` component, and the `Motion` helpers.
Reuse them. Do not invent new colors, radii, or eases without a
reason.

---

## 1. Design philosophy

Almond builds **tools for the mind**. The visual system reflects
three ideas:

1. **Specimen, not screenshot.** The brand treats the almond as a
   biological/etymological specimen. Type and layout borrow from
   field-guide / dictionary entries: serif display heads, mono
   labels, generous whitespace.
2. **Warm minimal.** Mostly white surfaces and pure black text, lit
   by a single warm walnut accent (`#7B4019`). No rainbow, no
   gradients on text, no shadows for depth. Color carries meaning.
3. **Snappy, restrained motion (Anam-aligned).** Scroll reveals at
   ~500ms with 16px rise; hovers at 200ms opacity or border shifts.
   Infinite loops (marquees, tab art) pause off-screen. No bounce,
   no parallax. Motion respects `prefers-reduced-motion`.

Voice & copy partner with the visuals:
- Fragments allowed. Short clauses, no marketing fluff.
- Labels are mono uppercase with letter-tracking (`Fact · 01`,
  `Specimen`, `almond.log`).
- Numbers, dates, and Latin names are first-class — show them.

---

## 2. Color tokens

All colors live in `globals.css` under the `@theme` block and are
exposed as Tailwind utility classes (`bg-walnut-500`, `text-grey-50`,
`border-black/8`, etc.) plus CSS variables (`var(--color-walnut-500)`).

### Brand palette — Walnut (monochromatic accent)

| Token              | Hex / Value                    | Use                              |
|--------------------|--------------------------------|----------------------------------|
| `walnut-50`        | `#FAF3EC`                      | Faint background tint            |
| `walnut-100`       | `#F4E5D4`                      | Soft surface                     |
| `walnut-200`       | `#E7C8A6`                      | Decorative shapes                |
| `walnut-300`       | `#D6A578`                      | Accent on dark surfaces          |
| `walnut-400`       | `#A36740`                      | Lighter accent (e.g. card heads) |
| **`walnut-500`**   | **`#7B4019` — primary accent** | Brand color, links, focus rings  |
| `walnut-600`       | `#623213`                      | Hover / pressed                  |
| `walnut-700`       | `#4A260E`                      | Deep accent                      |
| `walnut-800`       | `#321A09`                      | Near-black warm                  |
| `walnut-tint`      | `rgba(123,64,25,0.05)`         | Chip background on light surface |
| `walnut-tint-strong` | `rgba(123,64,25,0.15)`       | Selection / emphasis tint        |

### Neutrals

| Token       | Value          | Use                            |
|-------------|----------------|--------------------------------|
| `black`     | `#000000`      | Default foreground             |
| `white`     | `#FFFFFF`      | Default surface                |
| `grey-96`   | `#F5F5F5`      | Soft surface (Wild Sand)       |
| `grey-92`   | `#EBEBEB`      | Hover on secondary buttons     |
| `grey-80`   | `#CCCCCC`      | Disabled border                |
| `grey-50`   | `#808080`      | Subdued text                   |
| `grey-30`   | `#4D4D4D`      | Body on light surfaces         |

### Alpha overlays (use these instead of ad-hoc rgba)

`black-04`, `black-50`, `black-70`,
`white-04`, `white-08`, `white-15`, `white-40`, `white-50`,
`white-60`, `white-70`, `white-80`.

### Semantic aliases

```
--color-bg:           white
--color-surface:      white
--color-surface-soft: grey-96
--color-fg:           black
--color-fg-muted:     black-50
--color-fg-soft:      rgba(0,0,0,0.35)
--color-border:       rgba(0,0,0,0.08)
```

Use semantic tokens in new components; reach for raw palette only for
intentional brand moments.

### Tones — six recognised card variants

These six combinations are the project's "themes." Any new card,
panel, or hero block should snap to one of them:

| Variant         | bg          | fg          | label bg                    | label fg     | accent          |
|-----------------|-------------|-------------|------------------------------|--------------|------------------|
| `accent-solid`  | `#7B4019`   | `#FFF`      | `rgba(255,255,255,0.16)`     | `#FFF`       | `#FFF`           |
| `accent-light`  | `#A36740`   | `#FFF`      | `rgba(0,0,0,0.14)`           | `#1C0E05`    | `#FFF`           |
| `black-solid`   | `#000`      | `#FFF`      | `rgba(163,103,64,0.22)`      | `#D6A578`    | `#A36740`        |
| `white-card`    | `#FFF`      | `#000`      | `rgba(123,64,25,0.08)`       | `#7B4019`    | `#7B4019`        |
| `grey-card`     | `#F5F5F5`   | `#000`      | `rgba(0,0,0,0.06)`           | `rgba(0,0,0,0.6)` | `#7B4019`   |
| `terminal`      | `#0E0E0E`   | `#E8E8E8`   | `rgba(255,255,255,0.08)`     | `rgba(255,255,255,0.6)` | `#D6A578` |

---

## 3. Typography

Three fonts loaded via `next/font/google` in `layout.tsx`:

| Family       | CSS var               | Weights        | Role                                    |
|--------------|-----------------------|----------------|-----------------------------------------|
| Inter        | `--font-inter` / `--font-sans` | 400, 500, 600, 700 | Default UI text, buttons, body |
| Crimson Pro  | `--font-crimson-pro` / `--font-display` | 400, 500, 600 | Display numerics, hero, large quotes  |
| Geist Mono   | `--font-geist-mono` / `--font-mono`   | 400, 500           | Labels, captions, code, terminal      |

### Type ramps in use

| Role            | Size / line / tracking                          | Family       |
|-----------------|--------------------------------------------------|--------------|
| Hero display    | `72px / 1.0 / -0.04em`                           | display      |
| Card title      | `24px / 28px / -0.48px`, weight 500              | sans         |
| Body            | `15px / 1.6 / -0.005em`                          | sans         |
| Card body       | `14px / 20px / -0.14px`                          | sans         |
| Caption / meta  | `13px / 18px / -0.13px` or `-0.484px`            | sans         |
| Nav link        | `14px / 16.8px / -0.005em`, weight 500           | sans         |
| Label chip      | `10–11px UPPERCASE, letter-spacing 0.16–0.2em`   | mono         |

Body baseline: `font-size: 15px` on `html, body` with
`-webkit-font-smoothing: antialiased`. Don't drop below 13px for
anything readable.

---

## 4. Spacing scale

Defined as CSS vars (`--space-3xs` … `--space-7xl`); use the same
values when you need pixel-perfect Tailwind classes
(`p-[24px]`, `gap-[40px]`).

```
3xs  4    | 2xs  6    | xs  8    | sm  12   | md  16
lg   20   | xl   24   | 2xl 32   | 3xl 40   | 4xl 56
5xl  80   | 6xl  120  | 7xl 160
```

### Container

```css
.container-x {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 24px;          /* 40px on ≥ 768px */
}
```

Every section wraps its content in `.container-x` for consistent
gutters.

---

## 5. Radius

| Token      | Value     | Use                              |
|------------|-----------|----------------------------------|
| `pill`     | `9999px`  | Buttons, chips, nav pill         |
| `card`     | `32px`    | Default card / panel             |
| `md`       | `16px`    | Inputs, smaller panels           |
| `sm`       | `8px`     | Code blocks, inline elements     |

Cards are always 32px. Don't introduce 12px or 24px without a reason.

---

## 6. Components / patterns

### Buttons

All three live in `globals.css`:

- `.btn-primary` — black pill, white text, used for primary actions.
- `.btn-secondary` — `grey-96` pill, black text, used for secondary.
- `.btn-ghost-dark` — translucent white on dark backgrounds.

Same dimensions: `padding: 8px 24px`, font 15/18, tracking `-0.3px`,
weight 500.

### Chip

`.chip-accent`: walnut tint background, walnut-500 text, mono-like
sans label. 13px. Used for inline tags (e.g. "New", "v0.1").

### Card (FactCard pattern)

Standard card geometry:

- `340 × 403 px` fixed for the marquee strip; `auto` height when
  stacked.
- `rounded-[32px]` + `p-7` (28px).
- Subtle decorative art absolute-positioned, `opacity 0.18–0.22`,
  pulled past the edges (e.g. `-bottom-10 -right-10`) so it bleeds.
- Hover: `-translate-y-2 scale-[1.03]`, 500ms, ease-out.

Card content order: label chip → title → body → flex spacer → numeric
or chip row at bottom.

### Nav link

`.nav-link`: 14px sans, hover dims to 60% opacity.

### Blog prose

`.prose-almond` — opinionated typography for markdown bodies. Walnut
accents on links, mono code chips, walnut-bordered blockquotes.

---

## 7. Motion

Tokens live in `src/lib/motion-tokens.ts`. Primitives in
`src/components/Motion.tsx`. Card enter timing in
`src/components/cards/motion.ts`. Use these helpers; avoid one-off
springs scattered across components.

### Easing

```ts
MOTION_EASE.reveal = [0.22, 1, 0.36, 1];  // scroll / mount
MOTION_EASE.hover  = [0.44, 0, 0.56, 1];  // buttons, links
```

### Durations

- Reveal / Mount: **0.5s** (`MOTION_DURATION.enter`)
- Hovers / button press: **200ms** (`MOTION_DURATION.micro`)
- Card stagger: **60ms** (`MOTION_STAGGER` / `CARD_STAGGER`)
- Marquee strip: 64–80s linear infinite, paused on hover.

### Viewport

- Default margin: **`-10% 0px`** (`MOTION_VIEWPORT.margin`)
- Reveal fires once unless `once={false}`.

### Primitives

- `<Reveal y={16} duration={0.5}>` — fade + slide on viewport enter.
- `<Mount>` — same on mount for above-the-fold content.
- `prefers-reduced-motion`: all helpers no-op transforms/opacity.

### Layout utilities (Anam-inspired)

- `.capsule-50` — 50px-radius demo shells (hero connector, FlowTabs, 3D graph).
- `.halftone-bg` — walnut dot texture for constellation sections.
- `.stat-display` — clamp(64px–96px) serif numerals for principle cards.

---

## 8. Iconography & art

- Brand mark: `AlmondMark.tsx` exports `AlmondGlyph` — the two-almond
  line drawing. Use it as a single accent per page (footer hero,
  empty states), not repeated.
- Decorative `CardArt` shapes (`almond`, `arcs`, `branch`, `dots`,
  `leaf`) live inside cards at low opacity. Treat them as texture,
  not subjects.
- No emoji in product UI. Mono-symbol bullets (`·`) are preferred for
  list separators.

---

## 9. Selection, focus, accessibility

- `::selection` is walnut-500 on white text — already global.
- Focus rings should use `outline: 2px solid var(--color-walnut-500)`
  with `outline-offset: 2px`. Don't remove outlines.
- Contrast: text on `walnut-500` must be white; text on `walnut-300`
  must be `walnut-800` (`#321A09`). Verify with WCAG AA.
- Tap targets ≥ 44px on mobile (buttons already meet this).

---

## 10. Voice & micro-copy

- Title case for headings, sentence case for body.
- Labels are mono uppercase: `FACT · 01`, `SPECIMEN`, `CONTACT`.
- Em dash (—) for asides; en dash (–) for ranges; hyphens never as
  separators in copy.
- Numerics never spelled out: `3000 BC`, `80%`, `20–25 yrs`.
- Empty states quote the brand: `"Stay tuned"` is out; `amygdala (n.)
  — Greek "almond."` is in. Etymological, dry, confident.

---

## 11. Checklist for a new screen

Before merging a UI:

- [ ] Uses one of the six card tones, or pure `surface` + `fg`.
- [ ] Container wrapped in `.container-x`.
- [ ] Labels are mono, uppercase, ≥ 0.16em tracking.
- [ ] Headings use display font only at ≥ 48px; below that, sans.
- [ ] One walnut accent per screen, max. Don't paint everything.
- [ ] Motion uses `Reveal` / `Mount`; no bespoke springs.
- [ ] Hover states use the `-translate-y-2` / opacity-dim pattern.
- [ ] Reduced-motion path works.
- [ ] Theme-color, footer, and global tokens not overridden.

---

## 12. Files to read first

- `src/app/globals.css` — every token, button, prose style.
- `src/app/layout.tsx` — font loading + theme-color + GA.
- `src/components/FactCard.tsx` — canonical card with all six tones.
- `src/components/Motion.tsx` — Reveal / Mount / EASE.
- `src/components/SiteFooter.tsx` — voice + link patterns.
- `src/components/Hero.tsx` — hero proportions + container usage.

When in doubt, copy a tone, copy a card, copy a Reveal. Don't invent.
