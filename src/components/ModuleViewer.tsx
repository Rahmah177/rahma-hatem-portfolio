import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';
import type { Project } from '../data/projects';

// Case study viewer for desktop products, with one tab per module.
export default function ModuleViewer({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const step = project.steps[index];
  const nav = 'inline-flex min-h-11 items-center gap-2 border border-[#6a6265] px-3.5 py-2 text-sm font-semibold transition-opacity disabled:opacity-35';

  return (
    <div className="grid gap-4">
      <div className="flex gap-1 overflow-x-auto" role="group" aria-label="Modules">
        {project.steps.map((s, i) => (
          <button key={s.src} type="button" aria-pressed={i === index} onClick={() => setIndex(i)} className={`whitespace-nowrap px-4 py-2.5 font-semibold transition-colors ${i === index ? 'bg-pist text-aub' : ''}`}>{s.title}</button>
        ))}
      </div>
      <button type="button" className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg bg-white" onClick={() => setZoom(true)} aria-label={`Open ${step.title} at full size`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={step.src} src={step.src} alt={`${project.name}: ${step.title}`} className="block h-auto w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} />
        </AnimatePresence>
        <span className="absolute right-3 top-3 bg-aub p-2 text-blush opacity-80 transition-opacity group-hover:opacity-100"><Maximize2 size={18} aria-hidden="true" /></span>
      </button>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[1.05rem]">{step.text}</p>
        <div className="flex items-center gap-2">
          <button type="button" className={nav} disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>
          <button type="button" className={nav} disabled={index === project.steps.length - 1} onClick={() => setIndex(index + 1)}>Next <ArrowRight size={16} aria-hidden="true" /></button>
          <span className="text-sm tabular-nums opacity-80">{index + 1} of {project.steps.length}</span>
        </div>
      </div>
      {zoom && <Lightbox src={step.src} alt={`${project.name}: ${step.title}`} onClose={() => setZoom(false)} />}
    </div>
  );
}
