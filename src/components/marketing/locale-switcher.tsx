"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  theme = "dark",
}: {
  /** "dark" = white text for navy backgrounds, "light" = navy text for light backgrounds */
  theme?: "dark" | "light";
}) {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 font-stencil text-xs font-semibold tracking-wider">
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && (
            <span className={theme === "dark" ? "text-white/30" : "text-navy/25"}>
              /
            </span>
          )}
          <Link
            href={pathname}
            locale={locale}
            className={cn(
              "transition",
              locale === activeLocale
                ? "text-gold"
                : theme === "dark"
                  ? "text-white/60 hover:text-white"
                  : "text-navy/50 hover:text-navy",
            )}
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
