import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import HeroBackdrop from '../components/HeroBackdrop';
import Marquee from '../components/Marquee';
import { ArrowRight, Check, Copy, Download, Mail } from 'lucide-react';
import { useState } from 'react';
import ProjectChapter from '../components/ProjectChapter';
import ProjectRail from '../components/ProjectRail';
import SkillTiles from '../components/SkillTiles';
import WorkPortal from '../components/WorkPortal';
import Reveal from '../components/Reveal';
import { awards, certificates, earlierExperience, timeline } from '../data/experience';
import { imageSizes } from '../data/imageSizes';
import { personalInfo as me } from '../data/personalInfo';
import { Link } from 'react-router-dom';
import { additionalProjects, featuredProjects } from '../data/projects';
import { languages, processExample, processSteps, skillGroups } from '../data/skills';

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } }),
};

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18 });
  const sy = useSpring(py, { stiffness: 55, damping: 18 });
  const bgX = useTransform(sx, (v) => v * -26);
  const bgY = useTransform(sy, (v) => v * -18);
  const arcsX = useTransform(sx, (v) => v * -30);
  const arcsY = useTransform(sy, (v) => v * -14);
  const archX = useTransform(sx, (v) => v * 16);
  const photoX = useTransform(sx, (v) => v * 9);
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  let seen = false;
  try { seen = !!sessionStorage.getItem('rh-intro-seen'); } catch { /* storage can be blocked */ }
  const base = reduce ? 0 : seen ? 0.1 : 1.1;
  const lift = { hidden: { y: '105%' }, show: (i: number) => ({ y: 0, transition: { delay: base + i * 0.1, duration: 0.85, ease: [0.2, 0.7, 0.2, 1] } }) };
  const after = (i: number) => ({ variants: rise, custom: i + Math.round(base / 0.08) + 2 });
  return (
    <>
    <section id="home" ref={ref} onPointerMove={onMove} className="on-dark relative overflow-hidden bg-aub text-blush">
      <HeroBackdrop x={bgX} y={bgY} />
      <div className="wrap relative z-[1] grid items-end gap-5 pt-8 md:grid-cols-[1.15fr_1fr] md:pt-12">
        <motion.div initial="hidden" animate="show" style={{ y: textY }} className="grid gap-4 pb-2 md:pb-16">
          <motion.p {...after(0)} className="font-medium text-pist">Hello, I'm</motion.p>
          <h1 className="text-[clamp(3.4rem,8.6vw,7.4rem)] font-extrabold leading-[.98] tracking-[-.035em]">
            <span className="block overflow-hidden"><motion.span className="block" variants={lift} custom={0}>Rahma</motion.span></span>
            <span className="block overflow-hidden"><motion.span className="block" variants={lift} custom={1}>Hatem</motion.span></span>
          </h1>
          <motion.p {...after(1)} className="font-display text-2xl font-bold">{me.title}</motion.p>
          <motion.p {...after(2)} className="max-w-[32ch] text-[1.2rem]">{me.tagline}</motion.p>
          <motion.p {...after(3)} className="max-w-[46ch] opacity-85">{me.intro}</motion.p>
          <motion.div {...after(4)} className="flex flex-wrap gap-3">
            <a href="#work" className="btn border border-pist bg-pist px-5 py-3 font-semibold text-aub">View My Work</a>
            <a href="#contact" className="btn border border-blush px-5 py-3 font-semibold">Let's Connect</a>
          </motion.div>
          <motion.p {...after(5)} className="flex flex-wrap gap-x-5 gap-y-1 text-sm opacity-85"><span>{me.location}</span><span>{me.graduation}</span></motion.p>
        </motion.div>
        <div className="fig mx-auto w-full max-w-[560px]">
          <motion.div className="fig-arcs" style={{ x: arcsX, y: arcsY }} aria-hidden="true">{[0, 1, 2, 3].map((n) => <span key={n} style={{ '--n': n } as React.CSSProperties} />)}</motion.div>
          <motion.div className="fig-arch" style={{ x: archX }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: base + 0.05, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} />
          <motion.div className="fig-photo" style={{ x: photoX }} initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: base + 0.35, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}>
            <motion.img style={{ y }} src={me.photo} width={1100} height={1082} alt="Portrait of Rahma Hatem" fetchPriority="high" />
          </motion.div>
        </div>
      </div>
    </section>
    <Marquee />
    </>
  );
}

function About() {
  return (
    <section id="about" className="wrap grid gap-10 py-[clamp(56px,9vw,120px)] md:grid-cols-[1fr_1.15fr]">
      <Reveal><h2 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold tracking-[-.025em] text-aub">Design, shaped by code and teaching.</h2></Reveal>
      <Reveal delay={0.1} className="grid gap-4 text-[1.14rem] text-soft">{me.about.map((p) => <p key={p}>{p}</p>)}</Reveal>
      <div className="grid gap-px bg-line sm:grid-cols-2 md:col-span-2 lg:grid-cols-4">
        {me.strengths.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className="grid content-start gap-2 bg-blush py-5 sm:px-5">
            <h3 className="text-xl font-bold text-aub">{s.title}</h3>
            <p className="text-soft">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="on-dark bg-black text-[#f1ecee]">
      <div className="wrap grid gap-10 py-[clamp(56px,9vw,120px)] md:grid-cols-[1fr_1.5fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="label text-pist">How I work</p>
          <h2 className="mt-2 text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold tracking-[-.025em]">My design process</h2>
          <p className="mt-5 max-w-[38ch] opacity-80">{processExample}</p>
        </div>
        <ol className="m-0 grid list-none p-0">
          {processSteps.map((s, i) => (
            <Reveal key={s.title} className="grid grid-cols-[3.4rem_1fr] items-baseline gap-2 border-t border-[#3a3538] py-6">
              <span className="font-display text-xl font-bold text-pist">{String(i + 1).padStart(2, '0')}</span>
              <div><h3 className="text-[clamp(1.8rem,3.6vw,3rem)] font-bold">{s.title}</h3><p className="mt-1 opacity-80">{s.text}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="wrap py-[clamp(56px,9vw,120px)]">
      <Reveal><h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-extrabold tracking-[-.025em] text-aub">Skills and tools</h2></Reveal>
      <div className="mt-8 grid gap-x-12">
        {skillGroups.map((g, tone) => (
          <Reveal key={g.title} className="grid gap-3 border-t border-line py-5 md:grid-cols-[14rem_1fr]">
            <h3 className="text-xl font-bold text-plum">{g.title}</h3>
            <SkillTiles skills={g.skills} tone={tone} />
          </Reveal>
        ))}
        <Reveal className="grid gap-3 border-t border-line py-5 md:grid-cols-[14rem_1fr]">
          <h3 className="text-xl font-bold text-plum">Languages</h3>
          <p className="font-display text-[clamp(1.15rem,2.2vw,1.65rem)] font-medium text-aub">{languages.join('  ·  ')}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-shell">
      <div className="wrap grid gap-12 py-[clamp(56px,9vw,120px)] lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal><h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-extrabold tracking-[-.025em] text-aub">Experience and education</h2></Reveal>
          <ol className="relative m-0 mt-8 grid list-none gap-8 border-l-2 border-pist p-0 pl-6">
            {timeline.map((t) => (
              <Reveal key={t.title + t.period}>
                <li className="relative">
                  <span className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full bg-aub" aria-hidden="true" />
                  <p className="text-sm font-semibold text-plum">{t.period}</p>
                  <h3 className="mt-1 text-2xl font-bold text-aub">{t.title}</h3>
                  <p className="font-medium">{t.place}</p>
                  {t.text && <p className="mt-1 max-w-[52ch] text-soft">{t.text}</p>}
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 max-w-[52ch] text-sm text-soft">{earlierExperience}</p>
        </div>
        <Reveal>
          <h3 className="text-2xl font-bold text-aub">Awards and competitions</h3>
          <ul className="m-0 mt-5 list-none p-0">
            {awards.map((a) => <li key={a.title} className="flex justify-between gap-4 border-t border-line py-2.5"><span>{a.title}</span><span className="whitespace-nowrap text-sm tabular-nums text-soft">{a.date}</span></li>)}
          </ul>
          <h3 className="mt-10 text-2xl font-bold text-aub">Courses and certificates</h3>
          <ul className="m-0 mt-5 list-none p-0">
            {certificates.map((a) => <li key={a.title} className="flex justify-between gap-4 border-t border-line py-2.5"><span>{a.title}</span><span className="whitespace-nowrap text-sm tabular-nums text-soft">{a.date}</span></li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(me.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${me.email}`;
    }
  };
  const social = [['LinkedIn', me.linkedin], ['Behance', me.behance], ['GitHub', me.github]];
  return (
    <section id="contact" className="bg-pist text-aub">
      <div className="wrap grid gap-8 py-[clamp(56px,9vw,120px)]">
        <Reveal><h2 className="text-[clamp(3rem,9vw,7.6rem)] font-extrabold leading-[.95] tracking-[-.035em]">Let's build something useful.</h2></Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${me.email}`} className="btn inline-flex items-center gap-2 border border-aub bg-aub px-5 py-3 font-semibold text-blush"><Mail size={18} aria-hidden="true" /> {me.email}</a>
          <button type="button" onClick={copy} className="btn inline-flex items-center gap-2 border border-aub px-4 py-3 font-semibold">{copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}{copied ? 'Copied' : 'Copy email'}</button>
          <a href={me.cv} download className="btn inline-flex items-center gap-2 border border-aub px-4 py-3 font-semibold"><Download size={18} aria-hidden="true" /> Download CV</a>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-display text-2xl font-bold">
          {social.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="group inline-flex min-h-11 items-center gap-2">{label} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" aria-hidden="true" /></a>)}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { document.title = `${me.name} | ${me.title}`; document.querySelector('meta[name="description"]')?.setAttribute('content', `${me.name} is a ${me.title} from ${me.location}, focused on UX research and problem solving.`); }, []);
  return (
    <>
      <Hero />
      <About />
      <section id="work" aria-label="Selected work">
        <WorkPortal title="Selected work" />
        <div>{featuredProjects.map((p, i) => <ProjectChapter key={p.slug} project={p} background={i === 0 ? 'pistachio' : featuredProjects[i - 1].stage.theme} />)}</div>
        <ProjectRail projects={featuredProjects} />
        <div className="wrap py-[clamp(48px,7vw,88px)]">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-.025em] text-aub">Additional projects</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {additionalProjects.map((p) => (
              <Reveal key={p.slug}>
                <Link to={`/work/${p.slug}`} className="extra stage-link">
                  <div className={`extra-shot ${p.frame === 'own' ? 'own' : ''}`}><img src={p.stage.screens[0].src} alt={p.stage.screens[0].alt} width={imageSizes[p.stage.screens[0].src]?.[0]} height={imageSizes[p.stage.screens[0].src]?.[1]} loading="lazy" decoding="async" /></div>
                  <div className="grid content-start gap-1.5">
                    <h3 className={`text-2xl font-bold text-aub ${p.rtl ? 'arabic' : ''}`} dir={p.rtl ? 'rtl' : undefined} lang={p.rtl ? 'ar' : undefined}>{p.name}</h3>
                    <p className="label text-plum">{p.category}</p>
                    <p className="text-soft">{p.summary}</p>
                    <p className="text-sm font-medium">Role: {p.role}</p>
                    <span className="cta inline-flex items-center gap-2 font-semibold text-plum">View Case Study <ArrowRight size={18} aria-hidden="true" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
