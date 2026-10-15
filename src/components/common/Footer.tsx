import Link from "next/link";
import Container from "@/components/ui/Container";
import { SERVICE_NAV_LABELS, SERVICE_ROUTE_KEYS } from "@/content/services/nav";
import { getTranslator } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/routes";

const linkClass =
  "text-ui text-muted underline-offset-[0.25em] decoration-accent hover:text-ink hover:underline";

// Server component: rendered once per locale by the shell.
export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const site = [
    { href: localizedPath("home", locale), label: t("navigation.home") },
    { href: localizedPath("about", locale), label: t("navigation.about") },
    { href: localizedPath("projects", locale), label: t("navigation.projects") },
    { href: localizedPath("contact", locale), label: t("navigation.contact") },
  ];

  return (
    <footer id="site-footer" className="mt-8 border-t border-rule bg-surface">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-sans text-h2 font-semibold text-ink">Francisco Sixto</p>
            <p className="mt-3 max-w-[36ch] text-ui text-muted">{t("pages.about.jobTitle")}</p>
            <p className="mt-1 text-ui text-muted">{t("pages.about.location")}</p>
          </div>

          <nav aria-label={t("navigation.home")} className="md:col-span-2 md:col-start-7">
            <ul className="space-y-3">
              {site.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services" className="md:col-span-2">
            <p id="footer-services" className="mb-4 text-meta font-medium text-ink">
              {t("navigation.services")}
            </p>
            <ul className="space-y-3">
              {SERVICE_ROUTE_KEYS.map((key) => (
                <li key={key}>
                  <Link href={localizedPath(key, locale)} className={linkClass}>
                    {SERVICE_NAV_LABELS[locale][key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/sixtofrancisco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="/cv-fran-sixto.pdf" target="_blank" className={linkClass}>
                  {t("home.hero.resume")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-16 border-t border-rule pt-6 text-meta text-muted">
          © {new Date().getFullYear()} Francisco Sixto
        </p>
      </Container>
    </footer>
  );
}
