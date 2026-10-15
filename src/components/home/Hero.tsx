"use client";

import { RiArrowRightLine, RiDownloadLine } from "react-icons/ri";
import { motion } from "framer-motion";
import Button from "@/components/theme/Button";
import { useTranslation } from "@/contexts/LanguageContext";
import { localizedPath } from "@/i18n/routes";

const Hero: React.FC = () => {
  const { t, locale } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center w-full min-h-[calc(100vh-120px)]"
    >
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2 font-medium tracking-wide">
          {t("home.hero.tagline")}
        </p>
        <h1 className="text-4xl lg:text-6xl font-extrabold uppercase text-accent leading-[1.1]">
          {t("home.hero.title")}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {t("home.hero.description")}
        </p>
        <div className="mt-6 flex flex-row justify-center items-center gap-4">
          <Button to={localizedPath("projects", locale)}>
            {t("home.hero.myWork")}
            <RiArrowRightLine className="ml-1 w-5 h-5" />
          </Button>
          <Button to="/cv-fran-sixto.pdf" variant="outlined" target="_blank">
            {t("home.hero.resume")}
            <RiDownloadLine className="ml-1 w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
