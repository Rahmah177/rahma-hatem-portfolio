import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const KEY = 'rh-intro-seen';

// Logo A draws itself once per visit: the curved stroke turns the H into an R.
export default function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (window.location.pathname !== '/') return false;
    try { return !sessionStorage.getItem(KEY); } catch { return true; }
  });

  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem(KEY, '1'); } catch { /* storage can be blocked */ }
    const t = window.setTimeout(() => setShow(false), 1250);
    return () => window.clearTimeout(t);
  }, [show]);

  if (reduce) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-aub" exit={{ y: '-100%' }} transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}>
          <svg viewBox="0 0 100 100" className="h-28 w-28 text-blush">
            <motion.path fill="currentColor" d="M12 8H32V42H88V92H68V60H32V92H12Z" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} />
            <motion.path fill="none" stroke="var(--color-pist)" strokeWidth="20" d="M39 18H60A18 18 0 0 1 78 36" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.7, ease: 'easeInOut' }} />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
