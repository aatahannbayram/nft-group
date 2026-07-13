import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllNewsArticles } from "@/lib/news-data";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export default async function NewsPage() {
  const t = await getTranslations("news");
  const tServices = await getTranslations("services");
  const locale = (await getLocale()) as "tr" | "en";

  const dateFormatter = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sorted = await getAllNewsArticles();

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="bg-glow-navy pointer-events-none absolute -top-24 left-[8%] -z-0 h-80 w-80 opacity-15"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <p className="font-stencil text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            {t("pageEyebrow")}
          </p>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-2xl font-bold tracking-tight md:text-3xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("pageIntro")}</p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((article, index) => (
            <ScrollReveal key={article.slug} delay={(index % 6) * 0.06}>
              <Link
                href={`/haberler/${article.slug}`}
                className="photo-tone group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/45 to-navy/5" />
                <span className="relative font-stencil text-[11px] font-semibold tracking-[0.15em] text-white/70 uppercase">
                  {tServices(`${categoryToMessageKey(article.category)}.title`)} ·{" "}
                  {dateFormatter.format(new Date(article.publishedAt))}
                </span>
                <h2 className="relative mt-2 font-display text-lg font-bold leading-snug tracking-tight">
                  {article[locale].title}
                </h2>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function categoryToMessageKey(category: string) {
  const map: Record<string, string> = {
    "tersane-gemi-insa": "tersaneGemiInsa",
    "tersane-tamir": "tersaneTamir",
    "altyapi-ve-celik-insa": "altyapiVeCelikInsa",
    "insaat-sektoru": "insaatSektoru",
  };
  return map[category] ?? category;
}
