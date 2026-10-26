import type { CaseStudy } from "./types";

export const bienestarSenior: CaseStudy = {
  slug: "bienestar-senior",
  hero: { src: "/projects/bienestar-senior.webp", width: 1600, height: 900 },
  relatedService: "serviceUxUi",
  secondaryService: "serviceWebDesign",
  status: "design-proposal",
  relatedCases: ["ortopedia-para-ti"],
  es: {
    cardTitle: "Bienestar Senior: rediseño UX/UI de e-commerce",
    cardSummary:
      "Rediseño en Figma de siete tipos de página para una tienda online de ortopedia, movilidad y bienestar para adultos mayores.",
    seoTitle: "Bienestar Senior: rediseño de e-commerce",
    seoDescription:
      "Caso de estudio: rediseño UX/UI en Figma de siete tipos de página para la tienda Bienestar Senior. Navegación, jerarquía y fichas de producto.",
    h1: "Bienestar Senior: rediseño UX/UI de siete tipos de página para un e-commerce de ortopedia y bienestar",
    heroAlt: "Portada tipográfica del caso Bienestar Senior, rediseño UX/UI de e-commerce",
    meta: {
      role: "Rediseño UX/UI en Figma (sin implementación)",
      platform: "Shopify (tienda actual)",
      kind: "Rediseño de e-commerce",
      service: "UX/UI y diseño web",
    },
    links: [
      {
        label: "Ver la tienda actual",
        href: "https://www.bienestarsenior.com/",
        note: "Es el sitio vigente del cliente. El rediseño se presenta como propuesta de diseño en Figma.",
      },
    ],
    sections: {
      context: [
        {
          type: "p",
          text: "Bienestar Senior es una tienda online de productos de ortopedia, movilidad, asistencia y bienestar pensados para adultos mayores.",
        },
        {
          type: "p",
          text: "Una tienda así combina dos tipos de contenido: el comercial, que vende productos, y el institucional, que explica quiénes están detrás. Las dos partes tienen que sentirse parte del mismo sitio.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Renovar el lenguaje visual de toda la tienda y mantener la coherencia entre las secciones comerciales e institucionales, con una navegación y una jerarquía de información que ayuden a encontrar y comparar productos.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "Un lenguaje visual renovado y consistente en todo el sitio.",
            "Coherencia entre la parte comercial y la institucional.",
            "Una navegación clara y una jerarquía de información ordenada.",
            "Una presentación de producto que facilite la lectura.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "Me encargué del rediseño UX/UI en Figma. La implementación no formó parte de mi trabajo: el resultado es una propuesta de diseño, no un sitio publicado.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Una tienda existente, con componentes que convenía reaprovechar.",
            "Un alcance amplio: siete tipos de página que debían funcionar como un conjunto.",
            "Alcance limitado al diseño de interfaz, sin programación ni puesta en línea.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Revisar la tienda actual y su estructura de contenidos.",
            "Renovar el lenguaje visual y reaprovechar los componentes existentes.",
            "Diseñar en Figma los siete tipos de página como un sistema, no como piezas sueltas.",
            "Revisar la coherencia entre las secciones comerciales e institucionales.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Diseñar los siete tipos de página con los mismos componentes y reglas, para que el sitio se lea como una unidad.",
            "Priorizar la navegación y la jerarquía de información antes que la decoración.",
            "Cuidar la presentación del producto como la pieza que más pesa en la decisión de compra.",
            "Incluir el blog y los artículos dentro de la propuesta como parte del sistema.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "Un rediseño que cubre siete tipos de página con un mismo sistema visual:",
        },
        {
          type: "ul",
          items: [
            "Home.",
            "Categoría.",
            "Producto.",
            "Blog.",
            "Artículo de blog.",
            "Contacto.",
            "Quiénes somos.",
          ],
        },
      ],
      tools: [{ type: "p", text: "Figma." }],
      delivered: [
        {
          type: "ul",
          items: [
            "Rediseño de siete tipos de página en Figma.",
            "Lenguaje visual renovado, con componentes existentes reaprovechados.",
            "Navegación y jerarquía de información definidas para toda la tienda.",
            "Presentación de producto diseñada para la ficha y las categorías.",
          ],
        },
        {
          type: "p",
          text: "Estado actual: propuesta de rediseño diseñada en Figma. El blog y los artículos forman parte de la propuesta. No se informan métricas ni resultados de negocio.",
        },
      ],
    },
  },
  en: {
    cardTitle: "Bienestar Senior: e-commerce UX/UI redesign",
    cardSummary:
      "A Figma redesign of seven page types for an online store of orthopedics, mobility and wellbeing products for older adults.",
    seoTitle: "Bienestar Senior: E-commerce Redesign",
    seoDescription:
      "Case study: UX/UI redesign in Figma of seven page types for the Bienestar Senior store. Navigation, information hierarchy and product pages.",
    h1: "Bienestar Senior: a UX/UI redesign of seven page types for an orthopedics and wellbeing e-commerce",
    heroAlt: "Typographic cover of the Bienestar Senior case, an e-commerce UX/UI redesign",
    meta: {
      role: "UX/UI redesign in Figma (no implementation)",
      platform: "Shopify (current store)",
      kind: "E-commerce redesign",
      service: "UX/UI and web design",
    },
    links: [
      {
        label: "See the current store",
        href: "https://www.bienestarsenior.com/",
        note: "This is the client's current site. The redesign is presented as a design proposal made in Figma.",
      },
    ],
    sections: {
      context: [
        {
          type: "p",
          text: "Bienestar Senior is an online store for orthopedics, mobility, assistance and wellbeing products aimed at older adults.",
        },
        {
          type: "p",
          text: "A store like this combines two kinds of content: commercial, which sells products, and institutional, which explains who is behind it. Both have to feel like parts of the same site.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Renew the visual language of the whole store and keep commercial and institutional sections coherent, with navigation and an information hierarchy that help people find and compare products.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "A renewed, consistent visual language across the site.",
            "Coherence between the commercial and institutional sides.",
            "Clear navigation and an orderly information hierarchy.",
            "A product presentation that is easy to read.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "I was responsible for the UX/UI redesign in Figma. Putting it into the site was not part of my work: the result is a design proposal, not a published site.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "An existing store, with components worth reusing.",
            "A wide scope: seven page types that had to work as a set.",
            "Scope limited to interface design, with no coding and no go-live.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Review the current store and its content structure.",
            "Renew the visual language and reuse the existing components.",
            "Design the seven page types in Figma as a system, not as isolated pieces.",
            "Check coherence between the commercial and institutional sections.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Design the seven page types with the same components and rules, so the site reads as one whole.",
            "Put navigation and information hierarchy ahead of decoration.",
            "Treat the product presentation as the piece that weighs most in the buying decision.",
            "Include the blog and its articles in the proposal as part of the system.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "A redesign covering seven page types under one visual system:",
        },
        {
          type: "ul",
          items: [
            "Home.",
            "Category.",
            "Product.",
            "Blog.",
            "Blog article.",
            "Contact.",
            "About us (Quiénes somos).",
          ],
        },
      ],
      tools: [{ type: "p", text: "Figma." }],
      delivered: [
        {
          type: "ul",
          items: [
            "A redesign of seven page types in Figma.",
            "A renewed visual language, reusing existing components.",
            "Navigation and information hierarchy defined for the whole store.",
            "A product presentation designed for the product page and the categories.",
          ],
        },
        {
          type: "p",
          text: "Current status: a redesign proposal designed in Figma. The blog and its articles are part of the proposal. No metrics or business results are reported.",
        },
      ],
    },
  },
};
