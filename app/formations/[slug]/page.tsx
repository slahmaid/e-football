import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { RelatedLinks } from "@/components/database/RelatedLinks";
import { SourceList } from "@/components/database/SourceList";
import styles from "@/components/database/database.module.css";
import { getFormationBySlug, getFormations } from "@/lib/database";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getFormations().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const formation = getFormationBySlug(slug);
  if (!formation) return { title: "Formation" };
  return { title: formation.name, description: formation.summary };
}

export default async function FormationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const formation = getFormationBySlug(slug);
  if (!formation) notFound();

  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="formation-detail-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.shell}>
        <p className={styles.back}>
          <Link href="/formations">← All formations</Link>
        </p>
        <p className={styles.eyebrow}>Formation</p>
        <h1 className={styles.title}>{formation.name}</h1>
        <p className={styles.detailMeta}>
          <span>{formation.shape}</span>
          <span>Updated {formation.updated}</span>
        </p>
        <p className={styles.lead}>{formation.summary}</p>

        <div className={styles.section}>
          <h2>Build-up</h2>
          <p>{formation.buildUp}</p>
        </div>
        <div className={styles.section}>
          <h2>Defense</h2>
          <p>{formation.defense}</p>
        </div>
        <div className={styles.section}>
          <h2>Strengths</h2>
          <ul>
            {formation.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Weaknesses</h2>
          <ul>
            {formation.weaknesses.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Common counters</h2>
          <ul>
            {formation.counters.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <RelatedLinks
          title="Suggested playstyles"
          links={formation.suggestedPlaystyles.map((ps) => ({
            href: `/playstyles/${ps}`,
            label: ps.replace(/-/g, " "),
          }))}
        />
        <RelatedLinks
          title="Related articles"
          links={formation.relatedArticleSlugs.map((s) => ({
            href: `/articles/${s}`,
            label: s.replace(/-/g, " "),
          }))}
        />
        <SourceList sources={formation.sources} />
      </main>
    </>
  );
}
