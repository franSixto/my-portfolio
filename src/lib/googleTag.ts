/** Loader URL for the Google tag. The id is validated by a test (^GTM-[A-Z0-9]+$). */
export function googleTagSrc(id: string): string {
  return `https://www.googletagmanager.com/gtm.js?id=${id}`;
}

/**
 * The ONLY place dataLayer, gtag and gtag('js') are defined. Anything else
 * (e.g. GA's config call) must rely on this running first.
 */
export function googleTagInlineScript(): string {
  return `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`;
}

/** GA config only. Assumes gtag already exists (defined by the Google tag in <head>). */
export function gaConfigScript(gaId: string): string {
  return `gtag('config', '${gaId}');`;
}
