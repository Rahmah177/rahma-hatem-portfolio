import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import CountUp from './CountUp';
import Stagger from './Stagger';
import { imageSizes } from '../data/imageSizes';
import type { Project, Screen } from '../data/projects';

const Img = ({ s, className }: { s: Screen; className?: string }) => {
  const size = imageSizes[s.src];
  return <img src={s.src} alt={s.alt} loading="lazy" decoding="async" width={size?.[0]} height={size?.[1]} className={className} />;
};

function Visual({ project }: { project: Project }) {
  const { layout, screens, receipt } = project.stage;
  switch (layout) {
    case 'wall':
      return <Stagger className="wall">{screens.map((s) => <figure key={s.src}><Img s={s} /><figcaption>{s.caption}</figcaption></figure>)}</Stagger>;
    case 'phones':
      return <Stagger className="phones">{screens.map((s) => <div className="phone" key={s.src}><Img s={s} /></div>)}</Stagger>;
    case 'rise':
      return <Stagger className="rise">{screens.map((s) => <div className="phone" key={s.src}><Img s={s} /></div>)}</Stagger>;
    case 'line':
      return <Stagger className="line">{screens.map((s) => <div className="stop" key={s.src}><div className="dot" /><b>{s.caption}</b><Img s={s} className="scr" /></div>)}</Stagger>;
    case 'queue':
      return <Stagger className="queue">{screens.map((s) => <Img key={s.src} s={s} className="scr" />)}</Stagger>;
    case 'rings':
      return <Stagger className="rings">{screens.map((s) => <Img key={s.src} s={s} className="scr" />)}</Stagger>;
    case 'bill':
      return (
        <Stagger className="bill">
          <div className="own"><Img s={screens[0]} /></div>
          {receipt && (
            <div className="rcpt">
              <h4>{receipt.title}</h4>
              {receipt.rows.map(([a, b]) => <div key={a}><span>{a}</span><span>{b}</span></div>)}
              <div className="t"><span>{receipt.total[0]}</span><span>{receipt.total[1]}</span></div>
            </div>
          )}
          <div className="own"><Img s={screens[1]} /></div>
        </Stagger>
      );
    case 'arches':
      return <Stagger className="arches">{screens.map((s, i) => <div className={`arch ${i === 1 ? 'first' : ''}`} key={s.src}><Img s={s} /></div>)}</Stagger>;
  }
}

const SwipeHint = ({ layout }: { layout: string }) =>
  ['phones', 'rise', 'queue', 'arches', 'line'].includes(layout) ? <p className={`swipe-hint ${layout === 'line' ? 'wide' : ''}`} aria-hidden="true">Swipe to see more →</p> : null;

function Meta({ project, linked, align }: { project: Project; linked: boolean; align?: string }) {
  return (
    <>
      <span className="label opacity-85">{project.category}</span>
      <p className="text-[1.05rem]">{project.summary}</p>
      {project.problem && <p className="text-[.95rem]"><strong className="font-semibold">Problem: </strong>{project.problem}</p>}
      <p className="text-[.92rem] font-medium">Role: {project.role} <span className="opacity-70">· {project.tools.slice(0, 3).join(', ')}</span></p>
      {linked && <span className={`cta inline-flex items-center gap-2 font-semibold ${align ?? ''}`}>View Case Study <ArrowRight size={18} aria-hidden="true" /></span>}
    </>
  );
}

export default function ProjectStage({ project, linked = true, compact = false }: { project: Project; linked?: boolean; compact?: boolean }) {
  const { layout, theme, highlight } = project.stage;
  const title = (cls: string) => {
    const Tag = linked ? 'h3' : 'h1';
    return project.logo ? <Tag><img src={project.logo} alt={project.name} /></Tag> : <Tag className={`${cls} ${project.rtl ? 'arabic' : ''}`} dir={project.rtl ? 'rtl' : undefined} lang={project.rtl ? 'ar' : undefined}>{project.name}</Tag>;
  };
  let content: ReactNode;
  const visual = <div><Visual project={project} /><SwipeHint layout={layout} /></div>;

  if (compact) {
    content = project.logo ? <div className="centered" style={{ paddingBottom: 0 }}>{title('')}<Meta project={project} linked={false} /></div> : <div className="head-row" style={{ paddingBottom: 0 }}>{title('big-name')}<div className="meta"><Meta project={project} linked={false} /></div></div>;
  } else if (layout === 'arches') {
    content = <><div className="centered">{title('')}<Meta project={project} linked={linked} /></div>{visual}</>;
  } else if (layout === 'wall' || layout === 'phones' || layout === 'line') {
    content = <><div className="head-row">{title('big-name')}<div className="meta"><Meta project={project} linked={linked} /></div></div>{visual}</>;
  } else {
    const text = (
      <div className="meta">
        {highlight && <div className="serve"><small>{highlight.label}</small><CountUp value={Number(highlight.value)} /></div>}
        {title('mid-name')}
        <Meta project={project} linked={linked} />
      </div>
    );
    content = layout === 'bill' ? <div className="split flip">{visual}{text}</div> : <div className="split">{text}{visual}</div>;
  }

  return (
    <article className={`stage t-${theme} ${theme === 'neutral' || theme === 'pistachio' ? '' : 'on-dark'}`}>
      {linked ? (
        <Link to={`/work/${project.slug}`} className="stage-link big wrap block">{content}</Link>
      ) : (
        <div className="wrap">{content}</div>
      )}
    </article>
  );
}
