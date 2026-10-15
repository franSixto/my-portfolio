import type { Locale } from "@/i18n/routes";
import type { CtaCopy, PageSeo } from "./types";

export type ProjectsContent = {
  seo: PageSeo;
  h1: string;
  intro: string;
  /** Shown when the list has no entries. */
  empty: string;
  cta: Omit<CtaCopy, "text">;
};

export const projectsContent: Record<Locale, ProjectsContent> = {
  es: {
    seo: {
      title: "Proyectos de diseño UX/UI y producto",
      description:
        "Casos de estudio de diseño UX/UI y de producto, diseño y desarrollo web: plataformas educativas, SaaS de salud, sitios de marca y prototipos.",
    },
    h1: "Proyectos y casos de estudio",
    intro:
      "Trabajo real en plataformas educativas, productos de salud y sitios para empresas. En cada caso cuento el contexto, mi rol, las decisiones que tomé y qué se entregó.",
    empty: "No hay proyectos disponibles en este momento.",
    cta: { heading: "¿Tenés un proyecto parecido?", button: "Contame tu proyecto" },
  },
  en: {
    seo: {
      title: "UX/UI & Product Design Projects",
      description:
        "UX/UI and product design, web design and development case studies: education platforms, health SaaS, brand websites and prototypes.",
    },
    h1: "Projects and case studies",
    intro:
      "Real work on education platforms, health products and business websites. Each case covers the context, my role, the decisions I made and what was delivered.",
    empty: "No projects available right now.",
    cta: { heading: "Working on something similar?", button: "Tell me about your project" },
  },
};
