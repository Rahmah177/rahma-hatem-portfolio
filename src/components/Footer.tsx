import { personalInfo } from '../data/personalInfo';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="on-dark bg-black text-[#f1ecee]">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-7 text-sm">
        <span className="flex items-center gap-2"><Logo className="h-5 w-5" /> {personalInfo.name}, {personalInfo.title}</span>
        <span className="flex gap-5">
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={personalInfo.behance} target="_blank" rel="noreferrer">Behance</a>
          <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
        </span>
      </div>
    </footer>
  );
}
