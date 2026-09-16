# eFootball Database Hub — Implementation Plan

> **For agentic workers:** Execute task-by-task. Spec: `docs/superpowers/specs/2026-09-16-efootball-database-hub-design.md`

**Goal:** Ship `/database` hubs + searchable players + seed content + nav/homepage/sitemap + new articles.

**Tech:** Next.js App Router, JSON under `content/database/`, typed loaders in `lib/database/`.

## Tasks
1. Types + loaders (`lib/database/types.ts`, `load.ts`, filters)
2. Shared UI (`DatabaseShell`, `EntityCard`, `FilterBar`, `SourceList`, `DatabaseStrip`)
3. Seed JSON collections (players, formations, playstyles, events, updates)
4. Pages for hub + all list/detail routes
5. Wire Header, Footer, homepage, sitemap
6. Add ~10 MDX articles linked to DB entities
7. Build + test
