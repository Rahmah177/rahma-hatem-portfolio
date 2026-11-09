import { useEffect, useRef } from 'react';

// A small arc from Logo A trails the pointer and becomes a label over projects. Desktop only.
export default function CursorLabel() {
  const label = useRef<HTMLDivElement>(null);
  const arc = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0, y = 0, ax = 0, ay = 0, frame = 0;
    const tick = () => {
      ax += (x - ax) * 0.22;
      ay += (y - ay) * 0.22;
      if (arc.current) arc.current.style.transform = `translate3d(${ax + 14}px, ${ay + 14}px, 0)`;
      frame = Math.abs(x - ax) + Math.abs(y - ay) > 0.4 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const over = !!(e.target as Element | null)?.closest?.('.stage-link.big');
      if (label.current) {
        label.current.style.opacity = over ? '1' : '0';
        label.current.style.transform = `translate3d(${x + 16}px, ${y + 16}px, 0)`;
      }
      if (arc.current) arc.current.style.opacity = over ? '0' : '1';
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, []);
  return (
    <>
      <div ref={arc} aria-hidden="true" className="cursor-arc">
        <svg viewBox="30 0 66 46" width="24" height="17"><path d="M39 8H60A28 28 0 0 1 88 36H68A8 8 0 0 0 60 28H39Z" fill="#BFD08A" stroke="#3A1730" strokeWidth="4" /></svg>
      </div>
      <div ref={label} aria-hidden="true" className="cursor-label">View case study</div>
    </>
  );
}
