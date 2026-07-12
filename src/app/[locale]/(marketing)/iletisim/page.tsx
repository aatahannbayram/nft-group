import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { InquiryForm } from "@/components/marketing/inquiry-form";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { getSiteSettings } from "@/lib/settings";

const SECOND_PHONE = "+90 505 936 14 21";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const about = await getTranslations("about");

  const { contact_phone, contact_email, contact_address } =
    await getSiteSettings();
  const MAPS_QUERY = encodeURIComponent(contact_address);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[34vh] min-h-[16rem] w-full overflow-hidden">
        <Image
          src="/images/real/launch-ceremony.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-navy/40" />
      </div>

      <div
        aria-hidden
        className="bg-glow-gold pointer-events-none absolute right-[8%] top-[18%] -z-0 h-72 w-72 opacity-20"
      />

      <div className="relative mx-auto -mt-20 max-w-6xl px-6 pb-24 sm:px-10">
        <ScrollReveal>
          <p className="font-stencil text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            {t("pageEyebrow")}
          </p>
          <span className="mt-3 block font-display text-lg font-light text-navy/50 italic sm:text-xl">
            {t("sectionKicker")}
          </span>
          <h1 className="mt-1 text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t("sectionTitle")}
          </h1>
          <p className="mt-5 max-w-sm text-muted-foreground">
            {t("sectionSubtitle")}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-5">
          <ScrollReveal delay={0.08} className="flex flex-col gap-4 md:col-span-2">
            <a
              href={`mailto:${contact_email}`}
              className="glass group flex items-start gap-3.5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                <Mail className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground uppercase tracking-wide">
                  {about("email")}
                </span>
                <span className="mt-0.5 block font-display text-lg text-foreground transition-colors group-hover:text-gold">
                  {contact_email}
                </span>
              </span>
            </a>

            <a
              href={`tel:${contact_phone.replace(/\s/g, "")}`}
              className="glass group flex items-start gap-3.5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground uppercase tracking-wide">
                  {about("phone")}
                </span>
                <span className="mt-0.5 block font-display text-lg text-foreground transition-colors group-hover:text-gold">
                  {contact_phone}
                </span>
                <span className="block font-display text-lg text-foreground">
                  {SECOND_PHONE}
                </span>
              </span>
            </a>

            <a
              href={`https://www.google.com/maps?q=${MAPS_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-start gap-3.5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground uppercase tracking-wide">
                  {about("address")}
                </span>
                <span className="mt-0.5 block font-display text-lg text-foreground transition-colors group-hover:text-gold">
                  {contact_address}
                </span>
              </span>
            </a>

            <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
              <iframe
                title="NFT Group konum"
                src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full sm:h-64"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={0.15}
            className="glass rounded-3xl p-8 shadow-lg sm:p-10 md:col-span-3"
          >
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              {t("form.title")}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t("form.subtitle")}
            </p>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
