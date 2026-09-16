import Link from "next/link";
import styles from "./database.module.css";

type EntityCardProps = {
  href: string;
  title: string;
  summary: string;
  meta?: string;
};

export function EntityCard({ href, title, summary, meta }: EntityCardProps) {
  return (
    <Link href={href} className={styles.card}>
      {meta ? <p className={styles.cardMeta}>{meta}</p> : null}
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardSummary}>{summary}</p>
    </Link>
  );
}
