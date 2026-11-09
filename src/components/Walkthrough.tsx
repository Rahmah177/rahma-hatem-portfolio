import { useEffect, useRef, useState } from 'react';
import type { Project } from '../data/projects';

// The device stays in view while the visitor scrolls or clicks through the steps.
export default function Walkthrough({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      }),
      { rootMargin: '-42% 0px -48% 0px' },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [project.slug]);

  const frameClass = project.frame === 'phone' ? 'phone' : project.frame;

  return (
    <div className="wt">
      <div className="wt-device">
        <div className={`wt-frame ${frameClass}`}>
          <div className="wt-stack">
            {project.steps.map((s, i) => (
              <img key={s.src} src={s.src} alt={i === active ? `${project.name}: ${s.title}` : ''} aria-hidden={i !== active} style={{ opacity: i === active ? 1 : 0 }} />
            ))}
          </div>
        </div>
      </div>
      <ol className="m-0 list-none p-0">
        {project.steps.map((s, i) => (
          <li key={s.src}>
            <div className="wt-step" data-index={i} ref={(el) => { refs.current[i] = el; }}>
              <button type="button" aria-current={i === active ? 'step' : undefined} style={{ opacity: i === active ? 1 : 0.42 }} onClick={() => refs.current[i]?.scrollIntoView({ block: 'center' })}>
                <span className="font-display text-lg font-bold text-pist">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-bold leading-[1.05]">{s.title}</span>
                <span className="max-w-[38ch] text-[1.05rem] opacity-85">{s.text}</span>
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
