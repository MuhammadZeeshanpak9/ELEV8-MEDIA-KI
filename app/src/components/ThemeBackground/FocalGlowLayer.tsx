import { motion } from 'framer-motion';
import { useEffect, useRef, useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*  Central focal glow — the "eye" of the vortex                      */
/* ------------------------------------------------------------------ */

function CentralFocal() {
  return (
    <div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    >
      {/* Outer radial glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          left: '50%',
          top: '50%',
          marginLeft: -100,
          marginTop: -100,
          background: 'radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 60,
          height: 60,
          left: '50%',
          top: '50%',
          marginLeft: -30,
          marginTop: -30,
          background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 6,
          height: 6,
          left: '50%',
          top: '50%',
          marginLeft: -3,
          marginTop: -3,
          background: 'rgba(56,189,248,0.9)',
          boxShadow: '0 0 12px rgba(56,189,248,0.5), 0 0 30px rgba(56,189,248,0.2)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spiral-trajectory particles — energy rays from the center         */
/* ------------------------------------------------------------------ */

interface SpiralParticle {
  id: number;
  armIndex: number; // 0, 1, 2 — one per triangle vertex direction
  speed: number;
  size: number;
  maxDistance: number;
  phase: number;
}

function generateSpiralParticles(count: number): SpiralParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    armIndex: i % 3,
    speed: 0.3 + Math.random() * 0.5,
    size: 1.5 + Math.random() * 2,
    maxDistance: 80 + Math.random() * 150,
    phase: Math.random() * Math.PI * 2,
  }));
}

// Get position along a logarithmic spiral arm
function getSpiralPosition(
  armIndex: number,
  progress: number,
  maxDist: number
): { x: number; y: number } {
  // Three arms at 0°, 120°, 240°
  const baseAngle = (armIndex * 2 * Math.PI) / 3 - Math.PI / 2;

  // Logarithmic spiral: distance grows as we move outward
  const distance = progress * maxDist;
  // Add spiral twist: angle changes as we move outward
  const twist = progress * Math.PI * 0.8;
  const angle = baseAngle + twist;

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
  };
}

function SpiralParticles() {
  const particles = useMemo(() => generateSpiralParticles(24), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const update = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      if (containerRef.current) {
        let html = '';

        particles.forEach((p) => {
          // Progress goes 0→1 then resets
          const cycleDuration = p.maxDistance / (p.speed * 30);
          const rawProgress = ((elapsed / cycleDuration + p.phase / (Math.PI * 2)) % 1);
          // Ease the progress for smoother motion
          const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);

          const pos = getSpiralPosition(p.armIndex, progress, p.maxDistance);

          // Convert to vw/vh from center
          const xVw = (pos.x / window.innerWidth) * 100;
          const yVh = (pos.y / window.innerHeight) * 100;

          // Opacity fades in at start and out at end
          let opacity = 1;
          if (progress < 0.1) opacity = progress / 0.1;
          else if (progress > 0.7) opacity = (1 - progress) / 0.3;
          opacity *= 0.5;

          // Trail: render a few fading copies behind
          const trailLength = 5;
          for (let t = 1; t <= trailLength; t++) {
            const trailProgress = Math.max(0, progress - t * 0.02);
            const trailPos = getSpiralPosition(p.armIndex, trailProgress, p.maxDistance);
            const trailX = (trailPos.x / window.innerWidth) * 100;
            const trailY = (trailPos.y / window.innerHeight) * 100;
            const trailOpacity = opacity * (1 - t / trailLength) * 0.3;
            const trailSize = p.size * (1 - t / trailLength) * 0.6;

            if (trailOpacity > 0.005) {
              html += `<div style="
                position:absolute;
                left:calc(50% + ${trailX}vw);
                top:calc(50% + ${trailY}vh);
                width:${trailSize}px;
                height:${trailSize}px;
                border-radius:50%;
                background:rgba(56,189,248,${trailOpacity});
                transform:translate(-50%,-50%);
                pointer-events:none;
              "></div>`;
            }
          }

          // Main particle
          html += `<div style="
            position:absolute;
            left:calc(50% + ${xVw}vw);
            top:calc(50% + ${yVh}vh);
            width:${p.size}px;
            height:${p.size}px;
            border-radius:50%;
            background:rgba(56,189,248,${opacity});
            box-shadow: 0 0 ${p.size * 2}px rgba(56,189,248,${opacity * 0.4});
            transform:translate(-50%,-50%);
            pointer-events:none;
          "></div>`;
        });

        containerRef.current.innerHTML = html;
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [particles]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}

/* ------------------------------------------------------------------ */
/*  Layer export                                                       */
/* ------------------------------------------------------------------ */

export function FocalGlowLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
      <CentralFocal />
      <SpiralParticles />
    </div>
  );
}
