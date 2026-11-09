import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// The arch from the hero returns and grows until it fills the screen, opening into the work.
export default function WorkPortal({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const arch = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [cover, setCover] = useState(8);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 0.82], [1, cover]);

  useEffect(() => {
    const measure = () => {
      const el = arch.current;
      if (!el) return;
      setCover(Math.max(window.innerWidth / el.offsetWidth, window.innerHeight / el.offsetHeight) * 2.3);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  if (reduce) return <div className="wrap pb-8"><h2 className="portal-title text-center">{title}</h2></div>;
  return (
    <div ref={ref} className="portal">
      <div className="portal-pin">
        <motion.div ref={arch} className="portal-arch" style={{ scale }} aria-hidden="true" />
        <h2 className="portal-title">{title}</h2>
      </div>
    </div>
  );
}
