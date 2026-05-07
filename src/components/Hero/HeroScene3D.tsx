'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial, Sphere, Torus, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

const COLORS = {
  primary: '#d1bcff',
  accent1: '#ff8d8d',
  accent2: '#00fc40',
  accent3: '#8297ff',
  surface: '#131318',
};

function InteractiveLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const elapsedTimeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    elapsedTimeRef.current = state.clock.elapsedTime;
    easing.damp3(groupRef.current.scale, active ? [1.2, 1.2, 1.2] : [1, 1, 1], 0.1, delta);
    
    if (hovered) {
      groupRef.current.rotation.x += delta * 0.5;
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <><group ref={groupRef} position={position}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Outer ring */}
        <Torus
          args={[1.5, 0.15, 32, 64]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setActive(!active)}
        >
          <MeshDistortMaterial
            color={COLORS.accent1}
            emissive={COLORS.accent1}
            emissiveIntensity={hovered ? 2 : 0.5}
            distort={0.3}
            speed={2} />
        </Torus>

        {/* Middle ring */}
        <Torus
          args={[1, 0.1, 32, 64]}
          rotation={[Math.PI / 2, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setActive(!active)}
        >
          <MeshDistortMaterial
            color={COLORS.accent2}
            emissive={COLORS.accent2}
            emissiveIntensity={hovered ? 2 : 0.5}
            distort={0.4}
            speed={3} />
        </Torus>

        {/* Inner ring */}
        <Torus
          args={[0.6, 0.08, 32, 64]}
          rotation={[0, Math.PI / 2, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setActive(!active)}
        >
          <MeshDistortMaterial
            color={COLORS.accent3}
            emissive={COLORS.accent3}
            emissiveIntensity={hovered ? 2 : 0.5}
            distort={0.5}
            speed={4} />
        </Torus>

        {/* Center sphere */}
        <Sphere args={[0.4, 64, 64]}>
          <meshStandardMaterial
            color={COLORS.primary}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1} />
        </Sphere>

        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => {
          const elapsed = elapsedTimeRef.current;
          return (
            <mesh
              key={i}
              position={[
                Math.cos((i / 8) * Math.PI * 2 + elapsed) * 2,
                Math.sin((i / 8) * Math.PI * 2 + elapsed * 0.8) * 2,
                Math.sin((i / 8) * Math.PI * 2) * 0.5,
              ]}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? COLORS.accent1 : i % 3 === 1 ? COLORS.accent2 : COLORS.accent3} />
            </mesh>
          );
        })}
    </Float><ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4.5} />
    </group></>
  );
}

function AnimatedText() {
  return (
    <Text
      font="https://fonts.gstatic.com/s/spacegrotesk/v22/8gYq8FhJX9qJQqJQ8FhJX9qJQqJQ.woff2"
      fontSize={0.5}
      color={COLORS.primary}
      anchorX="center"
      anchorY="middle"
    >
      PIXELCYPHER
      <meshStandardMaterial
        color={COLORS.primary}
        emissive={COLORS.primary}
        emissiveIntensity={0.5}
      />
    </Text>
  );
}

export default function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'auto',
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} color={COLORS.primary} />
      <pointLight position={[-10, -10, -10]} intensity={1} color={COLORS.accent2} />
      <spotLight position={[0, 5, 5]} intensity={2} color={COLORS.accent3} angle={0.5} />
      
      <group position={[0, -0.5, 0]}>
        <InteractiveLogo position={[0, 0, 0]} />
      </group>
      
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.5}
        scale={20}
        blur={3}
        far={10}
      />
    </Canvas>
  );
}
