import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

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

  return <primitive ref={ref} object={scene} scale={0.3} position={[0, -1, 0]} />;
}

export default function Scene() {
  return (
    <div className=" lg:absolute top-0 left-0 w-full h-100 lg:h-full z-3">
      <Canvas shadows camera={{ position: [-190, 120, -150], fov: 80 }}>
        <ambientLight color="red" intensity={.2} />
        <directionalLight color="white" position={[-300, 300, 300]} castShadow intensity={1} />
        <directionalLight color="white" position={[-500, 100, 300]} castShadow intensity={5} />
        <Suspense fallback={null}>
          <Character />
        </Suspense>
      </Canvas>
    </div>
  );
}
