import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import PageHeader from "@/components/ui/PageHeader";
import { privacyContent } from "@/content/pages/privacy";
import { EMAIL } from "@/content/site";
import type { Locale } from "@/i18n/routes";

const linkClass = "underline underline-offset-[0.25em] decoration-accent hover:text-accent";

/** Replaces the {email} placeholder with a mailto link. */
function withEmail(text: string): ReactNode {
  const parts = text.split("{email}");
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <a key={i} href={`mailto:${EMAIL}`} className={linkClass}>{EMAIL}</a>]
      : [part]
  );
}

export default function PrivacyScreen({ locale }: { locale: Locale }) {
  const c = privacyContent[locale];
  return (
    <>
      <PageHeader title={c.h1} lead={c.lead}>
        <p className="mt-4 text-ui text-muted">
          {c.updated.label}: <time dateTime={c.updated.iso}>{c.updated.text}</time>
        </p>
      </PageHeader>
      <Container className="pb-20 md:pb-28">
        <div className="max-w-[68ch] space-y-12 border-t border-rule pt-10 lg:pt-14">
          {c.sections.map((section, i) => (
            <section key={section.heading} aria-labelledby={`privacy-${i}`}>
              <Heading id={`privacy-${i}`} size="h3">
                {section.heading}
              </Heading>
              <div className="mt-4 space-y-4 font-serif text-body text-ink text-pretty">
                {section.paragraphs.map((p) => (
                  <p key={p}>{withEmail(p)}</p>
                ))}
                {section.items.length > 0 && (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.items.map((item) => (
                      <li key={item}>{withEmail(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
