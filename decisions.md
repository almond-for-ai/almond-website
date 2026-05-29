# Decisions Log

Captured product, design, and engineering decisions for the Almond AI site. Each entry records: timestamp, decision owner, decision, rationale, and current status.

Owner shorthand: **Atishay** = Atishay Jain (atishay1743@gmail.com), founder.

---

## 2026-05-27

### D-001 · Branch + scope for full-site build
- **Decided by:** Atishay
- **What:** Switch from teaser-mode home to a real product marketing site on the `full-website-wip` branch. Build top 5 pages of a B2B SaaS funnel first.
- **Why:** Teaser ("Almond AI · Coming Soon") no longer reflects the product. Need a working website that pitches the company compiler to founders, investors, and security buyers.
- **Status:** Done in Phase 1.

### D-002 · Source-of-truth content
- **Decided by:** Atishay
- **What:** Reuse copy + structure from `/Users/atishay/Almond AI/context.md` (the prior repo's spec). Treat that file as content reference only. Keep current repo's styling intact.
- **Why:** Phase 1 was about content + structure transfer, not visual redesign.
- **Status:** Done.

### D-003 · Phase 1 page set
- **Decided by:** Atishay
- **What:** Build `/`, `/product`, `/pricing`, `/manifesto`, `/contact`. Keep `/blog` working. Defer `/builders`, `/integrations`, `/security`, `/self-host`, `/about`.
- **Why:** Standard SaaS funnel. Five pages cover the whole conversion path. The rest are expansion surfaces.
- **Status:** Done.

### D-004 · Pricing posture
- **Decided by:** Atishay
- **What:** Show three almond-themed tiers (Single Almond / Bunch / Orchard) with **"Contact for pricing"** on paid tiers. Not publishing seat prices.
- **Why:** Team size, retention window, and integration count drive cost wildly. A short call gets a real number.
- **Status:** Done.

### D-005 · Navigation overhaul
- **Decided by:** Atishay
- **What:** Replace the teaser nav (Game / Blog) with product nav: Product · Pricing · Manifesto · Blog + a "Book demo" CTA. Pathname-based active state.
- **Why:** New site, new nav. Blog kept because writing surface stays open.
- **Status:** Done.

### D-006 · Keep MindGame on home
- **Decided by:** Atishay
- **What:** MindGame stays on the home page, placed as a playful interlude before the footer CTA.
- **Why:** On-brand (memory game), visual relief, breaks heavy text. Doesn't harm conversion at this stage.
- **Status:** Done.

### D-007 · Positioning: connector, not competitor
- **Decided by:** Atishay
- **What:** Almond is positioned exclusively as the **connective layer** across the tools you already use. No chat interface. No comparisons against any other product by name. The string "Memory.store" must not appear anywhere in the repo.
- **Why:** Phase 1's differentiator named a competitor (Memory.store). That framing pulls focus away from what Almond actually is. We are the layer between the tools you already use. Naming anyone else is off-message.
- **Status:** Done (Phase 2). Removed in `src/lib/site-data.ts` and `src/app/page.tsx`. Verified via `grep -r "Memory.store" src` → zero matches.

### D-008 · No chat UI, ever
- **Decided by:** Atishay
- **What:** Almond will not ship a chat interface. Memory shows up *inside* the tools you already open.
- **Why:** Distinct product principle. We're a layer, not a destination.
- **Status:** Locked. Reflected in /product FAQ and /manifesto copy.

### D-009 · Dual audience: Solo + Team
- **Decided by:** Atishay
- **What:** Add a Solo / Team toggle on the home hero. Persistent Zustand store (`almond-audience-v1`). Switches hero body and final CTA copy. Persona chip strip below CTAs also responds.
- **Why:** Audience is wider than just enterprises. Solo founders running Claude Code + Figma + Cursor need shared memory as much as a 30-person team. Surface both narratives without splitting into two sites.
- **Status:** Done. `src/lib/audience.ts`, `src/components/AudienceToggle.tsx`, `src/components/AudienceCopy.tsx`.

### D-010 · Visualization-led home overhaul
- **Decided by:** Atishay
- **What:** Rewrite the home with less text and more visual surfaces. Reference: anam.ai. Sections: eyebrow + audience toggle + rotating-word hero + animated ConnectorDiagram + big tagline + interactive FlowTabs + MetricStrip + MemoryGraph (3D) + quote + MindGame + BlogTeaser + audience-aware final CTA.
- **Why:** Phase 1 home read as generic SaaS. New direction prioritizes visual storytelling.
- **Status:** Done. Old home structure dropped. `Hero.tsx` removed; logic inlined into `app/page.tsx`.

### D-011 · 3D illustration library: rules + first illustration
- **Decided by:** Atishay
- **What:** New folder `src/components/illustrations/` with canonical rules (see `README.md` in that folder). Stack: `three`, `@react-three/fiber`, `@react-three/drei`. First illustration: `MemoryGraph.tsx`.
- **Why:** Reusable visual layer. Every future 3D piece follows the same contract (props, Suspense, useFrame-only, dispose on unmount, exported from barrel, consumed via `Lazy3D`).
- **Status:** Done. MemoryGraph rendering on home + intended for product page reuse.

### D-012 · Animated line art everywhere
- **Decided by:** Atishay
- **What:** Hand-built inline SVG with Framer Motion path-draw and traveling-dot patterns. New components: `ConnectorDiagram`, `FlowTabs` (per-tab inline SVG), `MetricStrip` count-up. Final CTA card carries an animated orbit ring.
- **Why:** Bigger visual surface than text alone. Cheap to ship (SVG + framer, no shader cost). Reduced motion respected.
- **Status:** Done.

### D-013 · SessionTrail: floating bottom pill
- **Decided by:** Atishay
- **What:** Persistent bottom-center pill showing current page + section breadcrumb and up to 5 recent-page dots. Dismissible per session. Zustand `almond-trail-v1` with `persist` middleware (only `visits` persisted; dismissal resets on reload).
- **Why:** The site itself models what Almond does for tools: persistent context that travels with you.
- **Status:** Done. Mounted once in `src/app/layout.tsx`. Each page mounts a `<SectionTracker page="…" />`. Section blocks tagged with `data-section="…"`.

### D-014 · Drop "Memory.store" reference, drop all competitor framing
- **Decided by:** Atishay
- **What:** Repeat of D-007 because Phase 2 caught a leftover line in `app/page.tsx`. Differentiator block deleted entirely from `site-data.ts`. Replaced by audience copy + tagline + quote blocks.
- **Why:** Re-stating because this rule is non-negotiable. We never name anyone we are not.
- **Status:** Done. `grep` gate enforced.

### D-015 · Voice: sober, declarative, no cute phrasing
- **Decided by:** Atishay
- **What:** Strip "muscle memory", "memory becomes load-bearing", "stop the chatter", and similar phrasing. CTAs are short and declarative ("Book demo", "Read the manifesto", "Run it on your stack").
- **Why:** Investor + founder audience reads sober. Cute reads like a side project.
- **Status:** Done across home, /product, /pricing, /manifesto, /contact.

### D-016 · No em-dashes anywhere in the site
- **Decided by:** Atishay
- **What:** Remove all `—` (em-dash) characters from rendered content and code comments under `src/`. Replace with appropriate punctuation: `.` for clause break, `:` for elaboration, `·` for inline separators, comma where grammatically right.
- **Why:** Stylistic. Em-dashes pile up and read as a typographic tic. Decision recorded so future contributors don't reintroduce them.
- **Status:** Done. `grep -r "—" src/` → zero matches.

### D-017 · Decisions log + per-decision attribution
- **Decided by:** Atishay
- **What:** Add `decisions.md` at the repo root capturing every product / design / engineering decision with timestamp and owner. All entries owned by Atishay until otherwise noted.
- **Why:** Single source of "why we did it this way." Helps future contributors and future Atishay.
- **Status:** Done (this file).

### D-018 · Deployment target: Cloudflare Workers via OpenNext (full-wip env)
- **Decided by:** Atishay
- **What:** Push Phase 2 work to `origin/full-website-wip` and deploy to the `full-wip` Cloudflare environment via `pnpm deploy:full-wip`.
- **Why:** Preview surface for the rebuilt site that's distinct from production. OpenNext + Cloudflare already configured in `wrangler.jsonc`.
- **Status:** Done.

---

## 2026-05-28

### D-019 · Impact section: six-card value grid
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Add an Impact block on home with `OutcomeMarquee`, `ValueCardsGrid` (six purpose-built cards), and `ToolLogoWall`. Card types: Stat, Compare, Integrations, Outcome, Stacked, Terminal. Audience-aware slots swap on Solo / Team toggle.
- **Why:** Phase 2 home needed concrete proof points, not more prose. Grid pattern references anam.ai / Vercel-style product marketing.
- **Status:** Done. `src/components/ValueCardsGrid.tsx`, `src/components/cards/*`, `src/lib/site-data.ts`.

### D-020 · UI creation context doc
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Add `CREATE_UI_CONTEXT.md` at repo root: tokens, typography, card tones, motion rules for future UI work.
- **Why:** Keeps new components aligned with the existing visual system without re-reading `globals.css` every time.
- **Status:** Done.

### D-021 · Inline tool logo library
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Centralize product logos in `src/components/tool-logos.tsx` with `LOGO_BY_KEY`, `LOGO_NAME`, and per-brand `TOOL_WORDMARK` styles. Used by Impact cards, ConnectorDiagram, and logo wall.
- **Why:** One source of truth for integration marks across the site.
- **Status:** Done.

### D-022 · Remove duplicate "Memory, not models." surfaces
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Remove the home Quote section and the footer tagline both rendering "Memory, not models." Manifesto page and metadata strings unchanged.
- **Why:** Repetition diluted the line. Home flow reads cleaner from MemoryGraph → MindGame → Blog → CTA without a floating quote block.
- **Status:** Done. `src/app/page.tsx`, `src/components/SiteFooter.tsx`.

### D-023 · Black band continuity: Blog → CTA → Footer
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Change the final CTA section background from `bg-grey-96` to `bg-black` so it runs continuously with `BlogTeaserSection` above and `SiteFooter` below.
- **Why:** Visual seam between grey CTA card and black footer broke the page rhythm.
- **Status:** Done. `src/app/page.tsx`.

### D-024 · Footer spacing + MindGame padding
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Increase gap above footer Almond glyph (`mt-[100px]`). Give MindGame section symmetric vertical padding (`py-[100px] md:py-[140px]`).
- **Why:** Footer felt cramped; MindGame had bottom padding only and looked unbalanced against adjacent sections.
- **Status:** Done. `src/components/SiteFooter.tsx`, `src/components/MindGameSection.tsx`.

### D-025 · Numbers section: principle cards
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Redesign `MetricStrip` as three `CardFrame` cards (1 Memory / ∞ Tools / 0 Chat windows) with specimen index, caption, and section header ("The model" / "Three numbers. One idea.").
- **Why:** Floating numerals looked unfinished. Cards match the Impact grid language.
- **Status:** Done. `src/components/MetricStrip.tsx`, `src/app/page.tsx`.

### D-026 · Mature Impact card micro-interactions
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Tone down all six value-card animations: no hover lift, no logo bobbing, no typewriter terminal, no bar pulse, no orbit layout. Shared `CARD_EASE` in `src/components/cards/motion.ts`. CardFrame uses subtle border brighten + low-opacity spotlight only.
- **Why:** Previous motion read playful / childish. Target reference: Vercel-grade restraint.
- **Status:** Done. Supersedes playful motion implied in D-012 for Impact cards only.

### D-027 · Tool logo wall: infinite marquee
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Convert `ToolLogoWall` from static centered row to infinite horizontal scroll (`animate-marquee-logos`, 64s). Expand list to 12 integrations. Brand wordmarks use `TOOL_WORDMARK`, not mono uppercase.
- **Why:** Static row felt sparse; marquee matches `OutcomeMarquee` and reads as live ecosystem breadth.
- **Status:** Done. `src/components/ToolLogoWall.tsx`, `src/app/globals.css`, `src/lib/site-data.ts`.

### D-028 · Integrations card: editorial list over orbit
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Redesign `LogoOrbitCard` (slot 3 in Impact grid): white card, left-aligned headline, two-column integration list with hairline dividers, footer meta line. Remove central Almond glyph and logo orbit rows.
- **Why:** Orbit layout looked immature next to the other five cards.
- **Status:** Done. `src/components/cards/LogoOrbitCard.tsx`.

### D-029 · Deploy Phase 3 home polish to full-wip worker
- **Decided by:** Atishay
- **Branch:** `full-website-wip` → Cloudflare worker `almond-website-full-wip` (`full-wip` env)
- **What:** Commit all Phase 3 changes on `full-website-wip`, push to `origin/full-website-wip`, deploy via `npm run deploy:full-wip`.
- **Why:** Keep the preview worker in sync with the latest home/Impact refinements before merging to main.
- **Status:** Done. Deployed worker `almond-website-full-wip` (commit `4fb6aa6`).

### D-030 · Anam-aligned motion + layout pass
- **Decided by:** Atishay
- **Branch:** `full-website-wip`
- **What:** Shared motion tokens (`src/lib/motion-tokens.ts`); faster 500ms reveals; 50px demo capsules on connector, FlowTabs, and MemoryGraph; halftone on `ConnectionConstellation`; FlowTabs SVG loops pause off-screen; pricing Popular badge + mid-page demo CTA + compare row hover; footer/persona/chip hovers at 200ms; globals utilities (`.capsule-50`, `.halftone-bg`, `.stat-display`, `.footer-link`, `.pricing-row`).
- **Why:** Anam.ai audit showed mature scroll rhythm and quiet hovers without changing Almond walnut brand or copy tone.
- **Status:** Done.

### D-031 · Home closing sequence: Network before footer
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** Final home flow is MindGame → Blog → **Network** (`ConnectionConstellation`) → `SiteFooter`. Remove the standalone final grey/black CTA band; Network section carries headline + demo CTAs as the closing beat.
- **Why:** Avoid duplicate conversion blocks and a long empty white tail before the footer. Network is the Anam-style “people + tools orbiting copy” finale.
- **Status:** Done. `src/app/page.tsx`.

### D-032 · Network section: audience-specific tile constellations
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** New `ConnectionConstellation` component. **Solo:** eight tool tiles only (64–72px), no portraits or GIF. **Team:** portrait people tiles (taller/narrower cards) + one talking GIF + smaller perimeter tool chips (48–58px). Toggle swaps tile set via existing audience store.
- **Why:** Solo narrative is “your stack”; team narrative is “people + tools connected.” One section, two compositions.
- **Status:** Done. `src/components/ConnectionConstellation.tsx`.

### D-033 · Network section: minimal on-screen copy
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** Network UI renders **headline + CTAs only**. Do not show eyebrow (“The network”), body paragraph, or center almond glyph. Copy strings remain in `site-data.ts` for raw view / future use.
- **Why:** Visual section should read from tiles + headline, not duplicate Impact prose. Matches Anam’s sparse center copy.
- **Status:** Done.

### D-034 · Network scroll choreography: layered upward exit
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** Full-viewport sticky pin (`100dvh`) with short **vh-based** runway (`solo: 8vh + layers×0.6`, `team: 10vh + layers×0.6`). On scroll: outer tiles exit first, drifting **upward off-screen** with smoothstep easing. **No opacity fade** on tiles during scroll (positional exit only). Center headline + CTAs stay fixed until the section unpins. Connector SVG fades out in the first ~8% of scroll progress (lines stay static in viewBox; do not track tile transforms).
- **Why:** Prior iterations faded or scaled tiles away (“vanishing”) and left dead whitespace before the footer. Anam-style handoff = physical peel-up, then footer.
- **Status:** Done (iterating). `src/components/ConnectionConstellation.tsx`.

### D-035 · Network idle motion: subtle circular drift
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** At rest, each tile runs a slow **5-keyframe elliptical orbit** (~28–40s, `easeInOut`, unique delay per tile). Do **not** use scale-to-zero, opacity fade, or a hard `scrollStarted` state flip when scroll begins (those caused jerk / disappear). `prefers-reduced-motion`: static tiles, no orbit, pin runway collapsed to `100dvh`.
- **Why:** Section should feel alive before scroll without looking playful or breaking on first wheel tick.
- **Status:** Done. `MOTION_DURATION.orbit = 30` added in `src/lib/motion-tokens.ts`.

### D-036 · Network layout: centered copy, edge tiles, legibility scrim
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** Headline + CTAs **vertically centered** (`justify-center`). Copy stack at `z-20`; tiles at `z-[1]`. Soft white blur scrim behind copy block. Tiles pushed toward viewport edges; team GIF moved off center (was `50%, 20%`, overlapping headline → `14%, 10%`). Hub for connectors at `50%, 50%`.
- **Why:** Asymmetric padding and center-anchored GIF caused copy to sit too high and tiles to overlap text. Center copy must remain readable and truly centered.
- **Status:** Done.

### D-037 · AudienceCopy polymorphic `as` prop (hydration fix)
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** Add optional `as` prop to `AudienceCopy` (`div` | `p` | `h1` | `h2` | `h3` | `span`) so the animated wrapper is the same semantic element as its parent context. Impact heading uses `as="h2"`; lead uses `as="p"`; Network heading uses `as="h2"`.
- **Why:** Wrapping `AudienceCopy` (which rendered `motion.div`) inside `<p>` / `<h2>` caused invalid HTML and three Next.js hydration errors.
- **Status:** Done. `src/components/AudienceCopy.tsx`, `src/app/page.tsx`, `ConnectionConstellation.tsx`.

### D-038 · Network portrait asset: replace 404 Unsplash URL
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** Replace broken Unsplash portrait (`photo-1507003211169…`, upstream 404) with a working asset for team tile `p5`. Add `images.remotePatterns` for `images.unsplash.com` in `next.config.ts` so `next/image` can optimize Network portraits.
- **Why:** Next.js image optimizer logged `upstream image response failed` and tile rendered broken in dev.
- **Status:** Done. `ConnectionConstellation.tsx`, `next.config.ts`.

### D-039 · Pricing page polish: Popular badge, mid CTA, tier Link fix
- **Decided by:** Atishay (Cursor implementation)
- **Branch:** `full-website-wip`
- **What:** Rename featured tier badge from “Most teams” to **“Popular”**. Add mid-page **Live demo** CTA block below compare table. Fix featured-tier `Link` `className` ternary (dead `btn-primary` branch on featured card). Compare rows use `.pricing-row` hover utility.
- **Why:** Anam-style pricing rhythm (social proof badge + secondary conversion surface). Bugfix restores correct white CTA styling on featured tier.
- **Status:** Done. `src/app/pricing/page.tsx`, `src/app/globals.css`.

### D-040 · Network exit animation: long runway + spring smoothing + symmetric easing
- **Decided by:** Claude (implementation) by Atishay (direction)
- **Branch:** `full-website-wip`
- **What:** Overhaul of `ConnectionConstellation` scroll choreography.
  - `SCROLL_RUNWAY_VH` raised from `{ solo: 8, team: 10 }` to `{ solo: 75, team: 95 }` (initially 120/150, tuned down to reduce headline-only tail before footer).
  - Replaced `smoothstep` with `easeInOutCubic` for per-tile scroll interpolation (symmetric curve, smoother at both endpoints, identical feel forward and back).
  - Added `useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.5, restDelta: 0.0005 })` and routed the smoothed progress into tile transforms and connector opacity. Spring absorbs trackpad inertia jerks; forward and reverse paths feel identical.
  - `layerTiming` rewritten to cover the full `0 → 1` progress range with 68% per-layer span and 32% stagger. Outer ring (layer 0) starts immediately at 0; innermost layer finishes exactly at 1.0. No dead tail.
  - Connector hairline fade stretched from `[0, 0.04, 0.08] → [1, 0.3, 0]` to `[0, 0.18, 0.42] → [1, 0.5, 0]` so it matches the slower runway.
- **Why:** Previous setup completed the exit in ~10vh of scroll. Single wheel tick blew past it — the section read as "flash and gone" rather than a cinematic peel-up. Spring + cubic easing + longer runway gives a buttery feel both on the way out and on the way back. Runway then trimmed because the original 122vh left a visible headline-only whitespace stretch before the footer, which Atishay had flagged repeatedly.
- **Status:** Done. `src/components/ConnectionConstellation.tsx`.

### D-041 · Fix sticky pin on home `<main>`: overflow-x-clip instead of overflow-x-hidden
- **Decided by:** Claude (diagnosis + fix) by Atishay (direction)
- **Branch:** `full-website-wip`
- **What:** Home page `<main>` element changed from `overflow-x-hidden` to `overflow-x-clip` (both the roasted and raw variants in `src/app/page.tsx`).
- **Why:** `overflow-x: hidden` promotes `overflow-y` to `auto`, which makes the element a scroll container. `position: sticky` then pins to that ancestor instead of the viewport. With the old ~10vh runway this was invisible — but the longer D-040 runway exposed the bug: the headline + CTAs of `ConnectionConstellation` scrolled away mid-exit instead of staying centered. `overflow-x: clip` suppresses the horizontal overflow without establishing a new scroll context, so sticky pins to the viewport as intended. Limited to home page since only that page hosts a sticky-pinned section today.
- **Status:** Done. `src/app/page.tsx:38`, `src/app/page.tsx:47`.

---

## 2026-05-29

### D-042 · Product page: strip shared visuals, go deep (de-dup from home)
- **Decided by:** Claude (implementation) by Atishay (direction)
- **Branch:** `feature_expansion_pages`
- **What:** Rewrote `/product` so it stops mirroring home. Removed `ConnectorDiagram` (home's signature piece). New section order: audience-aware hero (with `AudienceToggle`) · `InToolSurfaces` (new signature section) · `FlowTabs` · captured · integrations strip (`ToolLogoWall` → `/integrations`) · audience-aware FAQ · security teaser → `/security` · audience-aware CTA. New component `src/components/InToolSurfaces.tsx`: per-tool in-context memory cards (Claude Code / Cursor / Figma / ChatGPT for solo; Claude Code / Figma / Linear / Notion for team), styled as in-tool annotations, never a chat window (D-008).
- **Why:** Home and `/product` shared their first three sections (hero, ConnectorDiagram, FlowTabs with identical copy), so the page re-explained "what + how" before saying anything product-specific. Home is now the pitch; product is the substance.
- **Status:** Done. `src/app/product/page.tsx`, `src/components/InToolSurfaces.tsx`.

### D-043 · FlowTabs is now product-exclusive (removed from home)
- **Decided by:** Claude (implementation) by Atishay (direction)
- **Branch:** `feature_expansion_pages`
- **What:** Removed the `FlowTabs` "Three motions. One layer." section from the home page. FlowTabs now lives only on `/product` under the eyebrow "The mechanism" / heading "How the memory moves."
- **Why:** On home it was redundant with `ConnectorDiagram` + the tagline, and it was the exact section duplicated on `/product`. Making it product-only removes the last duplicated surface between the two pages.
- **Status:** Done. `src/app/page.tsx`.

### D-044 · Expansion pages built: /integrations, /use-cases, /security, /self-host, /about
- **Decided by:** Atishay (scope) · Claude (implementation)
- **Branch:** `feature_expansion_pages`
- **What:** Built four of the five pages deferred in D-003 (skipped `/builders`), plus a new `/use-cases`:
  - **/integrations** — category grid (`IntegrationGrid`) from `LOGO_BY_KEY` with live / next / via-MCP status badges, MCP-connect `TerminalCard`, request-integration CTA.
  - **/use-cases** — scenario-driven, heaviest solo/team split (`ScenarioCards` + audience-aware metric rows).
  - **/security** — data handling, `DeploymentMatrix` (Managed / BYO cloud / Self-host mapped to Single Almond / Bunch / Orchard), audience-aware access controls (solo privacy vs team SSO/SCIM/audit), honest compliance status (SOC 2 in progress).
  - **/self-host** — why / what you get / requirements / deploy `TerminalCard`, maps to Orchard.
  - **/about** — mission ("Memory, not models"), short thesis linking `/manifesto` (no duplication), what-we-believe, who's-building, connect links. Generic, no toggle.
  - All follow the page shell pattern: raw-view branch (`PageRawView`), `SectionTracker`, `data-section` tags, `overflow-x-clip`.
  - New components: `IntegrationGrid`, `ScenarioCards`, `DeploymentMatrix`.
- **Why:** Footer linked to `/security` and `/self-host` as placeholders (both pointed at `/contact`); the funnel had no depth pages. `/use-cases` added because the Solo/Team target deserves a scenario page.
- **Status:** Done. `src/app/{integrations,use-cases,security,self-host,about}/page.tsx`, `src/components/{IntegrationGrid,ScenarioCards,DeploymentMatrix}.tsx`.

### D-045 · Solo/Team content sweep beyond home
- **Decided by:** Atishay (direction) · Claude (implementation)
- **Branch:** `feature_expansion_pages`
- **What:** Extended the audience toggle (D-009) past the home page. Added `AudienceToggle` + `AudienceCopy` to `/product`, `/pricing`, `/contact`, `/integrations`, `/use-cases`, `/security`, `/self-host` heroes and key copy. Solo emphasizes "your stack / your machine / private to you"; team emphasizes "your team's stack / shared memory / SSO + audit". `/about` and `/manifesto` stay universal.
- **Why:** The toggle existed to serve a target, but only home honored it. Every conversion surface now speaks to whoever is reading.
- **Status:** Done.

### D-046 · Fix real footer links (SiteFooter, not site-data) + sober-voice cleanup
- **Decided by:** Claude (diagnosis + fix) by Atishay (direction)
- **Branch:** `feature_expansion_pages`
- **What:** The footer renders from a hardcoded `COLUMNS` in `src/components/SiteFooter.tsx`, not from `site-data.ts`. Updated `SiteFooter` so `Security` → `/security`, `Self-host` → `/self-host`, `SOC 2 (in progress)` → `/security`, added `Integrations` + `Use cases` (Product) and `About` (Company). Mirrored the same change in `site-data.ts` footer for raw-view consistency. Also removed two "memory becomes load-bearing" phrasings on `/pricing` (D-015 voice rule).
- **Why:** `Security` and `Self-host` were dead placeholders pointing at `/contact`. The site-data footer is not what renders, so the real component had to change.
- **Status:** Done. `src/components/SiteFooter.tsx`, `src/lib/site-data.ts`, `src/app/pricing/page.tsx`.

---

## How to log a new decision

Append a new `### D-NNN · Title` block under the current date heading (or add a new date heading if it's a new day). Required fields: **Decided by**, **Branch** (when applicable), **What**, **Why**, **Status**. Keep the bullets terse. If a decision is later reversed, mark the original `Status: Superseded by D-NNN` and write the new decision underneath.
