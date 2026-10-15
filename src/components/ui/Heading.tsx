import cx from "classnames";
import type { ReactNode } from "react";

export type HeadingSize = "display" | "h1" | "h1-long" | "h2" | "h3";
type Level = "h1" | "h2" | "h3" | "h4" | "p";

const SIZE_CLASSES: Record<HeadingSize, string> = {
  display: "text-display font-semibold",
  h1: "text-h1 font-semibold",
  "h1-long": "text-h1-long font-semibold",
  h2: "text-h2 font-semibold",
  h3: "text-h3 font-semibold",
};

/** Visual size is decoupled from the semantic level. */
export default function Heading({
  as: Tag = "h2",
  size = "h2",
  id,
  className,
  children,
}: {
  as?: Level;
  size?: HeadingSize;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={cx("font-sans text-ink text-balance", SIZE_CLASSES[size], className)}>
      {children}
    </Tag>
  );
}
