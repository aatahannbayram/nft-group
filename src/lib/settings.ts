import "server-only";
import { cache } from "react";
import { getDb } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";

export const DEFAULT_SETTINGS = {
  contact_phone: "+90 545 602 91 85",
  contact_email: "nftgroup.gim@gmail.com",
  contact_address: "Hürriyet Mahallesi, No:44/3B, Altınova/Yalova",
  ga_measurement_id: "",
  meta_pixel_id: "",
} as const;

export type SettingKey = keyof typeof DEFAULT_SETTINGS;

/**
 * Cached per-request — every Server Component on a page that reads settings
 * shares one DB round trip instead of firing one query each.
 */
export const getSiteSettings = cache(
  async (): Promise<Record<SettingKey, string>> => {
    const rows = await getDb().select().from(siteSettings);
    const overrides = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULT_SETTINGS, ...overrides } as Record<SettingKey, string>;
  },
);
