import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PixelPitch is an independent eFootball editorial — tactics, squad guides, and match analysis.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="about-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main}>
        <p className={styles.eyebrow}>About</p>
        <h1 className={styles.title}>Built for players who study the game</h1>
        <p className={styles.lead}>
          PixelPitch is an independent eFootball blog covering tactics, squad
          building, and the weekly meta — without the noise.
        </p>
        <div className={styles.body}>
          <p>
            We write for competitive players who want clear explanations:
            which formations hold up in Division, which cards earn their GP,
            and which event rewards are actually worth the grind.
          </p>
          <p>
            Every guide is meant to be practical on the pitch — short enough
            to read between matches, sharp enough to change how you play the
            next one.
          </p>
          <p>
            PixelPitch is not affiliated with Konami. Opinions, rankings, and
            recommendations are our own.
          </p>
        </div>
      </main>
    </>
  );
}
