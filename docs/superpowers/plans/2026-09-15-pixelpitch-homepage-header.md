# PixelPitch Homepage Header (Step 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js PixelPitch site and ship the homepage header (left nav, centered logo, right socials) plus SEO shell and a leaderboard `AdSlot` placeholder.

**Architecture:** Next.js App Router with a root `layout.tsx` for fonts/metadata, a presentational `Header` and reusable `AdSlot`, and a minimal `page.tsx` that mounts header + leaderboard above an empty `<main>`. No CMS, no live ads.

**Tech Stack:** Next.js 15 (App Router), TypeScript, CSS Modules + global CSS variables, next/font (Source Serif 4 + Libre Franklin), Vitest + React Testing Library + jsdom for component tests.

## Global Constraints

- Brand name: **PixelPitch** (never GridGoal)
- Language: English only
- Visual: clean sports editorial — light paper background, near-black UI, **no accent color**
- Logo: use existing `Logo-Light.svg` (black/white wordmark)
- Header: left Contact / About Us / Articles; center logo → `/`; right YouTube / X / Discord
- Header is **not sticky** in step 1
- No live ad scripts; `AdSlot` is a labeled empty shell with min-height
- Avoid Inter, Roboto, Arial, system-only stacks
- No purple gaming gradients, glow, or pill clusters
- Workspace may not be a git repo yet — Task 1 initializes git before any commit
- Spec reference: `docs/superpowers/specs/2026-09-15-pixelpitch-homepage-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `package.json` / Next config | App dependencies and scripts |
| `app/layout.tsx` | Root shell, fonts, default metadata |
| `app/globals.css` | Design tokens and base element styles |
| `app/page.tsx` | Homepage: Header + leaderboard AdSlot + empty main |
| `app/page.module.css` | Homepage layout spacing |
| `components/Header.tsx` | Header markup and mobile menu state |
| `components/Header.module.css` | Header layout (3-zone desktop, mobile panel) |
| `components/AdSlot.tsx` | Reusable ad placeholder |
| `components/AdSlot.module.css` | Ad slot sizing and “Advertisement” label |
| `public/Logo-Light.svg` | Brand logo asset |
| `vitest.config.ts` | Test runner config |
| `components/Header.test.tsx` | Header behavior tests |
| `components/AdSlot.test.tsx` | AdSlot contract tests |

---

### Task 1: Scaffold Next.js + git + logo

**Files:**
- Create: Next.js app files via `create-next-app` in the workspace root (keep existing `docs/` and `Logo-Light.svg`)
- Create: `public/Logo-Light.svg` (copy from workspace root logo)
- Create: `.gitignore` (if not generated)
- Test: `npm run build` (smoke)

**Interfaces:**
- Consumes: existing `Logo-Light.svg` at workspace root
- Produces: runnable Next.js App Router project; `public/Logo-Light.svg` served at `/Logo-Light.svg`

- [ ] **Step 1: Initialize git**

```bash
git init
```

Expected: `.git` directory exists.

- [ ] **Step 2: Scaffold Next.js in place**

From workspace root (`Nouveau dossier (10)`), run (non-interactive flags):

```bash
npx create-next-app@latest . --typescript --eslint --app --src-dir=false --tailwind=false --import-alias="@/*" --turbopack --yes
```

If create-next-app refuses a non-empty directory, scaffold into a temp folder and move app files up, **preserving** `docs/` and `Logo-Light.svg`.

Expected: `app/`, `package.json`, `tsconfig.json` exist.

- [ ] **Step 3: Copy logo into public**

```bash
# PowerShell
Copy-Item "Logo-Light.svg" "public/Logo-Light.svg" -Force
```

Expected: `public/Logo-Light.svg` exists.

- [ ] **Step 4: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 5: Add Vitest config and scripts**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

In `package.json` scripts, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Smoke build**

```bash
npm run build
```

Expected: Build succeeds (default Next page OK).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: scaffold Next.js app for PixelPitch

EOF
)"
```

On Windows PowerShell if heredoc fails, use:

```powershell
git add -A
git commit -m "chore: scaffold Next.js app for PixelPitch"
```

---

### Task 2: Global tokens, fonts, and root metadata

**Files:**
- Create/Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Delete or replace: default `app/page.tsx` boilerplate styles later in Task 5 (do not break build — keep a minimal page until then)
- Test: `npm run build`

**Interfaces:**
- Consumes: next/font Google fonts API
- Produces: CSS variables `--pp-bg`, `--pp-ink`, `--pp-ink-muted`, `--pp-rule`, `--pp-max`; root layout metadata title/description; font CSS variables on `<html>`

- [ ] **Step 1: Write `app/globals.css`**

```css
:root {
  --pp-bg: #f7f5f1;
  --pp-ink: #121212;
  --pp-ink-muted: #3a3a3a;
  --pp-rule: rgba(18, 18, 18, 0.12);
  --pp-max: 1120px;
  --pp-font-sans: var(--font-libre-franklin), "Libre Franklin", sans-serif;
  --pp-font-serif: var(--font-source-serif), "Source Serif 4", serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--pp-bg);
  color: var(--pp-ink);
  font-family: var(--pp-font-sans);
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PixelPitch — eFootball Blog",
    template: "%s | PixelPitch",
  },
  description:
    "PixelPitch covers eFootball news, guides, and match analysis — clean sports editorial for competitive players.",
  openGraph: {
    title: "PixelPitch — eFootball Blog",
    description:
      "eFootball news, guides, and match analysis from PixelPitch.",
    siteName: "PixelPitch",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelPitch — eFootball Blog",
    description:
      "eFootball news, guides, and match analysis from PixelPitch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Commit**

```powershell
git add app/globals.css app/layout.tsx
git commit -m "feat: add PixelPitch editorial tokens and SEO metadata"
```

---

### Task 3: `AdSlot` component

**Files:**
- Create: `components/AdSlot.tsx`
- Create: `components/AdSlot.module.css`
- Create: `components/AdSlot.test.tsx`
- Test: `npm test`

**Interfaces:**
- Consumes: none from Header
- Produces:

```ts
type AdSlotProps = {
  slotId: string;
  label?: string; // default "Advertisement"
  variant: "leaderboard" | "sidebar" | "in-feed";
};
export function AdSlot(props: AdSlotProps): JSX.Element;
```

- [ ] **Step 1: Write failing test**

Create `components/AdSlot.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AdSlot } from "./AdSlot";

describe("AdSlot", () => {
  it("renders advertisement label and data-ad-slot", () => {
    render(<AdSlot slotId="home-leaderboard" variant="leaderboard" />);
    expect(screen.getByText("Advertisement")).toBeInTheDocument();
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-ad-slot",
      "home-leaderboard",
    );
  });
});
```

- [ ] **Step 2: Run test — expect fail**

```bash
npm test
```

Expected: FAIL — `AdSlot` not found / module missing.

- [ ] **Step 3: Implement `AdSlot`**

`components/AdSlot.module.css`:

```css
.slot {
  width: 100%;
  margin: 0 auto;
  border: 1px dashed var(--pp-rule);
  background: rgba(18, 18, 18, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--pp-ink-muted);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.leaderboard {
  max-width: var(--pp-max);
  min-height: 90px;
}

.sidebar {
  max-width: 300px;
  min-height: 250px;
}

.inFeed {
  max-width: var(--pp-max);
  min-height: 120px;
}

.label {
  margin: 0;
}
```

`components/AdSlot.tsx`:

```tsx
import styles from "./AdSlot.module.css";

type AdSlotProps = {
  slotId: string;
  label?: string;
  variant: "leaderboard" | "sidebar" | "in-feed";
};

const variantClass = {
  leaderboard: styles.leaderboard,
  sidebar: styles.sidebar,
  "in-feed": styles.inFeed,
} as const;

export function AdSlot({
  slotId,
  label = "Advertisement",
  variant,
}: AdSlotProps) {
  return (
    <aside
      className={`${styles.slot} ${variantClass[variant]}`}
      data-ad-slot={slotId}
      aria-label={label}
    >
      <p className={styles.label}>{label}</p>
    </aside>
  );
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test
```

Expected: PASS for `AdSlot`.

- [ ] **Step 5: Commit**

```powershell
git add components/AdSlot.tsx components/AdSlot.module.css components/AdSlot.test.tsx
git commit -m "feat: add AdSlot placeholder for blog ad regions"
```

---

### Task 4: `Header` component

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Header.module.css`
- Create: `components/Header.test.tsx`
- Test: `npm test`

**Interfaces:**
- Consumes: `/Logo-Light.svg` from `public/`
- Produces: `<header>` with nav links `/contact`, `/about`, `/articles`; logo link `/`; social links with `aria-label` YouTube, X, Discord (placeholder `href="#"`)

- [ ] **Step 1: Write failing tests**

Create `components/Header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders left nav, centered logo, and social labels", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
    expect(screen.getByRole("link", { name: "PixelPitch" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "YouTube" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "X" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Discord" })).toBeInTheDocument();
  });

  it("toggles mobile navigation panel", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(screen.queryByTestId("mobile-panel")).not.toBeVisible();
    await user.click(toggle);
    expect(screen.getByTestId("mobile-panel")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run test — expect fail**

```bash
npm test
```

Expected: FAIL — `Header` module missing.

- [ ] **Step 3: Implement Header styles**

`components/Header.module.css`:

```css
.header {
  border-bottom: 1px solid var(--pp-rule);
  background: var(--pp-bg);
}

.inner {
  position: relative;
  max-width: var(--pp-max);
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.nav {
  display: flex;
  gap: 1.25rem;
  justify-content: flex-start;
}

.navLink {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pp-ink);
  text-decoration: none;
}

.navLink:hover {
  text-decoration: underline;
}

.logoLink {
  justify-self: center;
  grid-column: 2;
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  width: auto;
}

.socials {
  display: flex;
  gap: 0.85rem;
  justify-content: flex-end;
  align-items: center;
}

.socialLink {
  display: inline-flex;
  color: var(--pp-ink);
  opacity: 0.85;
}

.socialLink:hover {
  opacity: 1;
}

.socialLink svg {
  width: 18px;
  height: 18px;
}

.menuButton {
  display: none;
  justify-self: start;
  background: none;
  border: 1px solid var(--pp-rule);
  color: var(--pp-ink);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}

.mobilePanel {
  display: none;
  border-top: 1px solid var(--pp-rule);
  padding: 1rem 1.25rem 1.25rem;
  flex-direction: column;
  gap: 1rem;
}

.mobilePanelOpen {
  display: flex;
}

.mobileNav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobileSocials {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .inner {
    grid-template-columns: auto 1fr auto;
  }

  .nav,
  .socials {
    display: none;
  }

  .menuButton {
    display: inline-flex;
  }

  .logoLink {
    justify-self: center;
    grid-column: 2;
  }

  .logo {
    height: 32px;
  }
}
```

- [ ] **Step 4: Implement `Header.tsx`**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

const NAV = [
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About Us" },
  { href: "/articles", label: "Articles" },
] as const;

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M18.2 2H21l-6.6 7.5L22 22h-6.8l-4.4-6.3L5.2 22H2.4l7-8L2 2h7l4 5.8L18.2 2zm-1.2 18h1.9L7.1 3.9H5.1L17 20z" />
    </svg>
  );
}

function IconDiscord() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20 4.5A16.5 16.5 0 0 0 15.6 3l-.3.6a14 14 0 0 1 3.5 1.7 14.7 14.7 0 0 0-12.6 0A14 14 0 0 1 9.7 3.6L9.4 3A16.5 16.5 0 0 0 5 4.5C2.3 8.5 1.6 12.4 1.9 16.2a16.3 16.3 0 0 0 5 2.5l1-1.3a10.6 10.6 0 0 1-1.6-.8l.4-.3c3.3 1.5 6.9 1.5 10.2 0l.4.3c-.5.3-1 .6-1.6.8l1 1.3a16.3 16.3 0 0 0 5-2.5c.4-4.4-.6-8.2-2.1-11.7zM8.7 13.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "#", label: "YouTube", icon: <IconYouTube /> },
  { href: "#", label: "X", icon: <IconX /> },
  { href: "#", label: "Discord", icon: <IconDiscord /> },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-panel"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className={styles.logoLink} aria-label="PixelPitch">
          <Image
            src="/Logo-Light.svg"
            alt="PixelPitch"
            width={180}
            height={74}
            className={styles.logo}
            priority
          />
        </Link>

        <div className={styles.socials}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div
        id="mobile-panel"
        data-testid="mobile-panel"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        hidden={!open}
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileSocials}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
```

Note: If `next/image` fails on SVG in tests, mock `next/image` in `vitest.setup.ts`:

```ts
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
```

(Adjust `vitest.setup.ts` to a `.tsx` file or use `createElement` if JSX in setup is awkward.)

For the mobile visibility test: when `hidden={!open}`, `not.toBeVisible()` works with `hidden` attribute. Prefer asserting `toHaveAttribute("hidden")` if jsdom visibility is flaky:

```tsx
expect(screen.getByTestId("mobile-panel")).toHaveAttribute("hidden");
await user.click(toggle);
expect(screen.getByTestId("mobile-panel")).not.toHaveAttribute("hidden");
```

- [ ] **Step 5: Run tests — expect pass**

```bash
npm test
```

Expected: all Header + AdSlot tests PASS.

- [ ] **Step 6: Commit**

```powershell
git add components/Header.tsx components/Header.module.css components/Header.test.tsx vitest.setup.ts
git commit -m "feat: add PixelPitch header with nav, logo, and socials"
```

---

### Task 5: Compose homepage

**Files:**
- Modify: `app/page.tsx`
- Create: `app/page.module.css`
- Test: `npm run build` + manual `npm run dev` check

**Interfaces:**
- Consumes: `Header`, `AdSlot`
- Produces: homepage with header, leaderboard slot `home-leaderboard`, empty `<main>`

- [ ] **Step 1: Write homepage**

`app/page.module.css`:

```css
.leaderboardWrap {
  padding: 1rem 1.25rem 0;
}

.main {
  max-width: var(--pp-max);
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
  min-height: 40vh;
}
```

`app/page.tsx`:

```tsx
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="home-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main} />
    </>
  );
}
```

Remove any leftover default Next.js starter CSS/assets that conflict (e.g. old `page.module.css` gradients).

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Manual verify**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm:
- Left: Contact, About Us, Articles
- Center: PixelPitch logo
- Right: three social icons
- Below header: Advertisement leaderboard placeholder
- Light paper background, near-black type, no accent color
- Resize &lt;768px: Menu button opens panel with links + socials

- [ ] **Step 4: Commit**

```powershell
git add app/page.tsx app/page.module.css
git commit -m "feat: compose homepage with header and leaderboard slot"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Next.js App Router + TS | 1 |
| Logo-Light.svg in public / centered | 1, 4, 5 |
| Left nav Contact / About Us / Articles | 4 |
| Right socials YouTube / X / Discord | 4 |
| Light editorial + near-black only | 2, 4 |
| Non-sticky header | 4 (no sticky CSS) |
| Mobile menu | 4 |
| SEO metadata / OG / Twitter | 2 |
| AdSlot + leaderboard on homepage | 3, 5 |
| Empty main for later steps | 5 |
| English `lang="en"` | 2 |

## Plan self-review notes

- No TBD/placeholder steps remaining; social `href="#"` is an intentional open item from the spec.
- `AdSlot` / `Header` prop names are consistent across tasks.
- Sidebar and in-feed variants exist on `AdSlot` for later homepage body work; only leaderboard mounts in step 1.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-15-pixelpitch-homepage-header.md`. Two execution options:

**1. Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks  
**2. Inline Execution** — run tasks in this session with executing-plans and checkpoints  

Which approach?
