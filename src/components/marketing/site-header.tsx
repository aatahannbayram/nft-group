"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { LogoMark } from "@/components/marketing/logo-mark";

export function SiteHeader() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/hizmetler", label: t("services") },
    { href: "/projeler", label: t("projects") },
    { href: "/haberler", label: t("news") },
    { href: "/hakkimizda", label: t("about") },
    { href: "/iletisim", label: t("contact") },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/[0.06] bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 sm:px-10 md:px-16 lg:px-20">
        <Link href="/" aria-label="NFT Group" className="flex shrink-0 items-center gap-2.5">
          <LogoMark className="h-9 w-9" />
          <span className="font-stencil text-sm leading-tight font-bold tracking-[0.15em] text-navy uppercase">
            NFT
            <br />
            Group
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-navy/70 uppercase md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <LocaleSwitcher theme="light" />
          <Link
            href="/iletisim"
            className="rounded-full bg-gold px-3.5 py-2 text-[12px] font-semibold text-white transition hover:brightness-110 sm:px-4 sm:text-[13px]"
          >
            {t("getQuote")}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy transition hover:bg-navy/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-navy/[0.06] bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium tracking-wide text-navy/80 uppercase transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
