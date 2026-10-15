/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection, { ProjectData } from './components/ProjectsSection';
import ContactModal from './components/ContactModal';
import ProjectLightbox from './components/ProjectLightbox';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    project: ProjectData | null;
    initialImage?: string;
  }>({
    project: null,
    initialImage: undefined,
  });

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  const handleSelectProject = (project: ProjectData, imageSrc?: string) => {
    setSelectedProject({ project, initialImage: imageSrc });
  };

  const handleCloseLightbox = () => {
    setSelectedProject({ project: null, initialImage: undefined });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen w-full relative selection:bg-[#B600A8] selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={handleOpenContact} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={handleOpenContact} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection onSelectProject={handleSelectProject} />

      {/* Footer / Copyright bar */}
      <footer className="w-full bg-[#0C0C0C] border-t border-[#D7E2EA]/10 px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-[#D7E2EA]/50 uppercase tracking-widest relative z-20">
        <div>
          © {new Date().getFullYear()} Jack — 3D Creator. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Back to Top ↑
          </button>
          <button
            onClick={handleOpenContact}
            className="hover:text-[#B600A8] transition-colors cursor-pointer text-white font-medium"
          >
            Get In Touch
          </button>
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />

      {/* Interactive Project Lightbox */}
      <ProjectLightbox
        project={selectedProject.project}
        initialImage={selectedProject.initialImage}
        onClose={handleCloseLightbox}
        onContactClick={handleOpenContact}
      />
    </div>
  );
}
