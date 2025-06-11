"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useColorContext, COLOR_GRADIENT_MAP, COLOR_TEXT_CLASS_MAP } from '@/components/theme/ColorContext';
import ColorLottery from '@/components/theme/ColorLottery';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showLottery, setShowLottery] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { mainColor } = useColorContext();
  const gradient = COLOR_GRADIENT_MAP[mainColor] || COLOR_GRADIENT_MAP.red;
  const textColor = COLOR_TEXT_CLASS_MAP[mainColor] || 'text-red-500';

  useEffect(() => {
    // Mostrar splash animado primero
    const splashTimer = setTimeout(() => {
      setShowSplash(false); // Oculta splash animado
      setShowLottery(true); // Muestra lotería
      // Oculta todo el splash (incluida la lotería) después de la lotería
      setTimeout(() => {
        setIsVisible(false);
      }, 1800); // Duración de la lotería
    }, 1800); // Duración del splash animado
    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl transition-colors duration-500"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Splash animado */}
          {showSplash && (
            <>
              <motion.div
                className="relative flex items-center justify-center mb-8"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 18, duration: 0.7 }}
              >
                <motion.div
                  className={`absolute w-44 h-44 rounded-full ${gradient.from} ${gradient.to} blur-2xl animate-pulse`}
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
                <Image src="/logo.svg" alt="Logo" width={300} height={190} className="z-20 animate-bounce-slow rotate-354" />
                <motion.div
                  className="absolute z-10 rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
                >
                  <Image src="/splash.png" alt="Meta Imagen" width={500} height={500} className={`object-cover bg-gradient-to-r ${gradient.from} ${gradient.to}`} />
                </motion.div>
              </motion.div>
              <motion.span
                className={`text-4xl font-extrabold text-gray-950 dark:text-gray-50  mb-2 tracking-tight drop-shadow-lg`}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Fran Sixto
              </motion.span>
              <motion.span
                className={`text-lg font-medium text-gray-950 dark:text-gray-50 mb-4 tracking-wide`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                UX/UI & Frontend Developer
              </motion.span>
              <motion.div
                className="flex gap-2 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <span className={`w-3 h-3 rounded-full ${gradient.from} animate-pulse`} />
                <span className={`w-3 h-3 rounded-full ${gradient.to} animate-pulse delay-200`} />
                <span className={`w-3 h-3 rounded-full ${textColor} animate-pulse delay-400`} />
              </motion.div>
            </>
          )}
          {/* Lotería de color */}
          {showLottery && <ColorLottery showText />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;