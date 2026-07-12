import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getFeaturedNewsArticles } from "@/lib/news-data";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export async function NewsTeaser() {
  const t = await getTranslations("news");
  const tServices = await getTranslations("services");
  const locale = (await getLocale()) as "tr" | "en";

  const featured = await getFeaturedNewsArticles(3);
  const dateFormatter = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (featured.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        aria-hidden
        className="bg-glow-gold pointer-events-none absolute -bottom-16 right-[6%] -z-0 h-72 w-72 opacity-15"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-20 md:px-16 md:pt-10 md:pb-24 lg:px-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <ScrollReveal>
            <span className="block font-display text-lg font-light text-navy/50 italic sm:text-xl">
              {t("kicker")}
            </span>
            <h2 className="mt-1 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("sectionTitle")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <Link
              href="/haberler"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-gold uppercase"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((article, index) => (
            <ScrollReveal key={article.slug} delay={0.1 + index * 0.08}>
              <Link
                href={`/haberler/${article.slug}`}
                className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="photo-tone relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <span className="font-stencil text-[11px] font-semibold tracking-[0.15em] text-gold uppercase">
                    {tServices(`${categoryToMessageKey(article.category)}.title`)} ·{" "}
                    {dateFormatter.format(new Date(article.publishedAt))}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-foreground">
                    {article[locale].title}
                  </h3>
                  <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
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
