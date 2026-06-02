import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface NestedTri {
  id: number;
  size: number;
  rotationDir: 1 | -1;
  rotationDuration: number;
  opacity: number;
  strokeWidth: number;
}

function generateNestedTriangles(): NestedTri[] {
  const count = 5;
  const baseSize = 320;
  const shrink = 0.7;

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: baseSize * Math.pow(shrink, i),
    rotationDir: i % 2 === 0 ? 1 : -1,
    rotationDuration: 20 + i * 12,
    opacity: 0.06 - i * 0.008,
    strokeWidth: 0.8 - i * 0.1,
  }));
}

function getEquilateralPoints(size: number): string {
  const h = (size * Math.sqrt(3)) / 2;
  return `${size / 2},0 ${size},${h} 0,${h}`;
}

function NestedTriangleSVG({ tri }: { tri: NestedTri }) {
  const h = (tri.size * Math.sqrt(3)) / 2;
  const points = getEquilateralPoints(tri.size);

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
      initial={{ rotate: 0, opacity: tri.opacity }}
      animate={{
        rotate: tri.rotationDir === 1 ? [0, 360] : [360, 0],
      }}
      transition={{
        duration: tri.rotationDuration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <polygon
        points={points}
        fill="none"
        stroke="rgba(56,189,248,0.4)"
        strokeWidth={tri.strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

export function NestedTriangleLayer() {
  const triangles = useMemo(() => generateNestedTriangles(), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 4 }}>
      {triangles.map((t) => (
        <NestedTriangleSVG key={t.id} tri={t} />
      ))}
    </div>
  );
}
