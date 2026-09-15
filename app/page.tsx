import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="home-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main} />
    </>
  );
}
