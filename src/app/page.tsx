import Hero from "@/components/home/Hero";
import HomeSubscribe from "@/components/home/HomeSubscribe";
import HomeServices from "@/components/home/HomeServices";
import ContactCTA from "@/components/contact/ContactCTA";
import Highlights from "@/components/home/Highlights";
import AboutMeTeaser from "@/components/home/AboutMeTeaser";
// import ClientsSlider from "@/components/ClientSlider";
import { metadata } from './page.metadata';

export { metadata };

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