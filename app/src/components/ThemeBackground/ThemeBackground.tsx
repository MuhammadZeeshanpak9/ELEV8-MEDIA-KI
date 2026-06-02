import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { SpiralVortexLayer } from './SpiralVortexLayer';
import { RippleArcLayer } from './RippleArcLayer';
import { FocalGlowLayer } from './FocalGlowLayer';
import { DepthGradientLayer } from './DepthGradientLayer';
import { CameraReticleLayer } from './CameraReticleLayer';
import { AudioWaveLayer } from './AudioWaveLayer';
import { LightLeakLayer } from './LightLeakLayer';
import { SacredTriangleLayer } from './SacredTriangleLayer';
import { EyeApertureLayer } from './EyeApertureLayer';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
  shiftFactor: number;
  scrollFactor: number;
  zIndex: number;
}

function ParallaxLayer({
  children,
  mouseX,
  mouseY,
  scrollY,
  shiftFactor,
  scrollFactor,
  zIndex,
}: ParallaxLayerProps) {
  const x = useTransform(mouseX, (v) => v * shiftFactor * 30);
  const y = useTransform(mouseY, (v) => v * shiftFactor * 20);
  const scrollOffset = useTransform(scrollY, (v) => v * scrollFactor);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        x,
        y,
        marginTop: scrollOffset,
        zIndex,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
}

export function ThemeBackground() {
  const { mouseX, mouseY } = useMousePosition();
  const { scrollY } = useScrollPosition();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ background: '#000000', zIndex: 0 }}
    >
      {/* Layer 6: Depth Gradient & Light Leaks */}
      <DepthGradientLayer mouseX={mouseX} mouseY={mouseY} />
      <LightLeakLayer />

      {/* Layer 1: Camera Focus Reticles */}
      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scrollY={scrollY}
        shiftFactor={0.008}
        scrollFactor={0.08}
        zIndex={1}
      >
        <CameraReticleLayer />
      </ParallaxLayer>

      {/* Layer 1.5: Sacred Triangle Frames — restored and more visible */}
      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scrollY={scrollY}
        shiftFactor={0.01}
        scrollFactor={0.1}
        zIndex={1}
      >
        <SacredTriangleLayer />
      </ParallaxLayer>

      {/* Layer 2: Spiral Vortex — THE SIGNATURE ELEMENT */}
      {!isMobile && (
        <ParallaxLayer
          mouseX={mouseX}
          mouseY={mouseY}
          scrollY={scrollY}
          shiftFactor={0.015}
          scrollFactor={0.12}
          zIndex={2}
        >
          <SpiralVortexLayer />
        </ParallaxLayer>
      )}

      {/* Layer 2.5: Eye Aperture — The center of the logo */}
      {!isMobile && (
        <ParallaxLayer
          mouseX={mouseX}
          mouseY={mouseY}
          scrollY={scrollY}
          shiftFactor={0.015}
          scrollFactor={0.12}
          zIndex={3}
        >
          <EyeApertureLayer />
        </ParallaxLayer>
      )}

      {/* Layer 3: Ripple Arcs — concentric expanding partial circles */}
      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scrollY={scrollY}
        shiftFactor={0.025}
        scrollFactor={0.18}
        zIndex={4}
      >
        <RippleArcLayer />
      </ParallaxLayer>

      {/* Layer 4: Audio Wave Equalizer */}
      {!isMobile && (
        <ParallaxLayer
          mouseX={mouseX}
          mouseY={mouseY}
          scrollY={scrollY}
          shiftFactor={0.02}
          scrollFactor={0.15}
          zIndex={4}
        >
          <AudioWaveLayer />
        </ParallaxLayer>
      )}

      {/* Layer 5: Central Focal Glow + spiral-trajectory particles */}
      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scrollY={scrollY}
        shiftFactor={0.035}
        scrollFactor={0.22}
        zIndex={5}
      >
        <FocalGlowLayer />
      </ParallaxLayer>
    </div>
  );
}
