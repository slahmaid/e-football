import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleBody } from "@/components/ArticleBody";
import { AuthorBox } from "@/components/AuthorBox";
import { DisclosureNote } from "@/components/DisclosureNote";
import { Header } from "@/components/Header";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@/components/JsonLd";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ShareButtons } from "@/components/ShareButtons";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article" };

  const url = `${siteConfig.url}/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      publishedTime: `${article.date}T12:00:00.000Z`,
      images: [{ url: article.imageSrc, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, article.category);
  const url = `${siteConfig.url}/articles/${article.slug}`;
  const authorBio =
    article.author === siteConfig.defaultAuthor.name
      ? siteConfig.defaultAuthor.bio
      : undefined;

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(article),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/articles" },
            { name: article.title, path: `/articles/${article.slug}` },
          ]),
        ]}
      />
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="article-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main}>
        <p className={styles.back}>
          <Link href="/articles">← All articles</Link>
        </p>
        <p className={styles.meta}>
          <span>{article.category}</span>
          <time dateTime={article.date}>{article.dateLabel}</time>
          <span>{article.readingMinutes} min read</span>
        </p>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.byline}>
          By {article.author}
          <span className={styles.role}> · {article.authorRole}</span>
        </p>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <DisclosureNote />
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          width={1200}
          height={675}
          className={styles.image}
          priority
        />
        <ArticleBody
          source={article.content}
          midSlot={
            <AdSlot slotId="article-mid" variant="mid-article" />
          }
        />
        <AuthorBox
          name={article.author}
          role={article.authorRole}
          bio={authorBio}
        />
        <ShareButtons title={article.title} url={url} />
        <NewsletterSignup compact />
        <RelatedPosts articles={related} />
        <div className={styles.inFeed}>
          <AdSlot slotId="article-in-feed" variant="in-feed" />
        </div>
      </main>
    </>
  );
}
