import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Advertising & Affiliate Disclosure",
  description: `How ${siteConfig.name} is funded through ads and affiliate links.`,
};

export default function DisclosurePage() {
  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="disclosure-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Advertising &amp; affiliate disclosure</h1>
        <p className={styles.lead}>
          Transparency matters. Here is how PixelPitch may earn money while
          staying editorial-first.
        </p>
        <div className={styles.body}>
          <h2>Display advertising</h2>
          <p>
            We reserve ad units (leaderboard, sidebar, in-article). When Google
            AdSense (or another network) is connected and you accept cookies,
            those units may show paid placements. Ads never rewrite our
            rankings or tactics advice.
          </p>
          <h2>Affiliate links</h2>
          <p>
            Some articles may include affiliate links. If you click and buy, we
            may earn a commission at no extra cost to you. We disclose this
            where relevant and only recommend products or offers we believe are
            useful to readers.
          </p>
          <h2>Sponsored content</h2>
          <p>
            Paid partnerships, if any, will be clearly labeled as sponsored.
            Editorial reviews remain independent unless marked otherwise.
          </p>
          <h2>Questions</h2>
          <p>
            Reach us at{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
