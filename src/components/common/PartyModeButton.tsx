import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useColorContext, TAILWIND_COLORS } from '@/components/theme/ColorContext';
import confetti from "canvas-confetti";
import { FaPlay, FaStop } from "react-icons/fa";
import Bailarin from "./Bailarin";

export default function PartyModeButton() {
    const [partyMode, setPartyMode] = useState(false);
    const [showPartyWarning, setShowPartyWarning] = useState(false);
    const [progress, setProgress] = useState(0); // Progreso del audio (0-100)
    const [audioDuration, setAudioDuration] = useState(0); // Duración total del audio
    const [showBailarin, setShowBailarin] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const partyInterval = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fireworksInterval = useRef<NodeJS.Timeout | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { setMainColor } = useColorContext();

    useEffect(() => {
        // Copiar el valor de audioRef.current al inicio del efecto
        const audio = audioRef.current;
        if (partyMode) {
            setShowBailarin(true);
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
            setTimeout(() => setShowBailarin(false), 600); // Espera animación de salida
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
    }, [partyMode]);

    // Actualizar progreso del audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleTimeUpdate = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };
        const handleLoadedMetadata = () => {
            setAudioDuration(audio.duration);
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [audioRef]);

    useEffect(() => {
        if (!partyMode) setProgress(0);
    }, [partyMode]);

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
            {showBailarin && (
                <Bailarin
                    show={partyMode}
                    onExited={() => setShowBailarin(false)}
                />
            )}
            <motion.button
                ref={buttonRef}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-pressed={partyMode}
                title={partyMode ? 'Stop Party Mode' : 'Play Party Mode'}
                className={`fixed bottom-5 right-5 z-40 p-2 h-[50px] flex justify-center items-center rounded-full border transition-colors duration-200 ${partyMode ? 'bg-yellow-200 text-gray-950 border-yellow-500 animate-pulse' : 'bg-white dark:bg-gray-900 border-neutral-300 dark:border-gray-700'}`}
                onClick={() => {
                    if (!partyMode) {
                        setShowPartyWarning(true);
                    } else {
                        setPartyMode(false);
                    }
                }}
                animate={{ opacity: isButtonVisible ? 1 : 0, pointerEvents: isButtonVisible ? 'auto' : 'none' }}
                transition={{ duration: 0.4 }}
            >
                {partyMode ? (
                    <span className="flex flex-row justify-between items-center gap-3 text-md px-4">
                        <FaStop className="text-xl" />
                        Stop this!
                    </span>
                ) : (
                    <span className="flex flex-row justify-between items-center gap-3 text-md px-4">
                        <FaPlay className="text-xl" />
                        Play fun mode
                    </span>
                )}
            </motion.button>
            {partyMode && (
                <div className="fixed bottom-20 right-5 z-50 w-[156px] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-lg h-2 flex items-center">
                    <div
                        className="bg-yellow-400 h-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    ></div>
                    <span className="absolute left-2 text-xs text-gray-700 dark:text-gray-200">
                        {audioDuration > 0 ? `${Math.floor((progress / 100) * audioDuration)}s / ${Math.floor(audioDuration)}s` : ''}
                    </span>
                </div>
            )}
            <audio ref={audioRef} src="/t-bless-korobeiniki-8-bit-version.mp3" onEnded={() => setPartyMode(false)} style={{ display: 'none' }} />
            {showPartyWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl max-w-xs text-center">
                        <h2 className="text-lg font-bold mb-2 text-red-600">Heads up!</h2>
                        <p className="mb-4 text-sm">This mode has music, flashing colors and animations, but it&apos;s also a lot of fun. Give it a try if you&apos;re okay.</p>
                        <div className="flex gap-3 justify-center">
                            <button
                                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                                onClick={() => { setShowPartyWarning(false); setPartyMode(true); }}
                            >Play</button>
                            <button
                                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 cursor-pointer"
                                onClick={() => setShowPartyWarning(false)}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
