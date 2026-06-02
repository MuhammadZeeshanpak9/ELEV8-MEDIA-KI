import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      className="relative mt-[120px] mx-auto px-6"
      style={{
        maxWidth: '1200px',
        borderTop: '1px solid rgba(56, 189, 248, 0.08)',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between py-8 gap-4">
        <p
          className="font-normal"
          style={{
            fontSize: '12px',
            letterSpacing: '0.02em',
            color: '#4A4A4A',
          }}
        >
          © 2025 ELEV8 Media. All rights reserved.
        </p>
        <p
          className="font-normal"
          style={{
            fontSize: '12px',
            letterSpacing: '0.02em',
            color: '#4A4A4A',
          }}
        >
          Launching 2026
        </p>
      </div>
    </motion.footer>
  );
}
