import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import styles from "./FeaturedArticle.module.css";

type FeaturedArticleProps = {
  article: Article;
};

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article className={styles.featured}>
      <Link href={`/articles/${article.slug}`} className={styles.mediaLink}>
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          width={1600}
          height={686}
          sizes="(min-width: 1120px) 1120px, 100vw"
          className={styles.image}
          priority
        />
      </Link>
      <div className={styles.copy}>
        <p className={styles.meta}>
          <span className={styles.category}>{article.category}</span>
          <time dateTime={article.date}>{article.dateLabel}</time>
          <span>{article.readingMinutes} min read</span>
        </p>
        <h1 className={styles.title}>
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h1>
        <p className={styles.byline}>
          By {article.author}
          <span className={styles.role}> · {article.authorRole}</span>
        </p>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <Link href={`/articles/${article.slug}`} className={styles.readMore}>
          Read article
        </Link>
      </div>
    </article>
  );
}
