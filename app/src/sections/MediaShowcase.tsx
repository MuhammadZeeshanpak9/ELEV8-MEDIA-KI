import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/GlassPanel';
import { AnimatedText } from '@/components/AnimatedText';

export function MediaShowcase() {
  const showcaseItems = [
    {
      title: 'Visual Storytelling',
      description: 'Cinematic composition and narrative-driven light design that captures attention.',
      image: '/images/visual_storytelling_1780385178557.png',
    },
    {
      title: 'Energy in Motion',
      description: 'Dynamic audio-visual synchronization and motion design that feels alive.',
      image: '/images/energy_motion_1780385254216.png',
    },
    {
      title: 'Media Production',
      description: 'High-end studio environments tailored for cutting-edge digital experiences.',
      image: '/images/media_production_1780385433027.png',
    },
  ];

  return (
    <section id="craft" className="relative w-full max-w-6xl mx-auto px-6 py-20 sm:py-32 z-10">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-light mb-4 tracking-wide">
          <AnimatedText text="Our Craft" type="words" />
        </h2>
        <motion.p
          className="text-[#8A8A8A] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We blend state-of-the-art visual effects, motion design, and cinematography to elevate your digital presence.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {showcaseItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <GlassPanel className="h-full flex flex-col p-4 group">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="px-2 pb-4">
                <h3 className="text-xl font-medium mb-2 tracking-wide text-sky-50/90">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
