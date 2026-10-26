import ContactForm from "@/components/contact/ContactForm";
import DirectChannels from "@/components/contact/DirectChannels";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { NumberedList, RuleList } from "@/components/ui/Lists";
import { Lead } from "@/components/ui/Text";
import { contactContent } from "@/content/pages/contact";
import { CV_PATH, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/content/site";
import type { Locale } from "@/i18n/routes";
import { revealProps } from "@/lib/motion/reveal";

export default function ContactScreen({ locale }: { locale: Locale }) {
  const c = contactContent[locale];

  return (
    <Container className="pb-20 pt-8 md:pb-28 md:pt-12">
      <Breadcrumbs className="mb-8 md:mb-20" />
      {/* Mobile order: intro, form, then the details. On lg the form spans both rows on the right. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-8 lg:gap-y-12">
        <div className="lg:col-span-5 lg:row-start-1">
          <Heading as="h1" size="h1">
            {c.h1}
          </Heading>
          <Lead className="mt-6 md:mt-8">{c.intro}</Lead>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
          <ContactForm copy={c.form} locale={locale} />
          <p className="mt-5 text-meta text-muted text-pretty">{c.privacyNote}</p>
          <DirectChannels
            locale={locale}
            content={{
              heading: c.channels.heading,
              channels: [
                {
                  id: "email",
                  label: c.channels.email.label,
                  value: EMAIL,
                  href: `mailto:${EMAIL}`,
                  ariaLabel: c.channels.email.ariaLabel,
                },
                {
                  id: "linkedin",
                  label: c.channels.linkedin.label,
                  value: "linkedin.com/in/sixtofrancisco",
                  href: LINKEDIN_URL,
                  ariaLabel: c.channels.linkedin.ariaLabel,
                  external: true,
                },
                {
                  id: "github",
                  label: c.channels.github.label,
                  value: "github.com/franSixto",
                  href: GITHUB_URL,
                  ariaLabel: c.channels.github.ariaLabel,
                  external: true,
                },
                {
                  id: "cv",
                  label: "CV",
                  value: c.channels.cv.label,
                  href: CV_PATH[locale],
                  ariaLabel: c.channels.cv.ariaLabel,
                  download: true,
                },
              ],
            }}
          />
        </div>
        <div className="lg:col-span-5 lg:row-start-2">
          <section aria-labelledby="contact-include-title" {...revealProps("up", 1)}>
            <Heading id="contact-include-title" size="h3">
              {c.include.heading}
            </Heading>
            <RuleList items={c.include.items} className="mt-5" />
          </section>

          <section aria-labelledby="contact-next-title" className="mt-12" {...revealProps("up", 2)}>
            <Heading id="contact-next-title" size="h3">
              {c.next.heading}
            </Heading>
            <NumberedList items={c.next.steps} className="mt-5" />
          </section>
        </div>
      </div>
    </Container>
  );
}
