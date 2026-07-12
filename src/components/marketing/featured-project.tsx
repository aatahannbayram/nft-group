import Image from "next/image";
import { useTranslations } from "next-intl";
import { featuredProjectImages } from "@/lib/gallery-data";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export function FeaturedProject() {
  const t = useTranslations("featured");
  const [img1, img2, img3] = featuredProjectImages;

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ScrollReveal className="grid grid-cols-2 gap-3">
          <div className="photo-tone shadow-glow-navy relative col-span-2 h-56 overflow-hidden rounded-2xl ring-1 ring-black/5 sm:h-72">
            <Image
              src={img1}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="photo-tone relative h-32 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 sm:h-44">
            <Image
              src={img2}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="photo-tone relative h-32 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 sm:h-44">
            <Image
              src={img3}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <span className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            {t("description")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
