"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Shield, Calendar, Send } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectScroll from "@/components/ProjectScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YouTubeGallery from "@/components/YouTubeGallery";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProject = projects[currentIndex];

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Smooth scroll back to top when switching projects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  // Dynamically update the body background color using project gradients
  useEffect(() => {
    document.documentElement.style.setProperty("--project-gradient", activeProject.gradient);
  }, [activeProject]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const nextProjectIndex = (currentIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formEmail) {
      setFormSubmitted(true);
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <>
      <Navbar />

      {/* Floating Project Controls */}
      <button
        onClick={handlePrev}
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 hover:border-violet-500 text-white rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] group"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 hover:border-violet-500 text-white rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] group"
        aria-label="Next project"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Floating Capsule Indicator Menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/60 rounded-full px-2 py-1.5 flex items-center gap-1 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setCurrentIndex(idx)}
            className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              idx === currentIndex
                ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {proj.name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Main Orchestration Container */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeProject.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex-1 w-full"
        >
          {/* Section 1: Sticky Image Sequence Canvas Scrollytelling */}
          <ProjectScroll project={activeProject} />

          {/* Section 2: Details Section */}
          <section
            id="details"
            className="py-24 px-6 md:px-12 bg-black/40 border-t border-zinc-900/60 backdrop-blur-sm glow-section"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Visual Card + Stats */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-8"
              >
                {/* Visual Glassmorphic Card representing high-end edits */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800/80 group shadow-2xl">
                  {/* Backdrop Visual Representation */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('/images/${activeProject.id}_detail.png')`,
                      backgroundColor: activeProject.themeColor,
                    }}
                  />
                  {/* Subtle color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600/40 group-hover:border-violet-500">
                      <svg
                        className="w-6 h-6 text-white ml-1 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-violet-400 uppercase">
                      Creative Workspace
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {activeProject.detailsSection.title}
                    </h3>
                  </div>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {activeProject.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4 md:p-6 text-center group hover:border-zinc-700 transition-colors"
                    >
                      <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className="text-2xl md:text-3xl font-extrabold text-white mt-1 font-sans">
                        {stat.val}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Descriptions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-6"
              >
                <div className="inline-block px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-full font-mono text-[10px] uppercase tracking-wider text-violet-400">
                  Detailed Analysis
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Crafted with absolute, surgical precision.
                </h2>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                  {activeProject.detailsSection.description}
                </p>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-light">
                  Pacing is everything. Sound is 50% of the image. Color communicates emotion. By blending these elements meticulously, we transform standard footage into high-end cinematic products that capture and retain viewer attention.
                </p>
                <div className="pt-4 flex flex-wrap gap-3">
                  {activeProject.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900/50 border border-zinc-800/80 rounded-lg px-3 py-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 3: Creative Workflow Section */}
          <section
            id="workflow"
            className="py-24 px-6 md:px-12 bg-black/60 border-t border-zinc-900/40 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-violet-400 uppercase">
                  Our Method
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                  {activeProject.workflowSection.title}
                </h2>
                <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                  {activeProject.workflowSection.description}
                </p>
              </motion.div>

              {/* Grid representing workflow steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  {
                    step: "01",
                    title: "Footage & Direction",
                    desc: "Organizing clips, selecting the best takes, setting up the story arc, and mapping rhythmic cuts to audio.",
                  },
                  {
                    step: "02",
                    title: "Advanced Crafting",
                    desc: "VFX integration, professional color science (matching camera profiles), sound FX layering, and title design.",
                  },
                  {
                    step: "03",
                    title: "Polished Export",
                    desc: "Reviewing pacing, optimizing resolution scales, embedding tags, and exporting clean ProRes and compression-ready formats.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="bg-zinc-900/20 backdrop-blur-xl border border-zinc-800/40 hover:border-zinc-700/60 rounded-2xl p-6 space-y-4 transition-colors"
                  >
                    <div className="font-mono text-xs font-bold text-violet-500">{item.step}</div>
                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-light">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Book Project Section */}
          <section
            id="book-project"
            className="py-24 px-6 md:px-12 bg-black/40 border-t border-zinc-900/40 relative"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-zinc-950/40 border border-zinc-900 rounded-3xl overflow-hidden p-8 md:p-12 backdrop-blur-xl">
                {/* Left Side: Pricing details */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-violet-400 uppercase">
                      {activeProject.bookProjectSection.unit}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                      Start Your Cinematic Edit.
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light">
                      Ready to take your footage to a premium cinema grade? Secure a dedicated slot for {activeProject.name}.
                    </p>
                  </div>

                  <div className="space-y-4 my-6">
                    <div className="text-zinc-400 text-xs font-mono">WHAT IS INCLUDED:</div>
                    <ul className="space-y-2.5">
                      {activeProject.bookProjectSection.processingParams.map((param, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-zinc-300 text-sm font-light">
                          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                          <span>{param}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-zinc-900/80">
                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                      <Calendar className="w-4 h-4 text-zinc-500" />
                      <span>{activeProject.bookProjectSection.deliveryPromise}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                      <Shield className="w-4 h-4 text-zinc-500" />
                      <span>{activeProject.bookProjectSection.returnPolicy}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Booking Form */}
                <div className="lg:col-span-7 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 md:p-8 flex flex-col justify-center">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-zinc-400 text-xs font-mono uppercase">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Rigzy Creative"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-600 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-zinc-400 text-xs font-mono uppercase">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="client@studio.com"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-600 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 text-xs font-mono uppercase">Project Overview</label>
                      <textarea
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Tell us about your footage, length, timeline, and artistic direction..."
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-600 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white rounded-lg text-sm font-semibold tracking-wide shadow-lg shadow-violet-600/10 hover:shadow-violet-600/25 transition-all duration-300 flex items-center justify-center gap-2 group pulse-glow"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>

                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-violet-600/10 border border-violet-500/20 rounded-lg text-center"
                    >
                      <h4 className="text-sm font-bold text-violet-400">Inquiry Received</h4>
                      <p className="text-zinc-400 text-xs mt-1">
                        Thank you! Rigzy will review your creative brief and get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Next Project Large CTA */}
          <section className="bg-black/80 border-t border-zinc-900/50 py-32 px-6 text-center cursor-pointer relative overflow-hidden group">
            {/* Background highlight */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none blur-[60px]"
              style={{
                background: `radial-gradient(circle, ${nextProject.themeColor} 0%, transparent 60%)`,
              }}
            />

            <div
              onClick={() => setCurrentIndex(nextProjectIndex)}
              className="max-w-4xl mx-auto space-y-6 relative z-10 flex flex-col items-center justify-center"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-zinc-500 group-hover:text-violet-400 transition-colors duration-300">
                Next Experience
              </span>
              <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight flex items-center gap-2 md:gap-4 justify-center group-hover:scale-[1.02] transition-transform duration-500">
                <span>{nextProject.name}</span>
                <ArrowRight className="w-8 h-8 md:w-16 md:h-16 text-zinc-600 group-hover:text-violet-500 group-hover:translate-x-4 transition-all duration-500" />
              </h2>
              <p className="text-zinc-500 text-sm md:text-base font-light tracking-wide max-w-md group-hover:text-zinc-400 transition-colors duration-300">
                {nextProject.subName} &bull; Click to switch project view.
              </p>
            </div>
          </section>
          <YouTubeGallery />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
