import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const projectTypeEnum = pgEnum("project_type", [
  "tersane_gemi_insa",
  "tersane_tamir",
  "altyapi_ve_celik_insa",
  "insaat_sektoru",
]);

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "contacted",
  "in_progress",
  "closed",
  "archived",
]);

export const projectInquiries = pgTable("project_inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  company: text("company"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  projectType: projectTypeEnum("project_type").notNull(),
  budgetRange: text("budget_range"),
  message: text("message").notNull(),
  status: inquiryStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const galleryItems = pgTable(
  "gallery_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    category: projectTypeEnum("category").notNull(),
    imagePath: text("image_path"),
    videoPath: text("video_path"),
    displayOrder: integer("display_order").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    check(
      "image_or_video",
      sql`${t.imagePath} is not null or ${t.videoPath} is not null`,
    ),
  ],
);

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const newsArticles = pgTable("news_articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  category: projectTypeEnum("category").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  titleTr: text("title_tr").notNull(),
  titleEn: text("title_en").notNull(),
  excerptTr: text("excerpt_tr").notNull(),
  excerptEn: text("excerpt_en").notNull(),
  bodyTr: text("body_tr").array().notNull(),
  bodyEn: text("body_en").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ProjectInquiry = typeof projectInquiries.$inferSelect;
export type NewProjectInquiry = typeof projectInquiries.$inferInsert;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type NewGalleryItem = typeof galleryItems.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewsArticleRow = typeof newsArticles.$inferSelect;
export type NewNewsArticleRow = typeof newsArticles.$inferInsert;
