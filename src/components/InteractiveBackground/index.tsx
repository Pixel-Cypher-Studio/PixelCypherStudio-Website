'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import styles from './InteractiveBackground.module.scss';

const COLORS = {
  primary: '#d1bcff',
  accent1: '#ff8d8d',
  accent2: '#00fc40',
  accent3: '#8297ff',
  bg: '#000000',
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
          args={[new Float32Array(particles.length * 3), 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[new Float32Array(particles.length * 3), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.2}
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
      />
    </group>
  );
}


export default function InteractiveBackground() {
  return (
    <div className={styles.wrapper}>
      <Canvas
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField count={150} />
        <AnimatedStars />
      </Canvas>
    </div>
  );
}
