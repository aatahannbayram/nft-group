"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/session";
import type { SettingKey } from "@/lib/settings";

const settingsSchema = z.object({
  contact_phone: z.string().trim().min(5, { error: "Geçerli bir telefon girin." }),
  contact_email: z.email({ error: "Geçerli bir e-posta girin." }),
  contact_address: z.string().trim().min(5, { error: "Geçerli bir adres girin." }),
  ga_measurement_id: z
    .string()
    .trim()
    .regex(/^(G-[A-Z0-9]+)?$/, { error: "Geçerli bir GA4 Measurement ID girin (G- ile başlar)." }),
  meta_pixel_id: z
    .string()
    .trim()
    .regex(/^[0-9]*$/, { error: "Geçerli bir Meta Pixel ID girin (sadece rakam)." }),
});

export type SettingsState = { error?: string; success?: boolean } | undefined;

export async function updateSettings(
  _prevState: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const parsed = settingsSchema.safeParse({
    contact_phone: formData.get("contact_phone"),
    contact_email: formData.get("contact_email"),
    contact_address: formData.get("contact_address"),
    ga_measurement_id: formData.get("ga_measurement_id") ?? "",
    meta_pixel_id: formData.get("meta_pixel_id") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  const db = getDb();
  const entries = Object.entries(parsed.data) as [SettingKey, string][];

  for (const [key, value] of entries) {
    await db
      .insert(siteSettings)
      .values({ key, value })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, updatedAt: new Date() },
      });
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/icerik");

  return { success: true };
}
