import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "@/lib/site";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateLabel: string;
  imageSrc: string;
  imageAlt: string;
  author: string;
  authorRole: string;
  readingMinutes: number;
  featured?: boolean;
  popular?: boolean;
};

export type ArticleWithContent = Article & {
  content: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function formatDateLabel(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readArticleFile(filename: string): ArticleWithContent {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt),
    category: String(data.category),
    date: String(data.date),
    dateLabel: formatDateLabel(String(data.date)),
    imageSrc: String(data.imageSrc),
    imageAlt: String(data.imageAlt),
    author: String(data.author ?? siteConfig.defaultAuthor.name),
    authorRole: String(data.authorRole ?? siteConfig.defaultAuthor.role),
    readingMinutes: estimateReadingMinutes(content),
    featured: Boolean(data.featured),
    popular: Boolean(data.popular),
    content,
  };
}

export function getAllArticles(): Article[] {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const { content: _content, ...article } = readArticleFile(file);
      return article;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleBySlug(slug: string): ArticleWithContent | null {
  const filename = `${slug}.mdx`;
  const fullPath = path.join(ARTICLES_DIR, filename);
  if (!fs.existsSync(fullPath)) return null;
  return readArticleFile(filename);
}

export function getFeaturedArticle(): Article {
  const articles = getAllArticles();
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getRecentArticles(): Article[] {
  const featured = getFeaturedArticle();
  return getAllArticles().filter((a) => a.slug !== featured.slug);
}

export function getPopularArticles(limit = 4): Article[] {
  const marked = getAllArticles().filter((a) => a.popular);
  if (marked.length >= limit) return marked.slice(0, limit);

  const featured = getFeaturedArticle();
  const fillers = getAllArticles().filter(
    (a) => a.slug !== featured.slug && !marked.some((m) => m.slug === a.slug),
  );
  return [...marked, ...fillers].slice(0, limit);
}

export function getRelatedArticles(
  slug: string,
  category: string,
  limit = 3,
): Article[] {
  const others = getAllArticles().filter((a) => a.slug !== slug);
  const sameCategory = others.filter((a) => a.category === category);
  const rest = others.filter((a) => a.category !== category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategories(): string[] {
  return [...new Set(getAllArticles().map((a) => a.category))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getArticlesByCategory(category?: string): Article[] {
  const all = getAllArticles();
  if (!category) return all;
  return all.filter((a) => a.category === category);
}
