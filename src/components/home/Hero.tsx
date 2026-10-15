import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import { Lead } from "@/components/ui/Text";

export type HeroContent = {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

// The H1 is the LCP element: it is never faded in. Only the rule draws and the
// lead settles (transform only), see globals.css.
export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section aria-labelledby="hero-title" className="pb-20 pt-14 md:pb-28 md:pt-24 lg:pt-32">
      <Container>
        <p className="text-ui font-medium text-muted">{content.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-6 max-w-[20ch] font-sans text-h1 font-semibold text-ink text-balance md:mt-8 lg:max-w-[22ch]"
        >
          {content.title}
        </h1>
        <p className="mt-5 font-serif text-lead text-muted text-pretty md:mt-6">{content.tagline}</p>

        <div className="hero-rule mt-12 pt-8 md:mt-16 lg:pt-10">
          <div className="hero-settle max-w-[60ch]">
            <Lead>{content.description}</Lead>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={content.primary.href} size="lg">
                {content.primary.label}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href={content.secondary.href} variant="secondary" size="lg">
                {content.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
