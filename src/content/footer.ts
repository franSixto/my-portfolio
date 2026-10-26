// Footer copy (server-only: the footer is rendered by the shell on the server).
import type { ServiceRouteKey } from "@/content/services/nav";
import type { Locale } from "@/i18n/routes";

export const FOOTER: Record<
  Locale,
  {
    tagline: string;
    description: string;
    navLabel: string;
    servicesHeading: string;
    serviceLabels: Record<ServiceRouteKey, string>;
    siteHeading: string;
    contactHeading: string;
    linkedinAria: string;
    githubAria: string;
    emailAria: string;
    cvLabel: string;
    cvAria: string;
    copyright: (year: number) => string;
  }
> = {
  es: {
    tagline: "Diseñador por vocación, multidisciplinario por evolución.",
    description:
      "Diseño UX/UI y de producto, diseño y desarrollo web y MVPs con IA. Desde Córdoba, Argentina, para equipos de Argentina, Latinoamérica y el mundo.",
    navLabel: "Navegación del pie de página",
    servicesHeading: "Servicios",
    serviceLabels: {
      serviceUxUi: "Diseño UX/UI y de producto",
      serviceWebDesign: "Diseño web",
      serviceWebDevelopment: "Desarrollo web",
      serviceAiMvp: "MVP con IA",
      serviceGraphicDesign: "Diseño gráfico y de marca",
    },
    siteHeading: "Sitio",
    contactHeading: "Contacto",
    linkedinAria: "Perfil de LinkedIn de Francisco Sixto (se abre en una pestaña nueva)",
    githubAria: "Perfil de GitHub de Francisco Sixto (se abre en una pestaña nueva)",
    emailAria: "Escribir un email a Francisco Sixto",
    cvLabel: "Descargar CV (PDF)",
    cvAria: "Descargar el CV de Francisco Sixto en PDF",
    copyright: (year) => `© ${year} Francisco Sixto. Córdoba, Argentina.`,
  },
  en: {
    tagline: "Designer by vocation, multidisciplinary by evolution.",
    description:
      "UX/UI and product design, web design and development, and AI-assisted MVPs. From Córdoba, Argentina, for teams in Argentina, Latin America and worldwide.",
    navLabel: "Footer navigation",
    servicesHeading: "Services",
    serviceLabels: {
      serviceUxUi: "UX/UI and product design",
      serviceWebDesign: "Web design",
      serviceWebDevelopment: "Web development",
      serviceAiMvp: "AI-assisted MVP",
      serviceGraphicDesign: "Graphic and brand design",
    },
    siteHeading: "Site",
    contactHeading: "Contact",
    linkedinAria: "Francisco Sixto on LinkedIn (opens in a new tab)",
    githubAria: "Francisco Sixto on GitHub (opens in a new tab)",
    emailAria: "Email Francisco Sixto",
    cvLabel: "Download CV (PDF)",
    cvAria: "Download Francisco Sixto's CV as a PDF",
    copyright: (year) => `© ${year} Francisco Sixto. Córdoba, Argentina.`,
  },
};
