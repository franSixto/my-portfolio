import type { Locale } from "@/i18n/routes";

/** International format, digits only (no "+"), as wa.me expects. Single source of truth. */
export const WHATSAPP_NUMBER = "5492302595456";

export const WHATSAPP_MESSAGE: Record<Locale, string> = {
  es: "Hola Fran, vi tu sitio y quiero contarte sobre un proyecto.",
  en: "Hi Fran, I saw your website and would like to tell you about a project.",
};

export function whatsappUrl(locale: Locale): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[locale])}`;
}
