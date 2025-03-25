"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
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
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
      {submitted ? (
        <p className="text-green-600">Mensaje enviado correctamente.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Tu nombre"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "El email es obligatorio", pattern: { value: /^\S+@\S+$/, message: "Email inválido" } })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Mensaje</label>
            <textarea
              {...register("message", { required: "El mensaje es obligatorio" })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              rows={4}
              placeholder="Tu mensaje"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}
