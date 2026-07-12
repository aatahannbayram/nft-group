"use server";

import { redirect } from "next/navigation";
import { compare } from "bcrypt-ts";
import { z } from "zod";
import { createSession } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.email({ error: "Geçerli bir e-posta girin." }),
  password: z.string().min(1, { error: "Şifre girin." }),
});

export type LoginState = { error?: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz giriş." };
  }

  const { email, password } = parsed.data;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  const validEmail = adminEmail && email === adminEmail;
  const validPassword =
    adminPasswordHash && (await compare(password, adminPasswordHash));

  if (!validEmail || !validPassword) {
    return { error: "E-posta veya şifre hatalı." };
  }

  await createSession();
  redirect("/admin");
}
