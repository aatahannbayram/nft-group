"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { aboutCapabilities } from "@/lib/constants";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("home");
  const about = useTranslations("about");

  return (
    <section className="relative -mt-28 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy px-6 py-32 text-center md:-mt-20">
      <Image
        src="/images/real/drydock-wide.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
      <div className="absolute inset-0 bg-navy/20" />

      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="glass-dark relative z-10 mb-6 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white uppercase"
      >
        {t("heroEyebrow")}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: easeOut }}
        className="relative z-10 max-w-3xl text-balance font-display leading-[1.1] tracking-tight text-white"
      >
        <span className="block text-3xl font-light italic sm:text-4xl md:text-5xl">
          {t("heroTitleLine1")}
        </span>
        <span className="mt-1 block text-4xl font-bold sm:text-5xl md:text-6xl">
          {t("heroTitleLine2")}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14, ease: easeOut }}
        className="relative z-10 mt-6 max-w-lg text-[15px] text-white/70 sm:text-base"
      >
        {t("heroSubtitle")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: easeOut }}
        className="relative z-10 mt-9 flex items-center gap-3"
      >
        <Link
          href="/iletisim"
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105"
        >
          {t("ctaPrimary")}
        </Link>
        <Link
          href="/iletisim"
          aria-label={t("ctaPrimary")}
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gold text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-glow-gold hover:brightness-110"
        >
          <ArrowDownRight className="h-5 w-5" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.26, ease: easeOut }}
        className="glass-dark relative z-10 mt-10 flex flex-wrap items-center justify-center gap-y-2 rounded-full px-6 py-3 text-[13px] font-medium text-white/80"
      >
        {aboutCapabilities.map(({ key }, index) => (
          <span key={key} className="flex items-center gap-3">
            {index > 0 && <span className="h-3 w-px bg-white/20" aria-hidden />}
            <span className="px-3">{about(`capabilities.${key}`)}</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
