import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaRegSmileWink } from "react-icons/fa";
import * as THREE from 'three';

function HipHopFBX() {
    const group = useRef<THREE.Group>(null);
    const mixer = useRef<THREE.AnimationMixer | null>(null);
    const [model, setModel] = React.useState<THREE.Group | null>(null);

    useEffect(() => {
        let mounted = true;
        let loader: any;
        // Import dinámico del FBXLoader
        import('three/examples/jsm/loaders/FBXLoader.js').then((mod) => {
            loader = new mod.FBXLoader();
            loader.load('/hip-hop.fbx', (fbx: THREE.Group & { animations?: THREE.AnimationClip[] }) => {
                if (!mounted) return;
                setModel(fbx);
                if (fbx.animations && fbx.animations.length > 0) {
                    mixer.current = new THREE.AnimationMixer(fbx);
                    mixer.current.clipAction(fbx.animations[0]).play();
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
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[120px] animate-bounce text-yellow-400 drop-shadow-lg mb-4">
                {/* <FaRegSmileWink /> */}
            </span>
            <div className="w-[100%] h-[50%] bg-transparent">
                <Suspense fallback={<SkeletonLoader />}>
                    <Canvas camera={{ position: [500, 250, 100], fov: 100 }}>
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[2, 5, 2]} intensity={1.2} />
                        <HipHopFBX />
                        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={2} />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
}
