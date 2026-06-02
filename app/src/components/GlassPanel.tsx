import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  circular?: boolean;
}

export function GlassPanel({ children, className = '', hover = false, circular = false }: GlassPanelProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden
        ${circular ? 'rounded-full' : 'rounded-2xl'}
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        background: 'rgba(56, 189, 248, 0.03)',
        border: '1px solid rgba(56, 189, 248, 0.08)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      whileHover={hover ? {
        borderColor: 'rgba(56, 189, 248, 0.15)',
        boxShadow: '0 0 40px rgba(56, 189, 248, 0.04)',
      } : undefined}
      transition={{ duration: 0.4 }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-25%',
          left: '-25%',
          width: '150%',
          height: '150%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
          zIndex: 0,
          animation: 'glassGlow 8s ease-in-out infinite',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
