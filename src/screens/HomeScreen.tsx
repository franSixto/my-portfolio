import Hero from "@/components/home/Hero";
import HomeServices from "@/components/home/HomeServices";
import ContactCTA from "@/components/contact/ContactCTA";
import Highlights from "@/components/home/Highlights";
import AboutMeTeaser from "@/components/home/AboutMeTeaser";
const HomeScreen = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <HomeServices />
        <AboutMeTeaser />
        <Highlights />
        <ContactCTA />
      </main>
    </div>
  );
};

export default HomeScreen;