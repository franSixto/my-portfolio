"use client";

import { TitleH2 } from "@/components/common/TitleH2";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/theme/Button";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutMeTeaser() {
  const { mainColor } = useColorContext();
  const { t } = useLanguage();

  return (
    <section className="container mx-auto px-6 md:py-20 pt-15">

      <TitleH2
        title={t('home.aboutTeaser.title')}
        description={t('home.aboutTeaser.description')}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="dark:bg-gray-900/30 bg-gray-200/30 backdrop-blur-xl rounded-2xl p-8 max-w-2xl mx-auto text-start flex flex-col items-center justify-center">
        <div className="relative flex flex-col gap-5 mb-0 lg:mb-6">
          <div className={`relative flex justify-center items-center h-full w-full bg-${mainColor}-500 rounded-xl`}
            style={{ boxShadow: `0 4px 24px 0 var(--tw-shadow-color, ${COLOR_CLASS_MAP[mainColor].split(' ')[0].replace('bg-', '').replace('-100', '')})` }}>
            <Image
              src="/me.svg"
              alt={t('home.aboutTeaser.altText')}
              width={100}
              height={211}
              className={`z-1 w-[100%] h-50 object-cover object-top rounded-xl shadow-2xl`}
            />
            <b className="absolute text-[6rem] lg:text-[14rem] left-1/2 -translate-x-1/2 text-white opacity-30 top-50% lg:-top-18">FRAN</b>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg md:text-xl leading-relaxed mb-0 text-gray-600 dark:text-gray-400">
              <strong>{t('home.aboutTeaser.birthPlace')}</strong>, {t('home.aboutTeaser.birthDescription')}
            </p>
          </div>
        </div>
        <p className="text-lg md:text-xl leading-relaxed mb-5 text-gray-600 dark:text-gray-400">
          {t('home.aboutTeaser.sportsText')}
          <span className="inline-flex items-center mx-1">
            <Image src="/riverplate.webp" alt="icono" width={16} height={16} className="mx-1" />
          </span>
          {t('home.aboutTeaser.riverPlate')}
        </p>
        <Button
          to="/about"
          variant="outlined"
          className="flex items-center gap-2"
        >{t('home.aboutTeaser.readMore')}
          <span className="ml-1">
            <RiVerifiedBadgeLine className="w-5 h-5" />
          </span>
        </Button>
      </motion.div>
    </section>
  );
}
