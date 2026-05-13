import { motion } from 'framer-motion'

const experiences = [
  {
    id: 1,
    role: 'Senior ML Engineer',
    company: 'TechCorp AI',
    period: '2023 - Present',
    description: 'Leading ML infrastructure and deploying production models at scale. Mentoring junior engineers on best practices.',
    achievements: [
      'Developed RAG system improving QA accuracy by 99.2%',
      'Reduced model inference latency by 60%',
      'Built CI/CD pipelines for ML models',
    ],
    technologies: ['Python', 'PyTorch', 'Kubernetes', 'AWS'],
    icon: '🚀',
  },
  {
    id: 2,
    role: 'Full-Stack AI Developer',
    company: 'InnovateLabs',
    period: '2021 - 2023',
    description: 'Built end-to-end AI applications combining machine learning with production web interfaces.',
    achievements: [
      'Created computer vision pipeline with 92% accuracy',
      'Designed REST APIs serving 1M+ requests/day',
      'Implemented automated model training pipeline',
    ],
    technologies: ['React', 'FastAPI', 'TensorFlow', 'Docker'],
    icon: '💡',
  },
  {
    id: 3,
    role: 'Machine Learning Engineer',
    company: 'DataDrive Solutions',
    period: '2020 - 2021',
    description: 'Developed ML solutions for data analysis and predictive modeling across various domains.',
    achievements: [
      'Built sentiment analysis engine for 12 languages',
      'Implemented NLP models with 98.5% accuracy',
      'Created automated data pipeline processing 100K+ records',
    ],
    technologies: ['Python', 'Scikit-learn', 'NLP', 'PostgreSQL'],
    icon: '📊',
  },
  {
    id: 4,
    role: 'Junior Developer',
    company: 'StartupHub',
    period: '2019 - 2020',
    description: 'Full-stack web development and basic machine learning implementations.',
    achievements: [
      'Developed responsive web applications',
      'Implemented basic ML features for recommendation system',
      'Optimized database queries reducing load time by 40%',
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    icon: '🌱',
  },
]

export default function EnhancedExperienceSection() {
  return (
    <section id="experience" className="relative py-20 sm:py-32 bg-[#03050C] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#00F0FF]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#7B61FF]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7B61FF]/30 bg-[#7B61FF]/10 px-4 py-1.5 text-xs font-mono text-[#00F0FF] uppercase tracking-widest mb-6 backdrop-blur">
            🎯 Journey
          </div>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-6">
            <span className="text-white">Professional</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#7B61FF] to-[#FF006E]">
              Experience
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto font-light">
            A progressive journey building intelligent systems and innovative solutions
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#7B61FF] to-[#FF006E]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative grid md:grid-cols-2 gap-8 items-start ${
                  index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-6 -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#7B61FF] flex items-center justify-center border-4 border-[#03050C] text-2xl cursor-pointer shadow-lg shadow-[#00F0FF]/50"
                  >
                    {exp.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative group ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:col-start-2'
                  }`}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 to-[#00F0FF]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card */}
                  <div className="relative bg-[#0F111D]/50 border border-[#7B61FF]/20 rounded-2xl p-6 md:p-8 backdrop-blur-md transition-all duration-300 group-hover:border-[#00F0FF]/50">
                    {/* Role & Company */}
                    <div className="mb-2">
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                      <p className="text-lg text-[#00F0FF] font-semibold">{exp.company}</p>
                    </div>

                    {/* Period */}
                    <p className="text-sm text-[#94A3B8] font-mono mb-4 uppercase tracking-wide">
                      {exp.period}
                    </p>

                    {/* Description */}
                    <p className="text-[#94A3B8] mb-4 font-light leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-[#00F0FF] mb-2 uppercase tracking-wide">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-[#94A3B8]"
                          >
                            <span className="text-[#00F0FF] font-bold mt-0.5">›</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-lg bg-[#7B61FF]/20 text-[#00F0FF] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid sm:grid-cols-4 gap-4 text-center"
        >
          {[
            { label: 'Years of Experience', value: '5+' },
            { label: 'Projects Completed', value: '30+' },
            { label: 'Models Deployed', value: '20+' },
            { label: 'Happy Clients', value: '15+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl border border-[#7B61FF]/30 bg-[#0F111D]/50 backdrop-blur hover:border-[#00F0FF]/50 transition-colors duration-300"
            >
              <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#7B61FF]">
                {stat.value}
              </div>
              <p className="text-xs text-[#94A3B8] mt-1 font-light">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
