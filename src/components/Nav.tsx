import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { personalInfo } from '../data/personalInfo';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="on-dark sticky top-0 z-40 bg-aub text-blush">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold" aria-label="Rahma Hatem, home">
          <Logo className="h-7 w-7" />
          Rahma Hatem
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.id} to={`/#${l.id}`} className="relative py-1 text-[.95rem]" aria-current={isHome && active === l.id ? 'true' : undefined}>
              {l.label}
              {isHome && active === l.id && <motion.span layoutId="nav-dot" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-pist" />}
            </Link>
          ))}
          <a href={personalInfo.cv} download className="border border-pist px-3 py-1.5 text-[.92rem] font-semibold text-pist transition-colors hover:bg-pist hover:text-aub">Download CV</a>
        </nav>
        <button type="button" className="p-2 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden md:hidden">
            <div className="wrap grid gap-1 pb-5">
              {links.map((l) => (
                <Link key={l.id} to={`/#${l.id}`} onClick={() => setOpen(false)} className="py-2.5 font-display text-2xl font-bold">{l.label}</Link>
              ))}
              <a href={personalInfo.cv} download className="mt-2 justify-self-start bg-pist px-4 py-2.5 font-semibold text-aub">Download CV</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
