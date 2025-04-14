'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TitleH1 } from "@/components/common/TitleH1";

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-800 text-gray-800 dark:text-gray-200 min-h-screen pt-15">
      <div className="container mx-auto px-6">
        <TitleH1
          title="About Me"
          description="I am a passionate UX/UI designer and frontend developer."
        />
        <motion.div
          ref={ref}
          className="space-y-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: -0 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 1, delayChildren: .1, ease: 'easeInOut' },
            },
          }}
        >
          {[
            "I'm Francisco Sixto — a UX/UI designer with a solid technical background. I work at the intersection of design and front-end development, creating digital experiences that are clear, efficient, and user-focused. I believe in good systems, smart iteration, and practical tools that help ship quality without overcomplicating things.",
            "Over the years, I’ve led design and development teams, coordinated priorities, reviewed code and mockups, and built scalable solutions across websites, CRMs, and portals. I enjoy mentoring others, improving team workflows, and balancing creativity with clarity in every step of the process.",
            "What drives me is the pursuit of intuitive experiences — the kind where structure, interaction, and aesthetics align naturally. Whether I’m working in Figma, VS Code, or in a team call, I’m always thinking about how to make things work better, feel smoother, and serve users with purpose.",
            "Outside of work, I’m into sports, spending time with my family and friends, and enjoying simple moments offline. I find a lot of inspiration in everyday life — conversations, shared meals, or just being present with the people I care about.",
            "I’m also an animal lover — especially cats. I think there’s something honest and calm about how they move through the world, and I try to bring a bit of that balance into my own way of working and living.",
          ].map((text, index) => (
            <motion.p
              key={index}
              className="text-lg leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: -20  },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {text}
            </motion.p>
          ))}
          <motion.p
            className="text-lg leading-relaxed text-center italic"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Thank you for visiting my portfolio! I look forward to the opportunity to collaborate and create something amazing.
          </motion.p>
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
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
