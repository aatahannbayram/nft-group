import { Anchor, Layers, Mail, MapPin, Phone, Shield, Target, Telescope } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { aboutCapabilities } from "@/lib/constants";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { getSiteSettings } from "@/lib/settings";

const CAPABILITY_ICONS = {
  military: Shield,
  floatingDock: Anchor,
  disciplines: Layers,
  location: MapPin,
} as const;

const SECOND_PHONE = "+90 505 936 14 21";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const { contact_phone, contact_email, contact_address } =
    await getSiteSettings();

  return (
    <>
      <section className="relative border-b border-border">
        <div className="photo-tone relative h-[46vh] min-h-[20rem] w-full">
          <Image
            src="/images/real/drydock-wide.jpg"
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
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            {t("pageIntro")}
          </p>
        </ScrollReveal>
      </section>

      <section className="photo-tone relative h-[38vh] min-h-[16rem] w-full overflow-hidden">
        <Image
          src="/images/real/hero-launch.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative flex h-full items-end">
          <ScrollReveal className="mx-auto w-full max-w-6xl px-6 pb-10">
            <p className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              {t("workforceEyebrow")}
            </p>
            <p className="mt-3 max-w-lg text-balance font-display text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
              {t("workforceMessage")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface-2">
        <div
          aria-hidden
          className="bg-glow-gold pointer-events-none absolute -top-24 right-[4%] -z-0 h-80 w-80 opacity-15"
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-20 lg:grid-cols-5">
          <ScrollReveal className="glass flex flex-col gap-8 rounded-3xl p-8 sm:p-10 lg:col-span-3">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Target className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <span className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                  {t("missionTitle")}
                </span>
                <p className="mt-2 font-display text-xl leading-relaxed tracking-tight text-foreground/90 sm:text-2xl">
                  {t("mission")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-border pt-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                <Telescope className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <span className="font-stencil text-xs font-semibold tracking-[0.2em] text-steel uppercase">
                  {t("visionTitle")}
                </span>
                <p className="mt-2 font-display text-xl leading-relaxed tracking-tight text-foreground/90 sm:text-2xl">
                  {t("vision")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={0.15}
            className="flex flex-col gap-3 content-start lg:col-span-2"
          >
            {aboutCapabilities.map(({ key }, index) => {
              const Icon = CAPABILITY_ICONS[key as keyof typeof CAPABILITY_ICONS];
              return (
                <div
                  key={key}
                  className="glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <p className="text-[15px] font-medium leading-snug text-foreground/85">
                    {t(`capabilities.${key}`)}
                  </p>
                  <span className="ml-auto font-stencil text-xs font-semibold text-muted-foreground/40">
                    0{index + 1}
                  </span>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      <section className="relative">
        <ScrollReveal className="mx-auto max-w-6xl px-6 py-20">
          <span className="font-stencil text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            {t("contactTitle")}
          </span>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${contact_email}`}
              className="glass group flex flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
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
              className="glass group flex flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
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
              className="glass group flex flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
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
    </>
  );
}
