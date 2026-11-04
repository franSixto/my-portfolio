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
    /** Copy for the services dropdown / mobile sub-list. */
    servicesMenu: { panelLabel: string; allServices: string };
    /** Copy for the "talk" CTA that offers WhatsApp or the contact form. */
    contactChooser: {
      panelLabel: string;
      whatsapp: { label: string; hint: string; ariaLabel: string };
      form: { label: string; hint: string };
    };
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
    servicesMenu: { panelLabel: "Servicios", allServices: "Ver todos los servicios" },
    contactChooser: {
      panelLabel: "Elegí cómo contactarme",
      whatsapp: {
        label: "WhatsApp",
        hint: "Respuesta más rápida",
        ariaLabel: "WhatsApp. Respuesta más rápida (se abre en una pestaña nueva)",
      },
      form: { label: "Formulario", hint: "Contame tu proyecto con detalle" },
    },
  },
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toDarkTheme: "Switch to dark theme",
    toLightTheme: "Switch to light theme",
    mainNav: "Main navigation",
    home: "Francisco Sixto, go to home",
    servicesMenu: { panelLabel: "Services", allServices: "All services" },
    contactChooser: {
      panelLabel: "Choose how to reach me",
      whatsapp: {
        label: "WhatsApp",
        hint: "Fastest reply",
        ariaLabel: "WhatsApp. Fastest reply (opens in a new tab)",
      },
      form: { label: "Contact form", hint: "Tell me about your project in detail" },
    },
  },
};
