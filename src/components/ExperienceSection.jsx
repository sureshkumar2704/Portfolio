const EXPERIENCES = [
  {
    year: '2024',
    icon: '🏆',
    title: '1st Prize – Adobe India Hackathon',
    desc: 'Built an AI-driven PDF-to-podcast and conversational system, winning first place.',
    type: 'achievement',
  },
  {
    year: '2024',
    icon: '📜',
    title: 'Google Generative AI Certification',
    desc: 'Completed Google\'s course on Generative AI fundamentals and applications.',
    type: 'certification',
  },
  {
    year: '2023',
    icon: '💼',
    title: 'Machine Learning Intern',
    desc: 'Built cancer detection model using CNN architectures. Deployed ML pipelines for production use.',
    type: 'experience',
  },
  {
    year: '2023',
    icon: '🏆',
    title: '1st Prize – Ideathon',
    desc: 'Developed an innovative AI solution prototype and presented to industry judges.',
    type: 'achievement',
  },
  {
    year: '2022',
    icon: '🚀',
    title: 'Started ML & AI Journey',
    desc: 'Began learning Machine Learning, Deep Learning, and building personal projects.',
    type: 'milestone',
  },
]

const TYPE_COLORS = {
  achievement: '#FF0055',
  certification: '#7B61FF',
  experience: '#00F0FF',
  milestone: '#00F0FF',
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-[0.25em] mb-3">Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Journey & <span className="gradient-text">Achievements</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F0FF]/40 via-[#7B61FF]/40 to-[#FF0055]/40" />

          <div className="space-y-8">
            {EXPERIENCES.map((item, i) => {
              const color = TYPE_COLORS[item.type] || '#00F0FF'
              return (
                <div key={i} className="relative flex gap-6 md:gap-8 pl-2">
                  {/* Timeline dot */}
                  <div className="relative z-10 shrink-0 flex items-center justify-center mt-1">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg md:text-xl border"
                      style={{
                        background: `${color}10`,
                        borderColor: `${color}30`,
                        boxShadow: `0 0 20px ${color}15`,
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="glass rounded-2xl p-5 md:p-6 flex-1 glass-hover">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-widest rounded-full px-3 py-0.5 border"
                        style={{
                          color: color,
                          backgroundColor: `${color}10`,
                          borderColor: `${color}25`,
                        }}
                      >
                        {item.year}
                      </span>
                      <span
                        className="text-[9px] font-mono uppercase tracking-widest"
                        style={{ color: `${color}99` }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
