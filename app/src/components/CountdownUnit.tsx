import { motion, AnimatePresence } from 'framer-motion';

interface CountdownUnitProps {
  value: number;
  label: string;
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px]">
      <div className="relative h-[1em]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0.5 }}
            transition={{
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
            }}
            className="block text-sky-100 font-medium tabular-nums"
            style={{
              fontSize: 'clamp(28px, 4vw, 64px)',
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="mt-2 uppercase text-[#4A4A4A] font-medium"
        style={{
          fontSize: '12px',
          letterSpacing: '0.08em',
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}
