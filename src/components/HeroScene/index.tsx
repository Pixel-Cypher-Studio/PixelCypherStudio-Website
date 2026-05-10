'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './HeroScene.module.scss';

interface ImageOrbital {
  mesh: THREE.Mesh;
  angle: number;
  radius: number;
  speed: number;
  yOffset: number;
  floatSpeed: number;
  floatAmp: number;
  rotationSpeed: number;
  baseY: number;
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    let width = mount.clientWidth;
    let height = mount.clientHeight;
    let animationFrameId = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let targetRotationX = 0.18;
    let targetRotationY = -0.22;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.x = -3;
    camera.position.z = 12;

    const group = new THREE.Group();
    scene.add(group);

    const labelsGroup = new THREE.Group();
    group.add(labelsGroup);

    const geometry = new THREE.IcosahedronGeometry(1.65, 1);
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({
        color: 0x5b8cff,
        transparent: true,
        opacity: 0.32,
      })
    );

    const core = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.045,
      })
    );

    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0x6effc6,
        size: 0.038,
        transparent: true,
        opacity: 0.85,
      })
    );

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.025, 10, 96),
      new THREE.MeshBasicMaterial({
        color: 0xff4d6d,
        transparent: true,
        opacity: 0.2,
      })
    );

    ring.rotation.x = 1.12;
    ring.rotation.y = 0.22;

    const markerPositions = [
      { label: 'GRAPHIC DESIGN', color: '#ff4d6d', position: new THREE.Vector3(1.7, 1.15, 0.6), image: '#' },
      { label: 'MOTION GRAPHICS', color: '#6effc6', position: new THREE.Vector3(-1.95, 0.15, -0.35), image: '#' },
      { label: 'WEB DEVELOPMENT', color: '#5b8cff', position: new THREE.Vector3(0.45, -1.85, 0.9), image: '#' },
    ];

    const markerTextures: THREE.Texture[] = [];
    const markerMaterials: THREE.Material[] = [];
    const markerGeometries: THREE.BufferGeometry[] = [];

    function createLabelSprite(text: string, color: string) {
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 256;
      labelCanvas.height = 80;
      const labelContext = labelCanvas.getContext('2d');

      if (!labelContext) {
        return null;
      }

      labelContext.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
      labelContext.fillStyle = 'rgba(9, 12, 18, 0.58)';
      labelContext.strokeStyle = color;
      labelContext.lineWidth = 2;
      labelContext.beginPath();
      labelContext.roundRect(8, 10, 240, 54, 12);
      labelContext.fill();
      labelContext.stroke();
      labelContext.font = "600 24px 'Space Grotesk', sans-serif";
      labelContext.textAlign = 'center';
      labelContext.textBaseline = 'middle';
      labelContext.fillStyle = '#f5f7fb';
      labelContext.fillText(text, labelCanvas.width / 2, labelCanvas.height / 2 + 1);

      const texture = new THREE.CanvasTexture(labelCanvas);
      texture.needsUpdate = true;
      markerTextures.push(texture);

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.92,
        depthTest: false,
      });

      markerMaterials.push(material);

      const sprite = new THREE.Sprite(material);
      sprite.scale.set(1.75, 0.55, 1);
      return sprite;
    }

    markerPositions.forEach(({ label, color, position }) => {
      const pointGeometry = new THREE.SphereGeometry(0.04, 12, 12);
      const pointMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.copy(position);

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        position,
        new THREE.Vector3(position.x * 1.18, position.y * 1.18, position.z * 1.18),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 });
      const line = new THREE.Line(lineGeometry, lineMaterial);

      const labelSprite = createLabelSprite(label, color);
      if (labelSprite) {
        labelSprite.position.set(position.x * 1.32, position.y * 1.32, position.z * 1.32);
        labelsGroup.add(labelSprite);
      }

      markerGeometries.push(pointGeometry, lineGeometry);
      markerMaterials.push(pointMaterial, lineMaterial);
      labelsGroup.add(point);
      labelsGroup.add(line);
    });

    group.add(core);
    group.add(points);
    group.add(wireframe);
    group.add(ring);

    // ── Floating Image Planes ────────────────────────────────────
    const imageOrbitals: ImageOrbital[] = [];
    // const imageUrls = [
    //   '/images/philosophy/studio-abstract.jpg',
    //   '/images/philosophy/studio-wave.jpg',
    //   '/images/philosophy/studio-main.jpg',
    //   '/images/logo/pcslogo1.png',
    // ];

    const loader = new THREE.TextureLoader();

    // imageUrls.forEach((url, index) => {
    //   loader.load(url, (texture) => {
    //     const aspect = texture.image.width / texture.image.height;
    //     const baseWidth = 1.0;
    //     const planeWidth = baseWidth;
    //     const planeHeight = baseWidth / aspect;

    //     const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);

    //     const planeMat = new THREE.MeshBasicMaterial({
    //       map: texture,
    //       transparent: true,
    //       opacity: 0.45,
    //       depthWrite: false,
    //       side: THREE.DoubleSide,
    //     });

    //     const mesh = new THREE.Mesh(planeGeo, planeMat);

    //     const angleOffset = (index / imageUrls.length) * Math.PI * 2;
    //     const radius = 2.8 + Math.random() * 0.6;
    //     const yBase = (Math.random() - 0.5) * 3.5;

    //     mesh.position.set(
    //       Math.cos(angleOffset) * radius,
    //       yBase,
    //       Math.sin(angleOffset) * radius
    //     );

    //     mesh.lookAt(0, 0, 0);
    //     mesh.userData = { opacity: 0.45 + Math.random() * 0.2 };

    //     markerGeometries.push(planeGeo);
    //     markerMaterials.push(planeMat);
    //     markerTextures.push(texture);

    //     group.add(mesh);

    //     imageOrbitals.push({
    //       mesh,
    //       angle: angleOffset,
    //       radius,
    //       speed: 0.0015 + Math.random() * 0.0015,
    //       yOffset: (Math.random() - 0.5) * 2.0,
    //       floatSpeed: 0.0004 + Math.random() * 0.0006,
    //       floatAmp: 0.15 + Math.random() * 0.2,
    //       rotationSpeed: 0.0003 + Math.random() * 0.0003,
    //       baseY: yBase,
    //     });
    //   });
    // });

    // ── Event handlers ──────────────────────────────────────────
    const resize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      lastPointerX = normalizedX;
      lastPointerY = normalizedY;
      targetRotationY = normalizedX * 0.32;
      targetRotationX = -normalizedY * 0.2;
    };

    const handlePointerLeave = () => {
      targetRotationX = 0.18;
      targetRotationY = -0.22;
      lastPointerX = 0;
      lastPointerY = 0;
    };

    // ── Animate loop ────────────────────────────────────────────
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      group.rotation.x += (targetRotationX - group.rotation.x) * 0.04;
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.04;
      group.rotation.z += 0.0024;

      ring.rotation.z += 0.0036;
      ring.position.x = Math.sin(performance.now() * 0.00055) * 0.12 + lastPointerX * 0.08;
      ring.position.y = Math.cos(performance.now() * 0.00045) * 0.1 - lastPointerY * 0.06;

      labelsGroup.rotation.y += 0.001;
      labelsGroup.rotation.x -= 0.00045;

      points.rotation.y -= 0.0015;
      points.rotation.x += 0.0009;

      // Animate floating image planes
      const now = performance.now();
      imageOrbitals.forEach((orb) => {
        orb.angle += orb.speed;
        orb.mesh.position.x = Math.cos(orb.angle) * orb.radius;
        orb.mesh.position.z = Math.sin(orb.angle) * orb.radius;
        orb.mesh.position.y = orb.baseY + Math.sin(now * orb.floatSpeed) * orb.floatAmp;

        orb.mesh.rotation.x += Math.sin(now * 0.0005) * 0.001;
        orb.mesh.rotation.y += 0.003;
        orb.mesh.rotation.z += Math.cos(now * 0.0004) * 0.0005;
      });

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);

      geometry.dispose();
      wireframe.geometry.dispose();
      (wireframe.material as THREE.Material).dispose();
      (core.material as THREE.Material).dispose();
      (points.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      markerGeometries.forEach((item) => item.dispose());
      markerMaterials.forEach((item) => item.dispose());
      markerTextures.forEach((item) => item.dispose());
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.scene} aria-hidden="true" />;
}