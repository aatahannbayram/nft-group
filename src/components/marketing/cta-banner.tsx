import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function CtaBanner() {
  const t = useTranslations("contact");

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        aria-hidden
        className="bg-glow-navy pointer-events-none absolute -bottom-20 left-[10%] -z-0 h-72 w-72 opacity-20"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-16 md:py-24 lg:px-20">
        <ScrollReveal>
          <span className="block font-display text-lg font-light text-navy/50 italic sm:text-xl">
            {t("bannerKicker")}
          </span>
          <h2 className="mt-1 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("sectionTitle")}
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            {t("sectionSubtitle")}
          </p>
          <Link
            href="/iletisim"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-gold hover:brightness-110"
          >
            {t("form.submit")}
            <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
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
