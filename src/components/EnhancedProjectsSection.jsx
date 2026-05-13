import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Advanced RAG System',
    category: 'AI/LLM',
    description: 'Production-grade Retrieval Augmented Generation system using vector embeddings and fine-tuned LLMs',
    longDescription: 'Built a sophisticated RAG pipeline that combines document retrieval with large language models. Implements semantic search, knowledge graph integration, and real-time context augmentation for precise query answers.',
    technologies: ['LangChain', 'OpenAI', 'FAISS', 'FastAPI', 'PostgreSQL'],
    impact: '99.2% accuracy on domain-specific QA',
    links: { github: '#', demo: '#' },
    color: 'from-[#FF006E] to-[#FF4365]',
  },
  {
    id: 2,
    title: 'Computer Vision Pipeline',
    category: 'Deep Learning',
    description: 'Real-time object detection and segmentation system with 92% accuracy on custom dataset',
    longDescription: 'Developed YOLOv8-based detection pipeline with custom training on proprietary dataset. Integrated instance segmentation and object tracking for real-time video analysis.',
    technologies: ['YOLOv8', 'PyTorch', 'OpenCV', 'FastAPI', 'Docker'],
    impact: '92% mAP on custom dataset',
    links: { github: '#', demo: '#' },
    color: 'from-[#00F0FF] to-[#0099FF]',
  },
  {
    id: 3,
    title: 'AI-Powered Analytics Platform',
    category: 'Full-Stack',
    description: 'End-to-end ML platform with interactive dashboards, model training, and real-time predictions',
    longDescription: 'Complete analytics platform with React frontend, Node.js backend, and Python ML services. Features real-time model training, hyperparameter optimization, and predictive analytics.',
    technologies: ['React', 'Node.js', 'TensorFlow', 'PostgreSQL', 'AWS'],
    impact: '10x faster analysis vs competitors',
    links: { github: '#', demo: '#' },
    color: 'from-[#7B61FF] to-[#B061FF]',
  },
  {
    id: 4,
    title: 'NLP Sentiment Analysis Engine',
    category: 'NLP',
    description: 'Multi-language sentiment analysis with transformer-based models and real-time processing',
    longDescription: 'Implemented fine-tuned BERT models for sentiment classification across 12 languages. Built scalable processing pipeline handling 1M+ requests/day.',
    technologies: ['Transformers', 'BERT', 'FastAPI', 'Redis', 'Kubernetes'],
    impact: '98.5% accuracy, 50ms latency',
    links: { github: '#', demo: '#' },
    color: 'from-[#FFB700] to-[#FFD700]',
  },
  {
    id: 5,
    title: 'Autonomous ML System',
    category: 'AutoML',
    description: 'Automated machine learning framework for feature engineering and model selection',
    longDescription: 'AutoML framework that automatically handles feature engineering, model selection, and hyperparameter tuning. Reduces model development time from weeks to hours.',
    technologies: ['AutoML', 'Optuna', 'Scikit-learn', 'Python', 'Docker'],
    impact: '80% reduction in dev time',
    links: { github: '#', demo: '#' },
    color: 'from-[#00D4FF] to-[#0099FF]',
  },
  {
    id: 6,
    title: 'Generative AI Art Platform',
    category: 'Generative AI',
    description: 'Web platform for generating AI art using Stable Diffusion with custom LoRA fine-tuning',
    longDescription: 'Full-stack platform enabling users to generate custom AI art with fine-tuned models. Includes prompt optimization, gallery management, and social features.',
    technologies: ['Stable Diffusion', 'React', 'FastAPI', 'MongoDB', 'AWS S3'],
    impact: '50K+ users, 2M+ generations',
    links: { github: '#', demo: '#' },
    color: 'from-[#FF1493] to-[#FF69B4]',
  },
]

function ProjectCard({ project, index, isSelected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => onSelect(index)}
      className="group cursor-pointer h-full"
    >
      <div className={`relative h-full rounded-2xl border border-[#7B61FF]/20 overflow-hidden bg-gradient-to-br from-[#0F111D] to-[#1A1D2E] transition-all duration-300 ${
        isSelected ? 'lg:col-span-2 lg:row-span-2' : ''
      } hover:border-[#00F0FF]/50`}>
        
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative p-6 md:p-8 h-full flex flex-col">
          {/* Category Badge */}
          <div className="inline-flex w-fit mb-4">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white`}>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00F0FF] group-hover:to-[#7B61FF] transition-all duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[#94A3B8] mb-4 line-clamp-3 flex-grow font-light">
            {project.description}
          </p>

          {/* Full Description - Only in selected state */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <p className="text-[#94A3B8] mb-4 font-light text-sm">
                  {project.longDescription}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, isSelected ? project.technologies.length : 2).map((tech, i) => (
              <motion.span
                key={i}
                initial={isSelected ? { opacity: 0, scale: 0.8 } : {}}
                animate={isSelected ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="text-xs px-2 py-1 rounded bg-[#7B61FF]/20 text-[#00F0FF] font-mono"
              >
                {tech}
              </motion.span>
            ))}
            {!isSelected && project.technologies.length > 2 && (
              <span className="text-xs px-2 py-1 text-[#94A3B8]">+{project.technologies.length - 2} more</span>
            )}
          </div>

          {/* Impact - Only in selected state */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-4 p-3 rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/5"
              >
                <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wide">📊 Impact:</span>
                <p className="text-[#00F0FF] font-semibold mt-1">{project.impact}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Links - Always visible */}
          <div className="flex gap-3 mt-auto">
            <a
              href={project.links.github}
              className="flex-1 py-2 px-4 rounded-lg border border-[#7B61FF]/30 text-[#00F0FF] font-semibold text-sm text-center hover:bg-[#7B61FF]/10 transition-colors duration-200"
            >
              Code
            </a>
            <a
              href={project.links.demo}
              className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] text-[#03050C] font-semibold text-sm text-center hover:shadow-lg hover:shadow-[#00F0FF]/30 transition-all duration-200"
            >
              Live
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function EnhancedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(0)

  return (
    <section id="projects" className="relative py-20 sm:py-32 bg-[#03050C] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 h-[600px] w-[600px] rounded-full bg-[#7B61FF]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7B61FF]/30 bg-[#7B61FF]/10 px-4 py-1.5 text-xs font-mono text-[#00F0FF] uppercase tracking-widest mb-6 backdrop-blur">
            💼 Portfolio
          </div>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#7B61FF] to-[#FF006E]">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto font-light">
            A showcase of innovative AI/ML solutions and full-stack applications that solve real-world problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-max">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isSelected={selectedProject === index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#03050C] bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] hover:shadow-2xl hover:shadow-[#00F0FF]/50 transition-all duration-300 hover:scale-105"
          >
            View All Projects
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
