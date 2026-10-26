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

// Headings for the solution pages and for the "by project type" indexes.
export const SOLUTION_UI: Record<
  Locale,
  {
    /** Heading of the related links at the end of a solution page. */
    related: string;
    /** Heading of the index of solution pages (hub and parent service pages). */
    byType: string;
    byTypeIntro: string;
  }
> = {
  es: {
    related: "Seguí explorando",
    byType: "Por tipo de proyecto",
    byTypeIntro: "Si ya sabés qué tipo de proyecto tenés, estas páginas van directo al punto.",
  },
  en: {
    related: "Keep exploring",
    byType: "By project type",
    byTypeIntro: "If you already know what kind of project you have, these pages go straight to the point.",
  },
};
