import cx from "classnames";
import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "text";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-sans font-medium whitespace-nowrap rounded-[var(--radius-control)] transition-[color,background-color,border-color,text-decoration-color,transform] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong dark:hover:bg-accent-strong",
  secondary:
    "border border-rule-strong text-ink hover:border-ink hover:bg-surface",
  inverse:
    "bg-band-action text-band-on-action hover:bg-band-ink focus-visible:outline-band-action",
  text: "text-ink underline decoration-rule-strong underline-offset-[0.3em] hover:decoration-accent px-0",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.9375rem]",
  md: "h-12 px-5 text-ui",
  lg: "h-14 px-6 text-[1.0625rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cx(BASE, VARIANTS[variant], variant === "text" ? "h-auto" : SIZES[size], className);
}

/**
 * Link styled as a button. Internal routes use next/link; external URLs and
 * files (pdf) render a plain anchor.
 */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  download = false,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const classes = buttonClasses({ variant, size, className });
  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { target: "_blank" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
