import Hero from "@/components/Hero";
import FirstPersonGame from "@/components/FirstPersonGame";


const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 matrix:bg-red-500 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <FirstPersonGame/>      
      </main>
    </div>
  );
};

export default Home;