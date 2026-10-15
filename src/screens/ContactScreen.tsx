import ContactForm from "@/components/contact/ContactForm";
import LinkedinButton from "@/components/contact/LinkedinButton";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { Lead } from "@/components/ui/Text";
import { getTranslator } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/routes";

export default function ContactScreen({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <Container className="pb-20 pt-8 md:pb-28 md:pt-12">
      <Breadcrumbs className="mb-12 md:mb-20" />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Heading as="h1" size="h1">
            {t("pages.contact.title")}
          </Heading>
          <Lead className="mt-6 md:mt-8">{t("pages.contact.description")}</Lead>
          <LinkedinButton className="mt-10" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
