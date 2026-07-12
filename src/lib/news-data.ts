import "server-only";
import { desc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { newsArticles as newsArticlesTable } from "./db/schema";
import type { ServiceSlug } from "./constants";

export type NewsArticle = {
  slug: string;
  image: string;
  category: ServiceSlug;
  publishedAt: string;
  featured: boolean;
  tr: { title: string; excerpt: string; body: string[] };
  en: { title: string; excerpt: string; body: string[] };
};

function toServiceSlug(category: string): ServiceSlug {
  return category.replace(/_/g, "-") as ServiceSlug;
}

function mapRow(row: typeof newsArticlesTable.$inferSelect): NewsArticle {
  return {
    slug: row.slug,
    image: row.image,
    category: toServiceSlug(row.category),
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
    featured: row.featured,
    tr: { title: row.titleTr, excerpt: row.excerptTr, body: row.bodyTr },
    en: { title: row.titleEn, excerpt: row.excerptEn, body: row.bodyEn },
  };
}

export async function getAllNewsArticles(): Promise<NewsArticle[]> {
  const rows = await getDb()
    .select()
    .from(newsArticlesTable)
    .where(eq(newsArticlesTable.published, true))
    .orderBy(desc(newsArticlesTable.publishedAt));
  return rows.map(mapRow);
}

export async function getFeaturedNewsArticles(
  limit = 3,
): Promise<NewsArticle[]> {
  const all = await getAllNewsArticles();
  return all.filter((article) => article.featured).slice(0, limit);
}

export async function getNewsArticle(
  slug: string,
): Promise<NewsArticle | undefined> {
  const [row] = await getDb()
    .select()
    .from(newsArticlesTable)
    .where(eq(newsArticlesTable.slug, slug));
  if (!row || !row.published) return undefined;
  return mapRow(row);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const rows = await getDb()
    .select({ slug: newsArticlesTable.slug })
    .from(newsArticlesTable)
    .where(eq(newsArticlesTable.published, true));
  return rows.map((row) => row.slug);
}
