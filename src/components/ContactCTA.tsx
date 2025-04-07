import { motion } from "framer-motion";
import Button from "./theme/Button"; // Importa el componente Button

export default function ContactCTA() {
    return (
        <section className="container mx-auto px-6 flex flex-col items-center mb-10  text-center">
            <div className="dark:bg-gray-900 bg-white py-10 rounded-4xl w-full mx-auto px-6 flex flex-col items-center shadow-2xl">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Let’s build something great together
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-xl">
                    Whether you’re looking for a UX/UI designer, a frontend developer, or a team leader to bring your ideas to life — I’m ready to jump in. Feel free to reach out, I’d be happy to connect.
                </p>
                <Button
                        to="/contact"
                    >
                        Contact Me
                    </Button>
                
            </div>
        </section>
    );
}