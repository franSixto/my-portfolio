import cx from "classnames";
import type { ReactNode } from "react";
import Container from "./Container";
import { revealProps } from "@/lib/motion/reveal";
import Heading from "./Heading";
import { Eyebrow } from "./Text";

/**
 * Page section. "hanging" puts the heading in the left margin (cols 1-4) and
 * the content in cols 5-12 on desktop; "stacked" puts the heading above.
 * A top rule marks the section boundary.
 */
export default function Section({
  id,
  eyebrow,
  heading,
  intro,
  action,
  layout = "hanging",
  tone = "paper",
  ruled = true,
  spacing = "default",
  revealContent = true,
  className,
  children,
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  intro?: ReactNode;
  action?: ReactNode;
  layout?: "hanging" | "stacked";
  tone?: "paper" | "surface" | "accent";
  ruled?: boolean;
  /** "compact" for consecutive blocks inside one long page. */
  spacing?: "default" | "compact";
  /** Fade the content block in. Off when children reveal themselves. */
  revealContent?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  const title = (
    <>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Heading id={headingId} size="h2">
        {heading}
      </Heading>
      {intro && <div className="mt-4 text-ui text-muted max-w-[46ch] text-pretty">{intro}</div>}
    </>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cx(
        tone === "surface" && "bg-surface",
        tone === "accent" && "bg-accent-soft",
        spacing === "compact" ? "py-12 md:py-16" : "py-20 md:py-28",
        className
      )}
    >
      <Container>
        <div className={cx(ruled && "border-t border-rule pt-8 md:pt-10")}>
          {layout === "hanging" ? (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <header className="lg:col-span-4 lg:pr-6">
                <div className="lg:sticky lg:top-28">
                  <div {...revealProps("up")}>
                    {title}
                    {action && <div className="mt-6">{action}</div>}
                  </div>
                </div>
              </header>
              <div className="lg:col-span-8" {...(revealContent ? revealProps("up", 1) : {})}>
                {children}
              </div>
            </div>
          ) : (
            <>
              <header className="mb-12 md:mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div {...revealProps("up")}>{title}</div>
                {action && (
                  <div className="shrink-0" {...revealProps("up", 1)}>
                    {action}
                  </div>
                )}
              </header>
              {revealContent ? <div {...revealProps("up", 1)}>{children}</div> : children}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
