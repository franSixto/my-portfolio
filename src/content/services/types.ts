import type { Locale, RouteKey } from "@/i18n/routes";

export type ServiceSection =
  | { kind: "list"; heading: string; intro?: string; items: string[] }
  | { kind: "steps"; heading: string; items: string[] }
  | { kind: "text"; heading: string; paragraphs: string[] };

export type ServiceFaq = { question: string; answer: string };

export type ServicePageContent = {
  seoTitle: string;
  seoDescription: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  h1: string;
  intro: string;
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  cta: { heading: string; button: string };
  relatedProjectSlugs: string[];
  relatedServices: { route: RouteKey; blurb: string }[];
};

export type LocalizedServiceContent = Record<Locale, ServicePageContent>;

/** A solution page is a service page plus the one-line summary shown in indexes. */
export type SolutionPageContent = ServicePageContent & { summary: string };

export type LocalizedSolutionContent = Record<Locale, SolutionPageContent>;
