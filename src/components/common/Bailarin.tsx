import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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
            loader.load('/hip-hop.fbx', (fbx: unknown) => {
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

function SkeletonLoader() {
    return (
        <div className="w-[300px] h-[300px] flex items-center justify-center">
            <div className="animate-pulse w-24 h-24 rounded-full bg-yellow-200 opacity-60" />
        </div>
    );
}

export default function Bailarin() {
    return (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none w-screen h-screen">
            <div className="w-full h-full bg-transparent">
                <Suspense fallback={<SkeletonLoader />}>
                    <Canvas camera={{ position: [-100, 400, -300], fov: 100 }}>
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[2, 5, 2]} intensity={5} />
                        <HipHopFBX />
                        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={2} />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
}
