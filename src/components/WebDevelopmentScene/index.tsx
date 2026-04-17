'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './WebDevelopmentScene.module.scss';

type WorkerState = 'idle' | 'walking' | 'building';

type Particle = {
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
};

type BuildRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
} | null;

type BuildState = {
  message: string;
  progress: number;
  phase: 'walking' | 'building' | 'complete';
  sectionIndex: number;
};

type Props = {
  buildRect: BuildRect;
  buildState: BuildState;
};

export default function WebDevelopmentScene({ buildRect, buildState }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const hudMessageRef = useRef<HTMLDivElement | null>(null);
  const hudFillRef = useRef<HTMLDivElement | null>(null);
  const latestBuildStateRef = useRef(buildState);
  const latestBuildRectRef = useRef<BuildRect>(buildRect);

  latestBuildStateRef.current = buildState;
  latestBuildRectRef.current = buildRect;

  useEffect(() => {
    const canvas = canvasRef.current;
    const hud = hudRef.current;
    const hudMessage = hudMessageRef.current;
    const hudFill = hudFillRef.current;

    if (!canvas || !hud || !hudMessage || !hudFill) {
      return;
    }

    const hudElement = hud;
    const hudMessageElement = hudMessage;
    const hudFillElement = hudFill;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    let lastFrameTime = 0;
    let backgroundTime = 0;
    let lastScaffoldSignature = '';

    const isLightTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light';

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -10, 10);
    scene.add(camera);

    const gridGroup = new THREE.Group();
    const scaffoldGroup = new THREE.Group();
    scene.add(gridGroup);
    scene.add(scaffoldGroup);

const gridMaterial = new THREE.LineBasicMaterial({
  color: isLightTheme() ? 0xd85a24 : 0xff6b35,
  transparent: true,
  opacity: isLightTheme() ? 0.08 : 0.11,
});

const scaffoldMaterial = new THREE.LineBasicMaterial({
  color: isLightTheme() ? 0xd85a24 : 0xff6b35,
  transparent: true,
  opacity: isLightTheme() ? 0.18 : 0.24,
});

    const gridLines: THREE.Line[] = [];
    const columns = 8;
    const rows = 5;

    function rebuildGrid() {
      while (gridGroup.children.length > 0) {
        const child = gridGroup.children[0] as THREE.Line;
        child.geometry.dispose();
        gridGroup.remove(child);
      }

      gridLines.length = 0;

      for (let index = 0; index <= columns; index += 1) {
        const x = (width / columns) * index;
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, 0, 0),
          new THREE.Vector3(x, height, 0),
        ]);
        const line = new THREE.Line(geometry, gridMaterial);
        gridLines.push(line);
        gridGroup.add(line);
      }

      for (let index = 0; index <= rows; index += 1) {
        const y = (height / rows) * index;
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, y, 0),
          new THREE.Vector3(width, y, 0),
        ]);
        const line = new THREE.Line(geometry, gridMaterial);
        gridLines.push(line);
        gridGroup.add(line);
      }
    }

    function clearScaffold() {
      while (scaffoldGroup.children.length > 0) {
        const line = scaffoldGroup.children[0] as THREE.Line;
        line.geometry.dispose();
        scaffoldGroup.remove(line);
      }
      lastScaffoldSignature = '';
    }

    function drawScaffold(rect: Exclude<BuildRect, null>) {
      const signature = `${Math.round(rect.left)}:${Math.round(rect.top)}:${Math.round(rect.width)}:${Math.round(rect.height)}`;
      if (signature === lastScaffoldSignature) {
        return;
      }

      clearScaffold();
      lastScaffoldSignature = signature;

      const cols = 6;
      const rowCount = 3;

      for (let index = 0; index <= cols; index += 1) {
        const x = rect.left + (rect.width / cols) * index;
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, height - rect.top, 0),
          new THREE.Vector3(x, height - rect.bottom, 0),
        ]);
        scaffoldGroup.add(new THREE.Line(geometry, scaffoldMaterial));
      }

      for (let index = 0; index <= rowCount; index += 1) {
        const y = rect.top + (rect.height / rowCount) * index;
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(rect.left, height - y, 0),
          new THREE.Vector3(rect.right, height - y, 0),
        ]);
        scaffoldGroup.add(new THREE.Line(geometry, scaffoldMaterial));
      }
    }

    rebuildGrid();

    const workerCanvas = document.createElement('canvas');
    workerCanvas.width = 80;
    workerCanvas.height = 120;
    const workerContext = workerCanvas.getContext('2d');

    if (!workerContext) {
      gridMaterial.dispose();
      scaffoldMaterial.dispose();
      renderer.dispose();
      return;
    }

    const ctx = workerContext;

    ctx.imageSmoothingEnabled = false;

    function pixelRect(x: number, y: number, rectWidth: number, rectHeight: number, color: string) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, rectWidth, rectHeight);
    }

    function drawWorkerFrame(state: WorkerState, frame: 0 | 1, facingLeft: boolean) {
      ctx.clearRect(0, 0, 80, 120);

      if (facingLeft) {
        ctx.save();
        ctx.translate(80, 0);
        ctx.scale(-1, 1);
      }

      const legShift = state === 'walking' ? (frame === 0 ? 7 : -7) : 0;
      pixelRect(18, 80 - legShift, 15, 32 + legShift, '#1E3A8A');
      pixelRect(47, 80 + legShift, 15, 32 - legShift, '#152E72');
      pixelRect(33, 80, 14, 14, '#0e2259');
      pixelRect(13, 108, 23, 8, '#1a1a1a');
      pixelRect(44, 108, 23, 8, '#1a1a1a');
      pixelRect(11, 114, 25, 4, '#2e2e2e');
      pixelRect(42, 114, 25, 4, '#2e2e2e');

      if (state === 'building') {
        if (frame === 0) {
          pixelRect(3, 6, 12, 46, '#FDBCB4');
          pixelRect(-5, 0, 20, 11, '#888');
          pixelRect(5, 11, 6, 22, '#6B3410');
        } else {
          pixelRect(3, 28, 13, 38, '#FDBCB4');
          pixelRect(-2, 60, 20, 11, '#888');
          pixelRect(5, 36, 6, 28, '#6B3410');
        }
        pixelRect(65, 50, 12, 26, '#FDBCB4');
      } else {
        const armShift = state === 'walking' ? (frame === 0 ? -8 : 8) : 0;
        pixelRect(3, 50 - armShift, 12, 30 + Math.abs(armShift), '#FDBCB4');
        pixelRect(65, 50 + armShift, 12, 30 + Math.abs(armShift), '#FDBCB4');
      }

      pixelRect(16, 46, 48, 34, '#FF6B35');
      pixelRect(16, 46, 48, 3, '#FF8C55');
      pixelRect(16, 58, 48, 5, '#FFD700');
      pixelRect(35, 50, 10, 11, '#cc5525');
      pixelRect(37, 52, 6, 6, '#FFD700');
      pixelRect(16, 78, 48, 6, '#7a3d0e');
      pixelRect(36, 76, 8, 10, '#FFD700');
      pixelRect(38, 78, 4, 6, '#b8860b');
      pixelRect(30, 42, 20, 6, '#FDBCB4');
      pixelRect(20, 18, 40, 26, '#FDBCB4');
      pixelRect(20, 18, 2, 26, '#e8a090');
      pixelRect(58, 18, 2, 26, '#e8a090');
      pixelRect(26, 26, 9, 6, '#2C1810');
      pixelRect(46, 26, 9, 6, '#2C1810');
      pixelRect(28, 27, 4, 3, '#fff');
      pixelRect(48, 27, 4, 3, '#fff');
      pixelRect(29, 27, 2, 2, '#111');
      pixelRect(49, 27, 2, 2, '#111');
      pixelRect(24, 22, 11, 3, '#5C3317');
      pixelRect(45, 22, 11, 3, '#5C3317');
      pixelRect(37, 33, 6, 5, '#e8a090');
      pixelRect(29, 39, 22, 3, '#c0806a');
      pixelRect(29, 40, 4, 2, '#e8a090');
      pixelRect(47, 40, 4, 2, '#e8a090');
      pixelRect(18, 4, 44, 16, '#FFD700');
      pixelRect(12, 18, 56, 4, '#FFA500');
      pixelRect(18, 4, 44, 3, '#FFE54C');
      pixelRect(18, 4, 4, 16, '#CC9900');
      pixelRect(28, 4, 8, 16, '#FF4500');
      pixelRect(44, 4, 8, 16, '#FF4500');
      pixelRect(28, 4, 8, 3, '#FF6633');
      pixelRect(44, 4, 8, 3, '#FF6633');

      if (facingLeft) {
        ctx.restore();
      }
    }

    const workerTexture = new THREE.CanvasTexture(workerCanvas);
    workerTexture.magFilter = THREE.NearestFilter;
    workerTexture.minFilter = THREE.NearestFilter;
    const workerMaterial = new THREE.SpriteMaterial({ map: workerTexture, transparent: true, depthTest: false });
    const workerSprite = new THREE.Sprite(workerMaterial);
    scene.add(workerSprite);

    const particlePool: Particle[] = [];
    const activeParticles: Particle[] = [];

    for (let index = 0; index < 32; index += 1) {
      const geometry = new THREE.PlaneGeometry(5, 5);
      const material = new THREE.MeshBasicMaterial({ transparent: true, depthTest: false });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      scene.add(mesh);
      particlePool.push({ mesh, material, velocityX: 0, velocityY: 0, life: 0, maxLife: 0 });
    }

    function emitSparks(x: number, y: number, count = 10) {
      for (let index = 0; index < count; index += 1) {
        const particle = particlePool.find((entry) => entry.life <= 0);
        if (!particle) {
          return;
        }

        particle.mesh.visible = true;
        particle.mesh.position.set(x, y, 2);
        particle.velocityX = (Math.random() - 0.5) * 11;
        particle.velocityY = Math.random() * 9 + 4;
        particle.maxLife = 0.35 + Math.random() * 0.35;
        particle.life = 1;
        particle.material.opacity = 1;
        particle.material.color.setHex(Math.random() > 0.5 ? 0xffd700 : 0xff8c35);
        activeParticles.push(particle);
      }
    }

    function updateParticles(delta: number) {
      for (let index = activeParticles.length - 1; index >= 0; index -= 1) {
        const particle = activeParticles[index];
        particle.life -= delta / particle.maxLife;

        if (particle.life <= 0) {
          particle.mesh.visible = false;
          particle.life = 0;
          activeParticles.splice(index, 1);
          continue;
        }

        particle.mesh.position.x += particle.velocityX;
        particle.mesh.position.y += particle.velocityY;
        particle.velocityY -= 0.55;
        particle.material.opacity = particle.life;
        const scale = particle.life * 6;
        particle.mesh.scale.set(scale, scale, 1);
      }
    }

    const worker = {
      x: -120,
      targetX: width * 0.4,
      speed: 280,
      direction: 1 as 1 | -1,
      state: 'walking' as WorkerState,
      frame: 0 as 0 | 1,
      frameTimer: 0,
      frameDuration: 0.16,
    };

    function updateWorker(delta: number) {
      worker.frameTimer += delta;
      if (worker.frameTimer >= worker.frameDuration) {
        worker.frameTimer = 0;
        worker.frame = worker.frame === 0 ? 1 : 0;
      }

      if (worker.state === 'walking') {
        const distance = worker.targetX - worker.x;
        worker.direction = distance >= 0 ? 1 : -1;
        const step = worker.speed * delta * worker.direction;

        if (Math.abs(distance) <= Math.abs(step)) {
          worker.x = worker.targetX;
        } else {
          worker.x += step;
        }
      }

      if (worker.state === 'building' && worker.frame === 1) {
        const sparkX = worker.direction === 1 ? worker.x - 28 : worker.x + 28;
        emitSparks(sparkX, 74, 1);
      }

      drawWorkerFrame(worker.state, worker.frame, worker.direction === -1);
      workerTexture.needsUpdate = true;

      const spriteScale = width < 580 ? 0.85 : 1.1;
      const spriteWidth = 80 * spriteScale;
      const spriteHeight = 120 * spriteScale;
      workerSprite.scale.set(spriteWidth, spriteHeight, 1);
      workerSprite.position.set(worker.x, 32 + spriteHeight / 2, 1);
    }

   function syncFromBuildState() {
  const currentBuildState = latestBuildStateRef.current;
  const currentRect = latestBuildRectRef.current;

 if (currentBuildState.phase === 'complete') {
   hudElement.style.opacity = '0';
   hudElement.style.display = 'none';
   worker.state = 'idle';
   workerSprite.visible = false;
   clearScaffold();
   return;
 }

 hudElement.style.opacity = '1';
 hudElement.style.display = 'block';
 hudMessageElement.textContent = currentBuildState.message;
 hudFillElement.style.width = `${currentBuildState.progress * 100}%`;


 if (currentRect && currentBuildState.phase === 'building') {
    drawScaffold(currentRect);
    worker.targetX = currentRect.left + currentRect.width * 0.5;
  } else {
    clearScaffold();
    worker.targetX = width * 0.4;
  }


 workerSprite.visible = true;
  worker.state = currentBuildState.phase === 'building' ? 'building' : 'walking';
}

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      camera.right = width;
      camera.top = height;
      camera.updateProjectionMatrix();
      rebuildGrid();
      lastScaffoldSignature = '';

    };

    const animate = (timestamp: number) => {
      animationFrameId = window.requestAnimationFrame(animate);
      const delta = Math.min((timestamp - lastFrameTime) / 1000, 0.05);
      lastFrameTime = timestamp;

      backgroundTime += 0.02;
      gridGroup.position.y = Math.sin(backgroundTime) * 4;
      gridMaterial.opacity = 0.08 + ((Math.sin(backgroundTime * 1.6) + 1) / 2) * 0.08;
      scaffoldMaterial.opacity = 0.2 + ((Math.sin(backgroundTime * 9) + 1) / 2) * 0.08;

      syncFromBuildState();
      updateWorker(delta);
      updateParticles(delta);
      renderer.render(scene, camera);

      const lightTheme = isLightTheme();

gridMaterial.color.setHex(lightTheme ? 0xd85a24 : 0xff6b35);
scaffoldMaterial.color.setHex(lightTheme ? 0xd85a24 : 0xff6b35);

gridMaterial.opacity = lightTheme
  ? 0.05 + ((Math.sin(backgroundTime * 1.6) + 1) / 2) * 0.05
  : 0.08 + ((Math.sin(backgroundTime * 1.6) + 1) / 2) * 0.08;

scaffoldMaterial.opacity = lightTheme
  ? 0.14 + ((Math.sin(backgroundTime * 9) + 1) / 2) * 0.05
  : 0.2 + ((Math.sin(backgroundTime * 9) + 1) / 2) * 0.08;

    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrameId);
        return;
      }

      lastFrameTime = performance.now();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    lastFrameTime = performance.now();
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      clearScaffold();
      gridLines.forEach((line) => {
        line.geometry.dispose();
      });
      particlePool.forEach((particle) => {
        particle.mesh.geometry.dispose();
        particle.material.dispose();
      });

      workerTexture.dispose();
      workerMaterial.dispose();
      gridMaterial.dispose();
      scaffoldMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div ref={hudRef} className={styles.hud}>
        <div className={styles.hudTitle}>CONSTRUCTION IN PROGRESS</div>
        <div ref={hudMessageRef} className={styles.hudMessage}>
          INITIALIZING BUILD...
        </div>
        <div className={styles.hudBar}>
          <div ref={hudFillRef} className={styles.hudFill} />
        </div>
      </div>
    </>
  );
}
