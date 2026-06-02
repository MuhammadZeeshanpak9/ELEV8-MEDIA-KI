import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  type?: 'chars' | 'words';
  delay?: number;
  className?: string;
  staggerDelay?: number;
}

export function AnimatedText({
  text,
  type = 'chars',
  delay = 0,
  className = '',
  staggerDelay,
}: AnimatedTextProps) {
  const items = type === 'chars' ? text.split('') : text.split(' ');
  const defaultStagger = type === 'chars' ? 0.03 : 0.08;
  const stagger = staggerDelay ?? defaultStagger;

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: type === 'words' ? 'pre' : 'pre-wrap' }}
        >
          {item}
          {type === 'words' && index < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
