import ContactForm from "@/components/contact/ContactForm";
import { TitleH1 } from "@/components/common/TitleH1";
import Link from "next/link";
import { SiLinkedin } from 'react-icons/si';
import Breadcrumbs from "@/components/common/Breadcrumbs";

const Contact = () => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center dark:bg-gray-950">
        
    <div className="container px-6 flex flex-col items-center justify-center pt-15">
      <Breadcrumbs />
      
        <TitleH1
          title="Let's Connect"
          description="If you have any questions or just want to say hi, feel free to reach out!"
        />
        <Link
          href="https://www.linkedin.com/in/sixtofrancisco/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mb-4 px-4 py-2 rounded-2xl bg-neutral-100 dark:bg-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow text-md z-2"
        >
          <SiLinkedin className="text-blue-500" /> Connect with me on LinkedIn
        </Link>

        <ContactForm />
        
      </div>
    </div>
  );
};

export default Contact;