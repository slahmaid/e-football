const DEFAULT_SITE_URL = "https://pixelpitch.blog";

/** Resolve public site URL; empty env vars fall back (?? alone does not). */
export function resolveSiteUrl(
  value = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const cleaned = value?.trim().replace(/\/$/, "") ?? "";
  if (!cleaned) return DEFAULT_SITE_URL;
  try {
    return new URL(cleaned).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "PixelPitch",
  tagline: "Independent eFootball editorial",
  url: resolveSiteUrl(),
  defaultAuthor: {
    name: "Alex Rivera",
    role: "Editor",
    bio: "Editor at PixelPitch. Covers Division meta, event value, and practical eFootball tactics.",
  },
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@pixelpitch.blog",
  social: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || "#",
    x: process.env.NEXT_PUBLIC_X_URL?.trim() || "#",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "#",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "#",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() || "#",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL?.trim() || "#",
  },
} as const;

export const adsConfig = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD ?? "",
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "",
    inFeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED ?? "",
    midArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDARTICLE ?? "",
  },
} as const;

export function adsEnabled(): boolean {
  return Boolean(adsConfig.client);
}

export const analyticsConfig = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
} as const;
