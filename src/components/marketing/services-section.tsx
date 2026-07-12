"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, Factory, Ship, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const ICONS = {
  tersaneGemiInsa: Ship,
  tersaneTamir: Wrench,
  altyapiVeCelikInsa: Factory,
  insaatSektoru: Building2,
} as const;

function HexPattern() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-8 -right-8 h-56 w-56 text-white"
      style={{
        maskImage: "radial-gradient(circle at bottom right, black 0%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(circle at bottom right, black 0%, transparent 72%)",
      }}
    >
      <defs>
        <pattern
          id="services-hex"
          width="26"
          height="30"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(13,0)"
        >
          <polygon
            points="13,0 26,7.5 26,22.5 13,30 0,22.5 0,7.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#services-hex)" />
    </svg>
  );
}

export function ServicesSection() {
  const t = useTranslations("services");
  const [active, setActive] = useState(0);
  const activeService = services[active];

  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-24 lg:px-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <ScrollReveal>
            <span className="block font-display text-lg font-light text-navy/50 italic sm:text-xl">
              {t("sectionKicker")}
            </span>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("sectionTitle")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <Link
              href="/hizmetler"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-gold uppercase"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.12} className="relative mt-12 rounded-3xl bg-surface-2 p-3 sm:p-4">
          {/* Preload every fx image up front so hovering between cards swaps instantly */}
          <div className="sr-only" aria-hidden>
            {services.map((service) => (
              <Image
                key={service.fxImage}
                src={service.fxImage}
                alt=""
                width={1}
                height={1}
                priority
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {services.map((service, index) => {
              const Icon = ICONS[service.messageKey];
              const isActive = index === active;

              return (
                <Link
                  key={service.slug}
                  href={`/hizmetler/${service.slug}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cn(
                    "group relative flex min-h-[13rem] flex-col items-start overflow-hidden rounded-2xl p-7 text-left transition-all duration-500 sm:min-h-[16rem] sm:p-8",
                    isActive
                      ? "bg-gradient-gold text-white shadow-glow-gold"
                      : "glass text-foreground hover:-translate-y-1 hover:shadow-lg"
                  )}
                >
                  {isActive && <HexPattern />}

                  <Icon
                    className={cn(
                      "relative h-6 w-6 transition-colors duration-500",
                      isActive ? "text-white" : "text-gold"
                    )}
                    strokeWidth={1.5}
                  />

                  <h3 className="relative mt-5 max-w-[14rem] font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                    {t(`${service.messageKey}.title`)}
                  </h3>

                  <span
                    className={cn(
                      "relative mt-4 text-sm font-medium underline underline-offset-4 transition-colors duration-500",
                      isActive ? "text-white/90" : "text-muted-foreground"
                    )}
                  >
                    {t("viewDetails")}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-[40%] w-[50%] -translate-x-1/2 -translate-y-1/2 sm:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={activeService.fxImage}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 320px"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
