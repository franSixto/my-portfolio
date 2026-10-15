import type { Locale, RouteKey } from "@/i18n/routes";
import type { CaseSectionId } from "./types";

/** Shared labels around the case-study copy (server-only). */
export const PROJECTS_LABELS: Record<
  Locale,
  {
    sections: Record<CaseSectionId | "relatedService", string>;
    meta: {
      role: string;
      years: string;
      since: string;
      market: string;
      location: string;
      platform: string;
      kind: string;
      service: string;
    };
    externalSuffix: string;
    allProjects: string;
    /** Link text to a service page, by route key. */
    serviceLink: Partial<Record<RouteKey, string>>;
    cta: { heading: string; button: string };
  }
> = {
  es: {
    sections: {
      context: "Contexto",
      challenge: "El desafío",
      role: "Mi rol",
      constraints: "Restricciones",
      process: "Proceso",
      decisions: "Decisiones clave",
      solution: "La solución",
      tools: "Tecnologías y herramientas",
      delivered: "Qué se entregó",
      relatedService: "Servicio relacionado",
    },
    meta: {
      role: "Rol",
      years: "Años",
      since: "Desde",
      market: "Mercados",
      location: "Ubicación",
      platform: "Plataforma",
      kind: "Tipo",
      service: "Servicio",
    },
    externalSuffix: "(se abre en una pestaña nueva)",
    allProjects: "Ver todos los proyectos",
    serviceLink: {
      serviceUxUi: "Ver el servicio de diseño UX/UI y de producto",
      serviceWebDesign: "Ver el servicio de diseño web",
      serviceWebDevelopment: "Ver el servicio de desarrollo web",
      serviceAiMvp: "Ver el servicio de prototipos y MVPs con IA",
      about: "Ver mi trayectoria",
    },
    cta: { heading: "¿Tenés un proyecto parecido?", button: "Contame tu proyecto" },
  },
  en: {
    sections: {
      context: "Context",
      challenge: "The challenge",
      role: "My role",
      constraints: "Constraints",
      process: "Process",
      decisions: "Key decisions",
      solution: "The solution",
      tools: "Tools and technologies",
      delivered: "What was delivered",
      relatedService: "Related service",
    },
    meta: {
      role: "Role",
      years: "Years",
      since: "Since",
      market: "Markets",
      location: "Location",
      platform: "Platform",
      kind: "Type",
      service: "Service",
    },
    externalSuffix: "(opens in a new tab)",
    allProjects: "See all projects",
    serviceLink: {
      serviceUxUi: "See the UX/UI and product design service",
      serviceWebDesign: "See the web design service",
      serviceWebDevelopment: "See the web development service",
      serviceAiMvp: "See the AI-assisted prototypes and MVPs service",
      about: "See my background",
    },
    cta: { heading: "Working on something similar?", button: "Tell me about your project" },
  },
};
