'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, PointMaterial, Points, Trail } from '@react-three/drei';
import { Vector3, MathUtils, Color, Object3D, Mesh, Group, Points as ThreePoints } from 'three';
import { motion, useSpring, useTransform } from 'framer-motion';
import useInteractionTracker from '../../hooks/useInteractionTracker';
import '../../styles/background-effects.css';

// Types for component props
interface FluidBlobProps {
    position: [number, number, number];
    color: string;
    scale?: number;
    speed?: number;
    distort?: number;
    mouse: {
        normalized: {
            x: number;
            y: number;
        }
    };
    scroll: {
        normalized: number;
    };
    index: number;
}

interface ParticleFieldProps {
    count?: number;
    mouse: {
        normalized: {
            x: number;
            y: number;
        }
    };
    scroll: {
        normalized: number;
    };
}

interface MouseLightProps {
    mouse: {
        normalized: {
            x: number;
            y: number;
        }
    };
}

interface SceneProps {
    interaction: {
        mouse: {
            normalized: {
                x: number;
                y: number;
            }
        };
        scroll: {
            normalized: number;
        };
    };
}

// Fluid blob component with distortion
const FluidBlob = ({
    position,
    color,
    scale = 1,
    speed = 0.3,
    distort = 0.4,
    mouse,
    scroll,
    index
}: FluidBlobProps) => {
    // Use any type for the mesh ref to avoid TypeScript errors
    const mesh = useRef<any>(null);
    const [hovered, setHovered] = useState(false);
    const time = useRef(Math.random() * 100);
    const originalPosition = useRef(new Vector3(...position));

    // Animation on each frame
    useFrame((state) => {
        if (!mesh.current) return;

        time.current += state.clock.getDelta() * speed;

        // Gentle floating motion
        const floatX = Math.sin(time.current) * 0.2;
        const floatY = Math.cos(time.current * 0.8) * 0.2;

        // Gentle rotation
        mesh.current.rotation.x = MathUtils.lerp(
            mesh.current.rotation.x,
            scroll.normalized * 0.5 + floatY * 0.5,
            0.03
        );
        mesh.current.rotation.y = MathUtils.lerp(
            mesh.current.rotation.y,
            time.current * 0.05 + floatX * 0.5,
            0.03
        );

        // Subtle scale animation based on hover and scroll
        const targetScale = scale * (hovered ? 1.15 : 1) * (1 + Math.sin(time.current * 0.3) * 0.05);
        mesh.current.scale.x = MathUtils.lerp(mesh.current.scale.x, targetScale, 0.05);
        mesh.current.scale.y = MathUtils.lerp(mesh.current.scale.y, targetScale, 0.05);
        mesh.current.scale.z = MathUtils.lerp(mesh.current.scale.z, targetScale, 0.05);

        // Mouse influence - stronger when hovered
        const mouseStrength = hovered ? 0.2 : 0.08;
        const targetX = originalPosition.current.x + mouse.normalized.x * mouseStrength + floatX;
        const targetY = originalPosition.current.y + mouse.normalized.y * mouseStrength + floatY;

        mesh.current.position.x = MathUtils.lerp(mesh.current.position.x, targetX, 0.03);
        mesh.current.position.y = MathUtils.lerp(mesh.current.position.y, targetY, 0.03);

        // Scroll influence - different for each blob
        const scrollOffset = scroll.normalized * (index % 2 === 0 ? 0.5 : -0.3);
        mesh.current.position.z = MathUtils.lerp(
            mesh.current.position.z,
            originalPosition.current.z + scrollOffset,
            0.05
        );
    });

    return (
        <mesh
            ref={mesh}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
                color={color}
                speed={speed * 2}
                distort={hovered ? distort * 1.5 : distort}
                radius={1}
                roughness={0.6}
                metalness={0.1}
                opacity={0.7}
                transparent={true}
                envMapIntensity={0.4}
            />
        </mesh>
    );
};

// Particle field component
const ParticleField = ({ count = 500, mouse, scroll }: ParticleFieldProps) => {
    const points = useRef<ThreePoints>(null);

    // Generate random points
    const particlePositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Distribute particles in a sphere
            const radius = 7 + Math.random() * 5;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            sizes[i] = Math.random() * 0.5 + 0.1;
        }

        return { positions, sizes };
    }, [count]);

    // Animate particles
    useFrame((state) => {
        if (!points.current) return;

        // Rotate the entire particle field slowly
        points.current.rotation.y += 0.001;
        points.current.rotation.x = MathUtils.lerp(
            points.current.rotation.x,
            scroll.normalized * 0.2,
            0.01
        );

        // Subtle mouse influence
        points.current.rotation.x += mouse.normalized.y * 0.0005;
        points.current.rotation.y += mouse.normalized.x * 0.0005;
    });

    return (
        <Points ref={points} positions={particlePositions.positions} sizes={particlePositions.sizes}>
            <PointMaterial
                transparent
                color="#EAE4D5"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
};

// Moving light that follows the mouse
const MouseLight = ({ mouse }: MouseLightProps) => {
    // Use any type for the light ref to avoid TypeScript errors
    const light = useRef<any>(null);

    useFrame(() => {
        if (!light.current) return;

        // Position light based on mouse
        light.current.position.x = mouse.normalized.x * 5;
        light.current.position.y = mouse.normalized.y * 5;
    });

    return (
        <pointLight
            ref={light}
            position={[0, 0, 2]}
            intensity={0.8}
            color="#EAE4D5"
            distance={10}
        />
    );
};

// Scene setup
const Scene = ({ interaction }: SceneProps) => {
    const { camera } = useThree();
    const { mouse, scroll } = interaction;

    // Colors from the theme with slight variations
    const colors = [
        '#F2F2F2', // Primary
        '#EAE4D5', // Accent
        '#B6B09F', // Secondary
        '#D8D0C0', // Accent variation
        '#A9A295'  // Secondary variation
    ];

    useEffect(() => {
        // Set initial camera position
        camera.position.z = 6;
    }, [camera]);

    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.3} />
            <MouseLight mouse={mouse} />

            {/* Particle field in the background */}
            <ParticleField count={300} mouse={mouse} scroll={scroll} />

            {/* Multiple fluid blobs with different positions, colors and behaviors */}
            {[
                { pos: [-1.8, 0.7, -1] as [number, number, number], color: colors[0], scale: 1.2, speed: 0.2, distort: 0.3 },
                { pos: [1.7, -0.6, -2] as [number, number, number], color: colors[1], scale: 0.9, speed: 0.3, distort: 0.4 },
                { pos: [0.2, -1.4, -0.5] as [number, number, number], color: colors[2], scale: 1.1, speed: 0.25, distort: 0.35 },
                { pos: [2.2, 1.3, -3] as [number, number, number], color: colors[3], scale: 0.7, speed: 0.35, distort: 0.5 },
                { pos: [-2.3, -1.2, -2.5] as [number, number, number], color: colors[4], scale: 0.8, speed: 0.15, distort: 0.45 },
                { pos: [0.5, 1.8, -1.8] as [number, number, number], color: colors[0], scale: 0.6, speed: 0.28, distort: 0.38 },
                { pos: [-1.2, -0.8, -1.2] as [number, number, number], color: colors[1], scale: 0.75, speed: 0.22, distort: 0.42 }
            ].map((blob, index) => (
                <FluidBlob
                    key={index}
                    position={blob.pos}
                    color={blob.color}
                    scale={blob.scale}
                    speed={blob.speed}
                    distort={blob.distort}
                    mouse={mouse}
                    scroll={scroll}
                    index={index}
                />
            ))}
        </>
    );
};

// Main component
const FluidBackground = () => {
    const [isClient, setIsClient] = useState(false);
    const interaction = useInteractionTracker();

    // Mouse position for gradient effect
    const mouseX = useSpring(0, { damping: 30, stiffness: 50 });
    const mouseY = useSpring(0, { damping: 30, stiffness: 50 });

    // Update spring values when mouse moves
    useEffect(() => {
        mouseX.set(interaction.mouse.normalized.x * 100);
        mouseY.set(interaction.mouse.normalized.y * 100);
    }, [interaction.mouse.normalized.x, interaction.mouse.normalized.y, mouseX, mouseY]);

    // Transform mouse position to gradient position
    const gradientX = useTransform(
        mouseX,
        [-100, 100],
        ['45%', '55%']
    );

    const gradientY = useTransform(
        mouseY,
        [-100, 100],
        ['45%', '55%']
    );

    useEffect(() => {
        // Only run on client-side
        setIsClient(true);
    }, []);

    // We're using dynamic import with SSR disabled, so this component will only run on the client

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            {/* Canvas for 3D elements */}
            <Canvas dpr={[1, 2]} style={{ background: 'transparent' }}>
                <Scene interaction={interaction} />
            </Canvas>

            {/* Gradient overlay that follows mouse */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 100%)',
                    backgroundPosition: `${gradientX} ${gradientY}`,
                }}
            />

            {/* Vignette effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.8)',
                }}
            />

            {/* Subtle noise texture overlay */}
            <div className="noise-overlay" />

            {/* Glow effect that follows mouse */}
            <motion.div
                className="glow-effect"
                style={{
                    left: interaction.mouse.x,
                    top: interaction.mouse.y,
                    opacity: interaction.mouse.x > 0 ? 0.7 : 0,
                }}
            />
        </motion.div>
    );
};

export default FluidBackground;