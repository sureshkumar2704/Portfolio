import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'

const PROJECTS = [
  {
    id: 'project-adobe-hackathon',
    title: 'Adobe India Hackathon – AI-Driven PDF to Podcast',
    summary: 'Turns PDFs into engaging podcasts and interactive conversations with reduced latency.',
    details: [
      'React.js, Python, FastAPI, Gemini API, PyMuPDF pipeline.',
      'Converts complex PDF documents into dynamic podcasts with chapterized audio.',
      'Optimized inference path, reducing overall latency by ~30%.',
    ],
    tech: ['React.js', 'Python', 'FastAPI', 'Gemini API', 'PyMuPDF'],
    tags: ['AI', 'Hackathon', 'Web App'],
  },
  {
    id: 'project-medicinal-plants',
    title: 'Medicinal Plant Classification & Identification',
    summary: 'Deep learning model for accurate medicinal plant recognition.',
    details: [
      'Python, TensorFlow, VGG16-based transfer learning backbone.',
      'Achieved high training and validation accuracy on curated dataset.',
      'Designed for real-time identification from mobile or web clients.',
    ],
    tech: ['Python', 'TensorFlow', 'VGG16'],
    tags: ['Deep Learning', 'Computer Vision'],
  },
  {
    id: 'project-aadhaar-pragya',
    title: 'Aadhaar Pragya – Interactive Analytics Dashboard',
    summary: 'Interactive analytics dashboard with AI-driven insights and forecasting.',
    details: [
      'React.js frontend with FastAPI backend and Plotly visualizations.',
      'Surfaces AI-driven insights and predictive forecasting for Aadhaar metrics.',
      'Responsive cards and drill-down charts tuned for decision-makers.',
    ],
    tech: ['React.js', 'FastAPI', 'Plotly'],
    tags: ['Data Analytics', 'Full Stack'],
  },
]

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null)

  const openProject = (project) => {
    setSelected(project)
    window.history.pushState(null, '', `/#${project.id}`)
  }

  const closeProject = () => {
    setSelected(null)
    window.history.pushState(null, '', '/')
  }

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-[0.25em] mb-3">Projects</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Featured <span className="gradient-text">Work</span>
            </h2>
          </div>
          <p className="hidden md:block text-sm font-mono text-[#94A3B8]">2024 — Present</p>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => openProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050C]/85 px-4 backdrop-blur-xl"
            onClick={closeProject}
            onKeyDown={(e) => e.key === 'Escape' && closeProject()}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.95)] backdrop-blur-xl text-left text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#00F0FF] via-[#7B61FF] to-[#FF0055]" />

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight pr-8">
                    {selected.title}
                  </h3>
                  <button
                    onClick={closeProject}
                    className="shrink-0 rounded-full bg-white/5 p-2 text-[#94A3B8] transition-all hover:bg-white/10 hover:text-white hover:rotate-90"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Tags */}
                {selected.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#7B61FF] bg-[#7B61FF]/10 border border-[#7B61FF]/20 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-base text-[#94A3B8] mb-8 leading-relaxed">
                  {selected.summary}
                </p>

                {/* Key Features */}
                <div className="space-y-4 mb-10">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#94A3B8]/70">Key Features</h4>
                  <ul className="space-y-3">
                    {selected.details.map((line) => (
                      <li key={line} className="flex gap-3 text-sm text-white/85 leading-relaxed">
                        <span className="text-[#7B61FF] shrink-0 mt-0.5">▹</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="border-t border-white/8 pt-6">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#94A3B8]/70 mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono font-medium text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
