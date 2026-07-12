import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/constants";
import { galleryItems } from "@/lib/gallery-data";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const t = await getTranslations("services");
  const otherServices = services.filter((s) => s.slug !== slug);
  const gallery = galleryItems
    .filter((item) => item.category === slug)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <ScrollReveal className="relative mx-auto max-w-4xl px-6 py-28 md:py-36">
          <p className="font-stencil text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            {t("pageEyebrow")}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t(`${service.messageKey}.title`)}
          </h1>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <ScrollReveal>
          <p className="text-lg leading-relaxed text-foreground/90">
            {t(`${service.messageKey}.detail`)}
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {t.raw(`${service.messageKey}.items`).map((item: string) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span className="h-px w-4 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {gallery.length > 0 && (
          <div className="mt-14 grid grid-cols-3 gap-3">
            {gallery.map((item, index) => (
              <ScrollReveal
                key={item.id}
                delay={index * 0.08}
                className="photo-tone relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 20vw, 33vw"
                  className="object-cover"
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal className="mt-14 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl tracking-tight">
            {t("detailCta")}
          </p>
          <Link
            href="/iletisim"
            className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-gold hover:brightness-110"
          >
            {t("sectionTitle")}
          </Link>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {otherServices.map((other, index) => (
            <ScrollReveal key={other.slug} delay={index * 0.08}>
              <Link
                href={`/hizmetler/${other.slug}`}
                className="glass group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="font-stencil text-xs font-semibold tracking-wider text-gold">
                  {t(`${other.messageKey}.title`)}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
