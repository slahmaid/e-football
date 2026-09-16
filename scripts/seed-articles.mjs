/**
 * Seed additional MDX articles linked to the database hub.
 * Run: node scripts/seed-articles.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "content", "articles");

const img = {
  imageSrc:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Football on a grass pitch",
};

const articles = [
  {
    slug: "how-to-use-pixelpitch-database",
    title: "How to Use the PixelPitch eFootball Database",
    excerpt:
      "Players, formations, playstyles, events, and updates — how the new hub fits next to the blog.",
    category: "Guides",
    date: "2026-09-16",
    body: `## Why a database next to articles

Articles argue a point. The database stores reusable reference — so you can filter thirty strikers without rereading the same intro every week.

## Start here

1. Open [/database](/database) for the hub.
2. Use [/players](/players) search + filters when building a GP squad.
3. Cross-check [/formations](/formations) and [/playstyles](/playstyles) before you copy a Division replay.

## Sources

We paraphrase official notes and link Konami pages. Always verify live rewards in-client.`,
  },
  {
    slug: "tier-s-vs-budget-c-when-to-upgrade",
    title: "Tier S vs Budget C: When Upgrades Actually Matter",
    excerpt:
      "A practical rule for spending GP — upgrade the position that loses you matches, not the shiny card.",
    category: "Squads",
    date: "2026-09-15",
    body: `## The real question

Tier labels in our [/players](/players) database are editorial. They answer: “Will this card survive the division I’m in?”

## Upgrade order

1. The position you get cooked in weekly.
2. The pivot that connects your build-up.
3. Luxury attackers last.

Cross-link: budget CFs in our player list still win matches if your [/playstyles/quick-counter](/playstyles/quick-counter) timing is clean.`,
  },
  {
    slug: "4-2-3-1-complete-setup-guide",
    title: "4-2-3-1 Complete Setup Guide",
    excerpt:
      "Double pivot roles, AMF instructions, and when to abandon the shape mid-match.",
    category: "Tactics",
    date: "2026-09-14",
    body: `## Core idea

See the full entry: [/formations/4-2-3-1](/formations/4-2-3-1).

## PixelPitch notes

- One DMF as Anchorman, one as a connector.
- AMF stays between lines — don’t park them on the CF.
- If you’re getting stretched wide, Fluid Formations into a back five for ten minutes.

## Related playstyles

[Possession Game](/playstyles/possession-game) and [Overload](/playstyles/overload) are the cleanest fits.`,
  },
  {
    slug: "quick-counter-pressing-triggers",
    title: "Quick Counter: Pressing Triggers That Don’t Suicide",
    excerpt:
      "How to spring transitions without leaving your double pivot stranded.",
    category: "Tactics",
    date: "2026-09-13",
    body: `## Read the playstyle card

[/playstyles/quick-counter](/playstyles/quick-counter)

## Triggers worth using

- Back pass to CB under your mid-press.
- Heavy touch on the touchline.
- Goal kick that invites a press — only if your CF can jump.

Avoid pressing every lateral. That’s how Long Ball Counter eats you.`,
  },
  {
    slug: "best-dmf-screen-options-2026",
    title: "Best DMF Screen Options Right Now",
    excerpt:
      "Anchorman vs Destroyer — who protects 4-2-3-1 and 4-1-4-1 this season.",
    category: "Squads",
    date: "2026-09-12",
    body: `## Start in the database

Filter [/players?position=DMF](/players?position=DMF).

## Roles

- **Anchorman** — tempo + position (Rodri archetype).
- **Destroyer** — win duels, simpler passing (budget Tchouaméni lane).

Pair with [/formations/4-1-4-1](/formations/4-1-4-1) if opponent AMF is cooking you.`,
  },
  {
    slug: "wingback-defense-in-5-2-1-2",
    title: "Wingback Defense in 5-2-1-2",
    excerpt:
      "How far to push wingbacks without turning your back three into a highlight reel.",
    category: "Tactics",
    date: "2026-09-11",
    body: `## Formation entry

[/formations/5-2-1-2](/formations/5-2-1-2)

## Rules of thumb

- Wingbacks attack only when the weak-side CB can step into midfield.
- Against Out Wide, sit them deeper and let the AMF be your outlet.

Tournament nights love this shape — see Custom Tournament notes in Events.`,
  },
  {
    slug: "event-value-framework-must-do-skip",
    title: "Event Value Framework: Must-Do vs Skip",
    excerpt:
      "A simple priority system for campaigns, Match Pass, and ambassador packs.",
    category: "Events",
    date: "2026-09-10",
    body: `## Use the events hub

[/events](/events) tags each mode as must-do, situational, or skip.

## Rule

Clear time-limited progression first. Packs are entertainment budgets, not homework.

Always confirm live rewards in the official client — calendars move.`,
  },
  {
    slug: "possession-vs-overload-which-to-learn-first",
    title: "Possession vs Overload: Which to Learn First",
    excerpt:
      "If you’re rebuilding your Game Plan after v6, start here.",
    category: "Tactics",
    date: "2026-09-09",
    body: `## Short answer

Learn [Possession Game](/playstyles/possession-game) habits first, then layer [Overload](/playstyles/overload).

## Why

Possession teaches patience under press. Overload teaches where the free man appears. Together they fit [/formations/3-2-4-1](/formations/3-2-4-1) and classic 4-2-3-1.`,
  },
  {
    slug: "gk-distribution-under-press",
    title: "GK Distribution Under Press",
    excerpt:
      "When to play short, when to go long, and which keeper archetypes help.",
    category: "Guides",
    date: "2026-09-08",
    body: `## Keepers in the DB

Filter [/players?position=GK](/players?position=GK).

## Habits

- Short only if your CB can take a touch facing forward.
- If the press jumps CF+AMF, skip to the weak-side fullback.
- Offensive Goalkeepers help Possession; Defensive Goalkeepers forgive Long Ball days.`,
  },
  {
    slug: "reading-the-updates-log",
    title: "Reading the Updates Log Without FOMO",
    excerpt:
      "How to translate Version Info into practice habits — not panic rebuilds.",
    category: "News",
    date: "2026-09-07",
    body: `## Open Updates

[/updates](/updates)

## Method

1. Note the feature name.
2. Open the linked article.
3. Spend one training match testing only that habit.

Fluid Formations and Dynamic Volley are skill additions — they don’t require a full Epic rebuild.`,
  },
];

for (const a of articles) {
  const mdx = `---
title: "${a.title}"
excerpt: "${a.excerpt}"
category: "${a.category}"
date: "${a.date}"
imageSrc: "${img.imageSrc}"
imageAlt: "${img.imageAlt}"
author: "Alex Rivera"
authorRole: "Editor"
popular: true
---

${a.body}
`;
  fs.writeFileSync(path.join(dir, `${a.slug}.mdx`), mdx);
}

console.log("Wrote", articles.length, "articles");
