import { motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const Turn = ({ className }: { className: string }) => (
  <svg viewBox="36 4 56 38" className={`floater ${className}`} aria-hidden="true">
    <path fill="currentColor" d="M39 8H60A28 28 0 0 1 88 36H68A8 8 0 0 0 60 28H39Z" />
  </svg>
);

// Slow color fields and arcs from Logo A. Only opacity and transform are animated.
export default function HeroBackdrop({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.div className="hero-backdrop" style={{ x, y }} aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
      <Turn className="f1" />
      <Turn className="f2" />
      <Turn className="f3" />
    </motion.div>
  );
}
