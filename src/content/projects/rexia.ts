import type { CaseStudy } from "./types";

export const rexia: CaseStudy = {
  slug: "rexia",
  cover: { src: "/projects/covers/rexia.webp", width: 1600, height: 900 },
  relatedService: "serviceUxUi",
  status: "ongoing-confidential",
  relatedCases: ["start-university"],
  es: {
    cardTitle: "Rexia: product design para un SaaS de salud",
    cardSummary:
      "Diseño de producto y UX/UI para una plataforma de inteligencia financiera para sistemas de salud: gestión de convenios y autorizaciones.",
    seoTitle: "Rexia: product design en SaaS de salud",
    seoDescription:
      "Caso de estudio: product design y UX/UI para Rexia, una plataforma SaaS para sistemas de salud. Gestión de convenios, autorizaciones y flujos complejos.",
    h1: "Rexia: product design y UX/UI para una plataforma de inteligencia financiera en salud",
    coverAlt: "Portada tipográfica del caso Rexia, product design para un SaaS de salud",
    meta: {
      role: "Diseñador de producto",
      platform: "SaaS para sistemas de salud",
      kind: "Product design y UX/UI",
      service: "UX/UI y producto",
    },
    sections: {
      context: [
        {
          type: "p",
          text: "Rexia es una plataforma de inteligencia financiera para sistemas de salud: financiadores, obras sociales, centros médicos e instituciones que trabajan con reglas administrativas complejas.",
        },
        {
          type: "p",
          text: "Trabajo como diseñador de producto dentro del equipo. Por confidencialidad, este caso no muestra capturas ni datos internos: describe el tipo de problema y cómo lo abordo.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Hacer comprensibles procesos con muchas reglas: qué prestaciones cubre un convenio, bajo qué condiciones, con qué aranceles y desde cuándo, y cómo se autoriza y se audita cada prestación. La interfaz tiene que ordenar esa complejidad sin esconderla.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "Estructurar la información de convenios y autorizaciones para que se pueda leer y mantener.",
            "Diseñar flujos que reflejen las reglas del negocio con claridad.",
            "Dejar visibles los estados, los resultados y el historial de cada proceso.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "Soy responsable del diseño de producto: flujos, estructura de la información, UX y UI para procesos complejos. Trabajo de forma interdisciplinaria con producto y desarrollo, y documento las decisiones con diagramas y especificaciones.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Reglas administrativas complejas y dependientes del tipo de institución.",
            "Información sensible: no se pueden mostrar pantallas ni datos internos.",
            "Un producto en evolución, que se diseña junto con producto y desarrollo.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Entender las reglas del dominio junto con producto.",
            "Mapear los flujos y la estructura de la información con diagramas funcionales.",
            "Documentar los flujos y las especificaciones de producto para el equipo de desarrollo.",
            "Diseñar la UX y la UI de cada proceso y ajustarla con el equipo.",
            "Usar herramientas de IA para explorar alternativas y documentar soluciones de diseño; las decisiones las tomo yo.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Modelar primero el flujo y la estructura de la información, y recién después la interfaz.",
            "Tratar los estados, la trazabilidad y el historial de cambios como parte central de la experiencia, no como un agregado.",
            "Documentar cada flujo para que producto y desarrollo trabajen sobre el mismo entendimiento.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "El trabajo se organiza en dos áreas funcionales del producto.",
        },
        {
          type: "ul",
          items: [
            "Gestión de convenios: prestaciones y códigos, coberturas y condiciones, aranceles, coseguros y topes, fechas de vigencia, importación vía Excel e historial de versiones y cambios.",
            "Autorizaciones: flujos de autorización, análisis de prestaciones e ítems, visualización de estados y resultados, y trazabilidad y auditoría.",
          ],
        },
      ],
      tools: [
        {
          type: "p",
          text: "Diagramas funcionales, documentación de flujos, especificaciones de producto y herramientas de IA para explorar y documentar soluciones de diseño.",
        },
        {
          type: "p",
          text: "Contexto del producto: Angular, NestJS, Prisma y Supabase en un monorepo. Es el stack del equipo de desarrollo; no es código mío.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Flujos y estructura de información para convenios y autorizaciones.",
            "Diseño UX y UI de procesos complejos.",
            "Diagramas funcionales y documentación de flujos.",
            "Especificaciones de producto.",
          ],
        },
        {
          type: "p",
          text: "Estado actual: trabajo en curso y confidencial, sin capturas ni datos internos. No se informan métricas.",
        },
      ],
    },
  },
  en: {
    cardTitle: "Rexia: product design for a healthcare SaaS",
    cardSummary:
      "Product design and UX/UI for a financial intelligence platform for health systems: agreement management and authorizations.",
    seoTitle: "Rexia: Healthcare SaaS Product Design",
    seoDescription:
      "Case study: product design and UX/UI for Rexia, a SaaS platform for health systems. Agreement management, authorizations and complex flows.",
    h1: "Rexia: product design and UX/UI for a financial intelligence platform in healthcare",
    coverAlt: "Typographic cover of the Rexia case, product design for a healthcare SaaS",
    meta: {
      role: "Product designer",
      platform: "SaaS for health systems",
      kind: "Product design and UX/UI",
      service: "UX/UI and product",
    },
    sections: {
      context: [
        {
          type: "p",
          text: "Rexia is a financial intelligence platform for health systems: payers, social health insurers, medical centers and institutions that work with complex administrative rules.",
        },
        {
          type: "p",
          text: "I work as a product designer inside the team. Because of confidentiality, this case shows no screenshots or internal data: it describes the kind of problem and how I approach it.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Make rule-heavy processes understandable: which services an agreement covers, under what conditions, at what rates and from what date, and how each service is authorized and audited. The interface has to organize that complexity without hiding it.",
        },
      ],
      goals: [
        {
          type: "ul",
          items: [
            "Structure agreement and authorization information so it can be read and maintained.",
            "Design flows that reflect the business rules clearly.",
            "Keep statuses, results and the history of each process visible.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "I am responsible for product design: flows, information structure, UX and UI for complex processes. I work across disciplines with product and engineering, and I document decisions with diagrams and specifications.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Complex administrative rules that depend on the type of institution.",
            "Sensitive information: no screens or internal data can be shown.",
            "A product that keeps evolving and is designed together with product and engineering.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Understand the domain rules together with product.",
            "Map flows and information structure with functional diagrams.",
            "Document flows and product specifications for the engineering team.",
            "Design the UX and UI of each process and refine it with the team.",
            "Use AI tools to explore alternatives and document design solutions; the decisions are mine.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Model the flow and the information structure first, and the interface after.",
            "Treat statuses, traceability and change history as a core part of the experience, not an add-on.",
            "Document each flow so product and engineering work from the same understanding.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "The work is organized around two functional areas of the product.",
        },
        {
          type: "ul",
          items: [
            "Agreement management: services and codes, coverage and conditions, rates, copayments and caps, validity dates, Excel import, and version and change history.",
            "Authorizations: authorization flows, analysis of services and items, display of statuses and results, and traceability and audit.",
          ],
        },
      ],
      tools: [
        {
          type: "p",
          text: "Functional diagrams, flow documentation, product specifications and AI tools to explore and document design solutions.",
        },
        {
          type: "p",
          text: "Product context: Angular, NestJS, Prisma and Supabase in a monorepo. This is the engineering team's stack; it is not my code.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Flows and information structure for agreements and authorizations.",
            "UX and UI design for complex processes.",
            "Functional diagrams and flow documentation.",
            "Product specifications.",
          ],
        },
        {
          type: "p",
          text: "Current status: ongoing and confidential work, with no screenshots or internal data. No metrics are reported.",
        },
      ],
    },
  },
};
