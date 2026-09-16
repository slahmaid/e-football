import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for reading and using ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="terms-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.lead}>
          By using PixelPitch you agree to these terms. We may update them as
          the site grows.
        </p>
        <div className={styles.body}>
          <h2>Independent editorial</h2>
          <p>
            PixelPitch is an independent fan site. It is not affiliated with,
            endorsed by, or sponsored by Konami or eFootball unless a specific
            partnership is clearly stated.
          </p>
          <h2>Content</h2>
          <p>
            Guides and opinions are for information and entertainment. Game
            balance, events, and rewards change — always verify critical details
            in the official client and Konami communications.
          </p>
          <h2>Acceptable use</h2>
          <p>
            Do not scrape, attack, or misuse the site, newsletter, or contact
            forms. Do not submit unlawful or abusive content.
          </p>
          <h2>Liability</h2>
          <p>
            The site is provided as-is. We are not liable for decisions you make
            based on our articles, including in-game spending.
          </p>
          <h2>Contact</h2>
          <p>
            <a href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
