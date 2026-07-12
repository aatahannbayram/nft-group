"use client";

import { useState } from "react";
import Image from "next/image";
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

export function ServicesSection() {
  const t = useTranslations("services");
  const [active, setActive] = useState(0);

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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = ICONS[service.messageKey];
            const isActive = index === active;

            return (
              <ScrollReveal key={service.slug} delay={0.06 * index}>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="photo-tone group relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-2xl p-7 text-white shadow-lg transition-all duration-500 sm:min-h-[20rem] sm:p-8"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      isActive ? "scale-110" : "scale-100 group-hover:scale-105"
                    )}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t transition-colors duration-500",
                      isActive
                        ? "from-navy/95 via-navy/50 to-navy/10"
                        : "from-black/85 via-black/35 to-black/5"
                    )}
                  />

                  <span
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500",
                      isActive ? "bg-gold text-white" : "bg-white/15 text-white backdrop-blur-sm"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>

                  <h3 className="relative mt-5 max-w-[14rem] font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                    {t(`${service.messageKey}.title`)}
                  </h3>

                  <span className="relative mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/90 underline underline-offset-4">
                    {t("viewDetails")}
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
