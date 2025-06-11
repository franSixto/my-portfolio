"use client";

import { useEffect } from "react";

// Extiende la interfaz Window para evitar errores de TypeScript
declare global {
  interface Window {
    hj?: HotjarFunction;
    _hjSettings?: { hjid: string | number; hjsv: number };
  }
}

type HotjarFunction = ((...args: unknown[]) => void) & { q?: unknown[] };

const HOTJAR_ID = "6432200"; 
const HOTJAR_SNIPPET_VERSION = 6;

const HotjarScript = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.hj) return; // Evita doble carga
    const hj: HotjarFunction = function (...args) {
      (hj.q = hj.q || []).push(args);
    };
    window.hj = window.hj || hj;
    window._hjSettings = { hjid: HOTJAR_ID, hjsv: HOTJAR_SNIPPET_VERSION };
    const head = document.head;
    if (!head) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=${HOTJAR_SNIPPET_VERSION}`;
    head.appendChild(script);
  }, []);
  return null;
};

export default HotjarScript;
