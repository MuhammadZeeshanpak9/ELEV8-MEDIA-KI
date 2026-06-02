import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface SacredTriangle {
  id: number;
  size: number;
  rotationDir: 1 | -1;
  rotationDuration: number;
  opacity: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
}

function generateTriangles(): SacredTriangle[] {
  return [
    {
      id: 0,
      size: 500,
      rotationDir: 1,
      rotationDuration: 120,
      opacity: 0.15,
      driftX: 30,
      driftY: -20,
      driftDuration: 45,
    },
    {
      id: 1,
      size: 380,
      rotationDir: -1,
      rotationDuration: 90,
      opacity: 0.25,
      driftX: -25,
      driftY: 15,
      driftDuration: 38,
    },
    {
      id: 2,
      size: 650,
      rotationDir: 1,
      rotationDuration: 150,
      opacity: 0.10,
      driftX: 20,
      driftY: 25,
      driftDuration: 55,
    },
  ];
}

function getTrianglePoints(size: number): string {
  const h = (size * Math.sqrt(3)) / 2;
  // Equilateral triangle: top vertex, bottom-right, bottom-left
  const topX = size / 2;
  const topY = 0;
  const brX = size;
  const brY = h;
  const blX = 0;
  const blY = h;
  return `${topX},${topY} ${brX},${brY} ${blX},${blY}`;
}

function TriangleSVG({ tri }: { tri: SacredTriangle }) {
  const h = (tri.size * Math.sqrt(3)) / 2;
  const points = getTrianglePoints(tri.size);

  return (
    <motion.svg
      width={tri.size}
      height={h}
      viewBox={`0 0 ${tri.size} ${h}`}
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        marginLeft: -tri.size / 2,
        marginTop: -h / 2,
        willChange: 'transform',
        overflow: 'visible',
      }}
      initial={{
        rotate: 0,
        x: 0,
        y: 0,
        opacity: tri.opacity,
      }}
      animate={{
        rotate: tri.rotationDir === 1 ? [0, 360] : [360, 0],
        x: [0, tri.driftX, 0],
        y: [0, tri.driftY, 0],
        opacity: [tri.opacity * 0.6, tri.opacity, tri.opacity * 0.6],
      }}
      transition={{
        rotate: {
          duration: tri.rotationDuration,
          repeat: Infinity,
          ease: 'linear',
        },
        x: {
          duration: tri.driftDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        },
        y: {
          duration: tri.driftDuration * 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        },
        opacity: {
          duration: tri.driftDuration * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <defs>
        <linearGradient id={`triGrad-${tri.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.8)" />
          <stop offset="50%" stopColor="rgba(56,189,248,0.3)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0.8)" />
        </linearGradient>
      </defs>
      <polygon
        points={points}
        fill="none"
        stroke={`url(#triGrad-${tri.id})`}
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

export function SacredTriangleLayer() {
  const triangles = useMemo(() => generateTriangles(), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {triangles.map((t) => (
        <TriangleSVG key={t.id} tri={t} />
      ))}
    </div>
  );
}
