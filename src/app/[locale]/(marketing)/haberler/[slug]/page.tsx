import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllNewsSlugs, getNewsArticle, getRelatedNewsArticles } from "@/lib/news-data";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return {};

  const locale = (await getLocale()) as "tr" | "en";
  return {
    title: `${article[locale].title} — NFT Group`,
    description: article[locale].excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  const t = await getTranslations("news");
  const tServices = await getTranslations("services");
  const locale = (await getLocale()) as "tr" | "en";
  const content = article[locale];

  const dateFormatter = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const related = await getRelatedNewsArticles(article.category, slug, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="photo-tone relative h-[42vh] min-h-[18rem] w-full">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25" />
        </div>
        <ScrollReveal className="relative mx-auto -mt-16 max-w-3xl px-6 pb-14">
          <Link
            href="/haberler"
            className="group mb-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gold uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {t("backToNews")}
          </Link>
          <p className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            {tServices(`${categoryToMessageKey(article.category)}.title`)} ·{" "}
            {dateFormatter.format(new Date(article.publishedAt))}
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            {content.title}
          </h1>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <ScrollReveal className="flex flex-col gap-5">
          {content.body.map((paragraph, index) => (
            <p key={index} className="text-[15px] leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="mt-14 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-display text-xl tracking-tight">{tServices("detailCta")}</p>
          <Link
            href="/iletisim"
            className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-gold hover:brightness-110"
          >
            {tServices("sectionTitle")}
          </Link>
        </ScrollReveal>

        {related.length > 0 && (
          <div className="mt-16">
            <p className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              {t("relatedTitle")}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((other, index) => (
                <ScrollReveal key={other.slug} delay={index * 0.08}>
                  <Link
                    href={`/haberler/${other.slug}`}
                    className="glass group block h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span className="font-display text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-gold">
                      {other[locale].title}
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
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
