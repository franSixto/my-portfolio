import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";

export type HeroTile = {
  href: string;
  /** Accessible name of the link (the case study title). */
  title: string;
  /** Describes the screenshot. */
  alt: string;
  src: string;
};

export type HeroContent = {
  eyebrow: string;
  eyebrowShort: string;
  title: string;
  subtitle: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  trust: { label: string; names: string[] };
  tiles: HeroTile[];
};

// Per-tile placement on one 12-column grid at every breakpoint: a lead tile
// across the full width, then three equal tiles. Order matches HOME_MOSAIC_SLUGS.
const PLACEMENT: { cell: string; sizes: string }[] = [
  { cell: "col-span-12", sizes: "(min-width: 1360px) 600px, (min-width: 1024px) 46vw, 90vw" },
  { cell: "col-span-4", sizes: "(min-width: 1360px) 194px, (min-width: 1024px) 15vw, 30vw" },
  { cell: "col-span-4", sizes: "(min-width: 1360px) 194px, (min-width: 1024px) 15vw, 30vw" },
  { cell: "col-span-4", sizes: "(min-width: 1360px) 194px, (min-width: 1024px) 15vw, 30vw" },
];

// The H1 is the LCP element: it is never faded in. Only the rule draws and the
// mosaic settles (transform only), see globals.css. The section fills the
// first viewport below the sticky header (4rem, 4.5rem + 1px border on md+).
export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-4rem-1px)] items-center overflow-hidden py-10 md:min-h-[calc(100svh-4.5rem-1px)] md:py-14 lg:py-16"
    >
      <div aria-hidden="true" className="texture-grid-hero pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="texture-grain pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="text-ui font-medium text-muted">
              <span className="sm:hidden">{content.eyebrowShort}</span>
              <span className="hidden sm:inline">{content.eyebrow}</span>
            </p>
            <h1
              id="hero-title"
              className="mt-5 font-sans text-h1 font-semibold text-ink text-balance md:mt-7"
            >
              {content.title}
            </h1>
            <p className="mt-5 max-w-[52ch] font-serif text-lead text-ink/90 text-pretty md:mt-6">
              {content.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <ButtonLink href={content.primary.href} size="lg">
                {content.primary.label}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href={content.secondary.href} variant="secondary" size="lg">
                {content.secondary.label}
              </ButtonLink>
            </div>
            <div className="hero-rule mt-10 pt-5 md:mt-14">
              <p className="text-meta text-muted">
                <span className="font-medium text-ink">{content.trust.label}</span>
                {" "}
                {content.trust.names.map((name, i) => (
                  <span key={name}>
                    {i > 0 && <span aria-hidden="true"> / </span>}
                    {i > 0 && <span className="sr-only">, </span>}
                    <span className="whitespace-nowrap">{name}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>

          <ul className="hero-settle grid grid-cols-12 items-start gap-2 sm:gap-3 lg:col-span-6">
            {content.tiles.map((tile, i) => {
              const place = PLACEMENT[i] ?? PLACEMENT[PLACEMENT.length - 1];
              return (
                <li key={tile.href} className={cx("group", place.cell)}>
                  <Link
                    href={tile.href}
                    aria-label={tile.title}
                    className="tile-frame block overflow-hidden rounded-[var(--radius-media)] border border-rule bg-white outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
                  >
                    <span className="relative block aspect-[16/9]">
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        fill
                        sizes={place.sizes}
                        priority={i === 0}
                        className="object-cover transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
