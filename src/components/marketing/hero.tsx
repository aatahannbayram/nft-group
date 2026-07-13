"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ChevronDown, Ship } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CircleIconButton, PillButton } from "@/components/marketing/pill-button";

const easeOut = [0.16, 1, 0.3, 1] as const;

// Dusk floating dry dock, Matthew Davis via Unsplash (Unsplash License —
// free for commercial use). Bright sky/water sits left (darkened by the
// spotlight overlay for text contrast); the crane silhouette sits right,
// already dark, so its detail survives the overlay.
const HERO_IMAGE = "/images/real/hero-dusk-drydock.jpg";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative -mt-28 flex min-h-screen w-full items-center overflow-hidden bg-navy px-6 py-32 md:-mt-20 md:px-16 lg:px-20">
      <motion.div
        className="photo-tone absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 14, ease: "linear" }}
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Horizontal spotlight — dark on the text side (left), fading toward
          the image's negative space (right) so the photo still reads. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
      {/* Vertical falloff — keeps the header and bottom edge legible. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/15" />
      <div
        aria-hidden
        className="bg-glow-navy pointer-events-none absolute -top-24 right-[8%] -z-0 h-72 w-72 opacity-30 sm:h-96 sm:w-96"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-xl text-left">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="glass-dark inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-white/90 uppercase"
          >
            <Ship className="h-3.5 w-3.5 shrink-0 text-white/60" strokeWidth={1.75} />
            {t("heroEyebrow")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mt-6 text-balance font-display leading-[1.1] tracking-tight text-white [text-shadow:0_4px_24px_rgb(0_0_0_/_25%)]"
          >
            <span className="block text-2xl font-medium text-white/90 [text-shadow:0_2px_10px_rgb(0_0_0_/_50%)] sm:text-3xl md:text-4xl">
              {t("heroTitleLine1")}
            </span>
            <span className="mt-1 block text-4xl font-bold sm:text-5xl md:text-6xl">
              {t("heroTitleLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="mt-6 max-w-lg text-base text-white/70 sm:text-lg"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
            className="mt-9 flex items-center gap-3"
          >
            <PillButton href="/iletisim" variant="light" icon={false}>
              {t("ctaPrimary")}
            </PillButton>
            <CircleIconButton
              href="/iletisim"
              aria-label={t("ctaPrimary")}
              icon={<ArrowDownRight className="h-5 w-5" />}
            />
          </motion.div>
        </div>
      </div>

      {/* Floating trust card — extra depth over the image's negative space. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
        className="glass-dark absolute right-6 bottom-10 z-10 hidden w-60 items-center gap-3 rounded-2xl px-5 py-4 sm:flex md:right-16 lg:right-20"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
          <Ship className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="flex flex-col">
          <span className="font-display text-2xl font-bold text-white">
            {t("heroTrustValue")}
          </span>
          <span className="text-xs text-white/70">{t("heroTrustLabel")}</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
