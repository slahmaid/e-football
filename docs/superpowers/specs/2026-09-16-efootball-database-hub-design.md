# PixelPitch eFootball Database Hub — Design

Date: 2026-09-16  
Status: Approved — implement phase 1

## Goal
Expand PixelPitch from an articles-only blog into a multi-section eFootball knowledge hub: editorial articles **plus** searchable structured data (players, formations, playstyles, events, updates) with no hard ceiling (file-based, grow by adding JSON).

## Information architecture
| Area | Routes |
|------|--------|
| Hub | `/database` |
| Players | `/players`, `/players/[slug]` |
| Formations | `/formations`, `/formations/[slug]` |
| Playstyles | `/playstyles`, `/playstyles/[slug]` |
| Events | `/events`, `/events/[slug]` |
| Updates | `/updates` |
| Articles | existing `/articles` |

Nav: Articles · Database · About · Contact. Homepage: Database strip after Popular.

## Data
- Location: `content/database/{players,formations,playstyles,events,updates}/*.json`
- Loaders: `lib/database/*.ts`
- Shared: slug, name, summary, updated, tags[], sources[], relatedArticleSlugs[]
- Players: position, role, overallTier S/A/B/C, editorial 1–5 ratings, playstyles, formations, budget band, pros/cons, verdict
- No Konami scrape; original copy + attribution links only

## Phase-1 seed
~25–35 players, ~10–12 formations, ~8–10 playstyles, ~8–12 events/updates, ~8–12 new articles

## Out of scope
Live scrape, accounts, squad builder, official OVR sync
