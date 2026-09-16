import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { RelatedLinks } from "@/components/database/RelatedLinks";
import { SourceList } from "@/components/database/SourceList";
import styles from "@/components/database/database.module.css";
import { getPlayerBySlug, getPlayers } from "@/lib/database";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPlayers().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) return { title: "Player" };
  return {
    title: player.name,
    description: player.summary,
  };
}

export default async function PlayerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) notFound();

  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="player-detail-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.shell}>
        <p className={styles.back}>
          <Link href="/players">← All players</Link>
        </p>
        <p className={styles.eyebrow}>Player</p>
        <h1 className={styles.title}>{player.name}</h1>
        <p className={styles.detailMeta}>
          <span>{player.position}</span>
          <span>{player.role}</span>
          <span>Tier {player.tier}</span>
          <span>{player.budgetGp} GP</span>
        </p>
        <p className={styles.lead}>{player.summary}</p>

        <div className={styles.section}>
          <h2>Editorial ratings</h2>
          <dl className={styles.ratings}>
            {(
              [
                ["Attacking", player.ratings.attacking],
                ["Defending", player.ratings.defending],
                ["Physical", player.ratings.physical],
                ["Technical", player.ratings.technical],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value} / 5</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.section}>
          <h2>Verdict</h2>
          <p>{player.verdict}</p>
        </div>

        <div className={styles.section}>
          <h2>Pros</h2>
          <ul>
            {player.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Cons</h2>
          <ul>
            {player.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <RelatedLinks
          title="Playstyles"
          links={player.playstyles.map((ps) => ({
            href: `/playstyles/${ps}`,
            label: ps.replace(/-/g, " "),
          }))}
        />
        <RelatedLinks
          title="Best formations"
          links={player.bestFormations.map((shape) => ({
            href: `/formations/${shape}`,
            label: shape,
          }))}
        />
        <RelatedLinks
          title="Related articles"
          links={player.relatedArticleSlugs.map((s) => ({
            href: `/articles/${s}`,
            label: s.replace(/-/g, " "),
          }))}
        />
        <SourceList sources={player.sources} />
      </main>
    </>
  );
}
