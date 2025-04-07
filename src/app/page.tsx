"use client"; //Solo hasta que saque framer motion de aca y lo lleve a components

import Hero from "@/components/Hero";
import HomeSubscribe from "@/components/HomeSubscribe";
import HomeServices from "@/components/HomeServices";
import ContactCTA from "@/components/ContactCTA";
import { motion } from "framer-motion";



const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <HomeServices/>
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

          
        </div>
        
        <HomeSubscribe />
        <ContactCTA />
      </main>
    </div>
  );
};

export default Home;