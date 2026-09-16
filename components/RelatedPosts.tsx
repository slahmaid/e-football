import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import styles from "./RelatedPosts.module.css";

type RelatedPostsProps = {
  articles: Article[];
};

export function RelatedPosts({ articles }: RelatedPostsProps) {
  if (articles.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="related-heading">
      <h2 id="related-heading" className={styles.heading}>
        Related posts
      </h2>
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
                width={320}
                height={200}
                className={styles.thumb}
              />
              <div className={styles.body}>
                <p className={styles.meta}>
                  <span>{article.category}</span>
                  <time dateTime={article.date}>{article.dateLabel}</time>
                </p>
                <h3 className={styles.title}>{article.title}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
