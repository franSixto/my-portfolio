"use client";

import { TitleH2 } from "@/components/common/TitleH2";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/theme/Button";
import { RiVerifiedBadgeLine } from "react-icons/ri";

export default function AboutMeTeaser() {

  return (
    <section className="container mx-auto px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        <TitleH2
          title="A Bit About Me"
          description="Here’s a little insight into the person behind the pixels."
        />
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-600 dark:text-gray-400">
          <strong>Born in a small town in southern Córdoba, Argentina</strong>, I’ve always carried big dreams and a deep passion for great design and technology.
          <br /><br />When I’m not creating digital experiences, you’ll find me staying active with sports—or cheering for River Plate with heart and soul. <br /><br />{" "}
          <span className="text-red-600 dark:text-red-500 font-semibold">
            That’s why red is the primary color of this site
          </span>
          —it’s part of who I am.
        </p>
        <Image
          src="/riverplate.webp"
          alt="About Me"
          width={80}
          height={80}
          className="rounded-lg shadow-lg p-4 mb-6"
        />
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
