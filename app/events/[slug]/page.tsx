import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { RelatedLinks } from "@/components/database/RelatedLinks";
import { SourceList } from "@/components/database/SourceList";
import styles from "@/components/database/database.module.css";
import { getEventBySlug, getEvents } from "@/lib/database";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event" };
  return { title: event.name, description: event.summary };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <Header />
      <div style={{ padding: "1rem 1.25rem 0" }}>
        <AdSlot slotId="event-detail-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.shell}>
        <p className={styles.back}>
          <Link href="/events">← All events</Link>
        </p>
        <p className={styles.eyebrow}>Event</p>
        <h1 className={styles.title}>{event.name}</h1>
        <p className={styles.detailMeta}>
          <span>{event.type}</span>
          <span>{event.priority}</span>
          {event.start ? <span>{event.start}</span> : null}
          {event.end ? <span>→ {event.end}</span> : null}
        </p>
        <p className={styles.lead}>{event.summary}</p>
        <div className={styles.section}>
          <h2>Rewards / value</h2>
          <p>{event.rewardsSummary}</p>
        </div>
        <RelatedLinks
          title="Related articles"
          links={event.relatedArticleSlugs.map((s) => ({
            href: `/articles/${s}`,
            label: s.replace(/-/g, " "),
          }))}
        />
        <SourceList sources={event.sources} />
      </main>
    </>
  );
}
