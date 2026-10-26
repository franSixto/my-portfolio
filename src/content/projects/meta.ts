import { PROJECTS_LABELS } from "./labels";
import type { CaseMeta, CaseStatus } from "./types";
import type { Locale } from "@/i18n/routes";

const META_ORDER = ["role", "years", "since", "market", "location", "platform", "kind", "service"] as const;

/** Sidebar entries in a fixed order; only the facts a case actually states. Status goes last. */
export function buildMetaItems(
  meta: CaseMeta,
  locale: Locale,
  status?: CaseStatus
): { label: string; value: string }[] {
  const labels = PROJECTS_LABELS[locale];
  const items = META_ORDER.flatMap((key) => {
    const value = meta[key];
    return value ? [{ label: labels.meta[key], value }] : [];
  });
  if (status) items.push({ label: labels.meta.status, value: labels.status[status] });
  return items;
}
