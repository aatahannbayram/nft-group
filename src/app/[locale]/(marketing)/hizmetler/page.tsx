import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/constants";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      <section className="relative border-b border-border">
        <div className="photo-tone relative h-[46vh] min-h-[20rem] w-full">
          <Image
            src="/images/workforce/steel-beam-welder.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25" />
        </div>
        <ScrollReveal className="relative mx-auto -mt-20 max-w-6xl px-6 pb-14">
          <p className="font-stencil text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            {t("pageEyebrow")}
          </p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            {t("pageIntro")}
          </p>
        </ScrollReveal>
      </section>

      <section className="relative overflow-hidden bg-surface-2">
        <div
          aria-hidden
          className="bg-glow-gold pointer-events-none absolute -top-16 right-[6%] -z-0 h-72 w-72 opacity-15"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={(index % 4) * 0.08}>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="glass group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row"
                >
                  <div className="photo-tone relative aspect-[16/10] shrink-0 overflow-hidden sm:w-2/5">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-8">
                    <span className="font-stencil text-sm font-semibold text-gold">
                      0{index + 1}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
                      {t(`${service.messageKey}.title`)}
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      {t(`${service.messageKey}.description`)}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16" />
    </>
  );
}
