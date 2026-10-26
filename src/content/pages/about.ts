import type { Locale } from "@/i18n/routes";
import type { CtaCopy, PageSeo, TitledText } from "./types";

export type AboutContent = {
  seo: PageSeo;
  h1: string;
  tagline: string;
  location: string;
  intro: string[];
  photoAlt: string;
  background: {
    heading: string;
    timeline: { years: string; role: string; where: string; summary: string }[];
    educationLabel: string;
    education: string[];
    coursesLabel: string;
    courses: string[];
  };
  principles: { heading: string; items: TitledText[] };
  tools: { heading: string; intro: string };
  outside: string;
  cv: { label: string; ariaLabel: string };
  cta: CtaCopy & { secondary: string };
};

export const aboutContent: Record<Locale, AboutContent> = {
  es: {
    seo: {
      title: "Sobre mí: diseñador UX/UI y de producto",
      description:
        "Francisco Sixto, diseñador UX/UI y de producto en Córdoba, Argentina. Más de 10 años en edtech, salud, SaaS y sitios web. Trayectoria y forma de trabajo.",
    },
    h1: "Sobre mí",
    tagline: "Diseñador por vocación, multidisciplinario por evolución.",
    location: "Córdoba, Argentina · Trabajo remoto",
    intro: [
      "Soy Francisco Sixto, diseñador UX/UI y de producto con más de 10 años de experiencia. Diseño plataformas web, productos SaaS e interfaces para equipos que necesitan que lo diseñado se pueda construir y mantener.",
      "Me formé en diseño gráfico y multimedia, y eso sigue en mi forma de trabajar: cuido la jerarquía, el detalle visual y la consistencia. Con los años sumé desarrollo con React, Next.js y WordPress, y hoy uso herramientas de IA para llegar más rápido a prototipos que se pueden probar. Diseño y desarrollo: lo que diseño, también lo construyo.",
    ],
    photoAlt: "Retrato de Francisco Sixto",
    background: {
      heading: "Trayectoria",
      timeline: [
        {
          years: "2023 – hoy",
          role: "Diseñador UX/UI freelance",
          where: "Independiente",
          summary:
            "Productos digitales y sitios web para clientes de distintas industrias, del wireframe a la implementación.",
        },
        {
          years: "2022 – 2025",
          role: "Líder UX/UI",
          where: "Start University",
          summary:
            "Diseño UX/UI de plataformas educativas, portales estudiantiles y más de 20 sitios; design systems y pruebas de usabilidad.",
        },
        {
          years: "2020 – 2022",
          role: "Diseñador de producto UX/UI",
          where: "Deep Creek Solutions",
          summary:
            "Plataformas SaaS de salud y belleza, flujos, prototipos y componentes de UI reutilizables.",
        },
        {
          years: "2019 – 2020",
          role: "Líder UX/UI",
          where: "Autocity",
          summary:
            "Rediseño del catálogo con búsqueda, comparador y cotización online; sitios para marcas del Grupo Tagle.",
        },
        {
          years: "2015 – 2019",
          role: "Analista de comunicaciones y diseñador",
          where: "Apex America",
          summary:
            "Comunicación interna, señalética y contenido digital para oficinas en Latinoamérica.",
        },
        {
          years: "2013 – 2015",
          role: "Diseñador gráfico y web",
          where: "Madison Comunicación",
          summary:
            "Piezas gráficas para medios impresos y digitales, y maquetación web con HTML y CSS.",
        },
      ],
      educationLabel: "Formación",
      education: [
        "Técnico Superior en Diseño Multimedial (Colegio Universitario IES, 2013 – 2016)",
        "Técnico Superior en Diseño Gráfico y Publicitario (Colegio Universitario IES, 2009 – 2013)",
      ],
      coursesLabel: "Cursos",
      courses: [
        "React (Coderhouse, 2024)",
        "JavaScript (Coderhouse, 2022)",
        "Desarrollo Web (Coderhouse, 2022)",
        "Liderazgo para equipos de alto rendimiento (Rindo, 2021)",
        "Formación en Diseño Web (Centro Kandinsky, 2013)",
      ],
    },
    principles: {
      heading: "Cómo trabajo",
      items: [
        {
          title: "Primero el problema",
          text: "Antes de abrir Figma necesito entender qué tiene que lograr el negocio y quién lo va a usar.",
        },
        {
          title: "Diseñar para que se construya",
          text: "Componentes con nombres que tu equipo reconoce, estados completos y specs claras. Lo que no se puede implementar no está terminado.",
        },
        {
          title: "Sistemas antes que pantallas sueltas",
          text: "Un design system ordenado ahorra más que cualquier pantalla linda.",
        },
        {
          title: "Probar algo concreto",
          text: "Prefiero un prototipo que se pueda usar a una presentación que hay que imaginar.",
        },
        {
          title: "IA con criterio",
          text: "La uso para acelerar; las decisiones, la revisión y la responsabilidad por lo que entrego son mías.",
        },
        {
          title: "Trabajo con otros",
          text: "Pasé años junto a equipos de desarrollo, marketing y negocio, y liderando equipos de diseño y maquetación. Sé que un buen diseño también se negocia.",
        },
      ],
    },
    tools: {
      heading: "Herramientas y habilidades",
      intro:
        "Las herramientas cambian; el criterio para elegirlas es lo que importa. Estas son las que uso hoy, agrupadas por área.",
    },
    outside:
      "Nací en un pueblo del sur de Córdoba. Fuera del trabajo: deporte, familia, amigos y River Plate.",
    cv: {
      label: "Descargar CV (PDF)",
      ariaLabel: "Descargar el CV de Francisco Sixto en PDF",
    },
    cta: {
      heading: "¿Trabajamos juntos?",
      text: "Si tenés un producto, un sitio o una idea en marcha, contame en qué estás. Mirá también los servicios para ver cómo puedo ayudarte.",
      button: "Contame tu proyecto",
      secondary: "Ver servicios",
    },
  },
  en: {
    seo: {
      title: "About: UX/UI & Product Designer",
      description:
        "Francisco Sixto, UX/UI and product designer in Córdoba, Argentina. 10+ years across edtech, health, SaaS and websites. Background and way of working.",
    },
    h1: "About me",
    tagline: "Designer by vocation, multidisciplinary by evolution.",
    location: "Córdoba, Argentina · Working remotely",
    intro: [
      "I'm Francisco Sixto, a UX/UI and product designer with more than 10 years of experience. I design web platforms, SaaS products and interfaces for teams that need what gets designed to be buildable and maintainable.",
      "I trained in graphic and multimedia design, and it still shows in how I work: I care about hierarchy, visual detail and consistency. Over the years I added development with React, Next.js and WordPress, and today I use AI tools to get to testable prototypes faster. I design and I develop: what I design, I build too.",
    ],
    photoAlt: "Portrait of Francisco Sixto",
    background: {
      heading: "Background",
      timeline: [
        {
          years: "2023 – present",
          role: "Freelance UX/UI designer",
          where: "Independent",
          summary:
            "Digital products and websites for clients across industries, from wireframe to implementation.",
        },
        {
          years: "2022 – 2025",
          role: "UX/UI Lead",
          where: "Start University",
          summary:
            "UX/UI for education platforms, student portals and 20+ websites; design systems and usability testing.",
        },
        {
          years: "2020 – 2022",
          role: "UX/UI Product Designer",
          where: "Deep Creek Solutions",
          summary:
            "Health and beauty SaaS platforms: flows, prototypes and reusable UI components.",
        },
        {
          years: "2019 – 2020",
          role: "UX/UI Lead",
          where: "Autocity",
          summary:
            "Catalog redesign with search, comparison and online quotes; websites for Grupo Tagle brands.",
        },
        {
          years: "2015 – 2019",
          role: "Communications Analyst & Designer",
          where: "Apex America",
          summary:
            "Internal communications, signage and digital content for offices across Latin America.",
        },
        {
          years: "2013 – 2015",
          role: "Graphic & Web Designer",
          where: "Madison Comunicación",
          summary: "Print and digital advertising pieces, and HTML/CSS web layout.",
        },
      ],
      educationLabel: "Education",
      education: [
        "Advanced Technical Degree in Multimedia Design (Colegio Universitario IES, 2013 – 2016)",
        "Advanced Technical Degree in Graphic and Advertising Design (Colegio Universitario IES, 2009 – 2013)",
      ],
      coursesLabel: "Courses",
      courses: [
        "React (Coderhouse, 2024)",
        "JavaScript (Coderhouse, 2022)",
        "Web Development (Coderhouse, 2022)",
        "Leadership for High-Performance Teams (Rindo, 2021)",
        "Web Design Training (Centro Kandinsky, 2013)",
      ],
    },
    principles: {
      heading: "How I work",
      items: [
        {
          title: "Problem first",
          text: "Before opening Figma I need to understand what the business has to achieve and who will use it.",
        },
        {
          title: "Design to be built",
          text: "Components named the way your team knows them, complete states and clear specs. If it can't be built, it isn't finished.",
        },
        {
          title: "Systems before isolated screens",
          text: "A well-organized design system saves more than any pretty screen.",
        },
        {
          title: "Test something real",
          text: "I'd rather have a prototype people can use than a presentation they have to imagine.",
        },
        {
          title: "AI with judgment",
          text: "I use it to move faster; the decisions, the review and the responsibility for what I deliver are mine.",
        },
        {
          title: "Working with others",
          text: "I've spent years alongside engineering, marketing and business teams, and leading design and front-end teams. Good design also gets negotiated.",
        },
      ],
    },
    tools: {
      heading: "Tools and skills",
      intro:
        "Tools change; the judgment to choose them is what matters. These are the ones I use today, grouped by area.",
    },
    outside:
      "I grew up in a small town in southern Córdoba. Outside work: sports, family, friends and River Plate.",
    cv: {
      label: "Download CV (PDF, Spanish)",
      ariaLabel: "Download Francisco Sixto's CV as a PDF (in Spanish)",
    },
    cta: {
      heading: "Shall we work together?",
      text: "If you have a product, a website or an idea in progress, tell me where you are. You can also browse the services to see how I can help.",
      button: "Tell me about your project",
      secondary: "See services",
    },
  },
};
