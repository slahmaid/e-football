# PixelPitch Homepage — Design Spec

**Date:** 2026-09-15  
**Product:** PixelPitch — English eFootball blog  
**Scope for implementation plan:** Step 1 — Next.js shell + homepage header (body deferred)

---

## Goals

- Build the homepage **step by step**, starting with a production-ready header.
- Respect standard **blog SEO / accessibility metrics** from day one.
- Reserve **ad placement** regions without loading live ad scripts yet.
- Visual direction: **clean sports editorial** — light background, bold type, magazine feel, **near-black only** (logo-led, no strong accent color).

## Non-goals (step 1)

- Article grid, featured post, or CMS content
- Live ad network integration (AdSense, etc.)
- Sticky header, search, language switch
- Footer, About / Contact / Articles page content (routes may be stubs)
- Dark theme

## Decisions locked

| Topic | Choice |
|-------|--------|
| Stack | Next.js (App Router) + TypeScript |
| Language | English only |
| Brand | PixelPitch (replaces earlier working name GridGoal) |
| Logo | `Logo-Light.svg` (black/white wordmark for light backgrounds) |
| Visual tone | Clean sports editorial |
| Accent | Near-black only — minimal, logo-led |
| Build approach | Header-only slice inside a shell that reserves ads + SEO |
| Right header | Social icons: YouTube, X (Twitter), Discord |
| Left header | Contact · About Us · Articles |
| Logo position | Center |

## Architecture (step 1)

```
app/
  layout.tsx      # fonts, global CSS variables, default metadata
  page.tsx        # homepage: Header + empty/minimal main
  globals.css     # light editorial tokens
components/
  Header.tsx      # nav | logo | socials
  AdSlot.tsx      # placeholder shell (optional to mount on homepage yet)
public/
  Logo-Light.svg  # brand mark
```

- Styling: CSS variables + CSS Modules or global CSS (no heavy UI kit).
- Semantic landmarks: `<header>`, `<nav>`, `<main>`.

## Header

### Desktop layout

| Left | Center | Right |
|------|--------|-------|
| Contact · About Us · Articles | Logo → `/` | YouTube · X · Discord |

- True-center logo (grid or absolute center) so unequal left/right widths do not shift the mark.
- Nav links to `/contact`, `/about`, `/articles` (stub pages acceptable later).
- Nav style: tight uppercase or small-caps tracking; near-black; underline or opacity hover; no pills/buttons.
- Active link: weight or underline only — no colored chip.
- Logo height ~36–44px desktop; `alt="PixelPitch"`.
- Socials: icon-only, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` each; placeholder URLs until real ones are provided.
- Thin bottom rule (~1px, near-black at low opacity); **no** box shadow.
- Content max-width aligned with future article column (~1100–1200px).
- **Not sticky** in step 1.

### Mobile

- Compact bar with logo visible.
- Hamburger opens a simple panel: three nav links + social row.
- No card-like chrome; keep editorial flatness.

## Ad placements (reserved)

Standard blog slots — empty shells with “Advertisement” labeling, fixed min-height to limit CLS, `data-ad-slot` for future IDs:

1. **Leaderboard** — below header, full content width (responsive; ~728×90 class).
2. **Sidebar / rail** — right column when homepage body exists; stack or hide on small screens.
3. **In-feed** — between article cards when the list ships.

**Step 1:** define `AdSlot` API and mount the **leaderboard** shell below the header (empty, labeled). Sidebar and in-feed slots are coded for reuse but not required on the empty homepage body. **No live ad scripts.**

## SEO & blog metrics (shell)

- Homepage `<title>` + meta description for PixelPitch / eFootball.
- Open Graph + Twitter card defaults.
- `next/font` for distinctive editorial type (avoid Inter / Roboto / Arial / system-only stacks).
- SVG logo; minimal JS.
- Homepage: logo is **not** the `h1`; `h1` arrives with real homepage content later (or a visually appropriate page title when content is added).
- One primary content landmark: `<main>`.

## Visual tokens (step 1)

- Background: light (off-white / paper, not flat pure white only — subtle atmosphere allowed).
- Text / icons / rules: near-black.
- No purple gaming gradients, no glow, no rounded-full pill clusters.
- Brand signal in the first viewport: **PixelPitch logo** is the hero-level brand mark in the header for this step (full marketing hero is out of scope until a later homepage content step).

## Implementation sequence

1. Scaffold Next.js App Router + TypeScript in the workspace.
2. Move/copy `Logo-Light.svg` into `public/`.
3. Global tokens + metadata in `layout.tsx`.
4. Implement `Header` and mount on homepage.
5. Add `AdSlot` component; optionally reserve leaderboard region below header.
6. Leave `<main>` empty/minimal for the next step.

## Open items (non-blocking)

- Real social profile URLs (placeholders until provided)
- Exact typefaces (chosen at implementation within the editorial constraint; not Inter/Roboto/Arial/system-only)

## Success criteria (step 1)

- Homepage loads with centered PixelPitch logo, left nav, right socials.
- Light editorial look, near-black UI, responsive mobile menu.
- Layout/metadata ready for ads + SEO without retrofit.
- No article body or live ads required yet.
