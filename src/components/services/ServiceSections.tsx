import Link from "next/link";
import type { ServiceFaq, ServicePrice, ServiceSection } from "@/content/services/types";

const h2Class =
  "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4";
const bodyClass = "text-lg leading-relaxed text-gray-700 dark:text-gray-300";
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-white";
export const linkClass = `underline underline-offset-4 decoration-gray-400 hover:decoration-current ${focusRing} rounded-sm`;

export function ContentSection({
  section,
  id,
}: {
  section: ServiceSection;
  id: string;
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className={h2Class}>
        {section.heading}
      </h2>
      {section.kind === "text" &&
        section.paragraphs.map((p) => (
          <p key={p} className={`${bodyClass} mb-4 last:mb-0`}>
            {p}
          </p>
        ))}
      {section.kind === "list" && (
        <ul className={`${bodyClass} list-disc pl-6 space-y-2 marker:text-gray-400`}>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.kind === "steps" && (
        <ol className={`${bodyClass} list-decimal pl-6 space-y-2 marker:font-semibold`}>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )}
    </section>
  );
}

export function PriceCallout({ price }: { price: ServicePrice }) {
  return (
    <div
      className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-6"
    >
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{price.label}</p>
      <p className="mt-2 text-base text-gray-700 dark:text-gray-300">{price.note}</p>
    </div>
  );
}

export function FaqList({ heading, faqs }: { heading: string; faqs: ServiceFaq[] }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={h2Class}>
        {heading}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 px-5 py-4"
          >
            <summary
              className={`cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold text-lg text-gray-900 dark:text-gray-100 flex items-center justify-between gap-4 rounded-sm ${focusRing}`}
            >
              {faq.question}
              <span
                aria-hidden="true"
                className="text-gray-500 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className={`${bodyClass} mt-3`}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function LinkCards({
  heading,
  id,
  items,
}: {
  heading: string;
  id: string;
  items: { href: string; title: string; text?: string }[];
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className={h2Class}>
        {heading}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.href}
            className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-5"
          >
            <Link href={item.href} className={`font-semibold text-lg text-gray-900 dark:text-gray-100 ${linkClass}`}>
              {item.title}
            </Link>
            {item.text && (
              <p className="mt-2 text-base text-gray-700 dark:text-gray-300 line-clamp-3">
                {item.text}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
