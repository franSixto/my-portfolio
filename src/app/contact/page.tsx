import ContactForm from "@/components/ContactForm";
import { TitleSubPages } from "@/components/TitleSubPages";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
      <TitleSubPages
        title="Let's Connect"
        description="If you have any questions or just want to say hi, feel free to reach out!"
      />
      <Link
        href="https://www.linkedin.com/in/sixtofrancisco/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-blue-500 hover:underline"
      >
        Connect with me on LinkedIn
      </Link>
      <ContactForm />
      
    </div>
  );
};

export default Contact;