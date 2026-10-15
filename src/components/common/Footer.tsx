import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER } from "@/content/footer";
import { SERVICE_ROUTE_KEYS } from "@/content/services/nav";
import { CV_PATH, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/content/site";
import { getTranslator } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/routes";

const linkClass =
  "text-ui text-muted underline-offset-[0.25em] decoration-accent hover:text-ink hover:underline";
const headingClass = "mb-4 text-meta font-medium text-ink";

// Server component: rendered once per locale by the shell.
export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const copy = FOOTER[locale];
  const site = [
    { href: localizedPath("projects", locale), label: t("navigation.projects") },
    { href: localizedPath("about", locale), label: t("navigation.about") },
    { href: localizedPath("contact", locale), label: t("navigation.contact") },
  ];

  return (
    <footer id="site-footer" className="mt-8 border-t border-rule bg-surface">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-sans text-h2 font-semibold text-ink">Francisco Sixto</p>
            <p className="mt-3 max-w-[36ch] text-ui font-medium text-ink">{copy.tagline}</p>
            <p className="mt-3 max-w-[44ch] text-ui text-muted text-pretty">{copy.description}</p>
          </div>

          <nav aria-label={copy.navLabel} className="grid gap-12 md:col-span-7 md:grid-cols-7 md:gap-8">
          <div className="md:col-span-3">
            <p className={headingClass}>{copy.servicesHeading}</p>
            <ul className="space-y-3">
              {SERVICE_ROUTE_KEYS.map((key) => (
                <li key={key}>
                  <Link href={localizedPath(key, locale)} className={linkClass}>
                    {copy.serviceLabels[key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localizedPath("services", locale)} className={linkClass}>
                  {t("navigation.servicesAll")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className={headingClass}>{copy.siteHeading}</p>
            <ul className="space-y-3">
              {site.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className={headingClass}>{copy.contactHeading}</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${EMAIL}`} aria-label={copy.emailAria} className={`${linkClass} break-all`}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.linkedinAria}
                  className={linkClass}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.githubAria}
                  className={linkClass}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href={CV_PATH} target="_blank" aria-label={copy.cvAria} className={linkClass}>
                  {copy.cvLabel}
                </a>
              </li>
            </ul>
          </div>
          </nav>
        </div>
        <p className="mt-16 border-t border-rule pt-6 text-meta text-muted">
          {copy.copyright(new Date().getFullYear())}
        </p>
      </Container>
    </footer>
  );
}
