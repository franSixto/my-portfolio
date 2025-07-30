import React, { useRef, useState, useEffect } from "react";
import { useColorContext, TAILWIND_COLORS } from '@/components/theme/ColorContext';
import { usePartyMode } from '@/contexts/PartyModeContext';
import confetti from "canvas-confetti";
import Dancer from "../three/Dancer";

export default function PartyModeManager() {
    const { partyMode, setPartyMode } = usePartyMode();
    const [showDancer, setShowDancer] = useState(false);
    const partyInterval = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fireworksInterval = useRef<NodeJS.Timeout | null>(null);
    const { setMainColor } = useColorContext();

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

    return (
        <>
            {showDancer && (
                <Dancer
                    show={partyMode}
                    onExited={() => setShowDancer(false)}
                />
            )}
            <audio ref={audioRef} src="/t-bless-korobeiniki-8-bit-version.mp3" onEnded={() => setPartyMode(false)} style={{ display: 'none' }} />
        </>
    );
}
