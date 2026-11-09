import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Skills as small tiles. With a mouse they can be picked up and spring back.
export default function SkillTiles({ skills, tone }: { skills: string[]; tone: number }) {
  const reduce = useReducedMotion();
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => setCanDrag(window.matchMedia('(hover: hover) and (pointer: fine)').matches), []);
  const active = canDrag && !reduce;
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
      {skills.map((s) => (
        <motion.li
          key={s}
          className={`skill-tile tone-${tone}`}
          drag={active}
          dragSnapToOrigin
          dragElastic={0.35}
          whileHover={active ? { y: -3, rotate: -1.5 } : undefined}
          whileDrag={{ scale: 1.07, rotate: 3, zIndex: 20, cursor: 'grabbing' }}
          style={{ cursor: active ? 'grab' : 'default' }}
        >
          {s}
        </motion.li>
      ))}
    </ul>
  );
}
