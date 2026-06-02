import { motion } from 'framer-motion';

export function AudioWaveLayer() {
  const bars = Array.from({ length: 32 });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] blur-[12px] overflow-hidden" style={{ zIndex: 1 }}>
      <div className="flex items-end justify-between w-[120%] h-[60vh]">
        {bars.map((_, i) => {
          // Generate a pseudo-random height base and duration for each bar using percentages
          const minHeight = `${10 + (i % 5) * 5}%`;
          const maxHeight = `${40 + (i % 12) * 5}%`;
          const duration = 1.5 + (i % 3) * 0.5 + Math.random(); // Slower, softer animation

          return (
            <motion.div
              key={i}
              className="w-2 sm:w-6 lg:w-10 bg-sky-400 rounded-t-full origin-bottom"
              initial={{ height: minHeight }}
              animate={{ height: [minHeight, maxHeight, minHeight] }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
