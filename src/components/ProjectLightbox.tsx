import React, { useState } from 'react';
import { X, ExternalLink, Layers, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectData } from './ProjectsSection';

interface ProjectLightboxProps {
  project: ProjectData | null;
  initialImage?: string;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  initialImage,
  onClose,
  onContactClick,
}) => {
  const [activeImage, setActiveImage] = useState<string>(
    initialImage || project?.col2Image || ''
  );

  if (!project) return null;

  const currentImage = activeImage || project.col2Image;
  const allImages = [
    { src: project.col2Image, label: 'Hero View' },
    { src: project.col1Image1, label: 'Detail 01' },
    { src: project.col1Image2, label: 'Detail 02' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0F1014] border border-[#D7E2EA]/20 rounded-[32px] sm:rounded-[48px] overflow-hidden text-[#D7E2EA] shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 my-auto flex flex-col max-h-[94vh]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0C0C0C]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-[#D7E2EA]/50 font-bold">
                {project.id}
              </span>
              <span className="text-xs uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                {project.category}
              </span>
              <h3 className="font-semibold uppercase text-lg sm:text-xl text-white tracking-wide">
                {project.name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#D7E2EA] transition-colors cursor-pointer"
              aria-label="Close project view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex flex-col gap-6">
            {/* Primary Image Viewport */}
            <div className="w-full h-[40vh] sm:h-[50vh] md:h-[56vh] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-black flex items-center justify-center relative border border-white/10 group">
              <img
                src={currentImage}
                alt={project.name}
                className="w-full h-full object-contain sm:object-cover transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono flex items-center gap-1.5 text-white/80">
                <Eye className="w-3.5 h-3.5 text-emerald-400" /> High-Resolution 3D Render
              </div>
            </div>

            {/* Gallery Selector Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {allImages.map((img, i) => {
                const isSelected = (activeImage || project.col2Image) === img.src;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img.src)}
                    className={`relative flex-shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#B600A8] scale-102 shadow-[0_0_15px_rgba(182,0,168,0.4)]'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/70 text-[10px] uppercase tracking-wider text-center py-0.5 text-white">
                      {img.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Project Details Footer */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="max-w-2xl">
                <p className="text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-relaxed">
                  {project.tagline}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#D7E2EA]/50 uppercase tracking-wider font-mono">
                  <Layers className="w-3.5 h-3.5" /> Blender • Octane Render • Substance Painter • Three.js
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onContactClick();
                  }}
                  className="flex-1 md:flex-none px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-all cursor-pointer"
                >
                  Commission Similar
                </button>
                <a
                  href={currentImage}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none px-6 py-3 rounded-full border border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 text-xs sm:text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Full Asset <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectLightbox;
