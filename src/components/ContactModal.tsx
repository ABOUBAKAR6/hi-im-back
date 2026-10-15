import React, { useState } from 'react';
import { X, Mail, Check, Send, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Modeling',
    budget: '$5k - $10k',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jack@3dcreator.studio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#111215] border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 text-[#D7E2EA] shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#D7E2EA] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Available For New Commissions
              </span>
              <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight">
                Let&apos;s Build Together
              </h3>
              <p className="text-[#D7E2EA]/70 text-sm sm:text-base mt-2 font-light">
                Have a 3D vision, brand revamp, or commercial project in mind? Reach out directly or drop a message below.
              </p>
            </div>

            {/* Quick Email Copy Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/[0.04] p-3.5 rounded-2xl border border-white/5 mb-8">
              <div className="flex items-center gap-3 px-2">
                <div className="w-9 h-9 rounded-full bg-[#B600A8]/20 flex items-center justify-center text-[#B600A8]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 font-light">Direct Inbox</span>
                  <span className="font-mono text-sm sm:text-base text-white">jack@3dcreator.studio</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  'Copy Address'
                )}
              </button>
            </div>

            {/* Form */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center gap-3 bg-white/[0.02] rounded-3xl border border-white/5"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold uppercase tracking-wide text-white">Message Dispatched!</h4>
                <p className="text-sm text-[#D7E2EA]/70 max-w-sm font-light">
                  Thank you! Jack reviews inquiries daily and will respond within 24 hours with schedule and project thoughts.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-sm hover:bg-white/10 transition-colors uppercase tracking-wider"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium">Service Needed</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B600A8] transition-colors cursor-pointer"
                    >
                      <option value="3D Modeling">01 - 3D Modeling</option>
                      <option value="Rendering">02 - Rendering</option>
                      <option value="Motion Design">03 - Motion Design</option>
                      <option value="Branding">04 - Branding</option>
                      <option value="Web Design">05 - Web Design</option>
                      <option value="Full Project">Full Multi-discipline Project</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B600A8] transition-colors cursor-pointer"
                    >
                      <option value="$3k - $5k">$3,000 - $5,000</option>
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k+">$25,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium">Project Brief</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your product, timeline, key deliverables, and aesthetic goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                  }}
                  className="mt-2 w-full py-4 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" /> Send Project Brief <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Social handles footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#D7E2EA]/50 uppercase tracking-widest font-light">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Worldwide Remote
              </span>
              <div className="flex items-center gap-4">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  X / Twitter
                </a>
                <a href="https://artstation.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  ArtStation
                </a>
                <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Behance
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
