import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { galleryItems } from "@/lib/gallery-data";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const CATEGORIES = [
  "tersane-gemi-insa",
  "tersane-tamir",
  "altyapi-ve-celik-insa",
  "insaat-sektoru",
] as const;

const STRIP_IMAGES = CATEGORIES.flatMap((category) =>
  galleryItems.filter((item) => item.category === category).slice(0, 3),
);

function categoryToMessageKey(category: string) {
  const map: Record<string, string> = {
    "tersane-gemi-insa": "tersaneGemiInsa",
    "tersane-tamir": "tersaneTamir",
    "altyapi-ve-celik-insa": "altyapiVeCelikInsa",
    "insaat-sektoru": "insaatSektoru",
  };
  return map[category] ?? category;
}

export function FieldStrip() {
  const t = useTranslations("home");
  const tProjects = useTranslations("projects");
  const tServices = useTranslations("services");

  return (
    <section className="relative w-full overflow-hidden bg-surface-2">
      <div
        aria-hidden
        className="bg-glow-gold pointer-events-none absolute -top-10 right-[8%] -z-0 h-80 w-80 opacity-15"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[minmax(0,22rem)_1fr] md:px-16 md:py-20 lg:px-20">
        <ScrollReveal>
          <span className="block font-display text-lg font-light text-navy/50 italic sm:text-xl">
            {t("fieldKicker")}
          </span>
          <h2 className="mt-1 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("fieldTitle")}
          </h2>
          <p className="mt-4 max-w-xs text-muted-foreground">{t("fieldIntro")}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold tracking-tight text-navy">
              {galleryItems.length}+
            </span>
            <span className="text-sm text-muted-foreground">{t("fieldBadge")}</span>
          </div>

          <div className="mt-7">
            <Link
              href="/projeler"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:shadow-md"
            >
              {tProjects("browse")}
              <ArrowDownRight className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div
          className="-mr-6 flex gap-4 overflow-x-auto pb-2 md:-mr-16 md:pr-16 lg:-mr-20 lg:pr-20 [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage:
              "linear-gradient(to right, black calc(100% - 3rem), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black calc(100% - 3rem), transparent 100%)",
          }}
        >
          {STRIP_IMAGES.map((item, index) => (
            <ScrollReveal
              key={item.id}
              delay={0.1 + index * 0.06}
              y={16}
              className="group photo-tone relative h-60 w-72 shrink-0 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:h-72 sm:w-80"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-3 bottom-3 z-10">
                <span className="glass-dark inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                  {tServices(`${categoryToMessageKey(item.category)}.title`)}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
