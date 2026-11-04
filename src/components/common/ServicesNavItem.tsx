"use client";

import { useEffect, useId, useRef, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHROME_LABELS } from "@/components/common/chromeLabels";
import { servicesMenu } from "@/components/common/navItems";
import { Chevron } from "@/components/ui/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import type { RouteKey } from "@/i18n/routes";

const PANEL_ITEM =
  "block rounded-[var(--radius-control)] px-4 py-2.5 text-left font-sans text-ui font-medium transition-colors duration-(--motion-dur-fast) hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent";

/**
 * "Services" desktop nav item with a dropdown of the service pages.
 *
 * Progressive enhancement, same as ContactChooser: the server (and any no-JS
 * visit) renders a plain link to the services hub; after hydration it becomes a
 * disclosure button so `aria-expanded` never sits on a link.
 */
export default function ServicesNavItem({
  label,
  active,
  currentRoute,
  triggerClassName,
}: {
  label: string;
  active: boolean;
  currentRoute: RouteKey | undefined;
  /** Shared look of the nav entries, so link and button are identical. */
  triggerClassName: string;
}) {
  const { locale, localePath } = useLanguage();
  const copy = CHROME_LABELS[locale].servicesMenu;
  const menu = servicesMenu(locale);
  const pathname = usePathname();
  const panelId = useId();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Close whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  if (!mounted) {
    return (
      <Link
        href={localePath("services")}
        aria-current={active ? "page" : undefined}
        className={cx(triggerClassName, "inline-flex items-center gap-1")}
      >
        {label}
        <Chevron className="size-4" />
      </Link>
    );
  }

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cx(triggerClassName, "inline-flex cursor-pointer items-center gap-1")}
        data-active={active ? "true" : undefined}
      >
        {label}
        <Chevron className={cx("size-4 transition-transform duration-(--motion-dur-fast)", open && "rotate-180")} />
      </button>
      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={copy.panelLabel}
          className="motion-enter absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-[var(--radius-media)] border border-rule bg-raised p-2 shadow-lg"
        >
          <ul>
            {menu.services.map((item) => {
              const current = currentRoute === item.route;
              return (
                <li key={item.route}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className={cx(PANEL_ITEM, current ? "text-accent" : "text-ink")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 border-t border-rule pt-1">
            <Link
              href={menu.hub.href}
              onClick={close}
              aria-current={currentRoute === "services" ? "page" : undefined}
              className={cx(PANEL_ITEM, currentRoute === "services" ? "text-accent" : "text-muted hover:text-ink")}
            >
              {menu.hub.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
