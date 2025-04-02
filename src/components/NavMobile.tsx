import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";

interface NavMobileProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    isActive: (path: string) => boolean;
}

const NavMobile: React.FC<NavMobileProps> = ({ isMenuOpen, toggleMenu, isActive }) => {
    // Añadir o eliminar la clase "overflow-hidden" al <body>
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Limpieza al desmontar el componente
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isMenuOpen]);

    if (!isMenuOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50"
            onClick={toggleMenu} // Cierra el menú al hacer clic en cualquier lugar del fondo
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-64 h-64 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del menú cierre el menú
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-2 right-2 text-black dark:text-white focus:outline-none z-60"
                >
                    <RiCloseLine className="text-2xl" />
                </button>
                <ul className="relative w-full h-full">
                    <li className="absolute top-4 left-1/2 transform -translate-x-1/2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link
                                href="/"
                                className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                    isActive("/") ? "font-bold text-red-600" : ""
                                }`}
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                        </motion.div>
                    </li>
                    <li className="absolute top-1/2 left-4 transform -translate-y-1/2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link
                                href="/about"
                                className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                    isActive("/about") ? "font-bold text-red-600" : ""
                                }`}
                                onClick={toggleMenu}
                            >
                                About
                            </Link>
                        </motion.div>
                    </li>
                    <li className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link
                                href="/projects"
                                className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                    isActive("/projects") ? "font-bold text-red-600" : ""
                                }`}
                                onClick={toggleMenu}
                            >
                                Projects
                            </Link>
                        </motion.div>
                    </li>
                    <li className="absolute top-1/2 right-4 transform -translate-y-1/2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link
                                href="/contact"
                                className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                    isActive("/contact") ? "font-bold text-red-600" : ""
                                }`}
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </motion.div>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
};

export default NavMobile;