import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useColorContext, TAILWIND_COLORS } from '@/components/theme/ColorContext';

export default function PartyModeButton() {
    const [partyMode, setPartyMode] = useState(false);
    const [showPartyWarning, setShowPartyWarning] = useState(false);
    const partyInterval = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { setMainColor } = useColorContext();

    useEffect(() => {
        if (partyMode) {
            partyInterval.current = setInterval(() => {
                const randomColor = TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)];
                setMainColor(randomColor);
            }, 300);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            if (partyInterval.current) {
                clearInterval(partyInterval.current);
                partyInterval.current = null;
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
        return () => {
            if (partyInterval.current) {
                clearInterval(partyInterval.current);
                partyInterval.current = null;
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [partyMode, setMainColor]);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-pressed={partyMode}
                title={partyMode ? 'Desactivar Party Mode' : 'Activar Party Mode'}
                className={`fixed bottom-10 z-30 p-2 h-[50px] flex justify-center items-center rounded-full border transition-colors duration-200 ${partyMode ? 'bg-yellow-200 text-gray-950 border-yellow-500 animate-pulse' : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700'}`}
                onClick={() => {
                    if (!partyMode) {
                        setShowPartyWarning(true);
                    } else {
                        setPartyMode(false);
                    }
                }}
            >
                <span className="text-md px-4">Fun mode 🎉</span>
            </motion.button>
            <audio ref={audioRef} src="/brazil-funk-1.mp3" loop style={{ display: 'none' }} />
            {showPartyWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl max-w-xs text-center">
                        <h2 className="text-lg font-bold mb-2 text-red-600">Heads up!</h2>
                        <p className="mb-4 text-sm">This mode is intentionally chaotic, probably the worst user experience I've ever designed… <b>but it's also a lot of fun</b>. Give it a try if you're okay with flashing colors!</p>
                        <div className="flex gap-3 justify-center">
                            <button
                                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                                onClick={() => { setShowPartyWarning(false); setPartyMode(true); }}
                            >Fun mode</button>
                            <button
                                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                                onClick={() => setShowPartyWarning(false)}
                            >Nope</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
