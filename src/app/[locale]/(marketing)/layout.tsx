import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          NFT GROUP
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/hizmetler">{t("services")}</Link>
          <Link href="/projeler">{t("projects")}</Link>
          <Link href="/hakkimizda">{t("about")}</Link>
          <Link href="/iletisim">{t("contact")}</Link>
        </nav>
        <Link
          href="/iletisim"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          {t("getQuote")}
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">
          NFT GROUP — {t("tagline")}
        </p>
        <p>{t("address")}</p>
        <p>
          © {new Date().getFullYear()} NFT GROUP. {t("rights")}
        </p>
      </div>
    </footer>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
