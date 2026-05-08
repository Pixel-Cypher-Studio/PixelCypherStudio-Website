'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

const COLORS = {
  primary: '#d1bcff',
  accent1: '#ff8d8d',
  accent2: '#00fc40',
  accent3: '#8297ff',
  surface: '#1f1f25',
  surfaceHigh: '#2a292f',
};

interface PhysicsCardProps {
  title: string;
  number: string;
  accent: 'red' | 'green' | 'blue';
  icon: string;
}

function Card3D({ title, number, accent, icon }: PhysicsCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [rotated, setRotated] = useState(false);

  const accentColor =
    accent === 'red' ? COLORS.accent1 : accent === 'green' ? COLORS.accent2 : COLORS.accent3;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth rotation on hover
    easing.damp(groupRef.current.rotation, 'y', rotated ? Math.PI / 12 : 0, 0.1, delta);
    easing.damp(groupRef.current.rotation, 'x', hovered ? -Math.PI / 24 : 0, 0.1, delta);

    // Scale effect
    const targetScale = hovered ? 1.05 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Card body */}
        <RoundedBox args={[3.5, 4.5, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={hovered ? COLORS.surfaceHigh : COLORS.surface}
            metalness={0.5}
            roughness={0.5}
          />
        </RoundedBox>

        {/* Accent border */}
        <RoundedBox args={[3.55, 4.55, 0.22]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={accentColor}
            transparent
            opacity={hovered ? 0.3 : 0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Number */}
        <Text
          position={[-1.3, 1.8, 0.15]}
          fontSize={0.4}
          color={accentColor}
          anchorX="center"
          anchorY="middle"
        >
          {number}
        </Text>

        {/* Title */}
        <Text
          position={[0, 0.5, 0.15]}
          fontSize={0.35}
          color={COLORS.primary}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {title.toUpperCase()}
        </Text>

        {/* Icon placeholder */}
        <mesh position={[0, -1, 0.15]}>
          {icon === 'design' ? (
            <torusGeometry args={[0.4, 0.1, 16, 32]} />
          ) : icon === 'motion' ? (
            <boxGeometry args={[0.5, 0.5, 0.5]} />
          ) : (
            <sphereGeometry args={[0.4, 32, 32]} />
          )}
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
        </mesh>

        {/* Corner decorations */}
        {[
          [-1.6, 2, 0.15],
          [1.6, 2, 0.15],
          [-1.6, -2, 0.15],
          [1.6, -2, 0.15],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={hovered ? 2 : 0.5}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function PhysicsCard({
  title,
  number,
  accent,
  icon,
}: PhysicsCardProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '280px',
        position: 'relative',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        style={{
          position: 'absolute',
          inset: 0,
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -5]} intensity={1} />
        
        <Card3D title={title} number={number} accent={accent} icon={icon} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
