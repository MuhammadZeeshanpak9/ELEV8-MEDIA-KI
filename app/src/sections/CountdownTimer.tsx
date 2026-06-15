import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/GlassPanel';
import { CountdownUnit } from '@/components/CountdownUnit';
import { useCountdown } from '@/hooks/useCountdown';

export function CountdownTimer() {
  const targetDate = new Date('2026-12-31T23:59:59');
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <motion.section
      className="relative flex justify-center px-6 mt-20"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <GlassPanel hover className="w-full max-w-[700px] px-6 sm:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-2 gap-y-8 sm:flex sm:flex-row sm:items-center sm:justify-center">
          {units.map((unit, index) => (
            <div key={unit.label} className="flex flex-row items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <CountdownUnit value={unit.value} label={unit.label} />
              </motion.div>
              {index < units.length - 1 && (
                <div
                  className="hidden sm:block w-px h-10 sm:mx-4 md:mx-6 self-center"
                  style={{ background: 'rgba(56, 189, 248, 0.08)' }}
                />
              )}
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.section>
  );
}
