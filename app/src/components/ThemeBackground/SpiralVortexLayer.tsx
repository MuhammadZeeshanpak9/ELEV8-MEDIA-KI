import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface SpiralArm {
  id: number;
  // Each arm is a series of line segments from outer to inner
  segments: { x1: number; y1: number; x2: number; y2: number }[];
}

function generateSpiralVortex(
  outerSize: number,
  levels: number,
  shrinkFactor: number,
  rotationPerLevel: number
): SpiralArm[] {
  const arms: SpiralArm[] = [
    { id: 0, segments: [] },
    { id: 1, segments: [] },
    { id: 2, segments: [] },
  ];

  // Generate nested triangle vertices
  const trianglePoints: { x: number; y: number }[][] = [];

  for (let level = 0; level < levels; level++) {
    const scale = Math.pow(shrinkFactor, level);
    const size = outerSize * scale;
    const rotation = (rotationPerLevel * level * Math.PI) / 180;
    const h = (size * Math.sqrt(3)) / 2;

    // Equilateral triangle vertices (top, bottom-right, bottom-left)
    const baseVerts = [
      { x: 0, y: -h * (2 / 3) }, // top
      { x: size / 2, y: h * (1 / 3) }, // bottom-right
      { x: -size / 2, y: h * (1 / 3) }, // bottom-left
    ];

    // Rotate vertices
    const rotated = baseVerts.map((v) => ({
      x: v.x * Math.cos(rotation) - v.y * Math.sin(rotation),
      y: v.x * Math.sin(rotation) + v.y * Math.cos(rotation),
    }));

    trianglePoints.push(rotated);
  }

  // Create spiral segments: connect vertex i of level n to vertex i of level n+1
  for (let arm = 0; arm < 3; arm++) {
    for (let level = 0; level < trianglePoints.length - 1; level++) {
      const from = trianglePoints[level][arm];
      const to = trianglePoints[level + 1][arm];

      // Add slight inward curve by offsetting the midpoint
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const inwardFactor = 0.08 * (level + 1);
      const toCenterX = -midX * inwardFactor;
      const toCenterY = -midY * inwardFactor;

      arms[arm].segments.push({
        x1: from.x,
        y1: from.y,
        x2: to.x + toCenterX,
        y2: to.y + toCenterY,
      });
    }
  }

  return arms;
}

interface VortexGroupConfig {
  id: number;
  outerSize: number;
  levels: number;
  shrinkFactor: number;
  rotationPerLevel: number;
  groupRotationDuration: number;
  opacity: number;
  pulseDuration: number;
}

function VortexGroupSVG({ config }: { config: VortexGroupConfig }) {
  const arms = useMemo(
    () =>
      generateSpiralVortex(
        config.outerSize,
        config.levels,
        config.shrinkFactor,
        config.rotationPerLevel
      ),
    [config]
  );

  const viewSize = config.outerSize * 1.1;
  const h = (config.outerSize * Math.sqrt(3)) / 2;

  return (
    <motion.svg
      width={viewSize}
      height={(viewSize * Math.sqrt(3)) / 2}
      viewBox={`${-viewSize / 2} ${-h * 0.65} ${viewSize} ${h * 1.3}`}
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        marginLeft: -viewSize / 2,
        marginTop: (-h * 1.3) / 2,
        willChange: 'transform, opacity',
        overflow: 'visible',
      }}
      initial={{ rotate: 0, opacity: config.opacity * 0.5 }}
      animate={{
        rotate: [0, 360],
        opacity: [config.opacity * 0.5, config.opacity, config.opacity * 0.5],
      }}
      transition={{
        rotate: {
          duration: config.groupRotationDuration,
          repeat: Infinity,
          ease: 'linear',
        },
        opacity: {
          duration: config.pulseDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <defs>
        {/* Metallic/chrome gradient for the spiral */}
        <linearGradient id={`spiralGrad-${config.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.6)" />
          <stop offset="30%" stopColor="rgba(56,189,248,0.15)" />
          <stop offset="50%" stopColor="rgba(56,189,248,0.05)" />
          <stop offset="70%" stopColor="rgba(56,189,248,0.15)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0.6)" />
        </linearGradient>
        {/* Inner glow gradient */}
        <radialGradient id={`innerGlow-${config.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.15)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </radialGradient>
      </defs>

      {/* Inner glow behind the spiral */}
      <circle
        cx={0}
        cy={0}
        r={config.outerSize * 0.15}
        fill={`url(#innerGlow-${config.id})`}
        opacity={0.5}
      />

      {/* Spiral arms */}
      {arms.map((arm) => (
        <g key={arm.id}>
          {arm.segments.map((seg, segIdx) => {
            const progress = segIdx / arm.segments.length;
            const strokeWidth = 1.2 * (1 - progress * 0.6);
            const segmentOpacity = 0.3 + progress * 0.7;

            return (
              <motion.line
                key={segIdx}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke={`url(#spiralGrad-${config.id})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: segmentOpacity }}
                transition={{
                  pathLength: {
                    duration: 3,
                    delay: segIdx * 0.15,
                    ease: 'easeOut',
                  },
                  opacity: {
                    duration: 2,
                    delay: segIdx * 0.1,
                  },
                }}
              />
            );
          })}
        </g>
      ))}

      {/* Central focal dot */}
      <motion.circle
        cx={0}
        cy={0}
        r={2}
        fill="rgba(56,189,248,0.8)"
        animate={{
          r: [2, 3, 2],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}

export function SpiralVortexLayer() {
  const vortexConfig: VortexGroupConfig = {
    id: 0,
    outerSize: 400,
    levels: 12,
    shrinkFactor: 0.82,
    rotationPerLevel: 18,
    groupRotationDuration: 60,
    opacity: 0.6,
    pulseDuration: 8,
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      <VortexGroupSVG config={vortexConfig} />
    </div>
  );
}
