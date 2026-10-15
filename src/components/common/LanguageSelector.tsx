"use client";

import Link from "next/link";
import cx from "classnames";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { alternatePath, otherLocale, type Locale } from "@/i18n/routes";

const languages: Record<Locale, { code: string; switchLabel: string }> = {
  en: { code: "EN", switchLabel: "Switch to English" },
  es: { code: "ES", switchLabel: "Cambiar a Español" },
};

// A plain link to the equivalent URL in the other language (no client-side swap).
export default function LanguageSelector({ className }: { className?: string }) {
  const { locale } = useLanguage();
  const pathname = usePathname();

  const target = otherLocale(locale);
  const href = alternatePath(pathname, target);

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      className={cx(
        "inline-flex h-10 min-w-10 items-center justify-center rounded-[var(--radius-control)] px-2 text-[0.9375rem] font-medium text-muted hover:bg-surface hover:text-ink",
        className
      )}
      aria-label={languages[target].switchLabel}
      title={languages[target].switchLabel}
    >
      {languages[target].code}
    </Link>
  );
}
