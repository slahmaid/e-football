import Link from "next/link";
import { databaseCounts } from "@/lib/database";
import styles from "./database.module.css";

export function DatabaseStrip() {
  const counts = databaseCounts();
  return (
    <section className={styles.strip} aria-labelledby="database-strip-title">
      <p className={styles.stripEyebrow}>Database</p>
      <h2 id="database-strip-title" className={styles.stripTitle}>
        Explore eFootball multi-info
      </h2>
      <div className={styles.stripLinks}>
        <Link href="/players">Players ({counts.players})</Link>
        <Link href="/formations">Formations ({counts.formations})</Link>
        <Link href="/playstyles">Playstyles ({counts.playstyles})</Link>
        <Link href="/events">Events ({counts.events})</Link>
        <Link href="/updates">Updates ({counts.updates})</Link>
        <Link href="/database">Full hub</Link>
      </div>
    </section>
  );
}
