import type { Locale } from "@/i18n/routes";

// Fixed headings around the long-form content (server-only).
export const SERVICE_UI: Record<
  Locale,
  {
    faq: string;
    relatedProjects: string;
    relatedServices: string;
  }
> = {
  es: {
    faq: "Preguntas frecuentes",
    relatedProjects: "Proyectos relacionados",
    relatedServices: "Otros servicios",
  },
  en: {
    faq: "Frequently asked questions",
    relatedProjects: "Related projects",
    relatedServices: "Other services",
  },
};
