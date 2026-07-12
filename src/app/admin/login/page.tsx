"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/marketing/logo-mark";
import { login, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="photo-tone relative hidden overflow-hidden lg:block">
        <Image
          src="/images/real/drydock-wide.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/20" />
        <div className="relative flex h-full flex-col justify-end p-12 text-white">
          <LogoMark className="h-12 w-12" />
          <p className="mt-6 max-w-sm text-balance font-display text-2xl font-bold leading-tight tracking-tight">
            Tersane ve inşaat sektöründe güvenilir bir mühendislik ekibi
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Yönetim Paneli — yalnızca yetkili kullanıcılar içindir.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-surface-2 px-6 py-12">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm lg:border-none lg:shadow-none">
          <div className="mb-8 flex flex-col items-center gap-3 text-center lg:hidden">
            <LogoMark className="h-14 w-14" />
            <div>
              <p className="font-stencil text-sm font-bold tracking-[0.15em] text-navy uppercase">
                NFT Group
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Yönetim Paneli
              </p>
            </div>
          </div>

          <div className="mb-8 hidden lg:block">
            <p className="font-stencil text-sm font-bold tracking-[0.15em] text-navy uppercase">
              Giriş Yap
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Devam etmek için bilgilerinizi girin.
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wide">
                E-posta
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-12 rounded-md border-border bg-surface-2 pl-10 text-[15px] focus-visible:border-gold focus-visible:ring-gold/25"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-xs text-muted-foreground uppercase tracking-wide">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="h-12 rounded-md border-border bg-surface-2 pl-10 text-[15px] focus-visible:border-gold focus-visible:ring-gold/25"
                />
              </div>
            </div>

            {state?.error && (
              <p className="text-xs font-medium text-destructive">{state.error}</p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="mt-2 h-12 gap-2 rounded-full bg-gold text-[15px] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:shadow-glow-gold hover:brightness-110"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
