import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ProjectStage from './ProjectStage';
import type { Project, StageTheme } from '../data/projects';

// Each featured project opens out of the arch from Logo A and the hero portrait. The arch
// is one solid shape animated with transform only, so scrolling stays light.
export default function ProjectChapter({ project, background }: { project: Project; background: StageTheme }) {
  const band = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: band, offset: ['start end', 'end 45%'] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.32, 1.9]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.45, 1]);

  return (
    <div data-chapter={project.slug}>
      {!reduce && (
        <div ref={band} className={`chapter-band t-${background}`} aria-hidden="true">
          <motion.div className={`chapter-arch t-${project.stage.theme}`} style={{ scaleX, scaleY }} />
        </div>
      )}
      <div id={`p-${project.slug}`}>
        <ProjectStage project={project} />
      </div>
    </div>
  );
}
