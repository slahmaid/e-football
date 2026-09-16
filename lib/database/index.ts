import fs from "fs";
import path from "path";
import type {
  Formation,
  GameEvent,
  Player,
  Playstyle,
  UpdateEntry,
} from "./types";

const ROOT = path.join(process.cwd(), "content", "database");

function readCollection<T>(filename: string): T[] {
  const fullPath = path.join(ROOT, filename);
  if (!fs.existsSync(fullPath)) return [];
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw) as T[];
}

export function getPlayers(): Player[] {
  return readCollection<Player>("players.json").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getPlayerBySlug(slug: string): Player | null {
  return getPlayers().find((p) => p.slug === slug) ?? null;
}

export function getFormations(): Formation[] {
  return readCollection<Formation>("formations.json").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getFormationBySlug(slug: string): Formation | null {
  return getFormations().find((f) => f.slug === slug) ?? null;
}

export function getPlaystyles(): Playstyle[] {
  return readCollection<Playstyle>("playstyles.json").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getPlaystyleBySlug(slug: string): Playstyle | null {
  return getPlaystyles().find((p) => p.slug === slug) ?? null;
}

export function getEvents(): GameEvent[] {
  return readCollection<GameEvent>("events.json").sort((a, b) =>
    (b.start ?? b.updated).localeCompare(a.start ?? a.updated),
  );
}

export function getEventBySlug(slug: string): GameEvent | null {
  return getEvents().find((e) => e.slug === slug) ?? null;
}

export function getUpdates(): UpdateEntry[] {
  return readCollection<UpdateEntry>("updates.json").sort((a, b) =>
    b.updated.localeCompare(a.updated),
  );
}

export function getUpdateBySlug(slug: string): UpdateEntry | null {
  return getUpdates().find((u) => u.slug === slug) ?? null;
}

export function filterPlayers(
  players: Player[],
  opts: {
    q?: string;
    position?: string;
    tier?: string;
    playstyle?: string;
  },
): Player[] {
  const q = opts.q?.trim().toLowerCase() ?? "";
  return players.filter((p) => {
    if (opts.position && opts.position !== "all" && p.position !== opts.position) {
      return false;
    }
    if (opts.tier && opts.tier !== "all" && p.tier !== opts.tier) {
      return false;
    }
    if (
      opts.playstyle &&
      opts.playstyle !== "all" &&
      !p.playstyles.some(
        (ps) => ps.toLowerCase() === opts.playstyle!.toLowerCase(),
      )
    ) {
      return false;
    }
    if (!q) return true;
    const hay = [p.name, p.role, p.verdict, p.summary, ...p.tags]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function databaseCounts() {
  return {
    players: getPlayers().length,
    formations: getFormations().length,
    playstyles: getPlaystyles().length,
    events: getEvents().length,
    updates: getUpdates().length,
  };
}
