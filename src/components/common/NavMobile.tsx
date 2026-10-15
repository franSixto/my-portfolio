"use client";

import { useEffect, useRef, type RefObject } from "react";
import cx from "classnames";
import Link from "next/link";
import ThemeSelect, { type ThemeLabels } from "@/components/theme/ThemeSelect";
import LanguageSelector from "@/components/common/LanguageSelector";
import { NAV_ITEMS, isNavItemActive } from "@/components/common/navItems";
import { useLanguage } from "@/contexts/LanguageContext";
import type { RouteKey } from "@/i18n/routes";

interface NavMobileProps {
  onClose: () => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
  currentRoute: RouteKey | undefined;
  themeLabels: ThemeLabels;
}

/**
 * Full-height sheet under the header. While open, the page behind is inert
 * and does not scroll; Escape closes it and focus returns to the toggle.
 */
export default function NavMobile({ onClose, returnFocusTo, currentRoute, themeLabels }: NavMobileProps) {
  const { t, localePath } = useLanguage();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const background = ["main-content", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    background.forEach((el) => (el.inert = true));
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const toggle = returnFocusTo.current;

    return () => {
      background.forEach((el) => (el.inert = false));
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [onClose, returnFocusTo]);

  return (
    <div
      id="mobile-nav"
      className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper md:top-[4.5rem] lg:hidden"
    >
      <nav className="mx-auto flex min-h-full max-w-[1360px] flex-col px-5 pb-10 pt-6 md:px-8">
        <ul className="border-b border-rule">
          {[...NAV_ITEMS, { id: "contact", route: "contact" as const, labelKey: "navigation.contact" }].map(
            (item, index) => {
              const active =
                item.id === "contact" ? currentRoute === "contact" : isNavItemActive(item, currentRoute);
              return (
                <li key={item.id} className="border-t border-rule">
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={localePath(item.route)}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex items-center justify-between py-4 font-sans text-h2 font-semibold",
                      active ? "text-accent" : "text-ink"
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
        <div className="mt-8 flex items-center gap-2">
          <LanguageSelector className="border border-rule" />
          <ThemeSelect labels={themeLabels} className="border border-rule" />
        </div>
      </nav>
    </div>
  );
}
