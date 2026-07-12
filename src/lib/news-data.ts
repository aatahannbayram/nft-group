import "server-only";
import { cache } from "react";
import { and, desc, eq, ne } from "drizzle-orm";
import { getDb } from "./db";
import { newsArticles as newsArticlesTable } from "./db/schema";
import type { ServiceSlug } from "./constants";

type LocalizedSummary = { title: string; excerpt: string };
type LocalizedArticle = LocalizedSummary & { body: string[] };

export type NewsArticleSummary = {
  slug: string;
  image: string;
  category: ServiceSlug;
  publishedAt: string;
  featured: boolean;
  tr: LocalizedSummary;
  en: LocalizedSummary;
};

export type NewsArticle = Omit<NewsArticleSummary, "tr" | "en"> & {
  tr: LocalizedArticle;
  en: LocalizedArticle;
};

function toServiceSlug(category: string): ServiceSlug {
  return category.replace(/_/g, "-") as ServiceSlug;
}

function toDbCategory(category: ServiceSlug) {
  return category.replace(/-/g, "_") as typeof newsArticlesTable.$inferSelect.category;
}

// Excludes bodyTr/bodyEn — list/teaser/related views never render the full
// article text, so there's no reason to pull it over the wire for them.
const summaryColumns = {
  slug: newsArticlesTable.slug,
  image: newsArticlesTable.image,
  category: newsArticlesTable.category,
  publishedAt: newsArticlesTable.publishedAt,
  featured: newsArticlesTable.featured,
  titleTr: newsArticlesTable.titleTr,
  titleEn: newsArticlesTable.titleEn,
  excerptTr: newsArticlesTable.excerptTr,
  excerptEn: newsArticlesTable.excerptEn,
};

function mapSummaryRow(row: {
  slug: string;
  image: string;
  category: string;
  publishedAt: Date;
  featured: boolean;
  titleTr: string;
  titleEn: string;
  excerptTr: string;
  excerptEn: string;
}): NewsArticleSummary {
  return {
    slug: row.slug,
    image: row.image,
    category: toServiceSlug(row.category),
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
    featured: row.featured,
    tr: { title: row.titleTr, excerpt: row.excerptTr },
    en: { title: row.titleEn, excerpt: row.excerptEn },
  };
}

function mapFullRow(row: typeof newsArticlesTable.$inferSelect): NewsArticle {
  return {
    ...mapSummaryRow(row),
    tr: { title: row.titleTr, excerpt: row.excerptTr, body: row.bodyTr },
    en: { title: row.titleEn, excerpt: row.excerptEn, body: row.bodyEn },
  };
}

export const getAllNewsArticles = cache(
  async (): Promise<NewsArticleSummary[]> => {
    const rows = await getDb()
      .select(summaryColumns)
      .from(newsArticlesTable)
      .where(eq(newsArticlesTable.published, true))
      .orderBy(desc(newsArticlesTable.publishedAt));
    return rows.map(mapSummaryRow);
  },
);

export const getFeaturedNewsArticles = cache(
  async (limit = 3): Promise<NewsArticleSummary[]> => {
    const rows = await getDb()
      .select(summaryColumns)
      .from(newsArticlesTable)
      .where(
        and(
          eq(newsArticlesTable.published, true),
          eq(newsArticlesTable.featured, true),
        ),
      )
      .orderBy(desc(newsArticlesTable.publishedAt))
      .limit(limit);
    return rows.map(mapSummaryRow);
  },
);

export const getRelatedNewsArticles = cache(
  async (
    category: ServiceSlug,
    excludeSlug: string,
    limit = 3,
  ): Promise<NewsArticleSummary[]> => {
    const rows = await getDb()
      .select(summaryColumns)
      .from(newsArticlesTable)
      .where(
        and(
          eq(newsArticlesTable.published, true),
          eq(newsArticlesTable.category, toDbCategory(category)),
          ne(newsArticlesTable.slug, excludeSlug),
        ),
      )
      .orderBy(desc(newsArticlesTable.publishedAt))
      .limit(limit);
    return rows.map(mapSummaryRow);
  },
);

export const getNewsArticle = cache(
  async (slug: string): Promise<NewsArticle | undefined> => {
    const [row] = await getDb()
      .select()
      .from(newsArticlesTable)
      .where(eq(newsArticlesTable.slug, slug));
    if (!row || !row.published) return undefined;
    return mapFullRow(row);
  },
);

export const getAllNewsSlugs = cache(async (): Promise<string[]> => {
  const rows = await getDb()
    .select({ slug: newsArticlesTable.slug })
    .from(newsArticlesTable)
    .where(eq(newsArticlesTable.published, true));
  return rows.map((row) => row.slug);
});
