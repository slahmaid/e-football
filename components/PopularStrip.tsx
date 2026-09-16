import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import styles from "./PopularStrip.module.css";

type PopularStripProps = {
  articles: Article[];
};

export function PopularStrip({ articles }: PopularStripProps) {
  if (articles.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="popular-heading">
      <h2 id="popular-heading" className={styles.heading}>
        Editor&apos;s picks
      </h2>
      <ol className={styles.list}>
        {articles.map((article, index) => (
          <li key={article.slug} className={styles.item}>
            <Link href={`/articles/${article.slug}`} className={styles.card}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Image
                src={article.imageSrc}
                alt={article.imageAlt}
                width={120}
                height={90}
                className={styles.thumb}
              />
              <div className={styles.body}>
                <p className={styles.meta}>
                  <span>{article.category}</span>
                  <span>{article.readingMinutes} min read</span>
                </p>
                <h3 className={styles.title}>{article.title}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
