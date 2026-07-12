"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const FAQ_KEYS = [
  "scope",
  "locations",
  "timeline",
  "quote",
  "military",
] as const;

export function FaqSection() {
  const t = useTranslations("faq");

  return (
    <section className="relative overflow-hidden bg-surface-2">
      <div
        aria-hidden
        className="bg-glow-gold pointer-events-none absolute -bottom-24 left-[4%] -z-0 h-80 w-80 opacity-15"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-24 lg:px-20">
        <ScrollReveal className="max-w-xl">
          <span className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-sm text-muted-foreground">{t("intro")}</p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal
            delay={0.1}
            className="photo-tone shadow-glow-navy relative hidden min-h-[28rem] w-full overflow-hidden rounded-3xl ring-1 ring-black/5 lg:col-span-4 lg:block"
          >
            <Image
              src="/images/real/hull-block-lift.jpg"
              alt=""
              fill
              sizes="384px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/0" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-sm font-medium text-white/90">
              {t("imageCaption")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="lg:col-span-8">
            <Accordion defaultValue={[FAQ_KEYS[0]]}>
              {FAQ_KEYS.map((key, index) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>
                    <span className="flex items-start gap-4">
                      <span className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold">
                        0{index + 1}
                      </span>
                      <span>{t(`items.${key}.question`)}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionPanel>
                    <div className="pl-9">{t(`items.${key}.answer`)}</div>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
