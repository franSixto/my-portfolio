"use client";

import { TitleH2 } from "@/components/common/TitleH2";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/theme/Button";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';

export default function AboutMeTeaser() {
  const { mainColor } = useColorContext();

  return (
    <section className="container mx-auto px-6 md:py-20 pt-15">

      <TitleH2
        title="A Bit About Me"
        description="Here’s a little insight into the person behind the pixels."
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="dark:bg-gray-900/30 bg-gray-200/30 backdrop-blur-xl rounded-2xl p-8 max-w-2xl mx-auto text-start flex flex-col items-center justify-center">
        <div className="flex flex-col gap-5 lg:flex-row mb-6">
          <Image
            src="/me.webp"
            alt="This is me"
            width={100}
            height={211}
            className="w-30 h-30 lg:w-100 lg:h-45 object-cover object-top rounded-full shadow-2xl dark:bg-gray-950 "
            style={{ boxShadow: `0 4px 24px 0 var(--tw-shadow-color, ${COLOR_CLASS_MAP[mainColor].split(' ')[0].replace('bg-', '').replace('-100', '')})` }}
          />
          <div className="flex flex-col justify-center items-center ms-4">
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-600 dark:text-gray-400">
              <strong>Born in a small town in southern Córdoba, Argentina</strong>, I’ve always carried big dreams and a deep passion for great design and technology.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-0 text-gray-600 dark:text-gray-400">
              When I’m not creating digital experiences, you’ll find me staying active with sports—or cheering for River Plate with heart and soul.
            </p>
          </div>
        </div>


        <div className="flex row items-center text-gray-600 dark:text-gray-400 shadow-lg p-3 bg-gray-50 dark:bg-gray-950 rounded-lg mb-6">
          <Image
            src="/riverplate.webp"
            alt="About Me"
            width={80}
            height={80}
            className="rounded-lg p-4"
          />
          <div className="italic">
            <span className={`text-${mainColor}-600 dark:text-${mainColor}-500 font-semibold transition-colors duration-300`}>
              &quot; That’s why {mainColor} is the primary color of this site
            </span>
            —it’s part of who I am. &quot;
          </div>
        </div>

        <Button
          to="/about"
          variant="outlined"
          className="flex items-center gap-2"
        >Read more about me
          <span className="ml-1">
            <RiVerifiedBadgeLine className="w-5 h-5" />
          </span>
        </Button>
      </motion.div>
    </section>
  );
}
