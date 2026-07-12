"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { galleryItems, projectTypeEnum } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/session";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const uploadSchema = z.object({
  title: z.string().trim().min(2, { error: "Başlık en az 2 karakter olmalı." }),
  category: z.enum(projectTypeEnum.enumValues, { error: "Bir kategori seçin." }),
});

export type UploadState = { error?: string } | undefined;

export async function uploadGalleryItem(
  _prevState: UploadState,
  formData: FormData,
): Promise<UploadState> {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const parsed = uploadSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Bir fotoğraf seçin." };
  }

  const extension = EXTENSION_BY_MIME[file.type];
  if (!extension) {
    return { error: "Sadece JPG, PNG, WebP veya AVIF yüklenebilir." };
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), bytes);

  const existingCount = await getDb().$count(galleryItems);

  await getDb()
    .insert(galleryItems)
    .values({
      title: parsed.data.title,
      category: parsed.data.category,
      imagePath: `/uploads/gallery/${filename}`,
      displayOrder: existingCount,
      published: true,
    });

  revalidatePath("/admin/galeri");
}

export async function togglePublished(id: string, published: boolean) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  await getDb()
    .update(galleryItems)
    .set({ published })
    .where(eq(galleryItems.id, id));

  revalidatePath("/admin/galeri");
}

export async function updateDisplayOrder(id: string, displayOrder: number) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  await getDb()
    .update(galleryItems)
    .set({ displayOrder })
    .where(eq(galleryItems.id, id));

  revalidatePath("/admin/galeri");
}

export async function deleteGalleryItem(id: string) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const db = getDb();
  const [item] = await db
    .select({ imagePath: galleryItems.imagePath })
    .from(galleryItems)
    .where(eq(galleryItems.id, id));

  await db.delete(galleryItems).where(eq(galleryItems.id, id));

  if (item?.imagePath) {
    await unlink(path.join(process.cwd(), "public", item.imagePath)).catch(
      () => {},
    );
  }

  revalidatePath("/admin/galeri");
}
