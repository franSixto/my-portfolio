import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/i18n/routes";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Página no encontrada",
  robots: { index: false },
};

// Catch-all so unmatched URLs render the locale's not-found.tsx inside this
// root layout. Real routes take precedence over it. Note: in Next 15 the
// initial HTML of any notFound() response is the bare error shell
// (<html id="__next_error__">) and the localized layout is rendered on
// hydration; the status stays 404.
export default function CatchAll() {
  notFound();
}
