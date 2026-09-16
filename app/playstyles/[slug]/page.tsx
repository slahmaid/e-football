import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { RelatedLinks } from "@/components/database/RelatedLinks";
import { SourceList } from "@/components/database/SourceList";
import styles from "@/components/database/database.module.css";
import { getPlaystyleBySlug, getPlaystyles } from "@/lib/database";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPlaystyles().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPlaystyleBySlug(slug);
  if (!item) return { title: "Playstyle" };
  return { title: item.name, description: item.summary };
}

export default async function PlaystyleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPlaystyleBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="playstyle-detail-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.shell}>
        <p className={styles.back}>
          <Link href="/playstyles">← All playstyles</Link>
        </p>
        <p className={styles.eyebrow}>Playstyle</p>
        <h1 className={styles.title}>{item.name}</h1>
        <p className={styles.lead}>{item.summary}</p>

        <div className={styles.section}>
          <h2>Manager fit</h2>
          <p>{item.managerHint}</p>
        </div>
        <div className={styles.section}>
          <h2>In possession</h2>
          <p>{item.inPossession}</p>
        </div>
        <div className={styles.section}>
          <h2>Out of possession</h2>
          <p>{item.outOfPossession}</p>
        </div>
        <div className={styles.section}>
          <h2>Tips</h2>
          <ul>
            {item.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <RelatedLinks
          title="Ideal formations"
          links={item.idealFormations.map((shape) => ({
            href: `/formations/${shape}`,
            label: shape,
          }))}
        />
        <RelatedLinks
          title="Related articles"
          links={item.relatedArticleSlugs.map((s) => ({
            href: `/articles/${s}`,
            label: s.replace(/-/g, " "),
          }))}
        />
        <SourceList sources={item.sources} />
      </main>
    </>
  );
}
