// 'use client';

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import styles from './ScrollProgress.module.scss';

// export default function ScrollProgress() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let animationFrameId: number;
//     let particles: Particle[] = [];

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = 100;
//     };

//     resize();
//     window.addEventListener('resize', resize);

//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       color: string;
//       life: number;

//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 3 + 1;
//         this.speedX = (Math.random() - 0.5) * 2;
//         this.speedY = (Math.random - 0.5) * 2;
//         this.color = ['#ff8d8d', '#00fc40', '#8297ff', '#d1bcff'][
//           Math.floor(Math.random() * 4)
//         ];
//         this.life = Math.random() * 100 + 50;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//         this.life--;

//         if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
//         if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
//       }

//       draw() {
//         if (!ctx) return;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.globalAlpha = this.life / 150;
//         ctx.fill();
//         ctx.globalAlpha = 1;
//       }
//     }

//     const init = () => {
//       particles = [];
//       for (let i = 0; i < 50; i++) {
//         particles.push(new Particle());
//       }
//     };

//     init();

//     const animate = () => {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((particle) => {
//         particle.update();
//         particle.draw();
//       });

//       particles = particles.filter((p) => p.life > 0);

//       if (particles.length < 50) {
//         particles.push(new Particle());
//       }

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener('resize', resize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className={styles.container}>
//       <canvas ref={canvasRef} className={styles.canvas} />
//       <div className={styles.progressBar} />
//     </div>
//   );
// }
