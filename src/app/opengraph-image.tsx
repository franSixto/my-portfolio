import { renderOgImage } from "@/lib/og/renderOgImage";

export const alt = "Francisco Sixto, diseñador UX/UI y de producto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("es");
}
