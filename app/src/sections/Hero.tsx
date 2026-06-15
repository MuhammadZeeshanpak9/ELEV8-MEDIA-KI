import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/AnimatedText';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-[900px] mx-auto">
        {/* Eyebrow Label */}
        <motion.p
          className="uppercase font-medium mb-6"
          style={{
            fontSize: '12px',
            letterSpacing: '0.08em',
            lineHeight: 1.4,
            color: '#4A4A4A',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          COMING SOON
        </motion.p>

        {/* Hero Title: ELEV8 */}
        <h1 className="font-light" style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}>
          <AnimatedText
            text="ELEV8"
            type="chars"
            delay={0.6}
            className="justify-center"
            staggerDelay={0.05}
          />
        </h1>
        <style>{`
          h1 > span > span {
            font-size: clamp(48px, 8vw, 120px);
            color: #FFFFFF;
          }
          h1 > span > span:nth-child(5) {
            text-shadow: 0 0 60px rgba(255,255,255,0.15);
          }
        `}</style>

        {/* Hero Subtitle: MEDIA */}
        <motion.p
          className="mt-2 font-light"
          style={{
            fontSize: 'clamp(32px, 5vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '0.15em',
            color: 'rgba(56, 189, 248, 0.6)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          MEDIA
        </motion.p>

        {/* Logo Tagline */}
        <motion.p
          className="mt-6 mx-auto max-w-[500px] font-normal uppercase"
          style={{
            fontSize: 'clamp(11px, 1vw, 13px)',
            letterSpacing: '0.2em',
            lineHeight: 1.6,
            color: '#4A4A4A',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Energy in Motion + The Illusion
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mt-6 mx-auto max-w-[500px] font-normal"
          style={{
            fontSize: 'clamp(16px, 1.2vw, 20px)',
            lineHeight: 1.6,
            color: '#8A8A8A',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          The future of visual storytelling is loading.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <motion.div
          className="w-px bg-[#4A4A4A] origin-top"
          style={{ height: '40px' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        />
        <motion.div
          className="w-1 h-1 rounded-full bg-[#4A4A4A] mt-1"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  );
}
