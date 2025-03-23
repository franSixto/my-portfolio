import Image from "next/image";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
      <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1>Welcome to My Portfolio</h1>
        <p>Here you'll find my work and projects.</p>
      </main>
    </div>
  );
};

export default Home;