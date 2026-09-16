export const siteConfig = {
  name: "PixelPitch",
  tagline: "Independent eFootball editorial",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://pixelpitch.blog",
  defaultAuthor: {
    name: "Alex Rivera",
    role: "Editor",
    bio: "Editor at PixelPitch. Covers Division meta, event value, and practical eFootball tactics.",
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@pixelpitch.blog",
  social: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#",
    x: process.env.NEXT_PUBLIC_X_URL ?? "#",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "#",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL ?? "#",
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
