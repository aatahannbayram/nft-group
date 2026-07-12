import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export class UnsupportedImageTypeError extends Error {
  constructor() {
    super("Sadece JPG, PNG, WebP veya AVIF yüklenebilir.");
  }
}

/**
 * Saves an uploaded image under public/uploads/<subdir>/<uuid>.<ext> and
 * returns its public path (e.g. "/uploads/gallery/abc.jpg"), or null if no
 * file was provided under `fieldName`.
 */
export async function saveUploadedImage(
  formData: FormData,
  fieldName: string,
  subdir: string,
): Promise<string | null> {
  const file = formData.get(fieldName);
  if (!(file instanceof File) || file.size === 0) return null;

  const extension = EXTENSION_BY_MIME[file.type];
  if (!extension) throw new UnsupportedImageTypeError();

  const uploadDir = path.join(process.cwd(), "public", "uploads", subdir);
  await mkdir(uploadDir, { recursive: true });
  const filename = `${randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);
  return `/uploads/${subdir}/${filename}`;
}

/** Best-effort delete of a previously uploaded image; never throws. */
export async function deleteUploadedImage(publicPath: string | null | undefined) {
  if (!publicPath?.startsWith("/uploads/")) return;
  await unlink(path.join(process.cwd(), "public", publicPath)).catch(() => {});
}
