import ContactForm from "@/components/contact/ContactForm";
import { TitleH1 } from "@/components/common/TitleH1";
import LinkedinButton from "@/components/contact/LinkedinButton";
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
        <LinkedinButton />
        <ContactForm />
        
      </div>
    </div>
  );
};

export default Contact;