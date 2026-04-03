// src/components/Scene.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

function QuantumMonolith({ isMobile }: { isMobile: boolean }) {
  const monolithRef = useRef<THREE.Group>(null);
  const coreRingsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // 1. Drastically reduce particles for mobile GPUs
  const particleCount = isMobile ? 400 : 2000;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * (isMobile ? 10 : 25);
      positions[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 15 : 25);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [isMobile, particleCount]);

  // 2. Scale down the geometry to fit portrait screens
  const monolithArgs = isMobile ? [5, 9, 1] as const : [12, 18, 1.5] as const;
  const ringScale = isMobile ? 0.6 : 1;

  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollProgress = Math.min(scrollY / maxScroll, 1);

    if (monolithRef.current) {
      const targetRotationY = scrollProgress * Math.PI * 2;
      monolithRef.current.rotation.y += (targetRotationY - monolithRef.current.rotation.y) * 0.05;

      // Don't pull the object as close to the camera on mobile to avoid clipping
      const targetZ = (scrollProgress > 0.2 && scrollProgress < 0.8) ? (isMobile ? 1 : 4) : 0;
      monolithRef.current.position.z += (targetZ - monolithRef.current.position.z) * 0.05;

      monolithRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * (isMobile ? 0.1 : 0.3);
    }

    if (coreRingsRef.current) {
      coreRingsRef.current.rotation.x -= delta * 0.15;
      coreRingsRef.current.rotation.y += delta * 0.2;
      coreRingsRef.current.rotation.z += delta * 0.08;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
      </points>

      <group ref={monolithRef}>
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
          <mesh>
            <boxGeometry args={monolithArgs} />
            {/* 3. The Big Saver: Cheap native glass for mobile, complex shader for desktop */}
            {isMobile ? (
              <meshPhysicalMaterial
                color="#a0a0a0"
                transmission={1}
                opacity={1}
                metalness={0}
                roughness={0.1}
                ior={1.2}
                thickness={1}
              />
            ) : (
              <MeshTransmissionMaterial
                backside={true} thickness={2.5} roughness={0.05} transmission={1}
                ior={1.4} chromaticAberration={0.08} anisotropy={0.4} color="#a0a0a0"
                clearcoat={1} distortion={0.2} distortionScale={0.3} temporalDistortion={0.05}
              />
            )}
          </mesh>

          <group ref={coreRingsRef} scale={ringScale}>
            <mesh>
              <torusGeometry args={[3.5, 0.02, 16, 50]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.8, 0.015, 16, 50]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
            <mesh>
              <octahedronGeometry args={[0.8, 0]} />
              <meshStandardMaterial color="#000000" emissive="#ffffff" emissiveIntensity={0.8} wireframe={true} />
            </mesh>
          </group>
        </Float>
      </group>
    </>
  );
}

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      // 4. DPR Capping: Forces high-res phones to render at 1x-1.5x resolution instead of 3x. This stops the melting.
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, isMobile ? 12 : 9], fov: 50 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={2.5} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={1.5} color="#4444ff" />

      <QuantumMonolith isMobile={isMobile} />
    </Canvas>
  );
}