import type { Locale } from "@/i18n/routes";

// Accessible names for site chrome controls (not part of the page copy).
export const CHROME_LABELS: Record<
  Locale,
  {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    mainNav: string;
    home: string;
  }
> = {
  es: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toggleTheme: "Cambiar entre modo claro y oscuro",
    mainNav: "Navegación principal",
    home: "Francisco Sixto, inicio",
  },
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Switch between light and dark mode",
    mainNav: "Main navigation",
    home: "Francisco Sixto, home",
  },
};
