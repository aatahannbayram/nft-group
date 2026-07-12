"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { projectInquiries, inquiryStatusEnum } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";

type InquiryStatus = (typeof inquiryStatusEnum.enumValues)[number];

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await requireAdmin();

  await getDb()
    .update(projectInquiries)
    .set({ status })
    .where(eq(projectInquiries.id, id));

  revalidatePath("/admin/talepler");
}

export async function deleteInquiry(id: string) {
  await requireAdmin();

  await getDb().delete(projectInquiries).where(eq(projectInquiries.id, id));

  revalidatePath("/admin/talepler");
}
