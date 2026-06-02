import { motion } from 'framer-motion';
import { Camera, Twitter, Linkedin, Youtube } from 'lucide-react';

const socials = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export function SocialLinks() {
  return (
    <motion.section
      className="relative flex justify-center gap-4 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {socials.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(56, 189, 248, 0.03)',
            border: '1px solid rgba(56, 189, 248, 0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
          }}
          whileHover={{
            scale: 1.05,
            borderColor: 'rgba(56, 189, 248, 0.15)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <social.icon
            size={20}
            className="text-[#8A8A8A] hover:text-sky-400 transition-colors duration-300"
          />
        </motion.a>
      ))}
    </motion.section>
  );
}
