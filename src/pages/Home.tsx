import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Copy, Download, Mail } from 'lucide-react';
import { useState } from 'react';
import ProjectStage from '../components/ProjectStage';
import Reveal from '../components/Reveal';
import { awards, timeline } from '../data/experience';
import { personalInfo as me } from '../data/personalInfo';
import { projects } from '../data/projects';
import { languages, processSteps, skillGroups } from '../data/skills';

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } }),
};

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  return (
    <section id="home" ref={ref} className="on-dark overflow-hidden bg-aub text-blush">
      <div className="wrap grid items-end gap-5 pt-8 md:grid-cols-[1.15fr_1fr] md:pt-12">
        <motion.div initial="hidden" animate="show" className="grid gap-4 pb-2 md:pb-16">
          <motion.p variants={rise} custom={0} className="font-medium text-pist">Hello, I'm</motion.p>
          <motion.h1 variants={rise} custom={1} className="text-[clamp(3.4rem,8.6vw,7.4rem)] font-extrabold leading-[.92] tracking-[-.035em]">Rahma<br />Hatem</motion.h1>
          <motion.p variants={rise} custom={2} className="font-display text-2xl font-bold">{me.title}</motion.p>
          <motion.p variants={rise} custom={3} className="max-w-[32ch] text-[1.2rem]">{me.tagline}</motion.p>
          <motion.p variants={rise} custom={4} className="max-w-[46ch] opacity-85">{me.intro}</motion.p>
          <motion.div variants={rise} custom={5} className="flex flex-wrap gap-3">
            <a href="#work" className="bg-pist px-5 py-3 font-semibold text-aub">View My Work</a>
            <a href="#contact" className="border border-blush px-5 py-3 font-semibold">Let's Connect</a>
          </motion.div>
          <motion.p variants={rise} custom={6} className="flex flex-wrap gap-x-5 gap-y-1 text-sm opacity-85"><span>{me.location}</span><span>{me.graduation}</span></motion.p>
        </motion.div>
        <motion.div className="fig mx-auto w-full max-w-[560px]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }}>
          <motion.img style={{ y }} src={me.photo} width={1100} height={1082} alt="Portrait of Rahma Hatem" fetchPriority="high" />
        </motion.div>
      </div>
    </section>
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
        {skillGroups.map((g) => (
          <Reveal key={g.title} className="grid gap-3 border-t border-line py-5 md:grid-cols-[14rem_1fr]">
            <h3 className="text-xl font-bold text-plum">{g.title}</h3>
            <p className="font-display text-[clamp(1.15rem,2.2vw,1.65rem)] font-medium leading-snug text-aub">{g.skills.join('  ·  ')}</p>
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
        </div>
        <Reveal>
          <h3 className="text-2xl font-bold text-aub">Awards and certificates</h3>
          <ul className="m-0 mt-5 list-none p-0">
            {awards.map((a) => <li key={a.title} className="flex justify-between gap-4 border-t border-line py-2.5"><span>{a.title}</span><span className="whitespace-nowrap text-sm tabular-nums text-soft">{a.date}</span></li>)}
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
          <a href={`mailto:${me.email}`} className="inline-flex items-center gap-2 bg-aub px-5 py-3 font-semibold text-blush"><Mail size={18} aria-hidden="true" /> {me.email}</a>
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 border border-aub px-4 py-3 font-semibold">{copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}{copied ? 'Copied' : 'Copy email'}</button>
          <a href={me.cv} download className="inline-flex items-center gap-2 border border-aub px-4 py-3 font-semibold"><Download size={18} aria-hidden="true" /> Download CV</a>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-display text-2xl font-bold">
          {social.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2">{label} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" aria-hidden="true" /></a>)}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { document.title = `${me.name} | ${me.title}`; }, []);
  return (
    <>
      <Hero />
      <About />
      <section id="work" aria-label="Selected work">
        <div className="wrap pb-8"><h2 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold tracking-[-.025em] text-aub">Selected work</h2></div>
        {projects.map((p) => <ProjectStage key={p.slug} project={p} />)}
      </section>
      <Process />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
