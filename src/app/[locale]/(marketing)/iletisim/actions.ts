"use server";

import { getDb } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { inquirySchema } from "@/lib/validations/inquiry";
import { getSiteSettings } from "@/lib/settings";
import { getMailer } from "@/lib/mailer";

export async function submitInquiry(input: unknown) {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const { name, company, phone, email, projectType, budgetRange, message } =
    parsed.data;

  await getDb()
    .insert(projectInquiries)
    .values({
      name,
      phone,
      email,
      projectType,
      message,
      company: company || undefined,
      budgetRange: budgetRange || undefined,
    });

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const { contact_email } = await getSiteSettings();
      await getMailer().sendMail({
        from: `NFT Group Site <${process.env.SMTP_USER}>`,
        to: contact_email,
        subject: `Yeni Proje Talebi: ${name} — ${projectType}`,
        text: [
          `Ad Soyad: ${name}`,
          company ? `Firma: ${company}` : null,
          `Telefon: ${phone}`,
          `E-posta: ${email}`,
          `Proje Türü: ${projectType}`,
          budgetRange ? `Tahmini Bütçe: ${budgetRange}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (err) {
      // Notification is best-effort — the inquiry is already saved.
      console.error("SMTP notification failed", err);
    }
  }

  return { success: true as const };
}
