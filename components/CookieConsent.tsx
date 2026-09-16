"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useConsent } from "@/components/ConsentProvider";
import styles from "./CookieConsent.module.css";

export function CookieConsent() {
  const { status, accept, reject } = useConsent();
  const visible = status === "unknown";

  useEffect(() => {
    document.documentElement.toggleAttribute("data-consent-banner", visible);
    return () => {
      document.documentElement.removeAttribute("data-consent-banner");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-labelledby="cookie-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p id="cookie-title" className={styles.title}>
            Cookies &amp; ads
          </p>
          <p className={styles.text}>
            We use cookies for analytics and to show relevant ads when you
            allow them. See our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={reject}>
            Reject
          </button>
          <button type="button" className={styles.primary} onClick={accept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
