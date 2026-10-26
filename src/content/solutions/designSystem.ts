import type { LocalizedSolutionContent } from "@/content/services/types";

export const designSystem: LocalizedSolutionContent = {
  es: {
    seoTitle: "Design system para productos digitales",
    seoDescription:
      "Diseño de design systems en Figma: tokens, componentes y documentación de uso para que tus productos y sitios crezcan con coherencia.",
    serviceType: "Diseño de design systems",
    h1: "Design system: una base común para que los cambios se hagan una sola vez",
    intro:
      "Cuando un producto o una familia de sitios crece sin un sistema, cada cambio hay que repetirlo pantalla por pantalla. Construyo sistemas de diseño en Figma, con tokens, componentes y documentación de uso, para que diseño y código hablen el mismo idioma.",
    summary:
      "Tokens, componentes y documentación en Figma para que diseño y código compartan una misma base.",
    sections: [
      {
        kind: "list",
        heading: "Señales de que hace falta un sistema",
        items: [
          "El mismo botón o formulario se resuelve distinto en cada pantalla.",
          "Un cambio de estilo hay que repetirlo en cada sitio o módulo.",
          "Cada sitio o funcionalidad nueva arranca casi de cero.",
          "Diseño y desarrollo llaman de formas distintas a las mismas piezas.",
        ],
      },
      {
        kind: "list",
        heading: "Qué incluye un design system",
        items: [
          "Auditoría de lo que ya existe: qué se repite, qué varía y qué es común a todo.",
          "Tokens de diseño: la base de color, tipografía y espaciado.",
          "Librería de componentes en Figma, con sus estados.",
          "Reglas de uso y documentación para que el equipo lo aplique igual.",
          "Componentes nombrados igual en diseño y en código.",
          "Variantes por marca o institución sobre una base compartida.",
          "Accesibilidad considerada en cada componente, no como una etapa aparte.",
        ],
      },
      {
        kind: "steps",
        heading: "Cómo construyo un sistema de diseño",
        items: [
          "Inventariar las pantallas y los sitios existentes.",
          "Separar lo que es común de lo que cambia entre productos, marcas o instituciones.",
          "Diseñar la base: tokens y los componentes mínimos.",
          "Probar el sistema sobre flujos reales antes de ampliarlo.",
          "Documentar el uso y los nombres de cada pieza.",
          "Acompañar la implementación para que el código respete el sistema.",
        ],
      },
      {
        kind: "text",
        heading: "Cómo se ve en proyectos reales",
        paragraphs: [
          "En Start University, cada sitio tenía su propia versión del portal del estudiante. La respuesta fue un único portal modular, que se adapta a cada institución con cambios mínimos de CSS, y un sistema base compartido con el que se lanzaron los sitios de nuevas universidades socias.",
          "En Deep Creek Solutions, los componentes de UI reutilizables se compartieron entre productos de salud y estética, para no rediseñar lo mismo en cada uno.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Necesito un design system o me alcanza con una guía de estilo?",
        answer:
          "Una guía de estilo define cómo se ve la marca. Un design system suma componentes con comportamiento, reglas de uso y nombres compartidos con el código. Si tu problema es que las pantallas se resuelven distinto cada vez, hace falta lo segundo.",
      },
      {
        question: "¿Lo armás desde cero o a partir de lo que ya tengo?",
        answer:
          "A partir de lo existente. Primero identifico qué partes se repiten y cuáles cambian entre pantallas o sitios; esa es la base del sistema.",
      },
      {
        question: "¿Sirve para varios sitios o marcas a la vez?",
        answer:
          "Sí, es uno de los usos más claros. En Start University, un sistema base compartido permitió que cada institución mantuviera su identidad visual sobre la misma estructura.",
      },
      {
        question: "¿Lo implementás en código?",
        answer:
          "El entregable principal es el sistema en Figma. Para llevarlo a código, la página de desarrollo web describe cómo construyo bibliotecas de componentes alineadas al design system.",
      },
      {
        question: "¿Trabajás con un equipo que ya tiene diseñador?",
        answer:
          "Sí. Puedo armar el sistema junto al diseñador del equipo o tomar esa parte del trabajo, según cómo te convenga organizarlo.",
      },
    ],
    cta: {
      heading: "¿Tus pantallas se resuelven distinto cada vez?",
      button: "Contame sobre tu producto",
    },
    relatedProjectSlugs: ["start-university", "deep-creek-solutions"],
    relatedServices: [
      {
        route: "serviceUxUi",
        blurb: "El servicio completo: flujos, interfaz y design system para equipos de producto.",
      },
      {
        route: "serviceWebDevelopment",
        blurb: "Para llevar los componentes a React y mantenerlos alineados con el diseño.",
      },
      {
        route: "solutionSaas",
        blurb: "Si lo que primero hay que ordenar son los flujos de un producto.",
      },
    ],
  },
  en: {
    seoTitle: "Design System for Digital Products",
    seoDescription:
      "Design system design in Figma: tokens, components and usage documentation so your products and websites grow with consistency.",
    serviceType: "Design system design",
    h1: "Design system: a shared foundation so changes are made only once",
    intro:
      "When a product or a family of websites grows without a system, every change has to be repeated screen by screen. I build design systems in Figma, with tokens, components and usage documentation, so design and code speak the same language.",
    summary:
      "Tokens, components and documentation in Figma so design and code share one foundation.",
    sections: [
      {
        kind: "list",
        heading: "Signs you need a system",
        items: [
          "The same button or form is solved differently on every screen.",
          "A style change has to be repeated on every site or module.",
          "Every new site or feature starts almost from scratch.",
          "Design and engineering call the same pieces by different names.",
        ],
      },
      {
        kind: "list",
        heading: "What a design system includes",
        items: [
          "An audit of what exists: what repeats, what varies and what is common to everything.",
          "Design tokens: the foundation for color, typography and spacing.",
          "A component library in Figma, with its states.",
          "Usage rules and documentation so the team applies it consistently.",
          "Components named the same in design and in code.",
          "Brand or institution variants on a shared base.",
          "Accessibility built into each component, not left as a separate stage.",
        ],
      },
      {
        kind: "steps",
        heading: "How I build a design system",
        items: [
          "Take inventory of the existing screens and sites.",
          "Separate what is common from what changes between products, brands or institutions.",
          "Design the foundation: tokens and the minimum set of components.",
          "Test the system on real flows before expanding it.",
          "Document the use and the names of each piece.",
          "Support the implementation so the code respects the system.",
        ],
      },
      {
        kind: "text",
        heading: "What it looks like in real projects",
        paragraphs: [
          "At Start University, every site had its own version of the student portal. The answer was a single modular portal that adapts to each institution with minimal CSS changes, plus a shared base system used to launch the sites of new partner universities.",
          "At Deep Creek Solutions, reusable UI components were shared across health and aesthetics products, so the same thing didn't have to be redesigned in each one.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a design system or is a style guide enough?",
        answer:
          "A style guide defines how the brand looks. A design system adds components with behavior, usage rules and names shared with the code. If your problem is that screens get solved differently every time, you need the second.",
      },
      {
        question: "Do you build it from scratch or from what I already have?",
        answer:
          "From what exists. First I identify which parts repeat and which change between screens or sites; that is the foundation of the system.",
      },
      {
        question: "Does it work for several sites or brands at once?",
        answer:
          "Yes, it's one of the clearest uses. At Start University, a shared base system let each institution keep its visual identity on the same structure.",
      },
      {
        question: "Do you implement it in code?",
        answer:
          "The main deliverable is the system in Figma. To take it to code, the web development page describes how I build component libraries aligned with the design system.",
      },
      {
        question: "Do you work with a team that already has a designer?",
        answer:
          "Yes. I can build the system alongside the team's designer or take that part of the work, depending on how you prefer to organize it.",
      },
    ],
    cta: {
      heading: "Are your screens solved differently every time?",
      button: "Tell me about your product",
    },
    relatedProjectSlugs: ["start-university", "deep-creek-solutions"],
    relatedServices: [
      {
        route: "serviceUxUi",
        blurb: "The full service: flows, interface and design system for product teams.",
      },
      {
        route: "serviceWebDevelopment",
        blurb: "To take the components into React and keep them aligned with the design.",
      },
      {
        route: "solutionSaas",
        blurb: "If what needs organizing first is a product's flows.",
      },
    ],
  },
};
