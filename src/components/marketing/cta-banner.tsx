import Image from "next/image";
import { useTranslations } from "next-intl";
import { PillButton } from "@/components/marketing/pill-button";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function CtaBanner() {
  const t = useTranslations("contact");

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div
        aria-hidden
        className="bg-glow-navy pointer-events-none absolute -bottom-20 left-[10%] -z-0 h-72 w-72 opacity-20"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-16 md:py-24 lg:px-20">
        <ScrollReveal>
          <span className="block font-display text-lg font-medium text-steel sm:text-xl">
            {t("bannerKicker")}
          </span>
          <h2 className="mt-1 text-balance font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t("sectionTitle")}
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            {t("sectionSubtitle")}
          </p>
          <PillButton href="/iletisim" variant="solid" className="mt-8">
            {t("form.submit")}
          </PillButton>
        </ScrollReveal>

        <ScrollReveal
          delay={0.15}
          className="photo-tone shadow-glow-navy relative h-64 overflow-hidden rounded-3xl ring-1 ring-black/5 sm:h-96"
        >
          <Image
            src="/images/real/hull-transport-crane.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
