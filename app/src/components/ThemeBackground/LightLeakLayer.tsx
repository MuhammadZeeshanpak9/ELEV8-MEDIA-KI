import { motion } from 'framer-motion';

export function LightLeakLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-30" style={{ zIndex: 0 }}>
      {/* Warm red/orange light leak from top right */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Cool blue light leak from bottom left */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(80, 150, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Subtle white/amber streak */}
      <motion.div
        className="absolute top-1/3 left-0 right-0 h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.05) 0%, transparent 70%)',
          transform: 'rotate(-15deg)',
          filter: 'blur(60px)'
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleY: [1, 1.5, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
