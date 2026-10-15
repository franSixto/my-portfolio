import FaqItem from "@/components/ui/FaqItem";
import { NumberedList, RuleList } from "@/components/ui/Lists";
import Section from "@/components/ui/Section";
import { Prose } from "@/components/ui/Text";
import type { ServiceFaq, ServiceSection } from "@/content/services/types";

/** One long-form block of a service page, rendered by its kind. */
export function ContentSection({ section, id }: { section: ServiceSection; id: string }) {
  return (
    <Section id={id} heading={section.heading} spacing="compact">
      {section.kind === "text" && (
        <Prose>
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Prose>
      )}
      {section.kind === "list" && (
        <>
          {section.intro && <Prose className="mb-6"><p>{section.intro}</p></Prose>}
          <RuleList items={section.items} />
        </>
      )}
      {section.kind === "steps" && <NumberedList items={section.items} />}
    </Section>
  );
}

export function FaqList({ id, heading, faqs }: { id: string; heading: string; faqs: ServiceFaq[] }) {
  return (
    <Section id={id} heading={heading} spacing="compact">
      <div>
        {faqs.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </Section>
  );
}
