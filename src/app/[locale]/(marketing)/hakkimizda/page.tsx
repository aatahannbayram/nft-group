import { Mail, MapPin, Phone, Shield, Target, Waves } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { getSiteSettings } from "@/lib/settings";

const SECOND_PHONE = "+90 505 936 14 21";

const PRINCIPLE_ICONS = [Shield, Waves, Target] as const;

const TEAM_PHOTOS = [
  "/images/workforce/engineer-confident.jpg",
  "/images/workforce/pipe-welder-workshop.jpg",
  "/images/workforce/steel-beam-welder.jpg",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-black/5 px-3.5 py-1.5 text-xs font-medium text-foreground/60">
      {children}
    </span>
  );
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const { contact_phone, contact_email, contact_address } =
    await getSiteSettings();

  const principles = [0, 1, 2].map((i) => ({
    icon: PRINCIPLE_ICONS[i],
    title: t(`principles.${i}.title`),
    description: t(`principles.${i}.description`),
  }));

  return (
    <div className="relative">
      {/* Persistent blurred backdrop, visible in the gutter around the framed card below */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
        <Image
          src="/images/real/drydock-wide.jpg"
          alt=""
          fill
          className="scale-125 object-cover opacity-25 blur-3xl"
        />
      </div>

      {/* The whole page sits inside one continuous rounded card, framed by the backdrop above */}
      <div className="relative mx-3 my-3 overflow-hidden rounded-[1.75rem] shadow-2xl sm:mx-6 sm:my-6 sm:rounded-[2.25rem]">
        {/* Hero */}
        <section className="photo-tone relative h-[64vh] min-h-[24rem] w-full bg-black">
          <Image
            src="/images/real/drydock-wide.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <ScrollReveal className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="font-stencil text-xs font-semibold tracking-[0.25em] text-gold uppercase">
              {t("pageEyebrow")}
            </p>
            <h1 className="mt-4 max-w-2xl text-balance font-stencil text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("pageTitle")}
            </h1>
            <p className="mt-5 max-w-lg text-balance text-white/70">
              {t("pageIntro")}
            </p>
          </ScrollReveal>
        </section>

        {/* Principles */}
        <section className="relative bg-surface-2">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <ScrollReveal>
              <Pill>{t("principlesEyebrow")}</Pill>
              <h2 className="mt-6 max-w-3xl text-balance font-stencil text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
                <span className="text-foreground/40">{t("principlesLeadIn")} </span>
                {t("principlesHeadline")}
              </h2>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {principles.map(({ icon: Icon, title, description }, index) => (
                <ScrollReveal
                  key={title}
                  delay={0.08 * index}
                  className="rounded-3xl bg-white p-7 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Field team */}
        <section className="relative bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <ScrollReveal>
              <Pill>{t("workforceEyebrowPill")}</Pill>
              <h2 className="mt-6 max-w-xl text-balance font-stencil text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
                {t("workforceMessage")}
              </h2>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {TEAM_PHOTOS.map((src, index) => (
                <ScrollReveal
                  key={src}
                  delay={0.08 * index}
                  className="photo-tone relative aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="relative border-t border-border bg-surface-2">
          <ScrollReveal className="mx-auto max-w-6xl px-6 py-20">
            <Pill>{t("contactTitle")}</Pill>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <a
                href={`mailto:${contact_email}`}
                className="group flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-colors group-hover:bg-gold">
                  <Mail className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("email")}
                </p>
                <p className="font-display text-lg text-foreground transition-colors group-hover:text-gold">
                  {contact_email}
                </p>
              </a>

              <a
                href={`tel:${contact_phone.replace(/\s/g, "")}`}
                className="group flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-colors group-hover:bg-gold">
                  <Phone className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("phone")}
                </p>
                <p className="font-display text-lg text-foreground transition-colors group-hover:text-gold">
                  {contact_phone}
                </p>
                <p className="font-display text-lg text-foreground transition-colors group-hover:text-gold">
                  {SECOND_PHONE}
                </p>
              </a>

              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(contact_address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-colors group-hover:bg-gold">
                  <MapPin className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("address")}
                </p>
                <p className="font-display text-lg text-foreground transition-colors group-hover:text-gold">
                  {contact_address}
                </p>
              </a>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
