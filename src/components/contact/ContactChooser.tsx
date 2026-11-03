"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CHROME_LABELS } from "@/components/common/chromeLabels";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/ButtonLink";
import TrackedLink from "@/components/ui/TrackedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappUrl } from "@/lib/contact/whatsapp";

const OPTION =
  "block rounded-[var(--radius-control)] px-4 py-3 text-left transition-colors duration-(--motion-dur-fast) hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent";

/**
 * "Talk" CTA that offers WhatsApp or the contact form.
 *
 * Progressive enhancement: the server (and any no-JS visit) renders a plain link
 * to the contact page. After hydration it is swapped for a disclosure button,
 * so `aria-expanded` never sits on a link. Same classes, so there is no layout shift.
 */
export default function ContactChooser({
  children,
  variant = "primary",
  size = "sm",
  className,
  placement = "header_chooser",
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Non-personal tag so analytics can tell where the click happened. */
  placement?: string;
}) {
  const { locale, localePath } = useLanguage();
  const copy = CHROME_LABELS[locale].contactChooser;
  const panelId = useId();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

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

  const classes = buttonClasses({ variant, size, className });

  if (!mounted) {
    return (
      <Link href={localePath("contact")} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="md:relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`${classes} cursor-pointer`}
      >
        {children}
      </button>
      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={copy.panelLabel}
          className="motion-enter fixed inset-x-4 top-[4.25rem] z-50 rounded-[var(--radius-media)] border border-rule bg-raised p-2 shadow-lg md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-3 md:w-80"
        >
          <TrackedLink
            channel="whatsapp"
            locale={locale}
            placement={placement}
            href={whatsappUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.whatsapp.ariaLabel}
            onClick={close}
            className={OPTION}
          >
            <span className="block font-sans text-ui font-semibold text-ink">{copy.whatsapp.label}</span>
            <span className="mt-0.5 block text-meta text-muted">{copy.whatsapp.hint}</span>
          </TrackedLink>
          <Link href={localePath("contact")} onClick={close} className={OPTION}>
            <span className="block font-sans text-ui font-semibold text-ink">{copy.form.label}</span>
            <span className="mt-0.5 block text-meta text-muted">{copy.form.hint}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
