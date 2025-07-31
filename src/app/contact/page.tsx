"use client";

import ContactForm from "@/components/contact/ContactForm";
import { TitleH1 } from "@/components/common/TitleH1";
import LinkedinButton from "@/components/contact/LinkedinButton";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useTranslation } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center dark:bg-gray-950">
        
    <div className="container px-6 flex flex-col items-center justify-center pt-10">
      <Breadcrumbs />
      
        <TitleH1
          title={t('pages.contact.title')}
          description={t('pages.contact.description')}
        />
        <LinkedinButton />
        <ContactForm />
        
      </div>
    </div>
  );
};

export default Contact;