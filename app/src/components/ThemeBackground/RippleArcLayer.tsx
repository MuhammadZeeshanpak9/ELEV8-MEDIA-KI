import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ArcConfig {
  id: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  strokeWidth: number;
  expandDuration: number;
  rotationDuration: number;
  opacityBase: number;
  phaseOffset: number;
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = ((startAngle - 90) * Math.PI) / 180;
  const end = ((endAngle - 90) * Math.PI) / 180;

  const x1 = cx + radius * Math.cos(start);
  const y1 = cy + radius * Math.sin(start);
  const x2 = cx + radius * Math.cos(end);
  const y2 = cy + radius * Math.sin(end);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function generateArcs(): ArcConfig[] {
  const arcs: ArcConfig[] = [];

  // Three groups of arcs at different angular positions (like the logo)
  const arcGroups = [
    { baseAngle: -30, spread: 100 },
    { baseAngle: 90, spread: 100 },
    { baseAngle: 210, spread: 100 },
  ];

  let id = 0;
  arcGroups.forEach((group) => {
    for (let i = 0; i < 4; i++) {
      const radius = 180 + i * 45;
      arcs.push({
        id: id++,
        radius,
        startAngle: group.baseAngle - group.spread / 2,
        endAngle: group.baseAngle + group.spread / 2,
        strokeWidth: 0.6 + (4 - i) * 0.15,
        expandDuration: 10 + i * 2,
        rotationDuration: 30 + id * 8,
        opacityBase: 0.4 - i * 0.05,
        phaseOffset: id * 0.8,
      });
    }
  });

  // Add some additional accent arcs
  for (let i = 0; i < 6; i++) {
    arcs.push({
      id: id++,
      radius: 200 + i * 35,
      startAngle: i * 60,
      endAngle: i * 60 + 40,
      strokeWidth: 0.4,
      expandDuration: 12 + i * 1.5,
      rotationDuration: 40 + i * 10,
      opacityBase: 0.3,
      phaseOffset: i * 1.2,
    });
  }

  return arcs;
}

function ArcSVG({ arc, viewSize }: { arc: ArcConfig; viewSize: number }) {
  const cx = viewSize / 2;
  const cy = viewSize / 2;
  const pathD = describeArc(cx, cy, arc.radius, arc.startAngle, arc.endAngle);

  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke="rgba(56,189,248,0.5)"
      strokeWidth={arc.strokeWidth}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: [arc.opacityBase * 0.4, arc.opacityBase, arc.opacityBase * 0.4],
        scale: [0.95, 1.05, 0.95],
      }}
      transition={{
        opacity: {
          duration: arc.expandDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: arc.phaseOffset,
        },
        scale: {
          duration: arc.expandDuration * 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: arc.phaseOffset,
        },
      }}
      style={{
        transformOrigin: `${cx}px ${cy}px`,
      }}
    />
  );
}

export function RippleArcLayer() {
  const arcs = useMemo(() => generateArcs(), []);
  const viewSize = 700;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
      <motion.svg
        width={viewSize}
        height={viewSize}
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          marginLeft: -viewSize / 2,
          marginTop: -viewSize / 2,
          willChange: 'transform',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {arcs.map((arc) => (
          <ArcSVG key={arc.id} arc={arc} viewSize={viewSize} />
        ))}
      </motion.svg>
    </div>
  );
}
