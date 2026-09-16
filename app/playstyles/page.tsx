import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { DatabaseShell } from "@/components/database/DatabaseShell";
import { EntityCard } from "@/components/database/EntityCard";
import styles from "@/components/database/database.module.css";
import { getPlaystyles } from "@/lib/database";

export const metadata: Metadata = {
  title: "Playstyles Database",
  description: "eFootball manager playstyles explained for Division play.",
};

export default function PlaystylesPage() {
  const items = getPlaystyles();
  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="playstyles-leaderboard" variant="leaderboard" />
      </div>
      <main>
        <DatabaseShell
          eyebrow="Database"
          title="Playstyles"
          lead="How each manager style wants the ball — and what to do without it."
          currentPath="/playstyles"
        >
          <p className={styles.count}>{items.length} playstyles</p>
          <div className={styles.grid}>
            {items.map((p) => (
              <EntityCard
                key={p.slug}
                href={`/playstyles/${p.slug}`}
                title={p.name}
                summary={p.summary}
                meta={p.managerHint}
              />
            ))}
          </div>
        </DatabaseShell>
      </main>
    </>
  );
}
