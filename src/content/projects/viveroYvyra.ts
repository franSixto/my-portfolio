import type { CaseStudy } from "./types";

export const viveroYvyra: CaseStudy = {
  slug: "vivero-yvyra",
  cover: { src: "/projects/covers/vivero-yvyra.webp", width: 1600, height: 900 },
  relatedService: "serviceWebDevelopment",
  secondaryService: "serviceUxUi",
  relatedCases: ["consultora-prisma"],
  es: {
    cardTitle: "Vivero Yvyrá: catálogo botánico y CMS a medida",
    cardSummary:
      "Plataforma web para un vivero: catálogo de especies, fichas botánicas, blog y un panel propio para administrar el contenido.",
    seoTitle: "Vivero Yvyrá: diseño y desarrollo web",
    seoDescription:
      "Caso de estudio: diseño UX/UI y desarrollo web full-stack de una plataforma para un vivero, con catálogo de especies y un CMS a medida.",
    h1: "Vivero Yvyrá: diseño UX/UI y desarrollo full-stack de un catálogo botánico con CMS a medida",
    coverAlt: "Portada tipográfica del caso Vivero Yvyrá, diseño y desarrollo full-stack",
    meta: {
      role: "Diseño UX/UI y desarrollo web full-stack",
      location: "Luján, Argentina",
      platform: "Next.js",
      kind: "Plataforma web con CMS a medida",
      service: "Diseño y desarrollo web",
    },
    sections: {
      context: [
        {
          type: "p",
          text: "Yvyrá es un vivero de plantas de Luján. El proyecto es una plataforma web con un catálogo de especies botánicas y contenido especializado.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Un catálogo botánico es información con estructura: especies, familias, categorías, características y cuidados. Hay que diseñarlo para que se lea bien y, a la vez, poder cargarlo y mantenerlo sin depender de un CMS externo pesado.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "Un catálogo de especies navegable, con fichas botánicas claras.",
            "Una estructura preparada para un catálogo de cientos de especies.",
            "Un blog sobre plantas y jardinería.",
            "Un panel de administración propio para gestionar el contenido.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "Diseño y desarrollo del proyecto completo: la experiencia y la interfaz, la estructura de datos, el catálogo y el panel de administración. Es un caso que muestra el paso de un diseño a un producto funcional.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Evitar la dependencia de un CMS externo pesado.",
            "Contenido que crece: la estructura tiene que soportar un catálogo que se amplía.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Definir qué información describe a una especie y cómo se agrupa en categorías y familias.",
            "Diseñar la interfaz del catálogo, las fichas y el blog.",
            "Modelar los datos en PostgreSQL con Prisma.",
            "Construir el panel de administración para cargar y editar contenido.",
            "Usar herramientas de IA para acelerar la programación; las decisiones de diseño y de arquitectura son mías.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Next.js como base de la aplicación.",
            "Un panel de administración propio en lugar de un CMS externo, para adaptar la carga de contenido a las fichas botánicas.",
            "PostgreSQL con Prisma para modelar especies, atributos, categorías y familias.",
          ],
        },
      ],
      solution: [
        {
          type: "ul",
          items: [
            "Catálogo de especies con fichas botánicas y atributos.",
            "Categorías y familias para recorrer el catálogo.",
            "Información de características y cuidados de cada planta.",
            "Blog de plantas y jardinería.",
            "Panel de administración propio para gestionar el contenido.",
          ],
        },
      ],
      tools: [
        {
          type: "p",
          text: "Next.js, PostgreSQL y Prisma. Herramientas de IA para acelerar la programación.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Diseño de la experiencia y la interfaz del catálogo, las fichas y el blog.",
            "Catálogo de especies con fichas botánicas, categorías y familias.",
            "Modelo de datos en PostgreSQL con Prisma.",
            "Panel de administración propio para cargar y editar el contenido.",
            "Blog de plantas y jardinería.",
          ],
        },
      ],
    },
  },
  en: {
    cardTitle: "Vivero Yvyrá: botanical catalog and custom CMS",
    cardSummary:
      "A web platform for a plant nursery: species catalog, botanical sheets, a blog and its own admin panel to manage content.",
    seoTitle: "Vivero Yvyrá: Full-Stack Design and Dev",
    seoDescription:
      "Case study: UX/UI design and full-stack web development of a plant nursery platform, with a species catalog and a custom-built CMS.",
    h1: "Vivero Yvyrá: UX/UI design and full-stack development of a botanical catalog with a custom CMS",
    coverAlt: "Typographic cover of the Vivero Yvyrá case, full-stack design and development",
    meta: {
      role: "UX/UI design and full-stack web development",
      location: "Luján, Argentina",
      platform: "Next.js",
      kind: "Web platform with a custom CMS",
      service: "Web design and development",
    },
    sections: {
      context: [
        {
          type: "p",
          text: "Yvyrá is a plant nursery in Luján. The project is a web platform with a catalog of botanical species and specialized content.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "A botanical catalog is structured information: species, families, categories, characteristics and care. It has to be designed to read well and, at the same time, to be loaded and maintained without depending on a heavy external CMS.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "A browsable species catalog with clear botanical sheets.",
            "A structure ready for a catalog of hundreds of species.",
            "A blog about plants and gardening.",
            "Its own admin panel to manage the content.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "Design and development of the whole project: the experience and interface, the data structure, the catalog and the admin panel. The case shows the path from a design to a working product.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Avoid depending on a heavy external CMS.",
            "Growing content: the structure has to support a catalog that expands.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Define what information describes a species and how it is grouped into categories and families.",
            "Design the interface of the catalog, the sheets and the blog.",
            "Model the data in PostgreSQL with Prisma.",
            "Build the admin panel to load and edit content.",
            "Use AI tools to speed up programming; the design and architecture decisions are mine.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Next.js as the base of the application.",
            "Its own admin panel instead of an external CMS, to fit content entry to botanical sheets.",
            "PostgreSQL with Prisma to model species, attributes, categories and families.",
          ],
        },
      ],
      solution: [
        {
          type: "ul",
          items: [
            "A species catalog with botanical sheets and attributes.",
            "Categories and families to move through the catalog.",
            "Characteristics and care information for each plant.",
            "A blog about plants and gardening.",
            "Its own admin panel to manage the content.",
          ],
        },
      ],
      tools: [
        {
          type: "p",
          text: "Next.js, PostgreSQL and Prisma. AI tools to speed up programming.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Design of the experience and interface of the catalog, the plant sheets and the blog.",
            "A species catalog with botanical sheets, categories and families.",
            "A data model in PostgreSQL with Prisma.",
            "Its own admin panel to load and edit content.",
            "A blog about plants and gardening.",
          ],
        },
      ],
    },
  },
};
