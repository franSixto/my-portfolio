"use client";

import React, { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

function Character() {
  const { scene } = useGLTF("/Xenomorph.glb");
  const ref = useRef<THREE.Object3D>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime) * 0.2;
      ref.current.rotation.y += 0.01; // Add constant rotation to the xenomorph
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function Scene() {
  const [bubbles, setBubbles] = useState<
    { id: number; x: number; y: number; rotation: number }[]
  >([]);

  const handleCanvasClick = () => {
    const randomX = Math.random() * 80 + 10; // Random X position (10% to 90% of the width)
    const randomY = Math.random() * 80 + 10; // Random Y position (10% to 90% of the height)
    const randomRotation = Math.random() * 10 - 5; // Random rotation between -5 and 5
    const newBubble = {
      id: Date.now(),
      x: randomX,
      y: randomY,
      rotation: randomRotation,
    };

    setBubbles((prev) => [...prev, newBubble]);

    // Play sound
    const audio = new Audio(Math.random() > 0.5 ? "/xenomorph.mp3" : "/xenomorph2.mp3");
    audio.play();

    setTimeout(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
    }, 2000); // Remove the bubble after 2 seconds
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          style={{
            position: "absolute",
            display: "flex",
            flexWrap: "nowrap",
            textWrap: "nowrap",
            top: `${bubble.y}%`,
            left: `${bubble.x}%`,
            transform: `translate(-50%, -50%) rotate(${bubble.rotation}deg)`,
            background: "black",
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Ssssshhh-Krrrkkk!
        </span>
      ))}
      <Canvas
        shadows
        camera={{ position: [20, 4, 0], fov: 50 }}
        onClick={handleCanvasClick}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} castShadow intensity={1} />
        <Suspense fallback={null}>
          <Character />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
