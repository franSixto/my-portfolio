import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/theme/SubmitButton";
import ErrorMessage from "@/components/theme/ErrorMessage";
import { RiCheckLine, RiCheckboxCircleLine} from "react-icons/ri";

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

    useEffect(() => {
        const isAlreadySubscribed = sessionStorage.getItem("isSubscribed");
        if (isAlreadySubscribed) {
            setSubmitted(true);
        }
    }, []);

    const onSubmit = async (data: FormData) => {
        if (data.honey !== "") {
            return;
        }

        if (submitted) {
            console.warn("Ya se ha suscrito en esta sesión.");
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
                sessionStorage.setItem("isSubscribed", "true");
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
        <div className="w-full flex justify-center">
            {submitted ? (
                <div className="absolute bottom-4 md:bottom-7 flex flex-row items-center p-1 pe-4 rounded-2xl bg-green-600/10 backdrop-blur-xl">
                    <RiCheckLine className="w-[50px] h-[50px] text-green-600 text-2xl m-2 bg-green-600/10 rounded-full p-2" />
                    <p className="text-green-600">Thank you for subscribing!</p>
                </div>
            ) : (
                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="absolute -bottom-14 md:bottom-5 flex items-center flex-col gap-4 md:flex-row justify-between bg-gray-900/30 backdrop-blur-xl p-4 rounded-2xl border border-black"
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
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
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
                    <SubmitButton isSubmitting={isSubmitting} submittingText={"Subscribing..."} defaultText={"Subscribe"} Icon={RiCheckboxCircleLine} />
                </motion.form>
            )}
        </div>
    );
}
