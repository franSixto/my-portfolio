/** Serialize JSON-LD safely for inline <script> (escape `<`). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
