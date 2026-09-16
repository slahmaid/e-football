"use client";

import { useEffect, useId } from "react";
import { useConsent } from "@/components/ConsentProvider";
import { adsConfig, adsEnabled } from "@/lib/site";
import styles from "./AdSlot.module.css";

type AdSlotProps = {
  slotId: string;
  label?: string;
  variant: "leaderboard" | "sidebar" | "in-feed" | "mid-article";
};

const variantClass = {
  leaderboard: styles.leaderboard,
  sidebar: styles.sidebar,
  "in-feed": styles.inFeed,
  "mid-article": styles.midArticle,
} as const;

function resolveAdSenseSlot(
  variant: AdSlotProps["variant"],
): string | undefined {
  switch (variant) {
    case "leaderboard":
      return adsConfig.slots.leaderboard || undefined;
    case "sidebar":
      return adsConfig.slots.sidebar || undefined;
    case "in-feed":
      return adsConfig.slots.inFeed || undefined;
    case "mid-article":
      return adsConfig.slots.midArticle || adsConfig.slots.inFeed || undefined;
    default:
      return undefined;
  }
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slotId,
  label = "Advertisement",
  variant,
}: AdSlotProps) {
  const { accepted } = useConsent();
  const reactId = useId();
  const client = adsConfig.client;
  const adSlot = resolveAdSenseSlot(variant);
  const showLiveAd = accepted && adsEnabled() && Boolean(adSlot);

  useEffect(() => {
    if (!showLiveAd) return;

    const existing = document.querySelector(
      'script[data-pp-adsense="true"]',
    ) as HTMLScriptElement | null;

    function pushAd() {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ad blockers / missing slots should not break the page.
      }
    }

    if (existing) {
      pushAd();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.ppAdsense = "true";
    script.onload = pushAd;
    document.head.appendChild(script);
  }, [showLiveAd, client, reactId]);

  if (showLiveAd && adSlot) {
    return (
      <aside
        className={`${styles.slot} ${styles.live} ${variantClass[variant]}`}
        data-ad-slot={slotId}
        aria-label={label}
      >
        <ins
          className={`adsbygoogle ${styles.ins}`}
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  return (
    <aside
      className={`${styles.slot} ${variantClass[variant]}`}
      data-ad-slot={slotId}
      aria-label={label}
    >
      <p className={styles.label}>{label}</p>
      {!accepted && adsEnabled() ? (
        <p className={styles.hint}>Ads unlock after cookie consent</p>
      ) : null}
    </aside>
  );
}
