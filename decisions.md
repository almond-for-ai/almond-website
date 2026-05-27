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

## How to log a new decision

Append a new `### D-NNN · Title` block under the current date heading (or add a new date heading if it's a new day). Required fields: **Decided by**, **What**, **Why**, **Status**. Keep the bullets terse. If a decision is later reversed, mark the original `Status: Superseded by D-NNN` and write the new decision underneath.
