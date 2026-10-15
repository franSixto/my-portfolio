"use client";

import Button from "@/components/theme/Button";
import { RiMailSendLine } from "react-icons/ri";

// Client wrapper: Button reads the accent color from context.
export default function ServiceCta({
  heading,
  button,
  href,
}: {
  heading: string;
  button: string;
  href: string;
}) {
  return (
    <section
      aria-labelledby="service-cta-heading"
      className="rounded-3xl bg-white/60 dark:bg-gray-900/40 p-8 text-center shadow-sm"
    >
      <h2
        id="service-cta-heading"
        className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6"
      >
        {heading}
      </h2>
      <div className="flex justify-center">
        <Button
          to={href}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-white"
        >
          {button}
          <span className="ml-3" aria-hidden="true">
            <RiMailSendLine className="w-5 h-5" />
          </span>
        </Button>
      </div>
    </section>
  );
}
