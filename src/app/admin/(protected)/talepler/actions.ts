"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { projectInquiries, inquiryStatusEnum } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/session";

type InquiryStatus = (typeof inquiryStatusEnum.enumValues)[number];

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  await getDb()
    .update(projectInquiries)
    .set({ status })
    .where(eq(projectInquiries.id, id));

  revalidatePath("/admin/talepler");
}

export async function deleteInquiry(id: string) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  await getDb().delete(projectInquiries).where(eq(projectInquiries.id, id));

  revalidatePath("/admin/talepler");
}
