import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { DatabaseShell } from "@/components/database/DatabaseShell";
import { EntityCard } from "@/components/database/EntityCard";
import styles from "@/components/database/database.module.css";
import { getEvents } from "@/lib/database";

export const metadata: Metadata = {
  title: "Events Database",
  description: "eFootball events ranked must-do, situational, or skip.",
};

export default function EventsPage() {
  const events = getEvents();
  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="events-leaderboard" variant="leaderboard" />
      </div>
      <main>
        <DatabaseShell
          eyebrow="Database"
          title="Events"
          lead="Campaigns, packs, and modes — prioritized so you spend time where it pays."
          currentPath="/events"
        >
          <p className={styles.count}>{events.length} events</p>
          <div className={styles.grid}>
            {events.map((e) => (
              <EntityCard
                key={e.slug}
                href={`/events/${e.slug}`}
                title={e.name}
                summary={e.summary}
                meta={`${e.type} · ${e.priority}`}
              />
            ))}
          </div>
        </DatabaseShell>
      </main>
    </>
  );
}
