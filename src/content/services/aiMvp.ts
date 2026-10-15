import type { LocalizedServiceContent } from "./types";

export const aiMvp: LocalizedServiceContent = {
  es: {
    seoTitle: "MVP y prototipos con IA para startups",
    seoDescription:
      "Diseño y desarrollo de prototipos funcionales y MVPs con ayuda de IA, para validar tu idea con usuarios reales antes de invertir en el producto completo.",
    serviceType: "Desarrollo de MVP y prototipos asistido por IA",
    h1: "Prototipos y MVPs asistidos por IA para validar tu idea",
    intro:
      "Antes de invertir meses en desarrollo, necesitás saber si la idea funciona con usuarios reales. Combino diseño de producto y herramientas de IA para llegar a un prototipo funcional o a un MVP acotado que se pueda probar, usando IA para iterar sobre algo concreto.",
    price: {
      label: "Prototipo funcional desde USD 1.500",
      amountUsd: 1500,
      note: "La cotización final depende del alcance del prototipo o MVP. La definimos juntos después de una primera charla.",
    },
    sections: [
      {
        kind: "list",
        heading: "¿Para quién es?",
        items: [
          "Founders con una idea que necesita pasar de la idea a algo que se pueda usar y probar.",
          "Equipos que quieren probar una funcionalidad nueva sin frenar el roadmap.",
          "Emprendedores que necesitan algo concreto para mostrarles a inversores o a los primeros clientes.",
        ],
      },
      {
        kind: "list",
        heading: "Qué incluye",
        items: [
          "Taller inicial: problema, usuario, hipótesis y qué tiene que probar el MVP.",
          "Recorte de alcance: qué entra en la primera versión y qué no.",
          "Flujos y UI esenciales.",
          "Prototipo funcional o MVP web, con las tecnologías elegidas según lo que necesita cada proyecto.",
          "Guía básica para probarlo con usuarios.",
          "Recomendaciones para la siguiente etapa.",
          "Mantenimiento y gestión, si lo necesitás: me ocupo de las cuentas del proyecto, de conectar los servicios e integraciones que haga falta, del servidor cuando el proyecto lo requiere y de la base de datos.",
        ],
      },
      {
        kind: "text",
        heading: "Cómo uso la IA (y dónde no)",
        paragraphs: [
          "El desarrollo está asistido por IA y modelos de lenguaje (LLMs). Me permiten generar variantes de interfaz, código base y contenido de prueba, y eso me permite iterar sobre algo concreto en lugar de quedarme en la idea. Las tecnologías las elijo en cada proyecto según lo que necesita, no hay un stack fijo.",
          "Lo que no delego: definir qué problema se valida, las decisiones de UX y la revisión del código. Reviso lo que entrego y respondo por ello. Un MVP hecho con IA sigue siendo un MVP: sirve para aprender, no reemplaza un producto preparado para escalar.",
        ],
      },
      {
        kind: "steps",
        heading: "Cómo trabajo",
        items: [
          "Taller de definición.",
          "Flujos y wireframes rápidos.",
          "Construcción asistida por IA.",
          "Revisión y pulido.",
          "Entrega y plan de pruebas.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué diferencia hay entre un prototipo y un MVP?",
        answer:
          "Un prototipo simula la experiencia para probarla. Un MVP funciona de verdad, con el mínimo necesario para que lo usen personas reales.",
      },
      {
        question: "¿El código sirve después?",
        answer:
          "Depende de cómo se construya. Lo hablamos al definir el alcance: a veces conviene que sea descartable.",
      },
      {
        question: "¿Necesito tener todo definido?",
        answer: "No. Ordenar la idea es parte del trabajo.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "Un prototipo funcional arranca desde USD 1.500. El valor final depende del alcance y lo definimos juntos antes de empezar.",
      },
    ],
    cta: {
      heading: "¿Tenés una idea que querés probar?",
      button: "Quiero validar mi idea",
    },
    relatedProjectSlugs: ["portfolio-fransixto", "deep-creek-solutions"],
    relatedServices: [
      {
        route: "serviceUxUi",
        blurb: "Para la etapa siguiente al MVP.",
      },
      {
        route: "serviceWebDevelopment",
        blurb: "Si el producto pasa a una implementación a medida.",
      },
    ],
  },
  en: {
    seoTitle: "AI-Assisted MVP & Prototype Development",
    seoDescription:
      "Functional prototypes and MVPs, designed and built with the help of AI, so you can validate your idea with real users before building the full product.",
    serviceType: "AI-assisted MVP and prototype development",
    h1: "AI-assisted prototypes and MVPs to validate your idea",
    intro:
      "Before spending months on development, you need to know whether the idea works with real users. I combine product design with AI tools to get to a working prototype or a lean MVP you can test, using AI to iterate on something concrete.",
    price: {
      label: "Functional prototype from USD 1,500",
      amountUsd: 1500,
      note: "The final quote depends on the scope of the prototype or MVP. We define it together after an initial conversation.",
    },
    sections: [
      {
        kind: "list",
        heading: "Who it's for",
        items: [
          "Founders with an idea that needs to move from idea to something people can use and test.",
          "Teams that want to test a new feature without slowing down the roadmap.",
          "Entrepreneurs who need something concrete to show investors or first customers.",
        ],
      },
      {
        kind: "list",
        heading: "What's included",
        items: [
          "Kickoff workshop: problem, user, hypotheses and what the MVP has to prove.",
          "Scope cut: what goes into the first version and what does not.",
          "Essential flows and UI.",
          "Functional prototype or web MVP, with technologies chosen according to what each project needs.",
          "Basic guide for testing it with users.",
          "Recommendations for the next stage.",
          "Maintenance and management, if you need it: I take care of the project's accounts, connect the services and integrations required, the server when the project needs it and the database.",
        ],
      },
      {
        kind: "text",
        heading: "How I use AI (and where I don't)",
        paragraphs: [
          "Development is assisted by AI and large language models (LLMs). They let me generate interface variations, starter code and placeholder content, which lets me iterate on something concrete instead of staying at the idea stage. I choose the technologies for each project according to what it needs; there is no fixed stack.",
          "What I don't delegate: defining which problem is being validated, UX decisions and code review. I review what I deliver and I am accountable for it. An MVP built with AI is still an MVP: it is for learning, not a replacement for a product ready to scale.",
        ],
      },
      {
        kind: "steps",
        heading: "How I work",
        items: [
          "Definition workshop.",
          "Quick flows and wireframes.",
          "AI-assisted build.",
          "Review and polish.",
          "Delivery and test plan.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between a prototype and an MVP?",
        answer:
          "A prototype simulates the experience so it can be tested. An MVP actually works, with the minimum needed for real people to use it.",
      },
      {
        question: "Is the code useful afterwards?",
        answer:
          "It depends on how it is built. We discuss it when defining the scope: sometimes it makes sense for it to be disposable.",
      },
      {
        question: "Do I need to have everything defined?",
        answer: "No. Sorting out the idea is part of the work.",
      },
      {
        question: "How much does it cost?",
        answer:
          "A functional prototype starts from USD 1,500. The final price depends on scope and we define it together before starting.",
      },
    ],
    cta: {
      heading: "Have an idea you want to test?",
      button: "I want to validate my idea",
    },
    relatedProjectSlugs: ["portfolio-fransixto", "deep-creek-solutions"],
    relatedServices: [
      {
        route: "serviceUxUi",
        blurb: "For the stage after the MVP.",
      },
      {
        route: "serviceWebDevelopment",
        blurb: "If the product moves on to a custom implementation.",
      },
    ],
  },
};
