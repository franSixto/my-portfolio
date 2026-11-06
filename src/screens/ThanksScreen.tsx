import ButtonLink, { buttonClasses } from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { NumberedList } from "@/components/ui/Lists";
import TrackedLink from "@/components/ui/TrackedLink";
import { Lead } from "@/components/ui/Text";
import { thanksContent } from "@/content/pages/thanks";
import { localizedPath, type Locale } from "@/i18n/routes";
import { whatsappUrl } from "@/lib/contact/whatsapp";

/** No breadcrumbs, no tracking on load: conversions are measured by the Ads lead form. */
export default function ThanksScreen({ locale }: { locale: Locale }) {
  const c = thanksContent[locale];
  return (
    <Container className="pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="max-w-[40rem]">
        <Heading as="h1" size="h1">
          {c.h1}
        </Heading>
        <Lead className="mt-5 md:mt-8">{c.lead}</Lead>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <TrackedLink
            channel="whatsapp"
            locale={locale}
            placement="thanks"
            href={whatsappUrl(locale)}
            aria-label={c.whatsapp.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ size: "lg", className: "w-full sm:w-auto" })}
          >
            {c.whatsapp.label}
          </TrackedLink>
          <ButtonLink
            href={localizedPath("projects", locale)}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {c.projectsCta}
          </ButtonLink>
        </div>
        <p className="mt-4 text-meta text-muted text-pretty">{c.whatsapp.hint}</p>

        <section aria-labelledby="thanks-steps" className="mt-12 md:mt-16">
          <Heading id="thanks-steps" size="h3">
            {c.stepsHeading}
          </Heading>
          <NumberedList items={c.steps} className="mt-5" />
        </section>
      </div>
    </Container>
  );
}
