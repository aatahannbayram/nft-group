import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const MARQUEE_IMAGES = [
  "/images/gallery/featured/01.jpg",
  "/images/real/drydock-wide.jpg",
  "/images/gallery/tersane-gemi-insa/14.jpg",
  "/images/gallery/featured/03.jpg",
  "/images/gallery/altyapi-ve-celik-insa/02.jpg",
  "/images/gallery/tersane-gemi-insa/12.jpg",
  "/images/gallery/featured/04.jpg",
  "/images/gallery/tersane-gemi-insa/13.jpg",
];

const LOOPED_IMAGES = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

export function FieldStrip() {
  const t = useTranslations("home");

  return (
    <section className="relative w-full overflow-hidden bg-gradient-navy py-20 md:py-24">
      <div
        aria-hidden
        className="bg-glow-navy pointer-events-none absolute -top-16 left-1/2 -z-0 h-80 w-80 -translate-x-1/2 opacity-20"
      />

      <ScrollReveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-balance font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl">
          {t("fieldTitle")}
        </h2>
      </ScrollReveal>

      <div
        className="group relative mt-12 w-full"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="animate-marquee flex w-max gap-5 group-hover:[animation-play-state:paused]">
          {LOOPED_IMAGES.map((src, index) => (
            <div
              key={index}
              className="photo-tone relative h-52 w-72 shrink-0 overflow-hidden rounded-2xl shadow-lg sm:h-64 sm:w-96"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="384px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
