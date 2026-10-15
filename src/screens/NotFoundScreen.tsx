import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { Lead } from "@/components/ui/Text";
import { getTranslator } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/routes";

export default function NotFoundScreen({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <Container className="py-24 md:py-36">
      <div className="grid gap-10 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-8">
        <p aria-hidden="true" className="font-sans text-display font-semibold text-accent tabular-nums lg:col-span-4">
          404
        </p>
        <div className="lg:col-span-7 lg:col-start-6">
          <Heading as="h1" size="h1">
            {t("notFound.title")}
          </Heading>
          <Lead className="mt-6">{t("notFound.description")}</Lead>
          <ButtonLink href={localizedPath("home", locale)} className="mt-10">
            {t("notFound.backHome")}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
