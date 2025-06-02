import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useColorContext } from '@/components/theme/ColorContext';
import { motion, AnimatePresence } from 'framer-motion';

function HipHopFBX() {
    const group = useRef<THREE.Group>(null);
    const mixer = useRef<THREE.AnimationMixer | null>(null);
    const [model, setModel] = React.useState<THREE.Group | null>(null);

    useEffect(() => {
        let mounted = true;
        let loader: THREE.Loader | undefined;
        // Import dinámico del FBXLoader
        import('three/examples/jsm/loaders/FBXLoader.js').then((mod) => {
            loader = new mod.FBXLoader();
            loader.load('/hip-hop-2.fbx', (fbx: unknown) => {
                if (!mounted) return;
                // Forzamos el tipo adecuado para el modelo FBX
                const group = fbx as THREE.Group & { animations?: THREE.AnimationClip[] };
                setModel(group);
                if (group.animations && group.animations.length > 0) {
                    mixer.current = new THREE.AnimationMixer(group);
                    mixer.current.clipAction(group.animations[0]).play();
                }
            });
        });
        return () => { mounted = false; };
    }, []);
    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return model ? <primitive ref={group} object={model} scale={1.5} position={[0, -1, 0]} /> : null;
}

function LoaderMesh() {
    // Loader 3D: esfera simple en la misma posición y escala
    return (
        <mesh position={[0, -1, 0]} scale={1.5}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#eab308" opacity={0.5} transparent />
        </mesh>
    );
}

export default function Bailarin({
    show = true,
    onExited
}: { show?: boolean; onExited?: () => void }) {
    const { mainColor } = useColorContext();
    // Utilidad para mapear el color tailwind a un color de three.js
    const colorMap: Record<string, string> = {
        red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#eab308',
        purple: '#a21caf', pink: '#ec4899', indigo: '#6366f1', teal: '#14b8a6',
        orange: '#f59e42', cyan: '#06b6d4', emerald: '#10b981', lime: '#84cc16',
        amber: '#f59e42', violet: '#8b5cf6', fuchsia: '#d946ef', rose: '#f43f5e',
        sky: '#0ea5e9', slate: '#64748b', zinc: '#71717a', neutral: '#737373', stone: '#78716c',
    };
    const threeColor = colorMap[mainColor] || '#ef4444';
    // Color para el haz de luz
    const beamColor = threeColor + '80'; // 50% opacidad

    const [visible, setVisible] = useState(show);
    useEffect(() => {
        if (show) {
            setVisible(true);
        } else {
            setTimeout(() => {
                setVisible(false);
                if (onExited) onExited();
            }, 600); // Duración de la animación de salida
        }
    }, [show, onExited]);

    if (!visible) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none w-screen h-screen"
                >
                    {/* Haz de luz superior derecho */}
                    <div
                        className="pointer-events-none fixed -top-20 -left-10 z-0"
                        style={{
                            width: '60vw',
                            height: '60vh',
                            background: `radial-gradient(ellipse 100% 60% at 0% 0%, ${beamColor} 0%, transparent 80%)`,
                            filter: 'blur(60px)',
                            opacity: 0.7,
                            mixBlendMode: 'screen',
                        }}
                    />
                    <div
                        className="pointer-events-none fixed -top-20 -right-10 z-0"
                        style={{
                            width: '60vw',
                            height: '60vh',
                            background: `radial-gradient(ellipse 100% 60% at 100% 0%, ${beamColor} 0%, transparent 80%)`,
                            filter: 'blur(60px)',
                            opacity: 0.7,
                            mixBlendMode: 'screen',
                        }}
                    />
                    <div className="w-full h-full bg-transparent">
                        <Suspense fallback={null}>
                            <Canvas camera={{ position: [-100, 400, 300], fov: 70 }}>
                                <directionalLight position={[5, 5, 5]} castShadow intensity={1} />
                                <directionalLight
                                    position={[-5, 0, -5]}
                                    intensity={6}
                                    color={threeColor}
                                />
                                <directionalLight
                                    position={[-2, 0, -5]}
                                    intensity={11}
                                    color={threeColor}
                                />
                                <directionalLight
                                    position={[1, 0, -1]}
                                    intensity={8}
                                    color={threeColor}
                                />
                                <React.Suspense fallback={<LoaderMesh />}> {/* Loader 3D dentro del canvas */}
                                    <HipHopFBX />
                                </React.Suspense>
                            </Canvas>
                        </Suspense>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
