import { motion } from 'framer-motion'
import DataFlowVisualization from './DataFlowVisualization'

export default function EnhancedAboutSection() {
  const stats = [
    { icon: '🧠', label: 'AI/ML Focus', value: 'Deep Learning Expertise' },
    { icon: '💼', label: 'Experience', value: '5+ Years' },
    { icon: '🚀', label: 'Projects', value: '30+ Completed' },
    { icon: '📚', label: 'Learning', value: 'Always Growing' },
  ]

  return (
    <section id="about" className="relative py-20 sm:py-32 bg-[#03050C] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 h-[600px] w-[600px] rounded-full bg-[#7B61FF]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden border border-[#7B61FF]/30 bg-gradient-to-b from-[#7B61FF]/10 to-transparent backdrop-blur order-2 lg:order-1"
          >
            <div className="absolute inset-0">
              <DataFlowVisualization />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#03050C] via-transparent pointer-events-none" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7B61FF]/30 bg-[#7B61FF]/10 px-4 py-1.5 text-xs font-mono text-[#00F0FF] uppercase tracking-widest mb-6 backdrop-blur">
                👋 About Me
              </div>
              <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4 leading-[1.1]">
                <span className="text-white">Passionate About</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#7B61FF] to-[#FF006E]">
                  Intelligent Systems
                </span>
              </h2>
            </div>

            {/* Bio */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-[#94A3B8] font-light leading-relaxed">
                I'm a full-stack AI/ML engineer dedicated to building intelligent systems that solve complex real-world problems. With expertise spanning deep learning, NLP, computer vision, and cloud infrastructure, I transform ideas into scalable solutions.
              </p>
              <p className="text-lg text-[#94A3B8] font-light leading-relaxed">
                My passion lies in creating elegant, efficient code and designing ML architectures that push the boundaries of what's possible. From research-grade models to production APIs, I bring technical excellence to every project.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg border border-[#7B61FF]/30 bg-[#0F111D]/50 backdrop-blur hover:border-[#00F0FF]/50 transition-colors duration-300"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="text-sm font-bold text-[#00F0FF]">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Approach */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">My Approach</h3>
              <ul className="space-y-2">
                {[
                  'Understanding your problem deeply before jumping to solutions',
                  'Building scalable, maintainable, and well-documented code',
                  'Continuous learning and staying updated with latest technologies',
                  'Delivering excellence through iterative improvement and testing',
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#00F0FF] font-bold mt-0.5">✓</span>
                    <span className="text-[#94A3B8] font-light">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] text-[#03050C] hover:shadow-lg hover:shadow-[#00F0FF]/50 transition-all duration-200 hover:scale-105"
              >
                View My Work →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all duration-200"
              >
                Let's Collaborate
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
