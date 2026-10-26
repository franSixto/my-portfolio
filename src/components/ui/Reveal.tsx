import type { ElementType, ReactNode } from "react";
import { revealProps, type RevealVariant } from "@/lib/motion/reveal";

/**
 * Scroll-reveal wrapper. Server component: it only emits `data-reveal` and
 * `--i`; the hidden state lives in CSS under `.js-motion`, so without JS or
 * with reduced motion the content is simply visible. Never wrap the LCP
 * element or the page H1.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  index,
  className,
  children,
}: {
  as?: ElementType;
  variant?: RevealVariant;
  /** Stagger step; capped at 3. */
  index?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Tag className={className} {...revealProps(variant, index)}>
      {children}
    </Tag>
  );
}
