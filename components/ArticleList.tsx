import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import styles from "./ArticleList.module.css";

type ArticleListProps = {
  articles: Article[];
  heading?: string;
};

export function ArticleList({
  articles,
  heading = "Latest",
}: ArticleListProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby={heading ? "article-list-heading" : undefined}
      aria-label={heading ? undefined : "Articles"}
    >
      {heading ? (
        <h2 id="article-list-heading" className={styles.heading}>
          {heading}
        </h2>
      ) : null}
      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.slug} className={styles.item}>
            <Link
              href={`/articles/${article.slug}`}
              className={styles.card}
            >
              <Image
                src={article.imageSrc}
                alt={article.imageAlt}
                width={400}
                height={250}
                className={styles.thumb}
              />
              <div className={styles.body}>
                <p className={styles.meta}>
                  <span>{article.category}</span>
                  <time dateTime={article.date}>{article.dateLabel}</time>
                  <span>{article.readingMinutes} min read</span>
                </p>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.byline}>By {article.author}</p>
                <p className={styles.excerpt}>{article.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
