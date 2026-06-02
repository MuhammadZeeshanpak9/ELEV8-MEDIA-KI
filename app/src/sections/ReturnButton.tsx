import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export function ReturnButton() {
  return (
    <motion.button
      className="fixed top-8 left-8 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: 'rgba(56, 189, 248, 0.03)',
        border: '1px solid rgba(56, 189, 248, 0.08)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      whileHover={{
        borderColor: 'rgba(56, 189, 248, 0.15)',
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.history.back()}
      aria-label="Go back"
    >
      <ChevronLeft size={18} className="text-[#4A4A4A] hover:text-sky-400 transition-colors duration-300" />
    </motion.button>
  );
}
