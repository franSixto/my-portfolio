"use client"; //Solo hasta que saque framer motion de aca y lo lleve a components

import Hero from "@/components/Hero";
import HomeSubscribe from "@/components/HomeSubscribe";
import HomeServices from "@/components/HomeServices";
import ContactCTA from "@/components/ContactCTA";
import Highlights from "@/components/Highlights";
import AboutMeTeaser from "@/components/AboutMeTeaser";
// import ClientsSlider from "@/components/ClientSlider";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <HomeServices />
        <HomeSubscribe />
        <AboutMeTeaser />
        <Highlights />
        
        {/* <ClientsSlider /> */}
       
        
        <ContactCTA />
      </main>
    </div>
  );
};

export default Home;