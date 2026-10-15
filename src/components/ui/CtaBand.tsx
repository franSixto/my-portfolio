import type { ReactNode } from "react";
import Container from "./Container";
import ButtonLink from "./ButtonLink";
import { ArrowRight } from "./icons";

/** Closing call to action: the only inverted field on a page. */
export default function CtaBand({
  id,
  heading,
  description,
  action,
}: {
  id: string;
  heading: string;
  description?: ReactNode;
  action: { href: string; label: string };
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="py-12 md:py-20">
      <Container>
        <div className="grid gap-8 bg-band px-6 py-12 text-band-ink md:rounded-[var(--radius-band)] md:px-12 md:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-16 lg:py-20 -mx-5 md:mx-0">
          <div className="lg:col-span-8">
            <h2
              id={headingId}
              className="font-sans text-h1 font-semibold text-band-ink text-balance"
            >
              {heading}
            </h2>
            {description && (
              <p className="mt-6 max-w-[56ch] font-serif text-lead text-band-muted text-pretty">
                {description}
              </p>
            )}
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={action.href} variant="inverse" size="lg">
              {action.label}
              <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
