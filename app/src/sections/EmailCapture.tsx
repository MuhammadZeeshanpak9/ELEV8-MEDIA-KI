import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { GlassPanel } from '@/components/GlassPanel';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <motion.section
      className="relative flex justify-center px-6 mt-[120px]"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <GlassPanel className="w-full max-w-[560px] px-8 sm:px-12 py-10 sm:py-12 text-center">
        {/* Panel Title */}
        <h3
          className="font-light mb-3"
          style={{
            fontSize: 'clamp(20px, 2.5vw, 32px)',
            lineHeight: 1.2,
            color: '#FFFFFF',
          }}
        >
          Be the First to Know
        </h3>

        {/* Panel Description */}
        <p
          className="font-normal mb-8"
          style={{
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.02em',
            color: '#8A8A8A',
          }}
        >
          Join the inner circle. Get exclusive updates on our launch.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Input Field */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-[52px] px-5 rounded-xl font-normal outline-none transition-all duration-300"
                style={{
                  background: 'rgba(56, 189, 248, 0.04)',
                  border: '1px solid rgba(56, 189, 248, 0.08)',
                  fontSize: 'clamp(16px, 1.2vw, 20px)',
                  color: '#FFFFFF',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(56, 189, 248, 0.15)';
                  e.target.style.boxShadow = '0 0 0 1px rgba(56, 189, 248, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(56, 189, 248, 0.08)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="h-[52px] px-7 rounded-xl font-medium cursor-pointer"
                style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  fontSize: '14px',
                  letterSpacing: '0.02em',
                  border: '1px solid #FFFFFF',
                }}
                whileHover={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  borderColor: '#FFFFFF',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                Notify Me
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
              >
                <Check size={20} className="text-sky-400" />
              </motion.div>
              <p
                className="font-normal"
                style={{
                  fontSize: 'clamp(16px, 1.2vw, 20px)',
                  lineHeight: 1.6,
                  color: '#FFFFFF',
                }}
              >
                You're in. We'll be in touch.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassPanel>
    </motion.section>
  );
}
