import { motion } from 'framer-motion';
import { Camera, Twitter, Linkedin, Youtube } from 'lucide-react';
import logo from '@/Logo/ELEV_MEDIA.png';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Craft', href: '#craft' },
  { label: 'Vision', href: '#vision' },
  { label: 'Notify Me', href: '#notify' },
];

const socials = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <motion.footer
      className="relative mt-24 sm:mt-[120px] mx-auto px-6"
      style={{
        maxWidth: '1200px',
        borderTop: '1px solid rgba(56, 189, 248, 0.08)',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Top row: logo + nav */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pt-14 pb-10">
        <a href="#home" className="flex items-center gap-3 group" aria-label="ELEV8 Media home">
          <img
            src={logo}
            alt="ELEV8 Media"
            className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ filter: 'drop-shadow(0 0 22px rgba(56, 189, 248, 0.25))' }}
          />
        </a>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium text-[#8A8A8A] hover:text-white transition-colors duration-300"
              style={{ fontSize: '13px', letterSpacing: '0.04em' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(56, 189, 248, 0.03)',
                border: '1px solid rgba(56, 189, 248, 0.08)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(56, 189, 248, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={17} className="text-[#8A8A8A] hover:text-sky-400 transition-colors duration-300" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom row: legal */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between py-7 gap-4"
        style={{ borderTop: '1px solid rgba(56, 189, 248, 0.06)' }}
      >
        <p className="font-normal" style={{ fontSize: '12px', letterSpacing: '0.02em', color: '#4A4A4A' }}>
          © 2025 ELEV8 Media. All rights reserved.
        </p>
        <p className="font-normal" style={{ fontSize: '12px', letterSpacing: '0.02em', color: '#4A4A4A' }}>
          Launching 2026
        </p>
      </div>
    </motion.footer>
  );
}
