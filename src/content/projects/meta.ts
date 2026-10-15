import { PROJECTS_LABELS } from "./labels";
import type { CaseMeta } from "./types";
import type { Locale } from "@/i18n/routes";

const META_ORDER = ["role", "years", "since", "market", "location", "platform", "kind", "service"] as const;

/** Sidebar entries in a fixed order; only the facts a case actually states. */
export function buildMetaItems(meta: CaseMeta, locale: Locale): { label: string; value: string }[] {
  const labels = PROJECTS_LABELS[locale].meta;
  return META_ORDER.flatMap((key) => {
    const value = meta[key];
    return value ? [{ label: labels[key], value }] : [];
  });
}
