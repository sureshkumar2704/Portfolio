const SKILL_CATEGORIES = [
  {
    title: 'Programming',
    color: '#00F0FF',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'Java', level: 70 },
      { name: 'SQL', level: 75 },
    ],
  },
  {
    title: 'Machine Learning',
    color: '#7B61FF',
    skills: [
      { name: 'TensorFlow', level: 85 },
      { name: 'PyTorch', level: 75 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'Pandas', level: 85 },
    ],
  },
  {
    title: 'Web Development',
    color: '#FF0055',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'Node.js', level: 70 },
      { name: 'FastAPI', level: 80 },
      { name: 'HTML/CSS', level: 90 },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#00F0FF',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 65 },
      { name: 'MySQL', level: 75 },
      { name: 'Linux', level: 70 },
    ],
  },
]

function SkillBar({ name, level, color }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs font-mono text-[#94A3B8]">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-[0.25em] mb-3">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="skill-card"
              style={{ '--accent': category.color }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: category.color, boxShadow: `0 0 12px ${category.color}60` }}
                />
                <h3 className="text-base font-semibold text-white uppercase tracking-wider">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
