import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";

export type HeroContent = {
  eyebrow: string;
  eyebrowShort: string;
  title: string;
  subtitle: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  needsHeading: string;
  needs: { href: string; label: string }[];
};

// Typographic hero, no imagery. The H1 is the LCP element: it is never faded in.
// Only the needs index settles (transform only), see globals.css. The section
// fills the first viewport below the sticky header (4rem, 4.5rem + 1px border on md+).
export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-4rem-1px)] items-center overflow-hidden py-10 md:min-h-[calc(100svh-4.5rem-1px)] md:py-12"
    >
      <div aria-hidden="true" className="texture-grid-hero pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="texture-grain pointer-events-none absolute inset-0" />
      <Container className="relative">
        <p className="text-ui font-medium text-muted">
          <span className="sm:hidden">{content.eyebrowShort}</span>
          <span className="hidden sm:inline">{content.eyebrow}</span>
        </p>
        <h1
          id="hero-title"
          className="mt-5 max-w-[16ch] font-sans text-[clamp(2.5rem,min(1.1rem+5.4vw,11.5vh),5.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink text-balance md:mt-6 md:max-w-[26ch]"
        >
          {content.title}
        </h1>

        <div className="mt-8 grid gap-10 border-t border-rule pt-8 md:mt-10 lg:grid-cols-12 lg:gap-10 lg:pt-9">
          <div className="lg:col-span-5">
            <p className="max-w-[44ch] font-serif text-lead text-ink/90 text-pretty">
              {content.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href={content.primary.href} size="lg">
                {content.primary.label}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href={content.secondary.href} variant="secondary" size="lg">
                {content.secondary.label}
              </ButtonLink>
            </div>
          </div>

          <nav
            aria-labelledby="hero-needs"
            className="hero-settle lg:col-span-7"
          >
            <p id="hero-needs" className="text-meta font-medium uppercase tracking-[0.08em] text-muted">
              {content.needsHeading}
            </p>
            <ol className="mt-3 max-lg:border-b max-lg:border-rule lg:grid lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-[repeat(3,auto)] lg:gap-x-8">
              {content.needs.map((need, i) => (
                <li key={need.href} className="border-t border-rule">
                  <Link
                    href={need.href}
                    className="group flex items-baseline gap-4 py-2.5 text-ink outline-none transition-colors duration-(--motion-dur-base) hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:py-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="w-7 shrink-0 text-meta font-medium tabular-nums text-muted transition-colors duration-(--motion-dur-base) group-hover:text-accent group-focus-visible:text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[1.125rem] font-medium leading-snug tracking-[-0.01em] md:text-[1.1875rem] xl:text-[1.25rem]">
                      {need.label}
                    </span>
                    <ArrowRight className="size-5 shrink-0 self-center transition-transform duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </section>
  );
}
