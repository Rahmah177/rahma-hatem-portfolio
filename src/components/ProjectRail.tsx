import { useEffect, useState } from 'react';
import type { Project } from '../data/projects';

// A small index of the featured projects. It appears only while they are on screen.
export default function ProjectRail({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
    const seen = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const slug = (e.target as HTMLElement).dataset.chapter!;
        if (e.isIntersecting) seen.add(slug); else seen.delete(slug);
      });
      setActive(projects.map((p) => p.slug).find((s) => seen.has(s)) ?? '');
    }, { rootMargin: '-50% 0px -50% 0px' });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [projects]);

  const index = projects.findIndex((p) => p.slug === active);
  return (
    <nav aria-label="Featured projects" className={`rail ${active ? 'show' : ''}`}>
      {projects.map((p, i) => (
        <a key={p.slug} href={`#p-${p.slug}`} aria-current={p.slug === active ? 'true' : undefined} className={p.slug === active ? 'on' : ''} tabIndex={active ? 0 : -1}>
          <span className="rail-no">0{i + 1}</span>
          <span className={`rail-name ${p.rtl ? 'arabic' : ''}`} lang={p.rtl ? 'ar' : undefined}>{p.name}</span>
        </a>
      ))}
      {index >= 0 && <span className="rail-count" aria-hidden="true">{index + 1} / {projects.length}</span>}
    </nav>
  );
}
