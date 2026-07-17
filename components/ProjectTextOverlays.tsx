"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
  project: Project;
}

export default function ProjectTextOverlays({ scrollYProgress, project }: ProjectTextOverlaysProps) {
  // Section 1 range: 0.0 - 0.23
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.04, 0.18, 0.22], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.04, 0.18, 0.22], [30, 0, 0, -30]);

  // Section 2 range: 0.25 - 0.47
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.26, 0.43, 0.47], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.26, 0.43, 0.47], [30, 0, 0, -30]);

  // Section 3 range: 0.50 - 0.72
  const opacity3 = useTransform(scrollYProgress, [0.47, 0.51, 0.68, 0.72], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.47, 0.51, 0.68, 0.72], [30, 0, 0, -30]);

  // Section 4 range: 0.75 - 0.98
  const opacity4 = useTransform(scrollYProgress, [0.72, 0.76, 0.93, 0.97], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.72, 0.76, 0.93, 0.97], [30, 0, 0, -30]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {/* Vignette backing to keep text readable against dynamic imagery */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />

      {/* Section 1 Overlay */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute flex flex-col items-center text-center px-6 max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400 mb-3 drop-shadow">
          Project Highlight
        </span>
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
          {project.section1.title}
        </h2>
        {project.section1.subtitle && (
          <p className="text-lg md:text-2xl mt-4 text-zinc-300 font-light tracking-wide max-w-xl mx-auto drop-shadow">
            {project.section1.subtitle}
          </p>
        )}
      </motion.div>

      {/* Section 2 Overlay */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute flex flex-col items-center text-center px-6 max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400 mb-3 drop-shadow">
          Cinematography
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
          {project.section2.title}
        </h2>
        {project.section2.subtitle && (
          <p className="text-lg md:text-xl mt-4 text-zinc-300 font-light tracking-wide max-w-2xl mx-auto drop-shadow">
            {project.section2.subtitle}
          </p>
        )}
      </motion.div>

      {/* Section 3 Overlay */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute flex flex-col items-center text-center px-6 max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400 mb-3 drop-shadow">
          Visual Identity
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
          {project.section3.title}
        </h2>
        {project.section3.subtitle && (
          <p className="text-lg md:text-xl mt-4 text-zinc-300 font-light tracking-wide max-w-2xl mx-auto drop-shadow">
            {project.section3.subtitle}
          </p>
        )}
      </motion.div>

      {/* Section 4 Overlay */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute flex flex-col items-center text-center px-6 max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400 mb-3 drop-shadow">
          The Philosophy
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          {project.section4.title}
        </h2>
        {project.section4.subtitle && (
          <p className="text-lg md:text-xl mt-4 text-zinc-300 font-light tracking-wide max-w-xl mx-auto drop-shadow">
            {project.section4.subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
