// Pure translation helpers (no I/O).

export type TranslationValue =
  | string
  | number
  | boolean
  | null
  | TranslationValue[]
  | { [key: string]: TranslationValue };
export type TranslationData = { [key: string]: TranslationValue };

function isPlainObject(value: unknown): value is TranslationData {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep merge: values from `primary` win, gaps are filled from `fallback`. */
export function mergeWithFallback(
  primary: TranslationData,
  fallback: TranslationData
): TranslationData {
  const result: TranslationData = { ...fallback };
  for (const [key, value] of Object.entries(primary)) {
    const base = result[key];
    result[key] =
      isPlainObject(value) && isPlainObject(base)
        ? mergeWithFallback(value, base)
        : value;
  }
  return result;
}

type TranslateOptions = { isProduction?: boolean };

/**
 * Resolve a dot-notation key. Missing keys return the key itself in
 * development (so they are visible) and an empty string in production
 * (never leak raw keys to users or crawlers).
 */
export function translate(
  dictionary: TranslationData,
  key: string,
  options: TranslateOptions = {}
): string {
  const isProduction =
    options.isProduction ?? process.env.NODE_ENV === "production";
  let value: TranslationValue | undefined = dictionary;
  for (const part of key.split(".")) {
    if (isPlainObject(value) && part in value) {
      value = value[part];
    } else {
      value = undefined;
      break;
    }
  }
  if (typeof value === "string") return value;
  if (isProduction) {
    console.error(`[i18n] Missing translation: ${key}`);
    return "";
  }
  return key;
}
