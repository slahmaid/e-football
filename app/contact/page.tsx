import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { ContactForm } from "./ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with PixelPitch — tips, corrections, partnerships, and reader questions.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="contact-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main}>
        <p className={styles.eyebrow}>Contact</p>
        <h1 className={styles.title}>Write to PixelPitch</h1>
        <p className={styles.lead}>
          Tips, corrections, partnerships, or questions about a guide — we
          read every message.
        </p>
        <ContactForm />
        <p className={styles.note}>
          Prefer email?{" "}
          <a href="mailto:hello@pixelpitch.blog">hello@pixelpitch.blog</a>
        </p>
      </main>
    </>
  );
}
