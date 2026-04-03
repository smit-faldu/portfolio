"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle, majestic tumbling
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 2]}>
        {/* A sharp octahedron representing a monolithic crystal */}
        <octahedronGeometry args={[2.5, 0]} />
        <MeshTransmissionMaterial
          backside={true}
          thickness={2.5}
          roughness={0.05}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function GlowingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {/* Abstract orbs providing pure light data for the crystal to refract */}
      <mesh position={[-3, 2, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[3, -2, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 1, -2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#444444" />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#555555" />
        
        <GlowingOrbs />
        <Crystal />
      </Canvas>
    </div>
  );
}
