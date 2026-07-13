import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PillButton } from "@/components/marketing/pill-button";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function AboutTeaser() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-24 lg:px-20">
        <ScrollReveal
          className="photo-tone shadow-glow-navy relative h-[28rem] w-full overflow-hidden rounded-3xl ring-1 ring-black/5 sm:h-[34rem] lg:h-[38rem]"
        >
          <Image
            src="/images/gallery/tersane-gemi-insa/12.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

          <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-14">
            <span className="block font-display text-lg font-medium text-white/70 sm:text-xl">
              {t("teaserKicker")}
            </span>
            <h2 className="max-w-lg text-balance font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl">
              {t("teaserTitle")}
            </h2>
            <PillButton
              href="/hakkimizda"
              variant="light"
              className="mt-6"
              icon={
                <ArrowDownRight className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              }
            >
              {t("sideLabel")}
            </PillButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
