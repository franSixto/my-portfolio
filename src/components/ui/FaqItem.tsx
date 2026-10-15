import { Plus } from "./icons";

/** Native disclosure: keyboard and screen-reader support for free. */
export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-t border-rule last:border-b first:border-t-0 [&:first-child>summary]:pt-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-sans text-[1.1875rem] font-medium leading-snug text-ink hover:text-accent [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-muted transition-transform duration-200 motion-reduce:transition-none group-open:rotate-45 group-open:text-accent"
        >
          <Plus className="size-6" />
        </span>
      </summary>
      <p className="max-w-[64ch] pb-6 pr-10 font-serif text-body text-muted text-pretty">{answer}</p>
    </details>
  );
}
