import { renderOgImage } from "@/lib/og/renderOgImage";

export const alt = "Francisco Sixto, UX/UI and product designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
