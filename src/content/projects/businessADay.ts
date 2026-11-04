import type { CaseStudy } from "./types";

export const businessADay: CaseStudy = {
  slug: "business-a-day",
  cover: { src: "/projects/covers/business-a-day.webp", width: 1600, height: 900 },
  relatedService: "serviceAiMvp",
  status: "live",
  gallery: [
    {
      src: "/projects/mockups/business-a-day.webp",
      width: 1600,
      height: 1000,
      alt: {
        es: "Sitio publicado de Business a Day en escritorio y celular",
        en: "Business a Day's published website on desktop and mobile",
      },
    },
  ],
  es: {
    cardTitle: "Business a Day: una idea de negocio con IA por día",
    cardSummary:
      "Producto propio con IA: una plataforma que publica una idea de negocio por día, con análisis en 12 secciones y 7 prompts para ejecutarla.",
    seoTitle: "Business a Day: producto propio con IA",
    seoDescription:
      "Caso de estudio: Business a Day, una plataforma propia que publica una idea de negocio con IA por día. Producto, diseño UX/UI y desarrollo completo.",
    h1: "Business a Day: producto, diseño y desarrollo de una plataforma que publica una idea de negocio con IA por día",
    coverAlt: "Portada tipográfica del caso Business a Day, producto propio con IA",
    meta: {
      role: "Producto, diseño UX/UI y desarrollo",
      platform: "Next.js",
      kind: "Producto propio con IA",
      service: "MVP con IA",
    },
    links: [{ label: "Visitar el sitio", href: "https://www.businessaday.com/" }],
    sections: {
      context: [
        {
          type: "p",
          text: "Business a Day es un producto propio: la idea, el diseño y el desarrollo son míos, hechos desde cero. Es una plataforma web gratuita que publica una idea de negocio generada con IA por día.",
        },
        {
          type: "p",
          text: "Cada idea incluye un análisis en 12 secciones y 7 prompts para ejecutarla en ChatGPT o Claude. Las ideas se reparten en 8 categorías y 36 nichos, y hay más de 200 publicadas.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "El desafío de producto era convertir la salida de una IA en un análisis estructurado y accionable, no en un texto suelto. Una idea de negocio solo sirve si se puede evaluar y llevar a la práctica.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "Que cada idea se lea como un análisis ordenado y comparable con las demás.",
            "Que quien la lea pueda pasar de la idea a la ejecución con prompts listos.",
            "Un sitio abierto: poder explorar las ideas sin crear una cuenta.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "Todo el proyecto: la idea de producto, el diseño de la experiencia y la interfaz, y el desarrollo completo.",
        },
      ],
      constraints: [
        {
          type: "p",
          text: "Hoy la idea del día se genera a demanda: la primera persona que entra y la pide la genera y queda publicada. La publicación depende de que alguien la dispare, por lo que no sale todos los días sin falta.",
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Definir la estructura del análisis que tiene cada idea.",
            "Diseñar la experiencia de lectura de un análisis largo.",
            "Construir la plataforma.",
            "Publicar el sitio.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Un análisis en 12 secciones fijas, para que todas las ideas tengan la misma estructura: problema, solución, modelo de negocio, mercado, inversión estimada, ROI, riesgos y más.",
            "Incluir 7 prompts de ejecución (landing, plataforma, pitch, marketing y SEO) para llevar la idea a la práctica.",
            "Sitio abierto sin cuenta; con cuenta se puede votar, comentar y guardar favoritas.",
          ],
        },
      ],
      solution: [
        {
          type: "ul",
          items: [
            "Una idea de negocio por día, con análisis en 12 secciones.",
            "7 prompts para ejecutarla en ChatGPT o Claude.",
            "8 categorías y 36 nichos para recorrer las ideas.",
            "Historial de ideas, categorías y una página de estadísticas.",
            "Votos, comentarios y favoritas para usuarios registrados.",
          ],
        },
      ],
      tools: [
        {
          type: "p",
          text: "Next.js, Vercel e IA generativa.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Producto, diseño UX/UI y desarrollo completo de la plataforma.",
            "Más de 200 ideas publicadas, cada una con su análisis y sus prompts.",
            "Historial, categorías y página de estadísticas.",
            "Cuentas con votos, comentarios y favoritas.",
          ],
        },
        {
          type: "p",
          text: "Estado actual: sitio publicado. No se informan métricas de uso.",
        },
      ],
    },
  },
  en: {
    cardTitle: "Business a Day: one AI business idea per day",
    cardSummary:
      "An own AI product: a platform that publishes one business idea a day, with a 12-section analysis and 7 prompts to execute it.",
    seoTitle: "Business a Day: an own AI product",
    seoDescription:
      "Case study: Business a Day, my own platform that publishes one AI-generated business idea per day. Product, UX/UI design and full development.",
    h1: "Business a Day: product, design and development of a platform that publishes one AI business idea per day",
    coverAlt: "Typographic cover of the Business a Day case, an own AI product",
    meta: {
      role: "Product, UX/UI design and development",
      platform: "Next.js",
      kind: "Own AI product",
      service: "AI-assisted MVP",
    },
    links: [{ label: "Visit the site", href: "https://www.businessaday.com/" }],
    sections: {
      context: [
        {
          type: "p",
          text: "Business a Day is my own product: the idea, the design and the development are mine, built from scratch. It is a free web platform that publishes one AI-generated business idea per day.",
        },
        {
          type: "p",
          text: "Each idea includes a 12-section analysis and 7 prompts to execute it in ChatGPT or Claude. Ideas span 8 categories and 36 niches, and over 200 have been published.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "The product challenge was to turn an AI output into a structured, actionable analysis rather than a loose text. A business idea is only useful if it can be evaluated and put into practice.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "Each idea reads as an orderly analysis that can be compared with the others.",
            "Readers can go from the idea to execution with ready-made prompts.",
            "An open site: ideas can be explored without creating an account.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "The whole project: the product idea, the design of the experience and interface, and the full development.",
        },
      ],
      constraints: [
        {
          type: "p",
          text: "Today the idea of the day is generated on demand: the first person who visits and asks for it generates it, and it gets published. Publication depends on someone triggering it, so it is not published every single day.",
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Define the structure of the analysis each idea has.",
            "Design the reading experience of a long analysis.",
            "Build the platform.",
            "Publish the site.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "A 12-section fixed analysis, so every idea has the same structure: problem, solution, business model, market, estimated investment, ROI, risks and more.",
            "Include 7 execution prompts (landing, platform, pitch, marketing and SEO) to put the idea into practice.",
            "An open site with no account needed; with an account you can vote, comment and save favourites.",
          ],
        },
      ],
      solution: [
        {
          type: "ul",
          items: [
            "One business idea per day, with a 12-section analysis.",
            "7 prompts to execute it in ChatGPT or Claude.",
            "8 categories and 36 niches to browse the ideas.",
            "An idea history, categories and a stats page.",
            "Votes, comments and favourites for registered users.",
          ],
        },
      ],
      tools: [
        {
          type: "p",
          text: "Next.js, Vercel and generative AI.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Product, UX/UI design and full development of the platform.",
            "Over 200 published ideas, each with its analysis and prompts.",
            "History, categories and a stats page.",
            "Accounts with votes, comments and favourites.",
          ],
        },
        {
          type: "p",
          text: "Current status: published site. No usage metrics are reported.",
        },
      ],
    },
  },
};
