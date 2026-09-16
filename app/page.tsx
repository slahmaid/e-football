import { AdSlot } from "@/components/AdSlot";
import { ArticleList } from "@/components/ArticleList";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { Header } from "@/components/Header";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PopularStrip } from "@/components/PopularStrip";
import { DatabaseStrip } from "@/components/database/DatabaseStrip";
import {
  getFeaturedArticle,
  getPopularArticles,
  getRecentArticles,
} from "@/lib/articles";
import styles from "./page.module.css";

export default function HomePage() {
  const featured = getFeaturedArticle();
  const recent = getRecentArticles();
  const popular = getPopularArticles(4);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero} aria-label="Featured story">
          <FeaturedArticle article={featured} />
        </section>
        <div className={styles.leaderboardWrap}>
          <AdSlot slotId="home-leaderboard" variant="leaderboard" />
        </div>
        <div className={styles.layout}>
          <div className={styles.content}>
            <PopularStrip articles={popular} />
            <DatabaseStrip />
            <ArticleList articles={recent} />
            <NewsletterSignup />
          </div>
          <aside className={styles.sidebar} aria-label="Sidebar">
            <div className={styles.sidebarInner}>
              <p className={styles.sidebarLabel}>Sponsored</p>
              <AdSlot slotId="home-sidebar" variant="sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
