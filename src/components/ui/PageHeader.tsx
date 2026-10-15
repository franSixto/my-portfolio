import cx from "classnames";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "./Container";
import Heading, { type HeadingSize } from "./Heading";
import { Eyebrow, Lead } from "./Text";

/**
 * Top of an inner page: breadcrumbs, optional eyebrow, H1 and lead, plus an
 * optional margin note (cols 10-12 on desktop). Never animated: the H1 is
 * usually the LCP element.
 */
export default function PageHeader({
  title,
  lead,
  eyebrow,
  aside,
  crumbLabel,
  titleSize = "h1",
  titleClassName,
  children,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  aside?: ReactNode;
  crumbLabel?: string;
  /** "h1-long" for sentence-length titles (case studies). */
  titleSize?: Extract<HeadingSize, "h1" | "h1-long">;
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <header className="pb-14 pt-8 md:pb-20 md:pt-12">
      <Container>
        <Breadcrumbs currentLabel={crumbLabel} className="mb-12 md:mb-20" />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className={cx(aside ? "lg:col-span-8" : "lg:col-span-10")}>
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <Heading
              as="h1"
              size={titleSize}
              className={cx(titleSize === "h1" ? "max-w-[22ch]" : "max-w-[30ch]", titleClassName)}
            >
              {title}
            </Heading>
            {lead && <Lead className="mt-6 md:mt-8">{lead}</Lead>}
            {children}
          </div>
          {aside && <div className="lg:col-span-3 lg:col-start-10 lg:self-end">{aside}</div>}
        </div>
      </Container>
    </header>
  );
}
