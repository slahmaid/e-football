import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { DatabaseShell } from "@/components/database/DatabaseShell";
import styles from "@/components/database/database.module.css";
import { databaseCounts } from "@/lib/database";

export const metadata: Metadata = {
  title: "eFootball Database",
  description:
    "Browse PixelPitch’s expandable eFootball database — players, formations, playstyles, events, and updates.",
};

const SECTIONS = [
  {
    href: "/players",
    title: "Players",
    key: "players" as const,
    summary: "Searchable card picks by position, tier, and playstyle fit.",
  },
  {
    href: "/formations",
    title: "Formations",
    key: "formations" as const,
    summary: "Shapes that win Division — and how they get punished.",
  },
  {
    href: "/playstyles",
    title: "Playstyles",
    key: "playstyles" as const,
    summary: "Manager styles and how to actually use them.",
  },
  {
    href: "/events",
    title: "Events",
    key: "events" as const,
    summary: "Campaigns, packs, and modes ranked must-do / skip.",
  },
  {
    href: "/updates",
    title: "Updates",
    key: "updates" as const,
    summary: "Version and feature notes with official source links.",
  },
];

export default function DatabasePage() {
  const counts = databaseCounts();

  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="database-leaderboard" variant="leaderboard" />
      </div>
      <main>
        <DatabaseShell
          eyebrow="Database"
          title="eFootball multi-info hub"
          lead="Unlimited room to grow — structured PixelPitch data for players, tactics, events, and updates. Add JSON entries anytime; the site scales with your content."
          currentPath="/database"
        >
          <div className={styles.hubGrid}>
            {SECTIONS.map((section) => (
              <Link key={section.href} href={section.href} className={styles.hubCard}>
                <h2 className={styles.cardTitle}>{section.title}</h2>
                <p className={styles.cardSummary}>{section.summary}</p>
                <p className={styles.hubCount}>
                  {counts[section.key]} entries
                </p>
              </Link>
            ))}
          </div>
        </DatabaseShell>
      </main>
    </>
  );
}
