import AboutContent from "@/components/about/AboutContent";
import { aboutContent } from "@/content/pages/about";
import { getToolkit } from "@/content/toolkit";
import { CV_PATH } from "@/content/site";
import { localizedPath, type Locale } from "@/i18n/routes";

export default function AboutScreen({ locale }: { locale: Locale }) {
  const c = aboutContent[locale];
  return (
    <AboutContent
      content={{
        title: c.h1,
        tagline: c.tagline,
        location: c.location,
        intro: c.intro,
        photoAlt: c.photoAlt,
        background: c.background,
        principles: c.principles,
        toolkit: {
          heading: c.tools.heading,
          intro: c.tools.intro,
          groups: getToolkit(locale),
        },
        outside: c.outside,
        cv: { href: CV_PATH, label: c.cv.label, ariaLabel: c.cv.ariaLabel },
        cta: {
          heading: c.cta.heading,
          text: c.cta.text,
          primary: { href: localizedPath("contact", locale), label: c.cta.button },
          secondary: { href: localizedPath("services", locale), label: c.cta.secondary },
        },
      }}
    />
  );
}
