import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useColorContext, TAILWIND_COLORS } from '@/components/theme/ColorContext';
import { usePartyMode } from '@/contexts/PartyModeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import confetti from "canvas-confetti";
import { FaStop } from "react-icons/fa";
import Dancer from "../three/Dancer";

export default function PartyModeManager() {
    const { partyMode, setPartyMode } = usePartyMode();
    const [showDancer, setShowDancer] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const partyInterval = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fireworksInterval = useRef<NodeJS.Timeout | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { setMainColor } = useColorContext();
    const { t } = useLanguage();

    useEffect(() => {
        // Copiar el valor de audioRef.current al inicio del efecto
        const audio = audioRef.current;
        if (partyMode) {
            setShowDancer(true);
            partyInterval.current = setInterval(() => {
                const randomColor = TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)];
                setMainColor(randomColor);
            }, 500);
            // Lanzar fuegos artificiales cada 3 segundos
            fireworksInterval.current = setInterval(() => {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        confetti({
                            particleCount: 50,
                            angle: 60 + Math.random() * 60, // entre 60 y 120 grados
                            spread: 150,
                            startVelocity: 55,
                            origin: {
                                x: Math.random(),
                                y: Math.random() * 0.2 + 1 // parte baja de la pantalla
                            },
                            colors: [
                                '#ff0043', '#14fc56', '#1e90ff', '#fff200', '#ff7f50', '#bb00ff'
                            ]
                        });
                    }, i * 400);
                }
            }, 1000);
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
        } else {
            if (partyInterval.current) {
                clearInterval(partyInterval.current);
                partyInterval.current = null;
            }

            if (fireworksInterval.current) {
                clearInterval(fireworksInterval.current);
                fireworksInterval.current = null;
            }
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            setTimeout(() => setShowDancer(false), 600); // Espera animación de salida
        }
        return () => {
            if (partyInterval.current) {
                clearInterval(partyInterval.current);
                partyInterval.current = null;
            }

            if (fireworksInterval.current) {
                clearInterval(fireworksInterval.current);
                fireworksInterval.current = null;
            }
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [partyMode, setMainColor]);

    useEffect(() => {
        // Pausar party mode si la ventana pierde el foco
        const handleVisibility = () => {
            if (document.hidden && partyMode) {
                setPartyMode(false);
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [partyMode, setPartyMode]);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            const button = buttonRef.current;
            if (!footer || !button) return;
            const footerRect = footer.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            // Si el botón está por encima del footer, debe ser visible
            if (buttonRect.bottom > footerRect.top) {
                setIsButtonVisible(false);
            } else {
                setIsButtonVisible(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {showDancer && (
                <Dancer
                    show={partyMode}
                    onExited={() => setShowDancer(false)}
                />
            )}
            {/* Botón de parar que solo aparece cuando el party mode está activo */}
            {partyMode && (
                <motion.button
                    ref={buttonRef}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPartyMode(false)}
                    className="fixed bottom-5 right-5 z-40 p-3 h-[60px] w-[60px] flex justify-center items-center rounded-full bg-red-500 hover:bg-red-600 text-white border-2 border-red-600 shadow-lg animate-pulse"
                    animate={{ opacity: isButtonVisible ? 1 : 0, pointerEvents: isButtonVisible ? 'auto' : 'none' }}
                    transition={{ duration: 0.4 }}
                    title={t('common.funMode.stop')}
                >
                    <FaStop className="text-xl" />
                </motion.button>
            )}
            <audio ref={audioRef} src="/t-bless-korobeiniki-8-bit-version.mp3" onEnded={() => setPartyMode(false)} style={{ display: 'none' }} />
        </>
    );
}
