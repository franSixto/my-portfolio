"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

const FirstPersonGame: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
    });

    const [velocity, setVelocity] = useState(new THREE.Vector3());
    const [isOnGround, setIsOnGround] = useState(true);

    // Handle keydown and keyup events
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    setMovement((prev) => ({ ...prev, forward: true }));
                    break;
                case "ArrowDown":
                case "KeyS":
                    setMovement((prev) => ({ ...prev, backward: true }));
                    break;
                case "ArrowLeft":
                case "KeyA":
                    setMovement((prev) => ({ ...prev, left: true }));
                    break;
                case "ArrowRight":
                case "KeyD":
                    setMovement((prev) => ({ ...prev, right: true }));
                    break;
                case "Space":
                    if (isOnGround) {
                        setMovement((prev) => ({ ...prev, jump: true }));
                        setIsOnGround(false);
                    }
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    setMovement((prev) => ({ ...prev, forward: false }));
                    break;
                case "ArrowDown":
                case "KeyS":
                    setMovement((prev) => ({ ...prev, backward: false }));
                    break;
                case "ArrowLeft":
                case "KeyA":
                    setMovement((prev) => ({ ...prev, left: false }));
                    break;
                case "ArrowRight":
                case "KeyD":
                    setMovement((prev) => ({ ...prev, right: false }));
                    break;
                case "Space":
                    setMovement((prev) => ({ ...prev, jump: false }));
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isOnGround]);

    const CameraController = () => {
        const { camera } = useThree();

        useFrame(() => {
            const speed = 0.1;
            const gravity = 0.01;
            const jumpStrength = 0.2;
            const direction = new THREE.Vector3();

            if (movement.forward) direction.z -= speed;
            if (movement.backward) direction.z += speed;
            if (movement.left) direction.x -= speed;
            if (movement.right) direction.x += speed;

            // Apply jump
            if (movement.jump) {
                setVelocity((prev) => new THREE.Vector3(prev.x, jumpStrength, prev.z));
            }

            // Apply gravity
            setVelocity((prev) => new THREE.Vector3(prev.x, prev.y - gravity, prev.z));

            // Update camera position
            camera.position.add(direction);
            camera.position.y += velocity.y;

            // Check if on ground
            if (camera.position.y <= 1) {
                camera.position.y = 1;
                setIsOnGround(true);
                setVelocity(new THREE.Vector3(velocity.x, 0, velocity.z));
            }
        });

        return null;
    };

    return (
        <div
            ref={canvasRef}
            style={{
                width: "100%",
                height: "400px",
                background: "black",
                overflow: "hidden",
            }}
        >
            <Canvas>
                {/* Camera Controller */}
                <CameraController />

                {/* Lights */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="gray" />
                </mesh>

                {/* Example Cube */}
                <mesh position={[0, 0.5, -5]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="red" />
                </mesh>

                {/* Controls */}
                <PointerLockControls />
            </Canvas>
        </div>
    );
};

export default FirstPersonGame;