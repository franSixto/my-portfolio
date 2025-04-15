'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TitleH1 } from "@/components/common/TitleH1";
import Image from 'next/image';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-800 text-gray-800 dark:text-gray-200 min-h-screen pt-15">
      <div className="container mx-auto px-6">
        <TitleH1
          title="About Me"
          description="I am a passionate UX/UI designer and frontend developer."
        />
        <Image 
         src="/default-image.webp"
         alt="Fran Sixto"
         width={400}
         height={40}
         className="w-full opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
        <motion.div
          ref={ref}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            I'm Francisco Sixto — a UX/UI designer with a solid technical background. I work at the intersection of design and front-end development, creating digital experiences that are clear, efficient, and user-focused. I believe in good systems, smart iteration, and practical tools that help ship quality without overcomplicating things.
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
          <motion.p
            className="text-lg leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            I’m also</motion.p>
          <motion.p
            className="text-lg leading-relaxed text-center italic"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            Thank you for visiting my portfolio! I look forward to the opportunity to collaborate and create something amazing.
          </motion.p>
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: -10 }}
            whileInView={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-bold text-2xl">Fran Sixto</p>
            <p className="font-medium text-lg">UX/UI Designer & Frontend Developer</p>
            <p className="font-medium text-lg">Location: Córdoba, Argentina</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
