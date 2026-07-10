import { z } from "zod";

export const projectTypes = [
  "tersane_gemi_insa",
  "tersane_tamir",
  "altyapi_ve_celik_insa",
  "insaat_sektoru",
] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, { error: "İsim en az 2 karakter olmalı." }),
  company: z.string().trim().optional().or(z.literal("")),
  phone: z.string().trim().min(7, { error: "Geçerli bir telefon girin." }),
  email: z.email({ error: "Geçerli bir e-posta girin." }),
  projectType: z.enum(projectTypes, {
    error: "Bir proje türü seçin.",
  }),
  budgetRange: z.string().trim().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { error: "Lütfen projenizi biraz daha detaylandırın." }),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
