import Hero from "@/components/Hero";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-800 matrix:bg-red-500 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />        
      </main>
    </div>
  );
};

export default Home;