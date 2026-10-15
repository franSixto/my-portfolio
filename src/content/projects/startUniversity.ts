import type { CaseStudy } from "./types";

export const startUniversity: CaseStudy = {
  slug: "start-university",
  hero: { src: "/projects/websites-startu-small.webp", width: 1200, height: 675 },
  logo: { src: "/projects/logo-startu.png", width: 410, height: 123 },
  relatedService: "serviceUxUi",
  secondaryService: "serviceWebDesign",
  es: {
    cardTitle: "Start University: portal del estudiante y sitios educativos",
    cardSummary:
      "Diseño UX/UI de plataformas educativas: un portal del estudiante unificado y un sistema base para más de 20 sitios de universidades.",
    seoTitle: "Start University: diseño UX/UI edtech",
    seoDescription:
      "Caso de estudio: diseño UX/UI de plataformas educativas en Start University. Portal del estudiante unificado y sistema base para más de 20 sitios.",
    h1: "Start University: un portal del estudiante y un sistema base para más de 20 sitios educativos",
    heroAlt: "Collage de sitios y plataformas educativas diseñadas en Start University",
    logoAlt: "Logo de Start University",
    meta: {
      role: "Líder UX/UI",
      years: "2022 – 2025",
      market: "Latinoamérica e India",
      service: "UX/UI y producto",
    },
    sections: {
      context: [
        {
          type: "p",
          text: "Start University trabaja con universidades socias y opera sitios institucionales, agregadores de oferta académica y blogs para Latinoamérica e India. Su objetivo es conectar a futuros estudiantes con programas educativos, y cada sitio tiene que respetar la marca de su institución.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Cada sitio tenía su propia versión del portal del estudiante, así que cualquier cambio había que repetirlo sitio por sitio. A eso se sumaban sitios heredados que había que migrar a .NET Core, agregadores que tomaban datos de fuentes distintas y nuevas universidades socias que necesitaban su sitio sin empezar de cero.",
        },
      ],
      role: [
        {
          type: "p",
          text: "Lideré el diseño UX/UI de las plataformas educativas, los portales estudiantiles y las herramientas de gestión académica. Coordiné un equipo de diseño y maquetación HTML/CSS: del wireframe al diseño visual, la implementación front-end y la revisión de código. También trabajé con desarrollo, marketing y negocio, y resolví landing pages y formularios para campañas.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Varias instituciones, cada una con su identidad visual.",
            "Datos de fuentes distintas en los agregadores.",
            "Sitios sobre una plataforma heredada, en migración a .NET Core.",
            "Marketing necesitaba respuestas rápidas en paralelo al trabajo de producto.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Identificar qué partes del portal y de los sitios eran comunes a todas las instituciones y cuáles cambiaban.",
            "Diseñar en Figma un sistema de componentes reutilizables a partir de esa base.",
            "Probar la usabilidad de los flujos principales y ajustar.",
            "Acompañar la implementación con el equipo de maquetación y revisar el código antes de publicar.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Un único portal del estudiante, modular, que se adapta a cada institución con cambios mínimos de CSS, en lugar de mantener una versión por sitio.",
            "Un sistema base compartido para lanzar los sitios de las nuevas universidades socias.",
            "En los agregadores, una interfaz consistente aunque los datos vinieran de fuentes distintas, con ajustes por región: colores, imágenes y marca localizada.",
            "Accesibilidad y SEO como parte de cada entrega, no como una etapa aparte.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "Un portal del estudiante unificado para todas las instituciones, un sistema de diseño reutilizable y una base técnica común para los sitios. Sobre esa base se migraron y rediseñaron sitios existentes y se lanzaron sitios nuevos.",
        },
      ],
      tools: [
        {
          type: "p",
          text: "Figma, HTML, CSS, JavaScript, Bootstrap, .NET Core (plataforma de los sitios), Jira, SourceTree.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Diseño UX/UI de más de 20 sitios activos: universidades, agregadores y blogs.",
            "5 sitios heredados migrados y rediseñados sobre .NET Core.",
            "7 sitios nuevos lanzados a partir del sistema base.",
            "Portal del estudiante unificado: los cambios se hacen una vez y llegan a todas las instituciones.",
            "Agregadores rediseñados con una interfaz común.",
          ],
        },
      ],
    },
  },
  en: {
    cardTitle: "Start University: student portal and education websites",
    cardSummary:
      "UX/UI design for education platforms: a unified student portal and a shared base system for more than 20 university websites.",
    seoTitle: "Start University: EdTech UX/UI Design",
    seoDescription:
      "Case study: UX/UI design for education platforms at Start University. A unified student portal and a shared base system for 20+ websites.",
    h1: "Start University: one student portal and a shared base system for 20+ education websites",
    heroAlt: "Collage of education websites and platforms designed at Start University",
    logoAlt: "Start University logo",
    meta: {
      role: "UX/UI Lead",
      years: "2022 – 2025",
      market: "Latin America and India",
      service: "UX/UI and product",
    },
    sections: {
      context: [
        {
          type: "p",
          text: "Start University works with partner universities and runs institutional websites, program aggregators and blogs for Latin America and India. The goal is to connect prospective students with education programs, and every site has to respect its institution's brand.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Each site had its own version of the student portal, so every change had to be repeated site by site. On top of that, legacy sites had to be migrated to .NET Core, aggregators pulled data from different sources, and new partner universities needed a site without starting from scratch.",
        },
      ],
      role: [
        {
          type: "p",
          text: "I led UX/UI design for the education platforms, student portals and academic management tools. I coordinated a team of designers and HTML/CSS developers: from wireframes to visual design, front-end implementation and code review. I also worked with engineering, marketing and business, and handled landing pages and forms for campaigns.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Many institutions, each with its own visual identity.",
            "Aggregators fed by different data sources.",
            "Sites on a legacy platform, being migrated to .NET Core.",
            "Marketing needed quick turnarounds alongside product work.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Identify which parts of the portal and the sites were shared across institutions and which ones changed.",
            "Design a reusable component system in Figma from that shared base.",
            "Test the usability of the main flows and adjust.",
            "Support implementation with the front-end team and review code before release.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "One modular student portal that adapts to each institution with minimal CSS changes, instead of one version per site.",
            "A shared base system to launch sites for new partner universities.",
            "Consistent aggregator UI even with data from different sources, with regional adjustments: colors, imagery and localized branding.",
            "Accessibility and SEO built into every delivery, not as a separate phase.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "A unified student portal for every institution, a reusable design system and a common technical base for the sites. On that base, existing sites were migrated and redesigned, and new ones were launched.",
        },
      ],
      tools: [
        {
          type: "p",
          text: "Figma, HTML, CSS, JavaScript, Bootstrap, .NET Core (site platform), Jira, SourceTree.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "UX/UI design for 20+ live sites: universities, aggregators and blogs.",
            "5 legacy sites migrated and redesigned on .NET Core.",
            "7 new sites launched from the base system.",
            "A unified student portal: changes are made once and reach every institution.",
            "Redesigned aggregators with a shared interface.",
          ],
        },
      ],
    },
  },
};
