import type { Locale } from "@/i18n/routes";

// Accessible names for site chrome controls (not part of the page copy).
export const CHROME_LABELS: Record<
  Locale,
  {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    toDarkTheme: string;
    toLightTheme: string;
    mainNav: string;
    home: string;
  }
> = {
  es: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toDarkTheme: "Cambiar a tema oscuro",
    toLightTheme: "Cambiar a tema claro",
    mainNav: "Navegación principal",
    home: "Francisco Sixto, ir al inicio",
  },
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toDarkTheme: "Switch to dark theme",
    toLightTheme: "Switch to light theme",
    mainNav: "Main navigation",
    home: "Francisco Sixto, go to home",
  },
};
