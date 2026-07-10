import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 md:py-32">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {t("heroEyebrow")}
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
        {t("heroTitle")}
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        {t("heroSubtitle")}
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <Link
          href="/iletisim"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          {t("ctaPrimary")}
        </Link>
        <Link
          href="/hizmetler"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-accent"
        >
          {t("ctaSecondary")}
        </Link>
      </div>
    </section>
  );
}
