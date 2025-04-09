// components/AboutMeTeaser.tsx
import Link from "next/link";
import { TitleH2 } from "./TitleH2";
import { PiIdentificationCardThin } from "react-icons/pi";


export default function AboutMeTeaser() {
  return (
    <section className="container mx-auto px-6 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <TitleH2
          title="A Bit About Me"
          description=""
        />
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-600 dark:text-gray-400">
          <strong>Born in a small town in southern Córdoba</strong>, I’ve always carried big dreams and a deep passion for great design. When I’m not creating digital experiences, you’ll find me staying active with sports—or cheering for River Plate with heart and soul. That’s why{" "}
          <span className="text-red-600 dark:text-red-500 font-semibold">
            red is the primary color of this site
          </span>
          —it’s part of who I am.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center mt-4 text-red-600 dark:text-red-500 font-semibold hover:underline"
        >
          <span className="mr-2">Read more about me</span>
          <PiIdentificationCardThin className="w-10 h-10" />
        </Link>
      </div>
    </section>
  );
}
