import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import type { Project, Screen } from '../data/projects';

const Img = ({ s, className }: { s: Screen; className?: string }) => <img src={s.src} alt={s.alt} loading="lazy" className={className} />;

function Visual({ project }: { project: Project }) {
  const { layout, screens, receipt } = project.stage;
  switch (layout) {
    case 'wall':
      return <div className="wall">{screens.map((s) => <figure key={s.src}><Img s={s} /><figcaption>{s.caption}</figcaption></figure>)}</div>;
    case 'phones':
      return <div className="phones">{screens.map((s) => <div className="phone" key={s.src}><Img s={s} /></div>)}</div>;
    case 'rise':
      return <div className="rise">{screens.map((s) => <div className="phone" key={s.src}><Img s={s} /></div>)}</div>;
    case 'line':
      return <div className="line">{screens.map((s) => <div className="stop" key={s.src}><div className="dot" /><b>{s.caption}</b><Img s={s} className="scr" /></div>)}</div>;
    case 'queue':
      return <div className="queue">{screens.map((s) => <Img key={s.src} s={s} className="scr" />)}</div>;
    case 'rings':
      return <div className="rings">{screens.map((s) => <Img key={s.src} s={s} className="scr" />)}</div>;
    case 'bill':
      return (
        <div className="bill">
          <div className="own"><Img s={screens[0]} /></div>
          {receipt && (
            <div className="rcpt">
              <h4>{receipt.title}</h4>
              {receipt.rows.map(([a, b]) => <div key={a}><span>{a}</span><span>{b}</span></div>)}
              <div className="t"><span>{receipt.total[0]}</span><span>{receipt.total[1]}</span></div>
            </div>
          )}
          <div className="own"><Img s={screens[1]} /></div>
        </div>
      );
    case 'arches':
      return <div className="arches">{screens.map((s, i) => <div className={`arch ${i === 1 ? 'first' : ''}`} key={s.src}><Img s={s} /></div>)}</div>;
  }
}

function Meta({ project, linked, align }: { project: Project; linked: boolean; align?: string }) {
  return (
    <>
      <span className="label opacity-85">{project.category}</span>
      <p className="text-[1.05rem]">{project.summary}</p>
      <p className="text-[.92rem] font-medium">Role: {project.role} <span className="opacity-70">· {project.tools.slice(0, 3).join(', ')}</span></p>
      {linked && <span className={`cta inline-flex items-center gap-2 font-semibold ${align ?? ''}`}>View Case Study <ArrowRight size={18} aria-hidden="true" /></span>}
    </>
  );
}

export default function ProjectStage({ project, linked = true }: { project: Project; linked?: boolean }) {
  const { layout, theme, highlight } = project.stage;
  const title = (cls: string) => {
    const Tag = linked ? 'h3' : 'h1';
    return project.logo ? <Tag><img src={project.logo} alt={project.name} /></Tag> : <Tag className={`${cls} ${project.rtl ? 'arabic' : ''}`} dir={project.rtl ? 'rtl' : undefined}>{project.name}</Tag>;
  };
  let content: ReactNode;
  const visual = <Reveal><Visual project={project} /></Reveal>;

  if (layout === 'arches') {
    content = <><div className="centered">{title('')}<Meta project={project} linked={linked} /></div>{visual}</>;
  } else if (layout === 'wall' || layout === 'phones' || layout === 'line') {
    content = <><div className="head-row">{title('big-name')}<div className="meta"><Meta project={project} linked={linked} /></div></div>{visual}</>;
  } else {
    const text = (
      <div className="meta">
        {highlight && <div className="serve"><small>{highlight.label}</small><b>{highlight.value}</b></div>}
        {title('mid-name')}
        <Meta project={project} linked={linked} />
      </div>
    );
    content = layout === 'bill' ? <div className="split flip">{visual}{text}</div> : <div className="split">{text}{visual}</div>;
  }

  return (
    <article className={`stage t-${theme} ${theme === 'neutral' || theme === 'pistachio' ? '' : 'on-dark'}`}>
      {linked ? (
        <Link to={`/work/${project.slug}`} className="stage-link wrap block" aria-label={`View ${project.name} case study`}>{content}</Link>
      ) : (
        <div className="wrap">{content}</div>
      )}
    </article>
  );
}
