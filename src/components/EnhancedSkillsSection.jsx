import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

const skillNodes = [
  {
    title: 'AI / Machine Learning',
    icon: '◉',
    accent: '#FF8A00',
    position: 'top-left',
    description: 'Core model building, training, and evaluation for intelligent systems.',
    skills: [
      { name: 'PyTorch', level: 5 },
      { name: 'TensorFlow', level: 5 },
      { name: 'scikit-learn', level: 4 },
    ],
  },
  {
    title: 'Programming',
    icon: '</>',
    accent: '#22A8FF',
    position: 'top-right',
    description: 'Strong foundations in scripting, product development, and backend logic.',
    skills: [
      { name: 'Python', level: 6 },
      { name: 'C++', level: 5 },
      { name: 'JavaScript', level: 5 },
    ],
  },
  {
    title: 'Data & Analytics',
    icon: '▥',
    accent: '#7ED957',
    position: 'middle-left',
    description: 'Exploration, transformation, and insight generation from complex data.',
    skills: [
      { name: 'Pandas', level: 5 },
      { name: 'NumPy', level: 5 },
      { name: 'SQL', level: 4 },
    ],
  },
  {
    title: 'MLOps & Tools',
    icon: '⚙',
    accent: '#C985FF',
    position: 'middle-right',
    description: 'Shipping models reliably with Docker, Kubernetes, Git, and automation.',
    skills: [
      { name: 'Docker', level: 5 },
      { name: 'Kubernetes', level: 5 },
      { name: 'Git', level: 4 },
    ],
  },
  {
    title: 'Cloud & Deployment',
    icon: '☁',
    accent: '#FFC533',
    position: 'bottom-center',
    description: 'Deploying scalable AI products on cloud platforms and live environments.',
    skills: [
      { name: 'AWS', level: 5 },
      { name: 'Google Cloud', level: 4 },
      { name: 'Streamlit', level: 5 },
    ],
  },
]

const featureTags = ['Problem Solver', 'Lifelong Learner', 'Clean Coder', 'Collaborative']

const linePairs = [
  { x1: '50%', y1: '50%', x2: '39%', y2: '31%', color: '#FF8A00' },
  { x1: '50%', y1: '50%', x2: '66%', y2: '30%', color: '#22A8FF' },
  { x1: '50%', y1: '50%', x2: '32%', y2: '66%', color: '#7ED957' },
  { x1: '50%', y1: '50%', x2: '68%', y2: '67%', color: '#C985FF' },
  { x1: '50%', y1: '50%', x2: '50%', y2: '82%', color: '#FFC533' },
]

function DotMeter({ level, color }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 7 }).map((_, index) => (
        <span
          key={index}
          className="h-2.5 w-2.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: index < level ? color : 'rgba(148,163,184,0.18)' }}
        />
      ))}
    </div>
  )
}

function SkillCard({ node, className = '', active, onActivate }) {
  return (
    <motion.button
      type="button"
      onClick={onActivate}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={`group relative w-full rounded-2xl border bg-[#0B1020]/72 p-4 text-center backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 ${className}`}
      style={{
        borderColor: active ? `${node.accent}80` : `${node.accent}25`,
        boxShadow: active ? `0 0 0 1px ${node.accent}40, 0 24px 60px ${node.accent}18` : undefined,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${node.accent}22, transparent 70%)` }}
      />

      {active && <div className="absolute inset-0 rounded-2xl border border-white/10" />}

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border text-xl font-semibold transition-transform duration-300 group-hover:scale-105"
            style={{ borderColor: node.accent, color: node.accent, boxShadow: `0 0 0 1px ${node.accent}20, 0 0 18px ${node.accent}22` }}
          >
            {node.icon}
          </div>
          <h3 className="text-sm font-medium uppercase tracking-[0.18em]" style={{ color: node.accent }}>
            {node.title}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/2 px-4 py-3">
          <p className="mb-3 text-xs leading-5 text-[#AAB6D2]">{node.description}</p>
          <div className="space-y-3">
            {node.skills.map((skill) => (
              <div key={skill.name} className="grid grid-cols-[1fr_auto] items-center gap-4 text-sm text-[#E5E7EB] transition-colors duration-300 group-hover:text-white">
                <span className="flex items-center justify-center gap-2">
                  <span className="text-white/80">•</span>
                  {skill.name}
                </span>
                <DotMeter level={skill.level} color={node.accent} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default function EnhancedSkillsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeNode = useMemo(() => skillNodes[selectedIndex] ?? skillNodes[0], [selectedIndex])

  return (
    <section id="skills" className="relative overflow-hidden bg-[#03050C] py-20 sm:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 rounded-full bg-[#7B61FF]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-125 w-125 rounded-full bg-[#00F0FF]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-[#FF8A00]/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.35em] text-[#B8C7FF] backdrop-blur">
            Technical Skills
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[0.2em] text-[#78D8FF] sm:text-5xl">
            TECHNICAL SKILLS
          </h2>
          <div className="mx-auto mt-4 flex max-w-xl items-center gap-4">
            <span className="h-px flex-1 bg-linear-to-r from-transparent via-[#78D8FF]/70 to-transparent" />
            <span className="h-2 w-2 rounded-full bg-[#A8C2FF] shadow-[0_0_18px_rgba(168,194,255,0.9)]" />
            <span className="h-px flex-1 bg-linear-to-r from-transparent via-[#A8C2FF]/70 to-transparent" />
          </div>
          <p className="mt-4 text-sm text-[#A9B4D0] sm:text-base">
            My toolkit for building intelligent & scalable solutions
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-[#6F7FA7]">
            Hover a card to preview. Click one to pin it.
          </p>
        </motion.div>

        {/* Hub Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mx-auto mb-14 hidden min-h-190 rounded-4xl border border-white/5 bg-[radial-gradient(circle_at_center,rgba(83,98,154,0.1),transparent_34%),linear-gradient(180deg,rgba(6,9,22,0.96),rgba(3,5,12,0.98))] p-6 shadow-[0_0_80px_rgba(0,0,0,0.35)] lg:block"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 760" preserveAspectRatio="none" aria-hidden="true">
            {linePairs.map((line, index) => (
              <g key={`${line.color}-${index}`}>
                <motion.line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={line.color}
                  strokeOpacity="0.8"
                  strokeWidth="1.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: selectedIndex === index ? 1 : 0.65 }}
                  transition={{ duration: 1.2, delay: index * 0.12 }}
                />
                <motion.circle
                  cx={line.x2}
                  cy={line.y2}
                  r="3.8"
                  fill={line.color}
                  opacity="0.9"
                  animate={{ scale: selectedIndex === index ? [1, 1.35, 1] : 1 }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop' }}
                />
              </g>
            ))}
            <circle cx="500" cy="380" r="182" fill="none" stroke="rgba(125, 145, 255, 0.12)" strokeWidth="1" />
            <circle cx="500" cy="380" r="132" fill="none" stroke="rgba(125, 145, 255, 0.1)" strokeWidth="1" />
            <circle cx="500" cy="380" r="78" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </svg>

          <div className="absolute left-[8%] top-[12%] w-[28%]">
            <SkillCard node={skillNodes[0]} active={selectedIndex === 0} onActivate={() => setSelectedIndex(0)} />
          </div>
          <div className="absolute right-[8%] top-[12%] w-[28%]">
            <SkillCard node={skillNodes[1]} active={selectedIndex === 1} onActivate={() => setSelectedIndex(1)} />
          </div>
          <div className="absolute left-[6%] top-[48%] w-[29%]">
            <SkillCard node={skillNodes[2]} active={selectedIndex === 2} onActivate={() => setSelectedIndex(2)} />
          </div>
          <div className="absolute right-[6%] top-[48%] w-[29%]">
            <SkillCard node={skillNodes[3]} active={selectedIndex === 3} onActivate={() => setSelectedIndex(3)} />
          </div>
          <div className="absolute left-1/2 top-[73%] w-[28%] -translate-x-1/2">
            <SkillCard node={skillNodes[4]} active={selectedIndex === 4} onActivate={() => setSelectedIndex(4)} />
          </div>

          <motion.div
            key={activeNode.title}
            initial={{ scale: 0.92, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-[#00F0FF]/5 blur-2xl"
              animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border bg-[radial-gradient(circle_at_center,rgba(95,97,255,0.22),rgba(11,16,32,0.96)_68%)] shadow-[0_0_60px_rgba(100,130,255,0.18)]"
              style={{ borderColor: activeNode.accent }}
              animate={{ rotate: [0, 8, 0, -8, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <div
              className="absolute inset-7 flex items-center justify-center border-2 border-transparent bg-[#0B1020] px-8 text-center text-base leading-7 text-[#EAF0FF] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
              style={{ clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)', boxShadow: `0 0 26px ${activeNode.accent}22` }}
            >
              <span className="max-w-28">
                {activeNode.position === 'bottom-center' ? 'Deploying Intelligent Systems' : activeNode.title}
              </span>
            </div>
            <div className="absolute inset-0 rounded-full border border-[#7B61FF]/15" />
          </motion.div>

          <motion.div
            key={`${activeNode.title}-caption`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute left-1/2 top-[60%] max-w-55 -translate-x-1/2 text-center text-xs leading-5 text-[#B7C3E3]"
          >
            {activeNode.description}
          </motion.div>

          <div className="absolute bottom-6 left-1/2 flex w-[72%] -translate-x-1/2 flex-wrap items-center justify-center gap-6 rounded-full border border-white/8 bg-white/3 px-6 py-4 text-sm text-[#C9D3EA] backdrop-blur-md">
            {featureTags.map((tag) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#78D8FF] shadow-[0_0_12px_rgba(120,216,255,0.8)]" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mobile fallback */}
        <div className="grid gap-5 lg:hidden">
          {skillNodes.map((node, index) => (
            <SkillCard
              key={node.title}
              node={node}
              active={selectedIndex === index}
              onActivate={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
