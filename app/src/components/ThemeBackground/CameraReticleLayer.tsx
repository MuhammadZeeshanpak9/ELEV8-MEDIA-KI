import { motion } from 'framer-motion';

export function CameraReticleLayer() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15" style={{ zIndex: 2 }}>
      <motion.div
        className="relative w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border border-sky-400/20 rounded-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        {/* Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-sky-400/30" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-sky-400/30" />

        {/* Focus Bracket Corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-sky-400/40" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-sky-400/40" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-sky-400/40" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-sky-400/40" />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute w-[200px] h-[200px] border border-sky-400/30 rounded-full"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Small detail markers */}
        <div className="absolute top-1/2 -mt-1 -left-2 w-4 h-2 border-t border-b border-sky-400/50" />
        <div className="absolute top-1/2 -mt-1 -right-2 w-4 h-2 border-t border-b border-sky-400/50" />
      </motion.div>
    </div>
  );
}
