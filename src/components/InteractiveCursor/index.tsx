'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './InteractiveCursor.module.scss';

export default function InteractiveCursor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Mesh[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Create cursor follower particles
      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const colors = ['#ff8d8d', '#00fc40', '#8297ff', '#d1bcff'];

      for (let i = 0; i < 5; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.8 - i * 0.15,
        });

        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 2
        );
        scene.add(particle);
        particles.push(particle);
      }

      // Mouse move handler
      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);

      animate();
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      particles.forEach((particle, i) => {
        const targetXPos = targetX * 3 - i * 0.3;
        const targetYPos = targetY * 3 - i * 0.3;

        particle.position.x += (targetXPos - particle.position.x) * 0.1;
        particle.position.y += (targetYPos - particle.position.y) * 0.1;

        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;

        particle.scale.setScalar(1 + Math.sin(Date.now() * 0.002 + i) * 0.2);
      });

      renderer.render(scene, camera);
    };

    init();

    return () => {
      if (renderer && container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
