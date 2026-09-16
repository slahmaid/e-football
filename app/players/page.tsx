import type { Metadata } from "next";
import { Suspense } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { DatabaseShell } from "@/components/database/DatabaseShell";
import { EntityCard } from "@/components/database/EntityCard";
import { PlayerFilters } from "@/components/database/PlayerFilters";
import styles from "@/components/database/database.module.css";
import { filterPlayers, getPlayers, getPlaystyles } from "@/lib/database";

export const metadata: Metadata = {
  title: "Players Database",
  description:
    "Search PixelPitch eFootball player picks by position, tier, and playstyle.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PlayersPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const position = typeof sp.position === "string" ? sp.position : undefined;
  const tier = typeof sp.tier === "string" ? sp.tier : undefined;
  const playstyle = typeof sp.playstyle === "string" ? sp.playstyle : undefined;

  const all = getPlayers();
  const filtered = filterPlayers(all, { q, position, tier, playstyle });
  const playstyleOptions = [
    ...new Set(getPlaystyles().map((p) => p.slug)),
  ].sort();

  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="players-leaderboard" variant="leaderboard" />
      </div>
      <main>
        <DatabaseShell
          eyebrow="Database"
          title="Players"
          lead="Editorial card picks — searchable and filterable. Ratings are PixelPitch guidance, not scraped official OVR dumps."
          currentPath="/players"
        >
          <Suspense fallback={null}>
            <PlayerFilters playstyles={playstyleOptions} />
          </Suspense>
          <p className={styles.count}>
            Showing {filtered.length} of {all.length} players
          </p>
          {filtered.length === 0 ? (
            <p className={styles.empty}>No players match those filters.</p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((player) => (
                <EntityCard
                  key={player.slug}
                  href={`/players/${player.slug}`}
                  title={player.name}
                  summary={player.verdict}
                  meta={`${player.position} · Tier ${player.tier} · ${player.budgetGp} GP`}
                />
              ))}
            </div>
          )}
        </DatabaseShell>
      </main>
    </>
  );
}
