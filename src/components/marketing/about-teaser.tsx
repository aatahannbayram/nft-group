import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function AboutTeaser() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden bg-surface-2">
      <div
        aria-hidden
        className="bg-glow-navy pointer-events-none absolute -top-20 right-[8%] -z-0 h-72 w-72 opacity-15"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-24 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <ScrollReveal className="lg:col-span-5">
            <span className="block font-display text-lg font-light text-navy/50 italic sm:text-xl">
              {t("teaserKicker")}
            </span>
            <h2 className="max-w-lg text-balance font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {t("teaserTitle")}
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              {t("mission")}
            </p>
            <Link
              href="/hakkimizda"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:shadow-md"
            >
              {t("sideLabel")}
              <ArrowDownRight className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal
            delay={0.15}
            className="photo-tone shadow-glow-navy relative h-80 overflow-hidden rounded-3xl ring-1 ring-black/5 sm:h-96 lg:col-span-7 lg:h-[28rem]"
          >
            <Image
              src="/images/real/crane-lift.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
