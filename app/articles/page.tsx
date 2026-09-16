import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { ArticleList } from "@/components/ArticleList";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Header } from "@/components/Header";
import {
  getArticlesByCategory,
  getCategories,
} from "@/lib/articles";
import styles from "./page.module.css";

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export const metadata: Metadata = {
  title: "Articles",
  description:
    "All PixelPitch eFootball guides, tactics, squad building tips, and news.",
};

export default async function ArticlesPage({ searchParams }: PageProps) {
  const { category: rawCategory } = await searchParams;
  const categories = getCategories();
  const activeCategory =
    rawCategory && categories.includes(rawCategory) ? rawCategory : undefined;
  const articles = getArticlesByCategory(activeCategory);

  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="articles-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Archive</p>
          <h1 className={styles.title}>
            {activeCategory ? activeCategory : "Articles"}
          </h1>
          <p className={styles.lead}>
            {activeCategory
              ? `PixelPitch ${activeCategory.toLowerCase()} for competitive eFootball players.`
              : "Tactics, squad building, and match analysis for competitive eFootball players."}
          </p>
        </header>
        <CategoryFilter
          categories={categories}
          active={activeCategory}
        />
        {articles.length > 0 ? (
          <ArticleList articles={articles} heading="" />
        ) : (
          <p className={styles.empty}>No articles in this category yet.</p>
        )}
      </main>
    </>
  );
}
