import ContactForm from "@/components/ContactForm";
import { TitleSubPages } from "@/components/TitleSubPages";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
      <TitleSubPages
        title="Let's Connect"
        description="If you have any questions or just want to say hi, feel free to reach out!"
      />
      <ContactForm />
    </div>
  );
};

export default Contact;