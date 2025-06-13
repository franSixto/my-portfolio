import React, { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useColorContext } from "../theme/ColorContext";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import Image from "next/image";

function Character() {
  const { scene } = useGLTF("/Xenomorph.glb");

  const ref = useRef<THREE.Object3D>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime) * 0.;
      ref.current.rotation.y -= 0.01; // Add constant rotation to the xenomorph
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

  const [bubbles, setBubbles] = useState<
    { id: number; x: number; y: number; rotation: number }[]
  >([]);

  // Estado para el jumpscare
  const [showJumpscare, setShowJumpscare] = useState(false);
  // Estado para contar los clicks
  const [xenoClicks, setXenoClicks] = useState(0);

  const handleCanvasClick = () => {
    setXenoClicks((prev) => {
      const newCount = prev + 1;
      if (newCount === 4) {
        setShowJumpscare(true);
        // Sonido jumpscare
        const jumpscareAudio = new Audio("/xenomorph3.mp3");
        jumpscareAudio.volume = 1;
        jumpscareAudio.play();
        setTimeout(() => setShowJumpscare(false), 2000);
        return 0; // Reiniciar contador
      }
      return newCount;
    });

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
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Jumpscare overlay */}
      {showJumpscare && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.2s",
          }}
        >
          <Image
            src="/xeno.webp"
            alt="Jumpscare"
            width={1200}
            height={900}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              filter: "drop-shadow(0 0 40px #000) brightness(1.2)",
              animation: "jumpscare-pop 0.3s ease"
            }}
            className="rounded"
            priority
            unoptimized
          />
        </div>
      )}
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          style={{
            position: "absolute",
            display: "flex",
            flexWrap: "nowrap",
            textWrap: "nowrap",
            top: `${Math.min(Math.max(bubble.y, 40), 60)}%`, // Restrict vertical movement
            left: `${bubble.x}%`,
            transform: `translate(-50%, -50%) rotate(${bubble.rotation}deg)`,
            background: "black",
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            animation: "roar-animation 0.5s ease-in-out",
          }}
        >
          {Math.random() > 0.5 ? "Ssssshhh-Krrrkkk!!!!" : "Grrrrrrr!!!!"}
        </span>
      ))}
      <Canvas
        shadows
        camera={{ position: [9, 3, 2], fov: 50 }}
        onClick={handleCanvasClick}
      >
        <ambientLight intensity={0.5} color={threeColor} />
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
        <Suspense fallback={null}>
          <Character />
        </Suspense>
      </Canvas>
      <style jsx>{`
      @keyframes roar-animation {
        0% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        25% {
        transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
        }
        50% {
        transform: translate(-50%, -50%) scale(1.4) rotate(-10deg);
        }
        75% {
        transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
        }
        100% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
      }
      @keyframes jumpscare-pop {
        0% { transform: scale(0.7); opacity: 0; }
        80% { transform: scale(2); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      `}</style>
    </div>
  );
};
