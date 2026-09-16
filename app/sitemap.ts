import type { MetadataRoute } from "next";
import { getAllArticles, getCategories } from "@/lib/articles";
import {
  getEvents,
  getFormations,
  getPlayers,
  getPlaystyles,
} from "@/lib/database";
import { resolveSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/disclosure`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/database`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/players`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${base}/formations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/playstyles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/events`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/updates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map(
    (category) => ({
      url: `${base}/articles?category=${encodeURIComponent(category)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map(
    (article) => ({
      url: `${base}/articles/${article.slug}`,
      lastModified: new Date(`${article.date}T12:00:00`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  const playerRoutes: MetadataRoute.Sitemap = getPlayers().map((p) => ({
    url: `${base}/players/${p.slug}`,
    lastModified: new Date(`${p.updated}T12:00:00`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const formationRoutes: MetadataRoute.Sitemap = getFormations().map((f) => ({
    url: `${base}/formations/${f.slug}`,
    lastModified: new Date(`${f.updated}T12:00:00`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const playstyleRoutes: MetadataRoute.Sitemap = getPlaystyles().map((p) => ({
    url: `${base}/playstyles/${p.slug}`,
    lastModified: new Date(`${p.updated}T12:00:00`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = getEvents().map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(`${e.updated}T12:00:00`),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...playerRoutes,
    ...formationRoutes,
    ...playstyleRoutes,
    ...eventRoutes,
  ];
}
