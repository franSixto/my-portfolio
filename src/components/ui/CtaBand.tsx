import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./Container";
import ButtonLink from "./ButtonLink";
import { CropMarks } from "./Decor";
import { revealProps } from "@/lib/motion/reveal";
import { ArrowRight } from "./icons";

/** Closing call to action: the only inverted field on a page. */
export default function CtaBand({
  id,
  heading,
  description,
  action,
  secondary,
}: {
  id: string;
  heading: string;
  description?: ReactNode;
  action: { href: string; label: string };
  /** Quiet text link under the main button. */
  secondary?: { href: string; label: string };
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="py-12 md:py-20">
      <Container>
        <div className="relative isolate grid gap-8 overflow-hidden bg-band px-6 py-12 text-band-ink md:rounded-[var(--radius-band)] md:px-12 md:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-16 lg:py-20 -mx-5 md:mx-0" {...revealProps("up")}>
          <div aria-hidden="true" className="texture-grid-band pointer-events-none absolute inset-0 -z-10" />
          <div aria-hidden="true" className="texture-grain pointer-events-none absolute inset-0 -z-10" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-band-action/60"
            {...revealProps("line", 1)}
          />
          <CropMarks inset="1rem" tone="band" className="hidden md:block" />
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
            {secondary && (
              <p className="mt-5 lg:text-right">
                <Link
                  href={secondary.href}
                  className="text-ui font-medium text-band-ink underline decoration-band-muted underline-offset-[0.3em] hover:decoration-current"
                >
                  {secondary.label}
                </Link>
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
