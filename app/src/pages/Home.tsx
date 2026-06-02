import { ThemeBackground } from '@/components/ThemeBackground/ThemeBackground';
import { ReturnButton } from '@/sections/ReturnButton';
import { Hero } from '@/sections/Hero';
import { CountdownTimer } from '@/sections/CountdownTimer';
import { Teaser } from '@/sections/Teaser';
import { MediaShowcase } from '@/sections/MediaShowcase';
import { BrandVision } from '@/sections/BrandVision';
import { EmailCapture } from '@/sections/EmailCapture';
import { SocialLinks } from '@/sections/SocialLinks';
import { Footer } from '@/sections/Footer';

export default function Home() {
  return (
    <>
      {/* Fixed Background Engine */}
      <ThemeBackground />

      {/* Content Layer */}
      <div className="relative" style={{ zIndex: 10 }}>
        <ReturnButton />
        <Hero />
        <CountdownTimer />
        <Teaser />
        <MediaShowcase />
        <BrandVision />
        <EmailCapture />
        <SocialLinks />
        <Footer />
      </div>
    </>
  );
}
