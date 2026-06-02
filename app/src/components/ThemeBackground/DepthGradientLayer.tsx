import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

interface DepthGradientLayerProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function DepthGradientLayer({ mouseX, mouseY }: DepthGradientLayerProps) {
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentRef = useRef({ x1: 50, y1: 50, x2: 50, y2: 50 });

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      const targetX = ((mouseX.get() + 1) / 2) * 100;
      const targetY = ((mouseY.get() + 1) / 2) * 100;

      // Layer 1 follows closely
      currentRef.current.x1 = lerp(currentRef.current.x1, targetX, 0.08);
      currentRef.current.y1 = lerp(currentRef.current.y1, targetY, 0.08);
      
      // Layer 2 is slower and lazier, creating a "liquid" drag effect
      currentRef.current.x2 = lerp(currentRef.current.x2, targetX, 0.03);
      currentRef.current.y2 = lerp(currentRef.current.y2, targetY, 0.03);

      if (gradientRef.current) {
        gradientRef.current.style.setProperty('--gx1', `${currentRef.current.x1}%`);
        gradientRef.current.style.setProperty('--gy1', `${currentRef.current.y1}%`);
        gradientRef.current.style.setProperty('--gx2', `${currentRef.current.x2}%`);
        gradientRef.current.style.setProperty('--gy2', `${currentRef.current.y2}%`);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={gradientRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{
        zIndex: 0,
        background: `
          radial-gradient(circle 600px at var(--gx1, 50%) var(--gy1, 50%), rgba(56,189,248,0.08) 0%, transparent 60%),
          radial-gradient(circle 800px at var(--gx2, 50%) var(--gy2, 50%), rgba(56,189,248,0.05) 0%, transparent 70%)
        `,
        filter: 'blur(30px)'
      }}
    />
  );
}
