import { motion } from 'framer-motion';

export function EyeApertureLayer() {
  const size = 120;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 3 }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.9, 1, 0.9], opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ overflow: 'visible' }}
      >
        {/* Outer Aperture Eye Shape */}
        <motion.path
          d="M 10,50 Q 50,10 90,50 Q 50,90 10,50 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        
        {/* Inner Iris Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="rgba(56, 189, 248, 0.6)"
          strokeWidth="2"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Pupil */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="rgba(56, 189, 248, 1)"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>
  );
}
