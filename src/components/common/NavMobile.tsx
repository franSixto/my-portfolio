import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import { useColorContext } from '@/components/theme/ColorContext';
import { useTranslation } from '@/contexts/LanguageContext';

// Componente para los enlaces de navegación móvil
function MobileNavigationLinks({ 
    isActive, 
    toggleMenu, 
    mainColor 
}: { 
    isActive: (path: string) => boolean;
    toggleMenu: () => void;
    mainColor: string;
}) {
    const { t, loading } = useTranslation();

    // Si está cargando, mostrar placeholders con texto invisible
    if (loading) {
        const placeholders = [
            { href: "/", text: "Home" },
            { href: "/about", text: "About" },
            { href: "/blog", text: "Blog" },
            { href: "/projects", text: "Projects" },
            { href: "/contact", text: "Contact" },
        ];

        return (
            <ul className="relative w-full h-full">
                {placeholders.map((item, index) => {
                    const angle = (360 / placeholders.length) * index;
                    const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);

                    return (
                        <li
                            key={item.href}
                            style={{
                                position: "absolute",
                                top: `${y}%`,
                                left: `${x}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <motion.div
                                initial={{ y: 0, rotate: 0 }}
                                animate={{
                                    y: [0, Math.random() * -20 + 10, 0],
                                    rotate: [0, Math.random() * 30 - 20, 0],
                                }}
                                transition={{
                                    duration: Math.random() * 3 + 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div className="relative">
                                    <span className="invisible">{item.text}</span>
                                    <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                </div>
                            </motion.div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <ul className="relative w-full h-full">
            {[
                { href: "/", label: t('navigation.home') },
                { href: "/about", label: t('navigation.about') },
                { href: "/blog", label: t('navigation.blog') },
                { href: "/projects", label: t('navigation.projects') },
                { href: "/contact", label: t('navigation.contact') },
            ].map((item, index, arr) => {
                const angle = (360 / arr.length) * index;
                const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);

                return (
                    <li
                        key={item.href}
                        style={{
                            position: "absolute",
                            top: `${y}%`,
                            left: `${x}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <motion.div
                            initial={{ y: 0, rotate: 0 }}
                            animate={{
                                y: [0, Math.random() * -20 + 10, 0],
                                rotate: [0, Math.random() * 30 - 20, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                href={item.href}
                                className={`hover:text-gray-500 dark:hover:text-gray-300 ${isActive(item.href) ? `font-bold text-${mainColor}-600 transition-colors duration-300` : ""}`}
                                onClick={toggleMenu}
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    </li>
                );
            })}
        </ul>
    );
}

interface NavMobileProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    isActive: (path: string) => boolean;
}

const NavMobile: React.FC<NavMobileProps> = ({ isMenuOpen, toggleMenu, isActive }) => {
    const { mainColor } = useColorContext();

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
            className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50 backdrop-blur-sm"
            onClick={toggleMenu} // Cierra el menú al hacer clic en cualquier lugar del fondo
        >
            <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative p-8 w-85 h-85 rounded-full bg-gradient-to-br from-white via-white/80 to-white/90 dark:from-gray-800/80 dark:via-gray-900/50 dark:to-gray-950/50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del menú cierre el menú
            >
            <button
                onClick={toggleMenu}
                className="absolute top-2 right-2 text-white focus:outline-none z-60"
            >
                <div className="flex justify-center items-center w-10 h-10 rounded-full bg-white dark:bg-gray-900">
                <RiCloseLine className={`text-2xl text-${mainColor}-500 transition-colors duration-300`} />
                </div>
            </button>
            <MobileNavigationLinks isActive={isActive} toggleMenu={toggleMenu} mainColor={mainColor} />
            </motion.div>
        </div>
    );
};

export default NavMobile;