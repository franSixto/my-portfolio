import Heading from "@/components/ui/Heading";
import TrackedLink, { type ContactChannel } from "@/components/ui/TrackedLink";
import type { Locale } from "@/i18n/routes";
import { revealProps } from "@/lib/motion/reveal";

export type DirectChannelsContent = {
  heading: string;
  channels: {
    id: ContactChannel;
    label: string;
    /** Visible value (address or handle). */
    value: string;
    href: string;
    ariaLabel: string;
    external?: boolean;
    download?: boolean;
  }[];
};

const linkClass =
  "text-ui text-ink underline decoration-rule-strong underline-offset-[0.3em] hover:decoration-accent";

/** Plain contact methods for people who would rather not use the form. */
export default function DirectChannels({
  content,
  locale,
}: {
  content: DirectChannelsContent;
  locale: Locale;
}) {
  return (
    <section aria-labelledby="direct-channels-title" className="mt-12" {...revealProps("up", 2)}>
      <Heading id="direct-channels-title" size="h3">
        {content.heading}
      </Heading>
      <ul className="mt-5 border-b border-rule">
        {content.channels.map((channel) => (
          <li
            key={channel.id}
            className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
          >
            <span className="text-meta font-medium text-muted">{channel.label}</span>
            <TrackedLink
              channel={channel.id}
              locale={locale}
              href={channel.href}
              aria-label={channel.ariaLabel}
              className={linkClass}
              {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(channel.download ? { target: "_blank" } : {})}
            >
              {channel.value}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
