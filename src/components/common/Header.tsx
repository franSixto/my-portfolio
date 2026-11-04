"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeSelect from "@/components/theme/ThemeSelect";
import LanguageSelector from "@/components/common/LanguageSelector";
import ServicesNavItem from "@/components/common/ServicesNavItem";
import NavMobile from "@/components/common/NavMobile";
import { CHROME_LABELS } from "@/components/common/chromeLabels";
import { NAV_ITEMS, isNavItemActive } from "@/components/common/navItems";
import ContactChooser from "@/components/contact/ContactChooser";
import { Close, Menu } from "@/components/ui/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { matchRoute } from "@/i18n/routes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { t, locale, localePath } = useLanguage();
  const labels = CHROME_LABELS[locale];

  const currentRoute = matchRoute(pathname)?.key;
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-[var(--radius-control)] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {labels.skipToContent}
      </a>
      <header className="sticky top-0 z-50 border-b border-rule bg-paper">
        <div className="mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8 xl:px-12">
          <Link
            href={localePath("home")}
            className="flex items-center gap-2.5 rounded-sm text-ink"
            aria-label={labels.home}
          >
            <Image className="dark:invert" src="/logo2.svg" alt="" width={32} height={32} priority />
            <span className="whitespace-nowrap font-sans text-[1.0625rem] font-semibold tracking-tight">
              Francisco Sixto
            </span>
          </Link>

          <nav aria-label={labels.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const active = isNavItemActive(item, currentRoute);
                const linkClasses = cx(
                  "relative py-2 text-[0.9375rem] font-medium transition-colors duration-(--motion-dur-fast)",
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-accent after:transition-transform after:duration-(--motion-dur-base) after:ease-(--motion-ease-out) motion-reduce:after:transition-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  active
                    ? "text-ink after:scale-x-100"
                    : "text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100"
                );
                return (
                  <li key={item.id}>
                    {item.id === "services" ? (
                      <ServicesNavItem
                        label={t(item.labelKey)}
                        active={active}
                        currentRoute={currentRoute}
                        triggerClassName={linkClasses}
                      />
                    ) : (
                      <Link
                        href={localePath(item.route)}
                        aria-current={active ? "page" : undefined}
                        className={linkClasses}
                      >
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Below sm these controls live in the menu sheet. */}
            <div className="hidden items-center gap-1 sm:flex">
              <LanguageSelector />
              <ThemeSelect labels={{ toDark: labels.toDarkTheme, toLight: labels.toLightTheme }} />
            </div>
            <ContactChooser size="sm" className="ml-1 md:ml-2">
              {t("navigation.cta")}
            </ContactChooser>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? labels.closeMenu : labels.openMenu}
              className="ml-1 inline-flex size-10 cursor-pointer items-center justify-center rounded-[var(--radius-control)] text-ink hover:bg-surface lg:hidden"
            >
              {isMenuOpen ? <Close className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <NavMobile
            onClose={closeMenu}
            returnFocusTo={toggleRef}
            currentRoute={currentRoute}
            themeLabels={{ toDark: labels.toDarkTheme, toLight: labels.toLightTheme }}
          />
        )}
      </header>
    </>
  );
}
