import Link from "next/link";
import { getTranslator } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/routes";

export default function NotFoundScreen({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <div className="container mx-auto px-6 py-24 text-center dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t("notFound.title")}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
        {t("notFound.description")}
      </p>
      <Link
        href={localizedPath("home", locale)}
        className="inline-block mt-8 underline text-gray-700 dark:text-gray-300"
      >
        {t("notFound.backHome")}
      </Link>
    </div>
  );
}
