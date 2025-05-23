'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TitleH1 } from "@/components/common/TitleH1";
import Image from 'next/image';
import Button from "@/components/theme/Button";
import { RiArrowRightLine, RiDownloadLine } from "react-icons/ri";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 min-h-screen py-15">
      <div className="flex flex-col items-center justify-center">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-6">
        <TitleH1
          title="About Me"
          description="I am a passionate UX/UI designer and frontend developer."
        />
        <motion.div
          ref={ref}
          className="space-y-8 max-w-3xl mx-auto"
        >
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            I&apos;m Francisco Sixto — a UX/UI designer with a solid technical background. I work at the intersection of design and front-end development, creating digital experiences that are clear, efficient, and user-focused. I believe in good systems, smart iteration, and practical tools that help ship quality without overcomplicating things.
          </motion.p>
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            Over the years, I&apos;ve led design and development teams, coordinated priorities, reviewed code and mockups, and built scalable solutions across websites, CRMs, and portals. I enjoy mentoring others, improving team workflows, and balancing creativity with clarity in every step of the process.
          </motion.p>
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            What drives me is the pursuit of intuitive experiences — the kind where structure, interaction, and aesthetics align naturally. Whether I&apos;m working in Figma, VS Code, or in a team call, I&apos;m always thinking about how to make things work better, feel smoother, and serve users with purpose.
          </motion.p>
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            Outside of work, I&apos;m into sports, spending time with my family and friends, and enjoying simple moments offline. I find a lot of inspiration in everyday life — conversations, shared meals, or just being present with the people I care about.
          </motion.p>





          <motion.div
            className="text-center mt-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-4xl shadow-2xl"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative flex flex-row items-center justify-center gap-8 mb-8">

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className='shadow-2xl rounded-4xl bg-gray-50 dark:bg-gray-950 hidden md:block'
              >
                <Image
                  src="/me1.webp"
                  alt="Fran Sixto"
                  width={300}
                  height={400}
                  className='rounded-4xl object-cover p-2'
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className='shadow-2xl rounded-4xl bg-gray-50 dark:bg-gray-950'
              >
                <Image
                  src="/me2.webp"
                  alt="Fran Sixto"
                  width={300}
                  height={400}
                  className='rounded-4xl object-cover p-2'
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className='shadow-2xl rounded-4xl bg-gray-50 dark:bg-gray-950 hidden md:block'
              >
                <Image
                  src="/me3.webp"
                  alt="Fran Sixto"
                  width={300}
                  height={400}
                  className='rounded-4xl object-cover p-2'
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className='shadow-2xl rounded-4xl bg-gray-50 dark:bg-gray-950 hidden md:block'
              >
                <Image
                  src="/me4.webp"
                  alt="Fran Sixto"
                  width={300}
                  height={400}
                  className='rounded-4xl object-cover p-2'
                />
              </motion.div>
              <motion.span
                className="absolute top-1/5 bg-red-100 dark:bg-gray-950 text-gray-900 dark:text-gray-400 p-2 text-xl font-bold shadow-lg transform -rotate-2 rounded-md z-1"
                animate={{
                  y: [0, -20, 0], // Float up and down
                  rotate: [0, 3, -1, 0], // Slight rotation
                  opacity: inView ? 1 : 0, // Adjust opacity based on inView
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, // Float animation
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }, // Rotation animation
                  opacity: { duration: 0.3 }, // Opacity animation for inView
                  delay: 1, // Delay before animation starts
                }}
                initial={{ opacity: 0, y: 50 }}
              >
                Nice to meet you! 😎
              </motion.span>
            </div>

            <p className="text-lg leading-relaxed text-center italic">
              Thank you for visiting my portfolio! I look forward to the opportunity to collaborate and create something amazing.
            </p>
            <p className="font-bold text-2xl mb-5">Fran Sixto</p>
            <p className="font-medium text-lg">UX/UI Designer & Frontend Developer</p>
            <p className="font-medium text-lg border-b-2 border-gray-300 dark:border-gray-600 pb-5">Location: Córdoba, Argentina</p>
            <div className='flex flex-row items-center justify-center gap-4 mt-5'>
              <Button
                to="/projects"
              >
                My Work
                <span className="ml-3">
                  <RiArrowRightLine className="w-5 h-5" />
                </span>
              </Button>
              <Button
                to="/cv-fran-sixto.pdf"
                variant="outlined"
                target="_blank"
              >
                Resume
                <span className="ml-3">
                  <RiDownloadLine className="w-5 h-5" />
                </span>
              </Button>
            </div>
          </motion.div>



        </motion.div>
      </div>
    </div>
  );
};

export default About;
