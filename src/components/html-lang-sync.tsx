"use client";

import { useEffect } from "react";

/**
 * The root layout can't know the active locale (it sits above `[locale]`),
 * so it renders a static `lang="tr"`. This corrects `<html lang>` client-side
 * for the `en` tree so screen readers/translators see the right language.
 */
export function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
