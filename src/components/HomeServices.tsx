// components/Services.tsx
import { motion } from "framer-motion";
import ThreeSpaceship from "@/components/ThreeSpaceship";
import { FiPenTool, FiCode, FiUsers, FiTrendingUp } from "react-icons/fi";

const services = [
    {
      title: "UX/UI Design",
      description:
        "From early-stage wireframes to polished prototypes, I design user interfaces that are both intuitive and scalable. I combine design thinking with user research, accessibility standards, and usability testing to ensure every experience delivers real impact.",
      icon: <FiPenTool />,
    },
    {
      title: "Frontend Development",
      description:
        "I build high-performing, responsive, and accessible web apps using React, Next.js, Tailwind CSS, and TypeScript. My toolkit also includes WordPress, Bootstrap, and .NET Core for cases where flexibility or backend integration is key.",
      icon: <FiCode />,
    },
    {
      title: "Team Leadership",
      description:
        "I lead design and dev teams through planning, code reviews, mentoring, and task coordination. I bridge gaps between designers, developers, and stakeholders to align vision, timelines, and deliverables. Clear communication and a user-first mindset are always my priority.",
      icon: <FiUsers />,
    },
    {
      title: "Optimization & Deploy",
      description:
        "I handle SEO optimization, site performance enhancements, version control with Git, and streamlined CI/CD workflows. From semantic HTML to asset optimization and production deploys, I ensure that every project is fast, discoverable, and future-proof.",
      icon: <FiTrendingUp />,
    },
  ];

export default function Services() {
    return (
        <section id="services" className="container mx-auto px-6 grid items-center justify-center">
            <div className="mx-auto text-center">
                <h2 className="text-3xl md:text-5xl uppercase font-bold mb-4 text-red-600 dark:text-red-500">What I Do</h2>
                <p className="text-gray-600 dark:text-gray-300 lg:mb-12">
                    A combination of design thinking, solid development, and team experience.
                </p>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex flex-col items-center justify-center mb-8"
                >
                    <motion.div
                        className="absolute xl:top-18 top-10 w-80 h-80 bg-gradient-to-r from-red-500/10 to-red-700/50 rounded-full z-3 overflow-hidden"
                        animate={{
                            opacity: [0.1, .9, 0.1],
                            scale: [.8, 1, .8],
                            filter: ["blur(10px)", "blur(0px)", "blur(10px)"],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    ></motion.div>
                    <ThreeSpaceship />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-900/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow z-2"
                            >
                                <div className="text-4xl flex justify-center mb-4 text-red-600 dark:text-red-500">{service.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                </motion.div>
            </div>
        </section>
    );
}