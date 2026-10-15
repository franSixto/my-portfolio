import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { ArrowRight, Download } from "@/components/ui/icons";
import { Lead } from "@/components/ui/Text";

export type HeroContent = {
  tagline: string;
  title: string;
  description: string;
  note: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

// The H1 is the LCP element: it is never faded in. Only the rule draws and the
// lead settles (transform only), see globals.css.
export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section aria-labelledby="hero-title" className="pb-20 pt-14 md:pb-28 md:pt-24 lg:pt-32">
      <Container>
        <p className="text-ui font-medium text-muted">{content.tagline}</p>
        <h1
          id="hero-title"
          className="mt-6 max-w-[13ch] font-sans text-display font-semibold text-ink text-balance md:mt-8"
        >
          {content.title}
        </h1>

        <div className="hero-rule mt-14 grid gap-8 pt-8 md:mt-20 lg:grid-cols-12 lg:gap-8 lg:pt-10">
          <p className="text-meta text-muted lg:col-span-3">{content.note}</p>
          <div className="hero-settle lg:col-span-7 lg:col-start-5">
            <Lead>{content.description}</Lead>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={content.primary.href} size="lg">
                {content.primary.label}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href={content.secondary.href} variant="secondary" size="lg" download>
                {content.secondary.label}
                <Download />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
