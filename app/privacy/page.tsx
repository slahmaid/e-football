import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className={styles.leaderboardWrap}>
        <AdSlot slotId="privacy-leaderboard" variant="leaderboard" />
      </div>
      <main className={styles.main}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lead}>
          Last updated: September 16, 2026. PixelPitch respects your privacy
          and keeps this policy short and clear.
        </p>
        <div className={styles.body}>
          <h2>What we collect</h2>
          <p>
            If you subscribe to the newsletter or send a contact message, we
            process the email address and message content you provide. If you
            accept cookies, we may load analytics and advertising partners that
            set their own cookies.
          </p>
          <h2>Cookies &amp; consent</h2>
          <p>
            Essential site operation does not require advertising cookies. You
            can accept or reject analytics/ads cookies via the consent banner.
            Your choice is stored in a first-party cookie named{" "}
            <code>pp_consent</code>.
          </p>
          <h2>Advertising</h2>
          <p>
            When consent is given and AdSense is configured, Google (or your
            configured ad partner) may show ads and collect data according to
            their policies. Placeholder ad units appear until a publisher ID is
            set.
          </p>
          <h2>Analytics</h2>
          <p>
            Optional Google Analytics 4 and/or Plausible may run only after
            consent, when measurement IDs are configured in environment
            variables.
          </p>
          <h2>Contact</h2>
          <p>
            Questions:{" "}
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
