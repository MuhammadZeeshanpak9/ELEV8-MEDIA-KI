import { useScroll, useSpring } from 'framer-motion';

export function useScrollPosition() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  return { scrollY: smoothScrollY };
}
