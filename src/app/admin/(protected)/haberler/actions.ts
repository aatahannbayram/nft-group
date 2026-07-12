"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { newsArticles, projectTypeEnum } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/session";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "news");

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
      error: "Slug sadece küçük harf, rakam ve tire içerebilir.",
    }),
  category: z.enum(projectTypeEnum.enumValues, { error: "Bir kategori seçin." }),
  publishedAt: z.string().trim().min(1, { error: "Bir tarih seçin." }),
  featured: z.boolean(),
  published: z.boolean(),
  titleTr: z.string().trim().min(3, { error: "Türkçe başlık girin." }),
  titleEn: z.string().trim().min(3, { error: "İngilizce başlık girin." }),
  excerptTr: z.string().trim().min(10, { error: "Türkçe özet girin." }),
  excerptEn: z.string().trim().min(10, { error: "İngilizce özet girin." }),
  bodyTr: z.array(z.string().trim().min(1)).min(1, { error: "Türkçe içerik girin." }),
  bodyEn: z.array(z.string().trim().min(1)).min(1, { error: "İngilizce içerik girin." }),
});

export type ArticleState = { error?: string } | undefined;

function parseFormData(formData: FormData) {
  return {
    slug: formData.get("slug"),
    category: formData.get("category"),
    publishedAt: formData.get("publishedAt"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    titleTr: formData.get("titleTr"),
    titleEn: formData.get("titleEn"),
    excerptTr: formData.get("excerptTr"),
    excerptEn: formData.get("excerptEn"),
    bodyTr: String(formData.get("bodyTr") ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    bodyEn: String(formData.get("bodyEn") ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  };
}

async function saveImageIfProvided(formData: FormData): Promise<string | null> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return null;

  const extension = EXTENSION_BY_MIME[file.type];
  if (!extension) throw new Error("Desteklenmeyen dosya türü.");

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), bytes);
  return `/uploads/news/${filename}`;
}

export async function createArticle(
  _prevState: ArticleState,
  formData: FormData,
): Promise<ArticleState> {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const parsed = articleSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  const imagePath = await saveImageIfProvided(formData);
  if (!imagePath) {
    return { error: "Bir görsel seçin." };
  }

  await getDb()
    .insert(newsArticles)
    .values({
      ...parsed.data,
      image: imagePath,
      publishedAt: new Date(parsed.data.publishedAt),
    });

  revalidatePath("/admin/haberler");
  revalidatePath("/", "layout");
  redirect("/admin/haberler");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleState,
  formData: FormData,
): Promise<ArticleState> {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const parsed = articleSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  const imagePath = await saveImageIfProvided(formData);

  await getDb()
    .update(newsArticles)
    .set({
      ...parsed.data,
      publishedAt: new Date(parsed.data.publishedAt),
      ...(imagePath ? { image: imagePath } : {}),
    })
    .where(eq(newsArticles.id, id));

  revalidatePath("/admin/haberler");
  revalidatePath("/", "layout");
  redirect("/admin/haberler");
}

export async function deleteArticle(id: string) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const db = getDb();
  const [article] = await db
    .select({ image: newsArticles.image })
    .from(newsArticles)
    .where(eq(newsArticles.id, id));

  await db.delete(newsArticles).where(eq(newsArticles.id, id));

  if (article?.image?.startsWith("/uploads/")) {
    await unlink(path.join(process.cwd(), "public", article.image)).catch(() => {});
  }

  revalidatePath("/admin/haberler");
  revalidatePath("/", "layout");
}
