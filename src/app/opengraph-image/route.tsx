import { renderOgImage } from "@/lib/og/renderOgImage";

// A plain route handler (not the opengraph-image file convention) on purpose:
// a root-level convention file is also attached to the global /_not-found,
// which has no layout and therefore no metadataBase.
export const dynamic = "force-static";

export function GET() {
  return renderOgImage("es");
}
