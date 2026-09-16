import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { DatabaseShell } from "@/components/database/DatabaseShell";
import { SourceList } from "@/components/database/SourceList";
import styles from "@/components/database/database.module.css";
import { getUpdates } from "@/lib/database";

export const metadata: Metadata = {
  title: "Updates Log",
  description: "eFootball version and feature notes with official sources.",
};

export default function UpdatesPage() {
  const updates = getUpdates();
  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="updates-leaderboard" variant="leaderboard" />
      </div>
      <main>
        <DatabaseShell
          eyebrow="Database"
          title="Updates"
          lead="Version and feature notes — PixelPitch summaries with links back to Konami."
          currentPath="/updates"
        >
          <p className={styles.count}>{updates.length} update notes</p>
          <div className={styles.grid}>
            {updates.map((u) => (
              <article key={u.slug} className={styles.card} style={{ cursor: "default" }}>
                <p className={styles.cardMeta}>
                  {u.type}
                  {u.version ? ` · v${u.version}` : ""} · {u.updated}
                </p>
                <h2 className={styles.cardTitle}>{u.name}</h2>
                <p className={styles.cardSummary}>{u.summary}</p>
                <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.1rem" }}>
                  {u.highlights.map((h) => (
                    <li key={h} style={{ color: "var(--pp-ink-muted)", marginBottom: "0.25rem" }}>
                      {h}
                    </li>
                  ))}
                </ul>
                {u.relatedArticleSlugs[0] ? (
                  <p style={{ margin: "0.75rem 0 0" }}>
                    <Link href={`/articles/${u.relatedArticleSlugs[0]}`}>
                      Read related article →
                    </Link>
                  </p>
                ) : null}
                <SourceList sources={u.sources} />
              </article>
            ))}
          </div>
        </DatabaseShell>
      </main>
    </>
  );
}
