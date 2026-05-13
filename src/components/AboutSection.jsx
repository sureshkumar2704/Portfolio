import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 10, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '', label: 'Hackathons' },
  { value: 2, suffix: '', label: 'Research Works' },
  { value: 5, suffix: '+', label: 'Tech Stacks' },
]

const TIMELINE = [
  { year: '2022', title: 'Started ML journey', desc: 'Began learning Machine Learning and deep learning fundamentals.' },
  { year: '2023', title: 'First Internship', desc: 'Worked on real-world ML projects and production deployments.' },
  { year: '2024', title: 'Hackathon Winner', desc: 'Won Adobe India Hackathon with AI-powered PDF system.' },
]

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 1500
          const startTime = performance.now()
          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold gradient-text">
      {count}{suffix}
    </span>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-[0.25em] mb-3">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </div>

        {/* Bio + Photo Grid */}
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] items-start mb-20">
          {/* Bio */}
          <div className="space-y-6">
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              I am a <span className="text-white font-medium">Machine Learning and Full-Stack developer</span> passionate
              about building AI-powered applications. I enjoy transforming complex data into intelligent
              systems that create <span className="text-white font-medium">real-world impact</span>.
            </p>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              With expertise spanning from deep learning architectures to modern web frameworks,
              I bridge the gap between research and production. My work focuses on creating end-to-end
              systems that are not only technically robust but also beautifully designed.
            </p>

            {/* Education */}
            <div className="glass rounded-2xl p-6 mt-6">
              <h3 className="text-xs font-mono font-semibold text-[#7B61FF] uppercase tracking-widest mb-3">Education</h3>
              <div className="space-y-1">
                <p className="text-white font-semibold">B.E Computer Science & Engineering</p>
                <p className="text-sm text-[#94A3B8]">Chennai, Tamil Nadu</p>
              </div>
            </div>

            {/* Interests */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['AI Research', 'Data Science', 'System Design', 'Open Source', 'UI/UX'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-4 py-1.5 text-xs font-mono font-medium bg-white/5 border border-white/8 text-[#94A3B8]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-[#94A3B8] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-12 md:pl-14 space-y-10">
          <div className="timeline-line" />
          {TIMELINE.map((item, i) => (
            <div key={item.year} className="relative">
              <div className="timeline-dot" style={{ top: '4px' }} />
              <p className="text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-widest mb-1">{item.year}</p>
              <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
