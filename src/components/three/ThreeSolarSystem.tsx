import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useColorContext } from '../theme/ColorContext';

function Character() {
  const { scene } = useGLTF("/SolarSystem.glb");
  const ref = useRef<THREE.Object3D>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      ref.current.rotation.y = time * 0.1; // Rotación continua en el eje Y
      ref.current.scale.setScalar(1.5 + Math.sin(time) * 0.1); // Zoom in y zoom out
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} position={[0, -1, 0]} />;
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
    <div style={{ position: "absolute", zIndex: "0", width: "100%", height: "100%" }}>
      <Canvas shadows camera={{ position: [2, -2, 1], fov: 50 }}>
        <ambientLight color={threeColor} intensity={.1} />
        <directionalLight position={[5, 5, 5]} castShadow intensity={0.1} />
        <directionalLight position={[-5, 0, -5]} intensity={1} color={threeColor} />
        <directionalLight position={[-2, 0, -5]} intensity={3} color="white" />
        <directionalLight position={[-5, 0, -1]} intensity={1} color="black" />
        <Suspense fallback={null}>
          <Character />
        </Suspense>
      </Canvas>
    </div>
  );
}
