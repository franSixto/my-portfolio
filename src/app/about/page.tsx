'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TitleSubPages } from '@/components/TitleSubPages';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="container mx-auto px-6">
        <TitleSubPages
          title="About Me"
          description="I am a passionate UX/UI designer and frontend developer."
        />
        <motion.div
          ref={ref}
          className="space-y-8 max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.3, delayChildren: .9 },
            },
          }}
        >
          {[
            "I specialize in creating user-friendly and visually appealing digital experiences. My goal is to craft intuitive interfaces that enhance user engagement and satisfaction.",
            "With a strong foundation in design principles and a keen eye for detail, I strive to deliver impactful solutions that meet both user needs and business objectives.",
            "I am constantly exploring new technologies and design trends to stay ahead in the ever-evolving digital landscape. I believe in the power of collaboration and enjoy working closely with cross-functional teams to bring ideas to life. Whether it's through wireframing, prototyping, or coding, I am dedicated to creating seamless user experiences that leave a lasting impression.",
            "In my free time, I love to explore new design tools, read about emerging technologies, and participate in design communities. I am always eager to learn and grow as a designer and developer, and I welcome new challenges that push me to expand my skill set.",
            "If you're looking for a passionate UX/UI designer and frontend developer who can bring your ideas to life, feel free to reach out! Let's connect and explore how we can create impactful digital experiences together.",
          ].map((text, index) => (
            <motion.p
              key={index}
              className="text-lg leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: -20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
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
            transition={{ delay: 0.5, duration: 0.8 }}
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
