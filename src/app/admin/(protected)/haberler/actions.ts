"use server";

import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { newsArticles, projectTypeEnum } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { deleteUploadedImage, saveUploadedImage, UnsupportedImageTypeError } from "@/lib/uploads";

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

export async function createArticle(
  _prevState: ArticleState,
  formData: FormData,
): Promise<ArticleState> {
  await requireAdmin();

  const parsed = articleSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  let imagePath: string | null;
  try {
    imagePath = await saveUploadedImage(formData, "image", "news");
  } catch (err) {
    if (err instanceof UnsupportedImageTypeError) return { error: err.message };
    throw err;
  }
  if (!imagePath) {
    return { error: "Bir görsel seçin." };
  }

  try {
    await getDb()
      .insert(newsArticles)
      .values({
        ...parsed.data,
        image: imagePath,
        publishedAt: new Date(parsed.data.publishedAt),
      });
  } catch (err) {
    // Insert failed — the file we just wrote would otherwise be orphaned.
    await deleteUploadedImage(imagePath);
    if (err instanceof NeonDbError && err.code === "23505") {
      return { error: "Bu slug zaten kullanılıyor, farklı bir slug seçin." };
    }
    throw err;
  }

  revalidatePath("/admin/haberler");
  revalidatePath("/", "layout");
  redirect("/admin/haberler");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleState,
  formData: FormData,
): Promise<ArticleState> {
  await requireAdmin();

  const parsed = articleSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  let imagePath: string | null;
  try {
    imagePath = await saveUploadedImage(formData, "image", "news");
  } catch (err) {
    if (err instanceof UnsupportedImageTypeError) return { error: err.message };
    throw err;
  }

  const db = getDb();
  const [existing] = await db
    .select({ image: newsArticles.image })
    .from(newsArticles)
    .where(eq(newsArticles.id, id));

  try {
    await db
      .update(newsArticles)
      .set({
        ...parsed.data,
        publishedAt: new Date(parsed.data.publishedAt),
        ...(imagePath ? { image: imagePath } : {}),
      })
      .where(eq(newsArticles.id, id));
  } catch (err) {
    if (imagePath) await deleteUploadedImage(imagePath);
    if (err instanceof NeonDbError && err.code === "23505") {
      return { error: "Bu slug zaten kullanılıyor, farklı bir slug seçin." };
    }
    throw err;
  }

  // Replaced the cover image — the old file is no longer referenced anywhere.
  if (imagePath && existing?.image) {
    await deleteUploadedImage(existing.image);
  }

  revalidatePath("/admin/haberler");
  revalidatePath("/", "layout");
  redirect("/admin/haberler");
}

export async function deleteArticle(id: string) {
  await requireAdmin();

  const db = getDb();
  const [article] = await db
    .select({ image: newsArticles.image })
    .from(newsArticles)
    .where(eq(newsArticles.id, id));

  await db.delete(newsArticles).where(eq(newsArticles.id, id));
  await deleteUploadedImage(article?.image);

  revalidatePath("/admin/haberler");
  revalidatePath("/", "layout");
}
