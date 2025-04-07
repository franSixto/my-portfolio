import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Character({ onClick }: { onClick: () => void }) {
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

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.25}
      position={[0, -1, 0]}
      onClick={onClick} // Add onClick handler
    />
  );
}

export default function Scene() {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([-190, 120, -150]);

  const handleCharacterClick = () => {
    // Generate random camera position
    const randomX = Math.random() * 400 - 200; // Random value between -200 and 200
    const randomY = Math.random() * 200 + 50;  // Random value between 50 and 250
    const randomZ = Math.random() * 400 - 200; // Random value between -200 and 200
    setCameraPosition([randomX, randomY, randomZ]);
  };

  return (
    <div className="lg:absolute -bottom-18 left-0 w-full h-100 lg:h-full z-3">
      <Canvas shadows camera={{ position: cameraPosition, fov: 80 }}>
        <ambientLight color="red" intensity={0.2} />
        <directionalLight color="white" position={[-300, 300, 300]} castShadow intensity={1} />
        <directionalLight color="white" position={[-500, 100, 300]} castShadow intensity={5} />
        <Suspense fallback={null}>
          <Character onClick={handleCharacterClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}