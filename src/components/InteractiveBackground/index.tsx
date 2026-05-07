'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

const COLORS = {
  primary: '#d1bcff',
  accent1: '#ff8d8d',
  accent2: '#00fc40',
  accent3: '#8297ff',
  bg: '#131318',
};

function ParticleField({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
        color: [COLORS.accent1, COLORS.accent2, COLORS.accent3, COLORS.primary][
          Math.floor(Math.random() * 4)
        ],
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.02;

    easing.damp(
      ref.current.rotation,
      'y',
      hovered ? 0.5 : 0,
      0.1,
      delta
    );

    const positions = ref.current.geometry.attributes.position.array;
    const colors = ref.current.geometry.attributes.color.array;

    particles.forEach((particle, i) => {
      const i3 = i * 3;
      
      particle.y += Math.sin(state.clock.elapsedTime * particle.speed + particle.x) * 0.01;
      particle.x += Math.cos(state.clock.elapsedTime * 0.3 + particle.y) * 0.005;

      positions[i3] = particle.x;
      positions[i3 + 1] = particle.y;
      positions[i3 + 2] = particle.z;

      const color = new THREE.Color(particle.color);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    });

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.length * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.length * 3}
          array={new Float32Array(particles.length * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AnimatedStars() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z -= delta * 0.02;
    }
  });

  return (
    <group ref={ref}>
      <Stars
        radius={50}
        depth={50}
        count={500}
        factor={10}
        saturation={0}
        fade
        speed={1}
        color={COLORS.primary}
      />
    </group>
  );
}

function FloatingOrbs() {
  const orbs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state, delta) => {
    orbs.current.forEach((orb, i) => {
      if (orb) {
        orb.position.y += Math.sin(state.clock.elapsedTime + i) * 0.005;
        orb.position.x += Math.cos(state.clock.elapsedTime * 0.5 + i * 2) * 0.003;
        orb.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1);
      }
    });
  });

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Float
          key={i}
          speed={2 + i * 0.5}
          rotationIntensity={1 + i * 0.2}
          floatIntensity={2 + i * 0.5}
        >
          <mesh ref={(el) => el && (orbs.current[i] = el)}>
            <sphereGeometry args={[0.3 + i * 0.1, 32, 32]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? COLORS.accent1 : i % 3 === 1 ? COLORS.accent2 : COLORS.accent3}
              emissive={i % 3 === 0 ? COLORS.accent1 : i % 3 === 1 ? COLORS.accent2 : COLORS.accent3}
              emissiveIntensity={0.5}
              transparent
              opacity={0.15}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function InteractiveBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.4,
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField count={150} />
        <AnimatedStars />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
