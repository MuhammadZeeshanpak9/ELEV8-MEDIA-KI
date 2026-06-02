import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/GlassPanel';

interface Pillar {
  index: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  { index: '01', title: 'Visual Perception', description: 'Shaping how audiences see and feel brand narratives' },
  { index: '02', title: 'Creative Innovation', description: "Pushing boundaries of what's possible in digital media" },
  { index: '03', title: 'Storytelling Mastery', description: 'Crafting narratives that resonate and endure' },
  { index: '04', title: 'Influence & Impact', description: 'Creating content that moves culture forward' },
  { index: '05', title: 'Media Energy', description: 'Channeling dynamic force into every frame' },
  { index: '06', title: 'Future of Content', description: 'Redefining the next era of visual communication' },
];

function VisionPillar({ pillar, delay }: { pillar: Pillar; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: -10 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
    >
      <GlassPanel hover className="px-6 sm:px-8 py-6 sm:py-7">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
          {/* Index */}
          <span
            className="uppercase font-medium min-w-[60px] transition-colors duration-300"
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: '#4A4A4A',
            }}
          >
            {pillar.index}
          </span>

          {/* Title */}
          <motion.span
            className="font-medium flex-1 sm:px-6 transition-transform duration-300"
            style={{
              fontSize: '18px',
              color: '#FFFFFF',
            }}
            whileHover={{ x: 4 }}
          >
            {pillar.title}
          </motion.span>

          {/* Description */}
          <span
            className="font-normal sm:max-w-[300px] sm:text-right"
            style={{
              fontSize: '14px',
              lineHeight: 1.5,
              letterSpacing: '0.02em',
              color: '#8A8A8A',
            }}
          >
            {pillar.description}
          </span>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

export function BrandVision() {
  return (
    <section className="relative px-6 mt-[120px]">
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <motion.p
          className="uppercase font-medium text-center mb-12"
          style={{
            fontSize: '12px',
            letterSpacing: '0.08em',
            lineHeight: 1.4,
            color: '#4A4A4A',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          02 / VISION
        </motion.p>

        {/* Vision Pillars */}
        <div className="flex flex-col gap-4">
          {pillars.map((pillar, index) => (
            <VisionPillar key={pillar.index} pillar={pillar} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
