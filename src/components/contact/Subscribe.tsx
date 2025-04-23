import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/theme/SubmitButton";
import ErrorMessage from "@/components/theme/ErrorMessage";

type FormData = {
  email: string;
  honey: string;
};

export default function Subscribe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.honey !== "") {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsletters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            email: data.email,
          },
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        console.error("Error al suscribirse:", await response.json());
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute -bottom-7 md:bottom-9 flex items-center flex-col gap-4 md:flex-row justify-between bg-gray-950/90 border border-red-500 p-4 rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      >
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          placeholder="Your email address"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500 bg-gray-900/80 dark:bg-black dark:border-white text-white dark:text-gray-100"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "El email no es válido",
            },
          })}
        />
        {errors.email && <ErrorMessage message={errors.email.message || ""} />}
        <input
          type="text"
          placeholder="Leave this field empty"
          className="hidden"
          {...register("honey", { validate: (value) => value === "" })}
        />
        <SubmitButton isSubmitting={isSubmitting} />
        {submitted && (
          <p className="text-green-500 text-sm mt-2">¡Gracias por suscribirte!</p>
        )}
      </motion.form>
    </div>
  );
}
