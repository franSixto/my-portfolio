import type { CaseStudy } from "./types";

export const portfolioFransixto: CaseStudy = {
  slug: "portfolio-fransixto",
  hero: { src: "/projects/portfolio-fransixto.webp", width: 1600, height: 900 },
  relatedService: "serviceWebDevelopment",
  secondaryService: "serviceAiMvp",
  es: {
    cardTitle: "fransixto.com.ar: portfolio bilingüe en Next.js",
    cardSummary:
      "Rediseño de mi sitio con URLs separadas en español e inglés, páginas de servicios con SEO técnico y desarrollo asistido por IA con Claude Code.",
    seoTitle: "Portfolio bilingüe en Next.js con IA",
    seoDescription:
      "Caso de estudio: rediseño de fransixto.com.ar con Next.js y TypeScript, rutas en español e inglés, SEO técnico y desarrollo asistido por IA.",
    h1: "fransixto.com.ar: rediseño, arquitectura bilingüe y desarrollo asistido por IA",
    heroAlt: "Página de inicio de fransixto.com.ar",
    meta: {
      role: "Diseño y desarrollo",
      since: "2025",
      kind: "Proyecto propio",
      service: "Desarrollo web",
    },
    links: [
      { label: "Ver sitio", href: "https://www.fransixto.com.ar" },
      { label: "Ver el repositorio en GitHub", href: "https://github.com/franSixto/my-portfolio" },
    ],
    sections: {
      context: [
        {
          type: "p",
          text: "Mi portfolio es también mi principal canal comercial. Lo armé en 2025 con Next.js y, con el tiempo, el sitio y mi posicionamiento se fueron separando: el sitio hablaba de un perfil y yo ofrecía otro.",
        },
      ],
      challenge: [
        {
          type: "ul",
          items: [
            "El idioma se elegía según la ubicación del visitante, sobre las mismas URLs. Un buscador no podía indexar las dos versiones por separado.",
            "No había páginas que explicaran cada servicio, así que no había nada que respondiera a búsquedas concretas.",
            "Los textos y los casos de estudio no reflejaban lo que hago hoy.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "Todo: posicionamiento, contenido, diseño y desarrollo. El desarrollo lo hice asistido por IA con Claude Code: yo defino la arquitectura, reviso cada cambio y decido qué entra.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Dos idiomas con el mismo contenido, sin duplicar código ni pantallas.",
            "No romper los enlaces que ya existían.",
            "Mantener el sitio rápido y fácil de mantener por una sola persona.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Redefinir el posicionamiento y los servicios antes de tocar el diseño.",
            "Diseñar la arquitectura de URLs: español en la raíz, inglés bajo `/en`, con slugs traducidos (`/sobre-mi` y `/en/about`).",
            "Escribir el contenido de servicios como datos tipados, con tests que controlan largos de títulos y descripciones, precios y consistencia del voseo.",
            "Implementar con desarrollo asistido por IA, revisando cada cambio, y cubrir las rutas con tests.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "Un mapa de rutas propio (`src/i18n/routes.ts`) en lugar de una librería de i18n: una sola fuente para navegación, sitemap, hreflang y cambio de idioma.",
            "URL canónica y alternativas hreflang en cada página, con `x-default` en español.",
            "Redirecciones permanentes desde las URLs anteriores para no perder enlaces.",
            "Datos estructurados: Person en todo el sitio; Service y FAQPage en las páginas de servicios.",
            "Sacar elementos decorativos que no ayudaban a explicar qué hago.",
            "IA para acelerar, no para decidir: la arquitectura, el contenido y la revisión del código son míos.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "Un sitio bilingüe con URLs propias por idioma, un hub y cuatro páginas de servicio con contenido y datos estructurados, casos de estudio reescritos y un formulario de contacto con protección contra spam.",
        },
      ],
      tools: [
        {
          type: "p",
          text: "Next.js (App Router), React, TypeScript, Tailwind CSS, Vitest, Nodemailer, reCAPTCHA, Vercel (deploy, Analytics y Speed Insights), Claude Code.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Rutas en español e inglés con slugs traducidos y hreflang.",
            "Sitemap con alternativas por idioma.",
            "Cuatro páginas de servicio con datos estructurados Service y FAQPage.",
            "Tests automáticos para rutas, sitemap, diccionario y contenido de servicios.",
            "Repositorio público para revisar el código.",
          ],
        },
      ],
    },
  },
  en: {
    cardTitle: "fransixto.com.ar: bilingual Next.js portfolio",
    cardSummary:
      "A redesign of my own site with separate Spanish and English URLs, SEO-ready service pages and AI-assisted development with Claude Code.",
    seoTitle: "Bilingual Next.js Portfolio Built with AI",
    seoDescription:
      "Case study: redesign of fransixto.com.ar with Next.js and TypeScript, Spanish and English routes, technical SEO and AI-assisted development.",
    h1: "fransixto.com.ar: redesign, bilingual architecture and AI-assisted development",
    heroAlt: "Home page of fransixto.com.ar",
    meta: {
      role: "Design and development",
      since: "2025",
      kind: "Own project",
      service: "Web development",
    },
    links: [
      { label: "Visit site", href: "https://www.fransixto.com.ar" },
      { label: "View the repository on GitHub", href: "https://github.com/franSixto/my-portfolio" },
    ],
    sections: {
      context: [
        {
          type: "p",
          text: "My portfolio is also my main sales channel. I built it in 2025 with Next.js and, over time, the site and my positioning drifted apart: the site described one profile while I was offering another.",
        },
      ],
      challenge: [
        {
          type: "ul",
          items: [
            "Language was chosen by the visitor's location, on the same URLs. Search engines couldn't index both versions separately.",
            "There were no pages explaining each service, so nothing answered specific searches.",
            "The copy and the case studies didn't reflect what I do today.",
          ],
        },
      ],
      role: [
        {
          type: "p",
          text: "Everything: positioning, content, design and development. Development was AI-assisted with Claude Code: I define the architecture, review every change and decide what gets in.",
        },
      ],
      constraints: [
        {
          type: "ul",
          items: [
            "Two languages with the same content, without duplicating code or screens.",
            "Don't break existing links.",
            "Keep the site fast and maintainable by one person.",
          ],
        },
      ],
      process: [
        {
          type: "ol",
          items: [
            "Redefine positioning and services before touching the design.",
            "Design the URL architecture: Spanish at the root, English under `/en`, with translated slugs (`/sobre-mi` and `/en/about`).",
            "Write service content as typed data, with tests that check title and description lengths, prices and Spanish voseo consistency.",
            "Build with AI-assisted development, reviewing every change, and cover routing with tests.",
          ],
        },
      ],
      decisions: [
        {
          type: "ul",
          items: [
            "A custom route map (`src/i18n/routes.ts`) instead of an i18n library: one source for navigation, sitemap, hreflang and the language switch.",
            "Canonical URL and hreflang alternates on every page, with `x-default` pointing to Spanish.",
            "Permanent redirects from the old URLs so existing links keep working.",
            "Structured data: Person site-wide; Service and FAQPage on service pages.",
            "Remove decorative elements that didn't help explain what I do.",
            "AI to move faster, not to decide: architecture, content and code review are mine.",
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "A bilingual site with its own URLs per language, a services hub and four service pages with content and structured data, rewritten case studies and a contact form with spam protection.",
        },
      ],
      tools: [
        {
          type: "p",
          text: "Next.js (App Router), React, TypeScript, Tailwind CSS, Vitest, Nodemailer, reCAPTCHA, Vercel (deploy, Analytics and Speed Insights), Claude Code.",
        },
      ],
      delivered: [
        {
          type: "ul",
          items: [
            "Spanish and English routes with translated slugs and hreflang.",
            "A sitemap with per-language alternates.",
            "Four service pages with Service and FAQPage structured data.",
            "Automated tests for routing, sitemap, dictionary and service content.",
            "A public repository to review the code.",
          ],
        },
      ],
    },
  },
};
