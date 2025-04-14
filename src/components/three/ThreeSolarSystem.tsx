import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

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
  return (
    <div style={{ position: "absolute", zIndex: "0", width: "100%", height: "100%" }}>
      <Canvas shadows camera={{ position: [2, -2, 1], fov: 50 }}>
        <ambientLight color="red" intensity={.1} />
        <directionalLight position={[5, 5, 5]} castShadow intensity={0.1} />
        <directionalLight position={[-5, 0, -5]} intensity={1} color="red" />
        <directionalLight position={[-2, 0, -5]} intensity={3} color="white" />
        <directionalLight position={[-5, 0, -1]} intensity={1} color="black" />
        <Suspense fallback={null}>
          <Character />
        </Suspense>
      </Canvas>
    </div>
  );
}
