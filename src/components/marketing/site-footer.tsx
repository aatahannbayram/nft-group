import { ArrowUpRight, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/marketing/logo-mark";
import { getSiteSettings } from "@/lib/settings";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const home = await getTranslations("home");
  const nav = await getTranslations("nav");
  const services = await getTranslations("services");
  const about = await getTranslations("about");

  const { contact_phone, contact_email, contact_address } =
    await getSiteSettings();
  const phoneHref = contact_phone.replace(/\s+/g, "");
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact_address)}`;

  return (
    <footer className="relative overflow-hidden bg-gradient-navy text-white">
      <div className="absolute inset-0 bg-blueprint opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div
        aria-hidden
        className="bg-glow-gold pointer-events-none absolute -top-32 right-0 h-96 w-96 opacity-20"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10 sm:px-10">
        <p className="font-stencil text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
          {t("tagline")}
        </p>
        <Link
          href="/iletisim"
          className="group mt-4 flex flex-wrap items-center gap-3 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {home("ctaPrimary")}
          <span className="shadow-glow-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12">
            <ArrowUpRight className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </span>
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          <div className="glass-dark flex flex-col gap-2 rounded-2xl p-5 text-sm">
            <a href={`tel:${phoneHref}`} className="font-medium text-white transition hover:text-white/80">
              {contact_phone}
            </a>
            <a
              href={`mailto:${contact_email}`}
              className="font-medium text-white transition hover:text-white/80"
            >
              {contact_email}
            </a>
            <span className="text-white/60">
              {about("address")}: {contact_address}
            </span>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-dark group flex items-center justify-between gap-4 rounded-2xl p-5 text-sm transition hover:bg-white/10"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
                <MapPin className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-white/80">{t("mapCta")}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
              <LogoMark className="h-full w-full" />
            </div>
            <span className="font-stencil text-sm leading-tight font-bold tracking-[0.15em] text-white uppercase">
              NFT
              <br />
              Group
            </span>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <p className="mb-1 font-stencil text-xs font-semibold tracking-[0.15em] text-white/50 uppercase">
              {nav("services")}
            </p>
            <Link href="/hizmetler/tersane-gemi-insa" className="transition hover:text-white">
              {services("tersaneGemiInsa.title")}
            </Link>
            <Link href="/hizmetler/tersane-tamir" className="transition hover:text-white">
              {services("tersaneTamir.title")}
            </Link>
            <Link href="/hizmetler/altyapi-ve-celik-insa" className="transition hover:text-white">
              {services("altyapiVeCelikInsa.title")}
            </Link>
            <Link href="/hizmetler/insaat-sektoru" className="transition hover:text-white">
              {services("insaatSektoru.title")}
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <p className="mb-1 font-stencil text-xs font-semibold tracking-[0.15em] text-white/50 uppercase">
              {nav("home")}
            </p>
            <Link href="/projeler" className="transition hover:text-white">
              {nav("projects")}
            </Link>
            <Link href="/haberler" className="transition hover:text-white">
              {nav("news")}
            </Link>
            <Link href="/hakkimizda" className="transition hover:text-white">
              {nav("about")}
            </Link>
            <Link href="/iletisim" className="transition hover:text-white">
              {nav("contact")}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} NFT GROUP. {t("rights")}
      </div>
    </footer>
  );
}
