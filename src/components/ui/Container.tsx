import cx from "classnames";
import type { ElementType, ReactNode } from "react";

/** Page-width wrapper: max 1360px with responsive side padding. */
export default function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cx("mx-auto w-full max-w-[1360px] px-5 md:px-8 xl:px-12", className)}>
      {children}
    </Tag>
  );
}
