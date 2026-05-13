import { motion } from 'framer-motion'
import SkillsNetwork from './SkillsNetwork'

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    skills: [
      'Deep Learning (CNN, RNN, Transformers)',
      'Large Language Models (LLMs)',
      'Computer Vision & NLP',
      'ML Pipeline & MLOps',
      'TensorFlow, PyTorch, Hugging Face',
    ],
  },
  {
    title: 'Full-Stack Development',
    skills: [
      'Frontend: React, Vite, Tailwind CSS',
      'Backend: Node.js, FastAPI, Django',
      'Databases: PostgreSQL, MongoDB',
      'Real-time: WebSockets, GraphQL',
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      'AWS (EC2, S3, Lambda, SageMaker)',
      'Docker & Kubernetes',
      'CI/CD Pipelines',
      'Model Deployment & Scaling',
    ],
  },
]

export default function EnhancedSkillsSection() {
  return (
    <section id="skills" className="relative py-20 sm:py-32 bg-[#03050C] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 h-[600px] w-[600px] rounded-full bg-[#00F0FF]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#7B61FF]/10 blur-[120px]" />
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
            ⚡ Expertise
          </div>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
            <span className="text-white">Technical</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#7B61FF] to-[#FF006E]">
              Arsenal
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto font-light">
            A comprehensive toolkit spanning AI/ML, full-stack development, and cloud infrastructure
          </p>
        </motion.div>

        {/* 3D Skills Network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 h-[500px] rounded-2xl overflow-hidden border border-[#7B61FF]/30 bg-gradient-to-b from-[#7B61FF]/5 to-transparent backdrop-blur"
        >
          <SkillsNetwork />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Background gradient card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/20 to-[#00F0FF]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card */}
              <div className="relative bg-[#0F111D]/50 border border-[#7B61FF]/20 rounded-2xl p-8 backdrop-blur-md transition-all duration-300 group-hover:border-[#00F0FF]/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7B61FF] to-[#00F0FF] flex items-center justify-center text-white font-bold text-lg">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                <ul className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.li
                      key={skillIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (idx * 0.1) + (skillIdx * 0.05) }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 group/item"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#00F0FF]/20 text-[#00F0FF] font-bold text-sm flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-[#94A3B8] group-hover/item:text-[#00F0FF] transition-colors duration-200">
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid sm:grid-cols-2 gap-8"
        >
          {[
            { label: 'Python & Deep Learning', percentage: 95 },
            { label: 'React & Web Development', percentage: 90 },
            { label: 'Cloud & DevOps', percentage: 85 },
            { label: 'LLMs & NLP', percentage: 92 },
          ].map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-white">{skill.label}</span>
                <span className="text-xs font-mono text-[#00F0FF]">{skill.percentage}%</span>
              </div>
              <div className="h-2 bg-[#0F111D] rounded-full overflow-hidden border border-[#7B61FF]/30">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] rounded-full"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
