'use client';

import React from 'react';
import { useColorContext, TAILWIND_COLORS, MainColor } from './ColorContext';

const colorMap: Record<MainColor, string> = {
    red: 'bg-red-500', blue: 'bg-blue-500', green: 'bg-green-500', yellow: 'bg-yellow-400',
    purple: 'bg-purple-500', pink: 'bg-pink-500', indigo: 'bg-indigo-500', teal: 'bg-teal-500',
    orange: 'bg-orange-500', cyan: 'bg-cyan-500', emerald: 'bg-emerald-500', lime: 'bg-lime-400',
    amber: 'bg-amber-400', violet: 'bg-violet-500', fuchsia: 'bg-fuchsia-500', rose: 'bg-rose-500',
    sky: 'bg-sky-400', slate: 'bg-slate-500', zinc: 'bg-zinc-500', neutral: 'bg-neutral-500', stone: 'bg-stone-500',
};

export default function FloatingColorSelector() {
    const { mainColor, setMainColor } = useColorContext();
    return (
        <div className="container mx-auto px-0 lg:px-6 flex justify-center items-center">
            <div className="flex flex-row items-end gap-2">
                <div className="w-[100%] bg-white dark:bg-neutral-900 shadow-lg rounded-xl p-3 flex flex-wrap gap-2 border border-neutral-200 dark:border-neutral-700">
                    {TAILWIND_COLORS.map((color) => (
                        <button
                            key={color}
                            className={`w-4 h-4 cursor-pointer rounded-full border-2 ${colorMap[color]} ${mainColor === color ? 'border-black dark:border-white scale-110' : 'border-transparent'} transition-transform`}
                            aria-label={color}
                            onClick={() => setMainColor(color)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
