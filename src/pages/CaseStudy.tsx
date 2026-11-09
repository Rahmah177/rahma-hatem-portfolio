import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox';
import ModuleViewer from '../components/ModuleViewer';
import ProjectStage from '../components/ProjectStage';
import Reveal from '../components/Reveal';
import Walkthrough from '../components/Walkthrough';
import { personalInfo as me } from '../data/personalInfo';
import { projects } from '../data/projects';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const [zoom, setZoom] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    if (project) document.title = `${project.name} | ${me.name}`;
  }, [project]);

  if (!project) return <NotFound />;
  const next = projects[(index + 1) % projects.length];
  const facts: [string, string][] = [['Role', project.role], ['Type', project.category], ['Tools', project.tools.join(', ')]];
  if (project.date) facts.push(['Date', project.date]);

  return (
    <>
      <div className="wrap py-4"><Link to="/#work" className="inline-flex items-center gap-2 font-semibold text-aub"><ArrowLeft size={18} aria-hidden="true" /> All work</Link></div>
      <ProjectStage project={project} linked={false} />

      <section className="wrap grid gap-10 py-[clamp(48px,7vw,96px)] md:grid-cols-[1.4fr_1fr]">
        <Reveal className="grid content-start gap-5">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-aub">Overview</h2>
          <p className="max-w-[58ch] text-[1.14rem] text-soft">{project.overview}</p>
          {project.question && <p className="max-w-[28ch] font-display text-[clamp(1.5rem,3vw,2.3rem)] font-bold leading-tight text-plum">{project.question}</p>}
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="m-0">
            {facts.map(([k, v]) => <div key={k} className="grid grid-cols-[5rem_1fr] gap-3 border-t border-line py-3"><dt className="font-semibold text-plum">{k}</dt><dd className="m-0">{v}</dd></div>)}
          </dl>
        </Reveal>
      </section>

      {(project.goals || project.users || project.insights) && (
        <section className="bg-shell">
          <div className="wrap grid gap-10 py-[clamp(48px,7vw,96px)] md:grid-cols-2">
            {project.users && (
              <Reveal>
                <h2 className="text-3xl font-extrabold text-aub">Who it serves</h2>
                <div className="mt-4">{project.users.map((u) => <div key={u.title} className="border-t border-line py-3"><h3 className="text-xl font-bold text-aub">{u.title}</h3><p className="text-soft">{u.text}</p></div>)}</div>
              </Reveal>
            )}
            <Reveal delay={0.1} className="grid content-start gap-8">
              {project.goals && <div><h2 className="text-3xl font-extrabold text-aub">Goals</h2><ul className="m-0 mt-4 list-none p-0">{project.goals.map((g) => <li key={g} className="border-t border-line py-2.5 font-medium">{g}</li>)}</ul></div>}
              {project.insights && <div><h2 className="text-3xl font-extrabold text-aub">What I learned</h2><ul className="m-0 mt-4 list-none p-0">{project.insights.map((g) => <li key={g} className="border-t border-line py-2.5 text-soft">{g}</li>)}</ul></div>}
              {project.note && <p className="text-sm text-soft">{project.note}</p>}
            </Reveal>
          </div>
        </section>
      )}

      <section className="on-dark bg-black py-[clamp(48px,7vw,96px)] text-[#f1ecee]">
        <div className="wrap">
          <p className="label text-pist">{project.kind === 'desktop' ? 'Explore the modules' : 'Walk through the experience'}</p>
          <h2 className="mb-10 mt-2 text-[clamp(2rem,4vw,3.2rem)] font-extrabold">The product</h2>
          {project.kind === 'desktop' ? <ModuleViewer project={project} /> : <Walkthrough project={project} />}
        </div>
      </section>

      {project.architecture && (
        <section className="on-dark border-t border-[#3a3538] bg-black py-[clamp(48px,7vw,96px)] text-[#f1ecee]">
          <div className="wrap grid gap-6">
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold">How the system works</h2>
            <div className="layers">{project.architecture.layers.map((l) => <div key={l.title}><h3 className="text-lg font-bold text-pist">{l.title}</h3><ul className="m-0 grid list-none gap-1 p-0 text-sm">{l.items.map((x) => <li key={x}>{x}</li>)}</ul></div>)}</div>
            <ol className="flow">{project.architecture.flow.map((x) => <li key={x}>{x}</li>)}</ol>
          </div>
        </section>
      )}

      {project.artifacts && (
        <section className="wrap py-[clamp(48px,7vw,96px)]">
          <h2 className="mb-8 text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-aub">Behind the screens</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {project.artifacts.map((a) => (
              <Reveal key={a.src}>
                <button type="button" className="block w-full cursor-zoom-in text-left" onClick={() => setZoom(a)} aria-label={`Open ${a.title} at full size`}>
                  <img src={a.src} alt={`${project.name} ${a.title}`} loading="lazy" className="block h-auto w-full rounded-lg" />
                  <span className="mt-2 block text-soft">{a.title}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="on-dark bg-aub text-blush">
        <Link to={`/work/${next.slug}`} className="stage-link wrap flex flex-wrap items-end justify-between gap-4 py-[clamp(40px,6vw,72px)]">
          <span><span className="label text-pist">Next project</span><span className={`mid-name mt-2 block ${next.rtl ? 'arabic' : 'font-display'}`} dir={next.rtl ? 'rtl' : undefined}>{next.name}</span></span>
          <ArrowRight size={44} className="text-pist" aria-hidden="true" />
        </Link>
      </section>
      {zoom && <Lightbox src={zoom.src} alt={`${project.name} ${zoom.title}`} onClose={() => setZoom(null)} />}
    </>
  );
}
