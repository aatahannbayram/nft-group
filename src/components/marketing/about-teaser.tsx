import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function AboutTeaser() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="bg-glow-navy pointer-events-none absolute -top-20 right-[8%] -z-0 h-72 w-72 opacity-15"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-24 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:gap-3">
            <span
              className="font-stencil text-xs font-semibold tracking-[0.2em] text-foreground/60 uppercase"
              style={{ writingMode: "vertical-rl" }}
            >
              {t("sideLabel")}
            </span>
            <span className="h-10 w-px bg-gold" />
          </div>

          <ScrollReveal className="lg:col-span-6">
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
            className="photo-tone relative h-64 overflow-hidden rounded-xl shadow-md ring-1 ring-black/5 sm:h-80 lg:col-span-5 lg:h-auto"
          >
            <Image
              src="/images/real/crane-lift.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
