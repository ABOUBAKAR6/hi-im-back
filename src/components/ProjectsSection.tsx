import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    tagline: 'High-end 3D visual identity and procedural motion direction for next-gen agency',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    id: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    tagline: 'Exploratory conceptual rendering of tactile materials and holographic spatial objects',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: '03',
    name: 'Solaris Digital',
    category: 'Client',
    tagline: 'Futuristic solar-tech hardware showcase and dynamic WebGL product visualizations',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onSelectProject: (project: ProjectData, imageSrc?: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[640px] flex items-start justify-center relative w-full mb-12 sm:mb-20 last:mb-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(clamp(5rem, 8vh, 7.5rem) + ${index * 28}px)`,
        }}
        className="sticky w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] origin-top will-change-transform"
      >
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 mb-6 sm:mb-8 border-b border-[#D7E2EA]/15 pb-5">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {/* Number (huge, same style as services) */}
            <span
              style={{ fontSize: 'clamp(2.5rem, 7vw, 110px)' }}
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tighter"
            >
              {project.id}
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium">
                ({project.category})
              </span>
              <h3 className="text-[#D7E2EA] font-semibold uppercase text-xl sm:text-2xl md:text-3xl tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center self-end md:self-center">
            <LiveProjectButton
              onClick={() => onSelectProject(project, project.col2Image)}
              label="Live Project"
            />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid */}
        {/* Left column (40% width) has 2 stacked images, right column (60%) has 1 tall image */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 md:gap-6 w-full">
          {/* Left Column (40% -> 4 cols out of 10) */}
          <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-6 justify-between">
            {/* Left Top Image */}
            <div
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#18191D] border border-white/5 cursor-pointer group relative"
              onClick={() => onSelectProject(project, project.col1Image1)}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} detail 1`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
                <span className="text-white text-xs uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                  Expand
                </span>
              </div>
            </div>

            {/* Left Bottom Image */}
            <div
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#18191D] border border-white/5 cursor-pointer group relative"
              onClick={() => onSelectProject(project, project.col1Image2)}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} detail 2`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
                <span className="text-white text-xs uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                  Expand
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (60% -> 6 cols out of 10) */}
          <div
            className="md:col-span-6 h-[260px] sm:h-[340px] md:h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#18191D] border border-white/5 cursor-pointer group relative min-h-[260px]"
            onClick={() => onSelectProject(project, project.col2Image)}
          >
            <img
              src={project.col2Image}
              alt={`${project.name} showcase`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
              <span className="text-white text-xs uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full border border-white/20">
                View Project
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectData, imageSrc?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-14 sm:mb-20 text-center">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 Sticky Stacking Cards */}
        <div className="flex flex-col relative">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
