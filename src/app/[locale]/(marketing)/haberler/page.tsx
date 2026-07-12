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
          <h1 className="mt-3 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("pageIntro")}</p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((article, index) => (
            <ScrollReveal key={article.slug} delay={(index % 6) * 0.06}>
              <Link
                href={`/haberler/${article.slug}`}
                className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="photo-tone relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <span className="font-stencil text-[11px] font-semibold tracking-[0.15em] text-gold uppercase">
                    {tServices(`${categoryToMessageKey(article.category)}.title`)} ·{" "}
                    {dateFormatter.format(new Date(article.publishedAt))}
                  </span>
                  <h2 className="font-display text-lg font-bold leading-snug tracking-tight text-foreground">
                    {article[locale].title}
                  </h2>
                  <p className="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                    {article[locale].excerpt}
                  </p>
                </div>
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
