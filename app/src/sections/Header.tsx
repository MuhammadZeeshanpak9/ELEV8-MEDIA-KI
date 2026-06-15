import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/Logo/ELEV_MEDIA.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Craft', href: '#craft' },
  { label: 'Vision', href: '#vision' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: scrolled ? 'rgba(2, 6, 23, 0.6)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'rgba(56, 189, 248, 0.1)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <nav className="mx-auto flex items-center justify-between px-5 sm:px-10 h-20 sm:h-24" style={{ maxWidth: '1280px' }}>
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group" aria-label="ELEV8 Media home">
          <img
            src={logo}
            alt="ELEV8 Media"
            className="h-14 sm:h-[72px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            style={{ filter: 'drop-shadow(0 0 22px rgba(56, 189, 248, 0.3))' }}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-medium text-[#8A8A8A] hover:text-white transition-colors duration-300"
              style={{ fontSize: '13px', letterSpacing: '0.04em' }}
            >
              <span className="nav-link">{link.label}</span>
            </a>
          ))}

          {/* CTA */}
          <motion.a
            href="#notify"
            className="rounded-full font-medium"
            style={{
              fontSize: '13px',
              letterSpacing: '0.04em',
              padding: '9px 20px',
              color: '#FFFFFF',
              background: 'rgba(56, 189, 248, 0.06)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
            }}
            whileHover={{
              borderColor: 'rgba(56, 189, 248, 0.45)',
              boxShadow: '0 0 24px rgba(56, 189, 248, 0.18)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            Notify Me
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#8A8A8A] hover:text-white transition-colors"
          style={{ border: '1px solid rgba(56, 189, 248, 0.12)', background: 'rgba(56, 189, 248, 0.04)' }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(2, 6, 23, 0.85)',
              borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 font-medium text-[#8A8A8A] hover:text-white transition-colors duration-300"
                  style={{ fontSize: '15px', letterSpacing: '0.02em' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#notify"
                onClick={() => setMenuOpen(false)}
                className="mt-2 mb-1 text-center rounded-full font-medium py-3"
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                }}
              >
                Notify Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 1px;
          width: 0;
          background: rgba(56, 189, 248, 0.8);
          transition: width 0.3s ease;
        }
        a:hover .nav-link::after { width: 100%; }
      `}</style>
    </motion.header>
  );
}
