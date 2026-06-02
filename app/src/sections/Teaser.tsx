import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/AnimatedText';

export function Teaser() {
  return (
    <section className="relative text-center px-6 mt-[120px]">
      <div className="max-w-[800px] mx-auto">
        {/* Section Tag */}
        <motion.p
          className="uppercase font-medium mb-10"
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
          01 / TEASER
        </motion.p>

        {/* Teaser Statement */}
        <h2
          className="font-light"
          style={{
            fontSize: 'clamp(24px, 3vw, 48px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#FFFFFF',
          }}
        >
          <AnimatedText
            text="Something extraordinary is taking shape."
            type="words"
            staggerDelay={0.08}
          />
        </h2>

        {/* Teaser Subtext */}
        <motion.p
          className="mt-6 mx-auto max-w-[560px] font-normal"
          style={{
            fontSize: 'clamp(16px, 1.2vw, 20px)',
            lineHeight: 1.6,
            color: '#8A8A8A',
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          A new chapter in creative media. Where perception meets precision. Where stories transcend screens.
        </motion.p>
      </div>
    </section>
  );
}
