"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useColorContext } from '../theme/ColorContext';

function Character() {
  const { scene } = useGLTF("/Spaceship.glb");
  const ref = useRef<THREE.Object3D | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t) * 0.5; // Oscilación vertical
      ref.current.rotation.z = Math.sin(t) * 0.1; // Ligera rotación
      ref.current.rotation.x = Math.cos(t) * 0.1; // Ligera inclinación
    }
  });

  return <primitive ref={ref} object={scene} scale={0.25} position={[0, -1, 0]} />;
}

export default function Scene() {
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

  return (
    <div className="lg:absolute w-full hidden lg:block lg:h-full h-100 z-3">
      <Canvas shadows camera={{ position: [-190, 120, -150], fov: 80 }}>
        <ambientLight color={threeColor} intensity={0.2} />
        <directionalLight color={threeColor} position={[-300, 300, 300]} castShadow intensity={1} />
        <directionalLight color={threeColor} position={[-500, 100, 300]} castShadow intensity={5} />
        <Suspense fallback={null}>
          <Character />
        </Suspense>
      </Canvas>
    </div>
  );
}
