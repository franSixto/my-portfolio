"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Label from "@/components/theme/Label";
import ErrorMessage from "@/components/theme/ErrorMessage";
import SubmitButton from "@/components/theme/SubmitButton";
import { RiCheckLine, RiMailSendLine } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";


type FormData = {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Optional field for honeypot
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error enviando el mensaje:", error);
    } finally {
      setIsSubmitting(false); // Cambia a "false" al finalizar el envío
    }
  };

  return (
    <div className="w-[100%] flex items-center justify-items-center p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)] z-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        id="contact-form"
        role="form"
        aria-label="Contact Form"
        aria-live="polite"
        aria-busy={isSubmitting}
        tabIndex={0}
        // className="max-w-full sm:max-w-md lg:max-w-lg mx-auto w-300 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-md "
       className="max-w-full sm:max-w-md lg:max-w-lg mx-auto w-300 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-md ">
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Talk with me</h2>
        {submitted ? (
          <div className="flex flex-col items-center p-5 rounded-2xl bg-green-600/10">
            <RiCheckLine className="w-[50px] h-[50px] text-green-600 text-2xl m-2 bg-green-600/10 rounded-full p-2" />
            <p className="text-green-600">Message sent successfully.</p>
            <Link
              href="/"
              className="mt-4 px-4 py-2 bg-gray-500/20 text-gray-900 dark:text-white  rounded-lg hover:bg-gray-700/20 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                style={{ display: "none" }}
                {...register("honeypot")}
              />
            </div>
            <div>
              <Label htmlFor="name" text="Name" />
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Your name"
              />
              {errors.name && <ErrorMessage message={errors.name.message || ""} />}
            </div>

            <div>
              <Label htmlFor="email" text="Email" />
              <input
                type="email"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-red-300 dark:focus:ring-red-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="your@email.com"
              />
              {errors.email && <ErrorMessage message={errors.email.message || ""} />}
            </div>

            <div>
              <Label htmlFor="message" text="Message" />
              <textarea
                {...register("message", { required: "Message is required" })}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-red-300 dark:focus:ring-red-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                rows={4}
                placeholder="Your message"
              ></textarea>
              {errors.message && <ErrorMessage message={errors.message.message || ""} />}
            </div>
            <SubmitButton isSubmitting={isSubmitting} submittingText={"Sending..."} defaultText={"Send message"} Icon={RiMailSendLine} />
          </form>
        )}
      </motion.div>
    </div>
  );
}
