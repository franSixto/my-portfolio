"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/routes";

export type ContactChannel = "whatsapp" | "email" | "linkedin" | "github" | "cv";

/** Plain anchor that reports a click on a contact channel (no personal data). */
export default function TrackedLink({
  channel,
  locale,
  placement,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { channel: ContactChannel; locale: Locale; href: string; placement?: string }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("contact_link_click", { channel, locale, placement });
        onClick?.(event);
      }}
    />
  );
}
