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
        <div className="relative flex flex-col gap-5 mb-0 lg:mb-6">
          <div className={`relative flex justify-center items-center h-full w-full bg-${mainColor}-500 rounded-xl`}
            style={{ boxShadow: `0 4px 24px 0 var(--tw-shadow-color, ${COLOR_CLASS_MAP[mainColor].split(' ')[0].replace('bg-', '').replace('-100', '')})` }}>
            <Image
              src="/me.svg"
              alt="This is me"
              width={100}
              height={211}
              className={`z-1 w-[100%] h-50 object-cover object-top rounded-xl shadow-2xl`}
            />
            <b className="absolute text-[6rem] lg:text-[14rem] left-1/2 -translate-x-1/2 text-white opacity-30 top-50% lg:-top-18">FRAN</b>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg md:text-xl leading-relaxed mb-0 text-gray-600 dark:text-gray-400">
              <strong>Born in a small town in southern Córdoba, Argentina</strong>, I’ve always carried big dreams and a deep passion for great design and technology.
            </p>
          </div>
          <div className={`relative flex justify-center items-center h-full w-full bg-${mainColor}-500 rounded-xl overflow-hidden`}
            style={{ boxShadow: `0 4px 24px 0 var(--tw-shadow-color, ${COLOR_CLASS_MAP[mainColor].split(' ')[0].replace('bg-', '').replace('-100', '')})` }}>
            <Image
              src="/me.svg"
              alt="This is also me"
              width={100}
              height={211}
              className={`hidden lg:flex z-1 w-[200%] lg:w-[100%] h-50 object-cover object-bottom rounded-xl shadow-2xl`}
            />
            <b className="absolute text-[6rem] lg:text-[14rem] left-1/2 -translate-x-1/2 text-white opacity-30 top-50% lg:-top-18">SIXTO</b>
          </div>
        </div>
        <p className="text-lg md:text-xl leading-relaxed mb-5 text-gray-600 dark:text-gray-400">
              When I’m not creating digital experiences, you’ll find me staying active with sports—or cheering for
              <span className="inline-flex items-center mx-1">
                <Image src="/riverplate.webp" alt="icono" width={16} height={16} className="mx-1" />
              </span>
              River Plate with heart and soul.
            </p>
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
