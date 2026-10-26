import type { Locale } from "@/i18n/routes";
import type { ServiceRouteKey } from "@/content/services/nav";
import type { CtaCopy, PageSeo, TitledText } from "./types";

export type ServicesHubContent = {
  seo: PageSeo;
  h1: string;
  intro: string;
  start: {
    heading: string;
    items: { route: ServiceRouteKey; title: string; choose: string; link: string }[];
  };
  compare: {
    heading: string;
    caption: string;
    columns: { service: string; who: string; get: string; bring: string };
    rows: { service: string; who: string; get: string; bring: string }[];
  };
  combine: { heading: string; items: TitledText[] };
  cta: CtaCopy;
};

export const servicesHubContent: Record<Locale, ServicesHubContent> = {
  es: {
    seo: {
      title: "Servicios de diseño UX/UI, web y MVPs",
      description:
        "Diseño UX/UI y de producto, diseño web, desarrollo web, MVPs con IA y diseño gráfico y de marca. Compará los cinco servicios y elegí según tu etapa.",
    },
    h1: "Servicios de diseño y desarrollo de productos digitales",
    intro:
      "La pregunta no es qué servicio suena mejor, sino en qué etapa está tu proyecto. Acá tenés los cinco, con una guía rápida para saber por dónde empezar.",
    start: {
      heading: "¿Por dónde empezar?",
      items: [
        {
          route: "serviceUxUi",
          title: "Diseño UX/UI y de producto",
          choose:
            "Elegí este si… ya tenés un producto (o una funcionalidad grande en camino) y necesitás que alguien ordene flujos, interfaz y componentes para que tu equipo de desarrollo lo construya.",
          link: "Ver diseño UX/UI y de producto",
        },
        {
          route: "serviceWebDesign",
          title: "Diseño web",
          choose:
            "Elegí este si… tu empresa necesita un sitio nuevo o renovar el actual, y querés que alguien se ocupe de todo: qué decir, cómo organizarlo, cómo se ve y cómo se publica.",
          link: "Ver diseño web",
        },
        {
          route: "serviceWebDevelopment",
          title: "Desarrollo web",
          choose:
            "Elegí este si… el diseño ya existe (mío o de tu equipo) y lo que falta es implementarlo con fidelidad en React, Next.js o WordPress.",
          link: "Ver desarrollo web",
        },
        {
          route: "serviceAiMvp",
          title: "Prototipos y MVPs con IA",
          choose:
            "Elegí este si… tenés una idea que todavía no se probó y necesitás algo concreto para mostrarles a usuarios, clientes o inversores antes de invertir en el producto completo.",
          link: "Ver prototipos y MVPs con IA",
        },
        {
          route: "serviceGraphicDesign",
          title: "Diseño gráfico y de marca con IA",
          choose:
            "¿Necesitás imagen de marca o piezas gráficas? Elegí este si… querés un logo, una identidad visual o piezas para redes y campañas, exploradas con IA y terminadas con criterio de diseñador.",
          link: "Ver diseño gráfico y de marca",
        },
      ],
    },
    compare: {
      heading: "Comparación rápida",
      caption:
        "Comparación de los cinco servicios: para quién es cada uno, qué incluye y qué conviene traer a la primera charla.",
      columns: {
        service: "Servicio",
        who: "Para quién",
        get: "Qué te llevás",
        bring: "Qué conviene traer",
      },
      rows: [
        {
          service: "Diseño UX/UI y de producto",
          who: "Empresas SaaS y equipos de producto",
          get: "Flujos, prototipos, UI final y design system en Figma, listos para desarrollo",
          bring: "El producto actual o la idea de la funcionalidad, y acceso al equipo",
        },
        {
          service: "Diseño web",
          who: "Pymes y empresas",
          get: "Un sitio publicado, con estructura y contenido pensados para tu negocio",
          bring: "Qué hace tu empresa, a quién le vende y el sitio actual si existe",
        },
        {
          service: "Desarrollo web",
          who: "Equipos o empresas con diseño definido",
          get: "Sitio o aplicación implementada, responsive y accesible",
          bring: "El diseño (Figma u otro) y los requisitos técnicos",
        },
        {
          service: "Prototipos y MVPs con IA",
          who: "Startups, founders y equipos que validan algo nuevo",
          get: "Un prototipo funcional o un MVP acotado, con una guía para probarlo",
          bring: "La idea y a quién querés ayudar; no hace falta tenerlo todo definido",
        },
        {
          service: "Diseño gráfico y de marca con IA",
          who: "Emprendimientos y empresas que necesitan imagen de marca o piezas gráficas",
          get: "Logo e identidad visual con guía de uso, y piezas para redes y campañas",
          bring: "Qué hace tu marca, a quién le habla y las piezas o el logo actuales",
        },
      ],
    },
    combine: {
      heading: "Cuando se combinan",
      items: [
        {
          title: "Diseño web + desarrollo web",
          text: "si querés un solo responsable desde la estructura hasta el código.",
        },
        {
          title: "MVP con IA → diseño UX/UI y de producto",
          text: "cuando la idea se validó y hay que convertirla en un producto que escale.",
        },
        {
          title: "Diseño UX/UI y de producto + desarrollo web",
          text: "cuando tu equipo necesita que el diseño se implemente tal como se pensó.",
        },
        {
          title: "Diseño gráfico y de marca + diseño web",
          text: "si querés que la identidad nueva llegue directo a un sitio pensado para tu negocio.",
        },
      ],
    },
    cta: {
      heading: "¿Todavía no sabés cuál te conviene?",
      text: "Contame qué querés resolver y te digo por dónde empezaría. Si no es algo que yo haga, también te lo digo.",
      button: "Contame tu proyecto",
    },
  },
  en: {
    seo: {
      title: "Services: UX/UI, Web Design & MVPs",
      description:
        "UX/UI and product design, web design and development, AI-assisted MVPs and brand design. Compare the five services and pick the one for your stage.",
    },
    h1: "Digital product design and development services",
    intro:
      "The question isn't which service sounds best, it's what stage your project is at. Here are all five, with a quick guide to know where to start.",
    start: {
      heading: "Where to start",
      items: [
        {
          route: "serviceUxUi",
          title: "UX/UI and product design",
          choose:
            "Choose this if… you already have a product (or a big feature on the way) and need someone to structure flows, UI and components so your engineering team can build it.",
          link: "See UX/UI and product design",
        },
        {
          route: "serviceWebDesign",
          title: "Web design",
          choose:
            "Choose this if… your business needs a new website or a rebuild, and you want one person to handle all of it: what to say, how to organize it, how it looks and how it goes live.",
          link: "See web design",
        },
        {
          route: "serviceWebDevelopment",
          title: "Web development",
          choose:
            "Choose this if… the design already exists (mine or your team's) and what's missing is a faithful implementation in React, Next.js or WordPress.",
          link: "See web development",
        },
        {
          route: "serviceAiMvp",
          title: "AI-assisted prototypes and MVPs",
          choose:
            "Choose this if… you have an idea that hasn't been tested yet and need something concrete to show users, customers or investors before investing in the full product.",
          link: "See AI-assisted prototypes and MVPs",
        },
        {
          route: "serviceGraphicDesign",
          title: "AI-powered graphic and brand design",
          choose:
            "Do you need a brand image or graphic pieces? Choose this if… you want a logo, a visual identity or pieces for social media and campaigns, explored with AI and finished with a designer's judgment.",
          link: "See graphic and brand design",
        },
      ],
    },
    compare: {
      heading: "Quick comparison",
      caption:
        "Comparison of the five services: who each one is for, what it includes and what to bring to the first conversation.",
      columns: {
        service: "Service",
        who: "Who it's for",
        get: "What you get",
        bring: "What to bring",
      },
      rows: [
        {
          service: "UX/UI and product design",
          who: "SaaS companies and product teams",
          get: "Flows, prototypes, final UI and a design system in Figma, ready for development",
          bring: "Your current product or the feature idea, and access to the team",
        },
        {
          service: "Web design",
          who: "Small and mid-sized businesses",
          get: "A live website with structure and content built around your business",
          bring: "What your company does, who it sells to and your current site, if any",
        },
        {
          service: "Web development",
          who: "Teams or businesses with a finished design",
          get: "A responsive, accessible website or web app",
          bring: "The design (Figma or other) and technical requirements",
        },
        {
          service: "AI-assisted prototypes and MVPs",
          who: "Startups, founders and teams validating something new",
          get: "A working prototype or lean MVP, with a guide to test it",
          bring: "The idea and who it's for; it doesn't need to be fully defined",
        },
        {
          service: "AI-powered graphic and brand design",
          who: "New ventures and businesses that need a brand image or graphic pieces",
          get: "A logo and visual identity with a usage guide, and pieces for social media and campaigns",
          bring: "What your brand does, who it talks to and your current logo or pieces",
        },
      ],
    },
    combine: {
      heading: "When they combine",
      items: [
        {
          title: "Web design + web development",
          text: "if you want one person responsible from structure to code.",
        },
        {
          title: "AI-assisted MVP → UX/UI and product design",
          text: "once the idea is validated and needs to become a product that scales.",
        },
        {
          title: "UX/UI and product design + web development",
          text: "when your team needs the design built exactly as intended.",
        },
        {
          title: "Graphic and brand design + web design",
          text: "if you want the new identity to go straight into a site built around your business.",
        },
      ],
    },
    cta: {
      heading: "Still not sure which one fits?",
      text: "Tell me what you want to solve and I'll tell you where I'd start. If it's not something I do, I'll tell you that too.",
      button: "Tell me about your project",
    },
  },
};
