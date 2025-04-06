"use client"; //Solo hasta que saque framer motion de aca y lo lleve a components

import Hero from "@/components/Hero";
import HomeTitle from "@/components/HomeSubscribe";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";


const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        
        <div className="mx-auto px-6 container">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Here are some of my recent projects that showcase my skills and creativity.
            </p>
            {/* <ProjectList projects={projects} /> */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/projects"
              className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              View All Projects
            </motion.a>
          </div>

          <div className="flex flex-col items-center sm:items-start mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I would love to hear from you! Whether you have a question or just want to say hi, feel free to reach out.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Contact Me
            </motion.a>
          </div>

          <div className="flex flex-col items-center sm:items-start mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Follow Me
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Stay updated with my latest projects and adventures. Follow me on social media!
            </p>
            <div className="flex gap-6">
              {[
          { href: "#", icon: <FaTwitter />, label: "Twitter" },
          { href: "#", icon: <FaLinkedin />, label: "LinkedIn" },
          { href: "#", icon: <FaGithub />, label: "GitHub" },
          { href: "#", icon: <FaInstagram />, label: "Instagram" },
              ].map((social, index) => (
          <motion.a
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            href={social.href}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition duration-300 ease-in-out text-2xl"
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Subscribe to My Newsletter
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Stay updated with my latest projects and insights. Subscribe to my newsletter for exclusive content and updates.
            </p>
            
          </div>
          
        </div>
        <HomeTitle />
      </main>
    </div>
  );
};

export default Home;