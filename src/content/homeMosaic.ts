// Case studies shown as framed screenshots in the home hero, in display order.
// Only real screenshots of work: the typographic covers stay in the project list.
export const HOME_MOSAIC_SLUGS = [
  "deep-creek-solutions",
  "start-university",
  "officina-artis",
  "autocity-grupo-tagle",
] as const;

export type HomeMosaicSlug = (typeof HOME_MOSAIC_SLUGS)[number];

/** Case studies whose cover is a typographic composition, not a screenshot. */
export const TYPOGRAPHIC_COVER_SLUGS: readonly string[] = [
  "ortopedia-para-ti",
  "bienestar-senior",
  "rexia",
  "deep-creek-branding",
  "consultora-prisma",
  "vivero-yvyra",
];
