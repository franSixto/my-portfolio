import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import { useColorContext } from '@/components/theme/ColorContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { RouteKey } from '@/i18n/routes';

const MOBILE_ITEMS: ReadonlyArray<{ route: RouteKey; labelKey: string; hash?: string }> = [
    { route: "home", labelKey: "navigation.home" },
    { route: "home", labelKey: "navigation.services", hash: "#services" },
    { route: "about", labelKey: "navigation.about" },
    { route: "projects", labelKey: "navigation.projects" },
    { route: "contact", labelKey: "navigation.contact" },
];

// Mobile navigation links (blog removed: no posts yet)
function MobileNavigationLinks({
    isActive,
    toggleMenu,
    mainColor
}: {
    isActive: (route: RouteKey) => boolean;
    toggleMenu: () => void;
    mainColor: string;
}) {
    const { t, localePath } = useLanguage();

    return (
        <ul className="relative w-full h-full">
            {MOBILE_ITEMS.map((item, index, arr) => {
                const angle = (360 / arr.length) * index;
                const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);

                return (
                    <li
                        key={item.labelKey}
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
                                href={`${localePath(item.route)}${item.hash ?? ""}`}
                                className={`hover:text-gray-500 dark:hover:text-gray-300 ${!item.hash && isActive(item.route) ? `font-bold text-${mainColor}-600 transition-colors duration-300` : ""}`}
                                onClick={toggleMenu}
                            >
                                {t(item.labelKey)}
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
    isActive: (route: RouteKey) => boolean;
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