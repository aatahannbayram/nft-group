"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { galleryItems, projectTypeEnum } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { deleteUploadedImage, saveUploadedImage, UnsupportedImageTypeError } from "@/lib/uploads";

const uploadSchema = z.object({
  title: z.string().trim().min(2, { error: "Başlık en az 2 karakter olmalı." }),
  category: z.enum(projectTypeEnum.enumValues, { error: "Bir kategori seçin." }),
});

export type UploadState = { error?: string; success?: boolean } | undefined;

export async function uploadGalleryItem(
  _prevState: UploadState,
  formData: FormData,
): Promise<UploadState> {
  await requireAdmin();

  const parsed = uploadSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  let imagePath: string | null;
  try {
    imagePath = await saveUploadedImage(formData, "file", "gallery");
  } catch (err) {
    if (err instanceof UnsupportedImageTypeError) return { error: err.message };
    throw err;
  }
  if (!imagePath) {
    return { error: "Bir fotoğraf seçin." };
  }

  // displayOrder is computed in the same INSERT statement (one atomic
  // round trip to Postgres) instead of a separate count-then-insert, which
  // would race under concurrent uploads.
  await getDb()
    .insert(galleryItems)
    .values({
      title: parsed.data.title,
      category: parsed.data.category,
      imagePath,
      displayOrder: sql`(select coalesce(max(${galleryItems.displayOrder}), -1) + 1 from ${galleryItems})`,
      published: true,
    });

  revalidatePath("/admin/galeri");
  return { success: true };
}

export async function togglePublished(id: string, published: boolean) {
  await requireAdmin();

  await getDb()
    .update(galleryItems)
    .set({ published })
    .where(eq(galleryItems.id, id));

  revalidatePath("/admin/galeri");
}

export async function updateDisplayOrder(id: string, displayOrder: number) {
  await requireAdmin();

  await getDb()
    .update(galleryItems)
    .set({ displayOrder })
    .where(eq(galleryItems.id, id));

  revalidatePath("/admin/galeri");
}

export async function deleteGalleryItem(id: string) {
  await requireAdmin();

  const db = getDb();
  const [item] = await db
    .select({ imagePath: galleryItems.imagePath })
    .from(galleryItems)
    .where(eq(galleryItems.id, id));

  await db.delete(galleryItems).where(eq(galleryItems.id, id));
  await deleteUploadedImage(item?.imagePath);

  revalidatePath("/admin/galeri");
}
