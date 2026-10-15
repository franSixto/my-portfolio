import type { CaseStudy } from "./types";

export const officinaArtis: CaseStudy = {
  slug: "officina-artis",
  hero: { src: "/projects/officina-artis.webp", width: 1200, height: 675 },
  logo: { src: "/projects/logo-officina-artis.webp", width: 676, height: 108 },
  relatedService: "serviceWebDevelopment",
  es: {
    cardTitle: "Officina Artis: galería de arte virtual en 3D",
    cardSummary:
      "Proyecto propio: una galería de arte 3D en el navegador, con navegación de cámara, iluminación y audio, hecha con Three.js y Blender.",
    seoTitle: "Officina Artis: galería 3D con Three.js",
    seoDescription:
      "Experimento propio: una galería de arte virtual en 3D para el navegador, con Three.js, WebGL y Blender. Diseño espacial, navegación y curaduría.",
    h1: "Officina Artis: una galería de arte virtual en 3D para el navegador",
    heroAlt: "Vista 3D de la galería virtual Officina Artis",
    logoAlt: "Logo de Officina Artis",
    meta: {
      role: "Concepto, diseño y desarrollo 3D",
      kind: "Proyecto propio (experimento)",
      service: "Desarrollo web",
    },
    links: [
      {
        label: "Ver la galería",
        href: "https://galery-psi.vercel.app",
        note: "Optimizada para escritorio",
      },
    ],
    sections: {
      context: [
        {
          type: "p",
          text: "Un proyecto propio para explorar cómo se recorre una exposición en la web cuando el espacio es parte de la interfaz.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Lograr que una galería 3D se sienta tranquila y fácil de recorrer, sin una interfaz que compita con las obras.",
        },
      ],
      role: [
        {
          type: "p",
          text: "Todo el proyecto: concepto, diseño del espacio, iluminación y desarrollo.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Experiencia 100% web, en tiempo real.",
            "Optimizada para navegadores de escritorio.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Definir el concepto: la curaduría como recorrido espacial.",
            "Modelar el espacio en Blender.",
            "Desarrollar la navegación, las transiciones de cámara, la iluminación y el audio ambiental con Three.js.",
            "Armar una estructura modular para cambiar exposiciones.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Interfaz mínima: el espacio, la luz y las transiciones guían el recorrido.",
            "Arquitectura modular para alojar exposiciones rotativas, con obras propias e invitadas.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "Una galería virtual navegable en el navegador, con transiciones de cámara suaves, iluminación y audio ambiental.",
        },
      ],
      tools: [
        { type: "p", text: "Three.js, WebGL, GLSL, Blender, HTML, CSS, JavaScript." },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Galería 3D publicada y navegable desde el navegador.",
            "Estructura modular para nuevas exposiciones.",
          ],
        },
      ],
    },
  },
  en: {
    cardTitle: "Officina Artis: a 3D virtual art gallery",
    cardSummary:
      "Self-initiated project: a 3D art gallery in the browser, with camera navigation, lighting and ambient audio, built with Three.js and Blender.",
    seoTitle: "Officina Artis: 3D Gallery in Three.js",
    seoDescription:
      "Self-initiated experiment: a 3D virtual art gallery in the browser, built with Three.js, WebGL and Blender. Spatial design, navigation and curation.",
    h1: "Officina Artis: a 3D virtual art gallery for the browser",
    heroAlt: "3D view of the Officina Artis virtual gallery",
    logoAlt: "Officina Artis logo",
    meta: {
      role: "Concept, design and 3D development",
      kind: "Own project (experiment)",
      service: "Web development",
    },
    links: [
      {
        label: "Visit the gallery",
        href: "https://galery-psi.vercel.app",
        note: "Optimized for desktop",
      },
    ],
    sections: {
      context: [
        {
          type: "p",
          text: "A personal project to explore how an exhibition can be experienced on the web when the space itself is part of the interface.",
        },
      ],
      challenge: [
        {
          type: "p",
          text: "Make a 3D gallery feel calm and easy to explore, without an interface competing with the artwork.",
        },
      ],
      role: [
        {
          type: "p",
          text: "The whole project: concept, spatial design, lighting and development.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "A fully web-based, real-time experience.",
            "Optimized for desktop browsers.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Define the concept: curation as a spatial journey.",
            "Model the space in Blender.",
            "Build navigation, camera transitions, lighting and ambient audio with Three.js.",
            "Set up a modular structure to swap exhibitions.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Minimal UI: space, light and transitions guide the visit.",
            "Modular architecture for rotating exhibitions, with personal and guest work.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "A virtual gallery you can walk through in the browser, with smooth camera transitions, lighting and ambient audio.",
        },
      ],
      tools: [
        { type: "p", text: "Three.js, WebGL, GLSL, Blender, HTML, CSS, JavaScript." },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "A live 3D gallery you can explore in the browser.",
            "A modular structure for new exhibitions.",
          ],
        },
      ],
    },
  },
};
