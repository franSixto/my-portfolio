// Redirect rules, kept out of next.config.ts so they can be unit tested.
// Self-contained on purpose: next.config.ts cannot resolve the "@/" alias.

export type RedirectRule = { source: string; destination: string; permanent: boolean };

/** Old case-study slugs -> current slugs. Same target in es and en. */
export const LEGACY_PROJECT_SLUGS = {
  "experience-at-startu": "start-university",
  "experience-at-deep-creek": "deep-creek-solutions",
  "experience-at-autocity": "autocity-grupo-tagle",
  "experience-at-sixto-van-garret": "sixto-van-garret",
  "experience-at-apex": "apex-america",
} as const;

/**
 * Every rule is a single hop to the final URL (no chains). The specific
 * legacy-slug rules come first so they win over the generic /projects/:slug.
 */
export function buildRedirects(): RedirectRule[] {
  const renamed = Object.entries(LEGACY_PROJECT_SLUGS).flatMap(([old, next]) => [
    { source: `/proyectos/${old}`, destination: `/proyectos/${next}`, permanent: true },
    { source: `/en/projects/${old}`, destination: `/en/projects/${next}`, permanent: true },
    // Legacy un-prefixed URL (served in whichever language the IP chose): straight to es.
    { source: `/projects/${old}`, destination: `/proyectos/${next}`, permanent: true },
  ]);

  return [
    { source: "/about", destination: "/sobre-mi", permanent: true },
    { source: "/projects", destination: "/proyectos", permanent: true },
    ...renamed,
    // Slugs never contain a dot: this keeps /projects/*.webp (public assets) out of the redirect.
    { source: "/projects/:slug([^./]+)", destination: "/proyectos/:slug", permanent: true },
    { source: "/contact", destination: "/contacto", permanent: true },
    // Blog has no posts yet; temporary so it can come back
    { source: "/blog", destination: "/", permanent: false },
  ];
}
