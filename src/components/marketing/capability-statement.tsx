import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function CapabilityStatement() {
  const t = useTranslations("home");

  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 text-center md:px-16 md:pt-28 md:pb-16 lg:px-20">
        <ScrollReveal className="mx-auto max-w-4xl">
          <h2 className="text-balance font-display text-3xl font-bold uppercase leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("statementTitle1")}
          </h2>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="photo-tone shadow-glow-navy relative mx-auto my-10 h-64 w-full max-w-2xl overflow-hidden rounded-3xl ring-1 ring-black/5 sm:my-12 sm:h-80 md:h-[26rem]"
        >
          <Image
            src="/images/real/hull-block-hangar.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mx-auto max-w-4xl">
          <h2 className="text-balance font-display text-3xl font-bold uppercase leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("statementTitle2")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("statementCaption")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
