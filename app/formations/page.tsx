import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { DatabaseShell } from "@/components/database/DatabaseShell";
import { EntityCard } from "@/components/database/EntityCard";
import styles from "@/components/database/database.module.css";
import { getFormations } from "@/lib/database";

export const metadata: Metadata = {
  title: "Formations Database",
  description: "eFootball formation guides — strengths, weaknesses, and counters.",
};

export default function FormationsPage() {
  const formations = getFormations();
  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="formations-leaderboard" variant="leaderboard" />
      </div>
      <main>
        <DatabaseShell
          eyebrow="Database"
          title="Formations"
          lead="Shapes climbing Division — and how opponents break them."
          currentPath="/formations"
        >
          <p className={styles.count}>{formations.length} formations</p>
          <div className={`${styles.grid} ${styles.grid3}`}>
            {formations.map((f) => (
              <EntityCard
                key={f.slug}
                href={`/formations/${f.slug}`}
                title={f.name}
                summary={f.summary}
                meta={f.shape}
              />
            ))}
          </div>
        </DatabaseShell>
      </main>
    </>
  );
}
