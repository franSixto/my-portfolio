import type { Locale } from "@/i18n/routes";
import type { ServiceRouteKey } from "@/content/services/nav";
import type { CtaCopy, PageSeo, TitledText } from "./types";

export type HomeContent = {
  /** `seo.title` is used as-is (no site suffix). */
  seo: PageSeo;
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  services: {
    heading: string;
    intro: string;
    cards: { route: ServiceRouteKey; title: string; value: string; link: string }[];
    hubLink: string;
  };
  audience: { heading: string; items: TitledText[]; footnote: string };
  process: { heading: string; steps: TitledText[]; aiNote: string };
  work: { heading: string; intro: string; all: string };
  about: { heading: string; text: string; link: string; photoAlt: string };
  cta: CtaCopy;
};

export const homeContent: Record<Locale, HomeContent> = {
  es: {
    seo: {
      title: "Francisco Sixto | Diseño UX/UI, web y MVPs con IA",
      description:
        "Diseñador UX/UI y de producto en Córdoba, Argentina, con más de 10 años de experiencia. Productos SaaS, sitios web y prototipos o MVPs con IA.",
    },
    hero: {
      eyebrow: "Francisco Sixto · Córdoba, Argentina",
      title: "Diseñador UX/UI y de producto para SaaS, empresas y startups",
      tagline: "Diseñador por vocación, multidisciplinario por evolución.",
      subtitle:
        "Hace más de 10 años que diseño productos digitales: plataformas SaaS, educativas y de salud, sitios web para empresas y prototipos o MVPs asistidos por IA para validar ideas. Diseño, y cuando el proyecto lo pide, también lo construyo.",
      primary: "Contame tu proyecto",
      secondary: "Ver proyectos",
    },
    services: {
      heading: "Qué hago",
      intro:
        "Cuatro servicios, una misma forma de trabajar: entender el problema antes de diseñar la solución.",
      cards: [
        {
          route: "serviceUxUi",
          title: "Diseño UX/UI y de producto",
          value:
            "Flujos, interfaces y design systems para productos SaaS, educativos y de salud. Diseños que tu equipo de desarrollo puede construir y mantener.",
          link: "Ver diseño UX/UI y de producto",
        },
        {
          route: "serviceWebDesign",
          title: "Diseño web",
          value:
            "Sitios para empresas y pymes pensados desde lo que el negocio necesita lograr. Me ocupo de la estructura, el contenido, el diseño y el lanzamiento.",
          link: "Ver diseño web",
        },
        {
          route: "serviceWebDevelopment",
          title: "Desarrollo web",
          value:
            "Implementación con React, Next.js, TypeScript o WordPress, cuidando lo que suele perderse entre Figma y producción.",
          link: "Ver desarrollo web",
        },
        {
          route: "serviceAiMvp",
          title: "Prototipos y MVPs con IA",
          value:
            "Un prototipo funcional o un MVP acotado para probar tu idea con usuarios antes de invertir en el producto completo. La IA acelera; las decisiones y la revisión son mías.",
          link: "Ver prototipos y MVPs con IA",
        },
      ],
      hubLink: "¿No sabés cuál necesitás? Compará los servicios",
    },
    audience: {
      heading: "Para quién trabajo",
      items: [
        {
          title: "Empresas SaaS y de tecnología",
          text: "Equipos de producto que necesitan ordenar una interfaz que creció sin sistema, armar un design system o diseñar una funcionalidad nueva con alguien senior.",
        },
        {
          title: "Pymes y empresas",
          text: "Negocios que necesitan un sitio que explique bien lo que hacen y que facilite que los contacten.",
        },
        {
          title: "Startups y founders",
          text: "Ideas que tienen que convertirse en algo que se pueda usar y probar antes de invertir en un desarrollo completo.",
        },
      ],
      footnote:
        "Trabajo de forma remota desde Córdoba con clientes de Argentina y Latinoamérica. También en inglés.",
    },
    process: {
      heading: "Cómo trabajo",
      steps: [
        {
          title: "Entender",
          text: "Qué tiene que lograr el negocio, quién lo va a usar y qué restricciones técnicas hay.",
        },
        {
          title: "Definir y prototipar",
          text: "Flujos, prioridades y prototipos para discutir sobre algo concreto.",
        },
        {
          title: "Diseñar y construir",
          text: "Interfaz final, componentes reutilizables y, si el proyecto lo incluye, la implementación.",
        },
        {
          title: "Revisar y acompañar",
          text: "Reviso lo que se implementa y ajusto con el equipo.",
        },
      ],
      aiNote:
        "Uso IA para acelerar tareas concretas: explorar variantes, generar contenido de prueba y escribir código base. El criterio, las decisiones de UX y la revisión de lo que entrego no se delegan. Respondo por cada entrega.",
    },
    work: {
      heading: "Proyectos seleccionados",
      intro: "Productos educativos, de salud y sitios de marca en los que trabajé.",
      all: "Ver todos los proyectos",
    },
    about: {
      heading: "Quién está detrás",
      text: "Soy Francisco Sixto, diseñador UX/UI y de producto. Empecé en diseño gráfico y multimedia, pasé por comunicación corporativa y desde hace años diseño productos digitales: plataformas educativas en Start University, SaaS de salud en Deep Creek Solutions y sitios para marcas del Grupo Tagle.",
      link: "Conocé mi trayectoria",
      photoAlt: "Retrato de Francisco Sixto",
    },
    cta: {
      heading: "¿Tenés un producto para ordenar, un sitio para renovar o una idea para probar?",
      text: "Contame en qué estás y qué necesitás resolver. Te respondo personalmente.",
      button: "Escribime",
    },
  },
  en: {
    seo: {
      title: "Francisco Sixto | UX/UI Design, Websites & AI MVPs",
      description:
        "UX/UI and product designer based in Córdoba, Argentina, with 10+ years of experience. SaaS products, websites and AI-assisted prototypes and MVPs.",
    },
    hero: {
      eyebrow: "Francisco Sixto · Córdoba, Argentina",
      title: "UX/UI and product designer for SaaS teams, businesses and startups",
      tagline: "Designer by vocation, multidisciplinary by evolution.",
      subtitle:
        "For more than 10 years I've been designing digital products: SaaS, education and health platforms, business websites, and AI-assisted prototypes and MVPs to validate ideas. I design, and when the project calls for it, I build it too.",
      primary: "Tell me about your project",
      secondary: "See projects",
    },
    services: {
      heading: "What I do",
      intro: "Four services, one way of working: understand the problem before designing the solution.",
      cards: [
        {
          route: "serviceUxUi",
          title: "UX/UI and product design",
          value:
            "Flows, interfaces and design systems for SaaS, education and health products. Designs your engineering team can build and maintain.",
          link: "See UX/UI and product design",
        },
        {
          route: "serviceWebDesign",
          title: "Web design",
          value:
            "Websites for businesses, designed around what the business needs to achieve. I handle structure, content, visual design and launch.",
          link: "See web design",
        },
        {
          route: "serviceWebDevelopment",
          title: "Web development",
          value:
            "Implementation with React, Next.js, TypeScript or WordPress, taking care of what usually gets lost between Figma and production.",
          link: "See web development",
        },
        {
          route: "serviceAiMvp",
          title: "AI-assisted prototypes and MVPs",
          value:
            "A working prototype or a lean MVP to test your idea with users before investing in the full product. AI speeds things up; the decisions and the review are mine.",
          link: "See AI-assisted prototypes and MVPs",
        },
      ],
      hubLink: "Not sure which one you need? Compare services",
    },
    audience: {
      heading: "Who I work with",
      items: [
        {
          title: "SaaS and tech companies",
          text: "Product teams that need to bring order to an interface that grew without a system, build a design system or design a new feature with senior support.",
        },
        {
          title: "Small and mid-sized businesses",
          text: "Companies that need a website that explains clearly what they do and makes it easy to get in touch.",
        },
        {
          title: "Startups and founders",
          text: "Ideas that need to become something people can use and test before investing in full development.",
        },
      ],
      footnote:
        "I work remotely from Córdoba, Argentina, with clients in Argentina, Latin America and anywhere else in English.",
    },
    process: {
      heading: "How I work",
      steps: [
        {
          title: "Understand",
          text: "What the business needs to achieve, who will use it and what the technical constraints are.",
        },
        {
          title: "Define and prototype",
          text: "Flows, priorities and prototypes, so we discuss something concrete.",
        },
        {
          title: "Design and build",
          text: "Final UI, reusable components and, when the project includes it, the implementation.",
        },
        {
          title: "Review and support",
          text: "I review what gets built and adjust it with the team.",
        },
      ],
      aiNote:
        "I use AI to speed up specific tasks: exploring variations, generating placeholder content and writing starter code. Judgment, UX decisions and the review of what I deliver are not delegated. I'm accountable for every delivery.",
    },
    work: {
      heading: "Selected work",
      intro: "Education and health products, and brand websites I've worked on.",
      all: "See all projects",
    },
    about: {
      heading: "Who's behind this",
      text: "I'm Francisco Sixto, a UX/UI and product designer. I started in graphic and multimedia design, moved through corporate communications and have spent years designing digital products: education platforms at Start University, health SaaS at Deep Creek Solutions and websites for Grupo Tagle brands.",
      link: "Read my background",
      photoAlt: "Francisco Sixto at work",
    },
    cta: {
      heading: "Got a product to untangle, a website to rebuild or an idea to test?",
      text: "Tell me where you are and what you need to solve. I'll reply personally.",
      button: "Get in touch",
    },
  },
};
