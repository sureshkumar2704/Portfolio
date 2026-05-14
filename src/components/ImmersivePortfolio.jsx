import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import profileImage from '../assets/image.png'

/* ═══════════════════════════════════════════════════════
   ANIMATION SYSTEM — scroll-triggered reveals + 3D effects
   ═══════════════════════════════════════════════════════ */

// Scroll-triggered reveal wrapper using IntersectionObserver
function Reveal({ children, animation = 'fadeUp', delay = 0, duration = 0.7, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const animations = {
    fadeUp: { from: 'translate3d(0, 50px, 0) scale(0.97)', to: 'translate3d(0, 0, 0) scale(1)' },
    fadeDown: { from: 'translate3d(0, -40px, 0)', to: 'translate3d(0, 0, 0)' },
    fadeLeft: { from: 'translate3d(-60px, 0, 0) rotateY(6deg)', to: 'translate3d(0, 0, 0) rotateY(0)' },
    fadeRight: { from: 'translate3d(60px, 0, 0) rotateY(-6deg)', to: 'translate3d(0, 0, 0) rotateY(0)' },
    scaleIn: { from: 'scale(0.8) rotateX(8deg)', to: 'scale(1) rotateX(0)' },
    flipUp: { from: 'perspective(800px) rotateX(25deg) translateY(30px)', to: 'perspective(800px) rotateX(0) translateY(0)' },
    slideIn: { from: 'translate3d(0, 80px, -50px)', to: 'translate3d(0, 0, 0)' },
  }

  const anim = animations[animation] || animations.fadeUp

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? anim.to : anim.from,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

// 3D tilt card on mouse hover
function TiltCard({ children, className = '', glowColor = '#60A5FA', intensity = 12 }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`
    card.style.boxShadow = `${-x * 20}px ${y * 20}px 40px ${glowColor}22, 0 0 30px ${glowColor}15`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)'
    card.style.boxShadow = ''
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

// Animated divider between sections
function GlowDivider({ color = '#60A5FA' }) {
  return (
    <div className="relative w-full py-4 overflow-hidden">
      <div className="mx-auto h-px max-w-3xl" style={{ background: `linear-gradient(90deg, transparent, ${color}66, ${color}, ${color}66, transparent)` }} />
      <div className="mx-auto mt-[-1px] h-8 max-w-xl blur-[20px] opacity-40" style={{ background: `radial-gradient(ellipse at center, ${color}55, transparent 70%)` }} />
    </div>
  )
}

// Pure CSS floating particles for section backgrounds
function FloatingParticles({ count = 15, color = '#60A5FA' }) {
  const particles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    })), [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: color,
            opacity: 0.3,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 3}px ${color}66`,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   DATA & CONSTANTS
   ═══════════════════════════════════════════════════════ */

const MODULES = [
  { id: 'about', label: 'About', tone: '#F59E0B', icon: '👤', sub: 'Who I am and what I do' },
  { id: 'skills', label: 'Skills', tone: '#2DD4BF', icon: 'Code', sub: 'Technologies I master' },
  { id: 'projects', label: 'Projects', tone: '#A78BFA', icon: '📦', sub: "Things I've built with impact" },
  { id: 'experience', label: 'Experience', tone: '#FB7185', icon: '💼', sub: 'My professional journey' },
  { id: 'research', label: 'Research', tone: '#60A5FA', icon: '🔬', sub: 'Exploration and innovation' },
  { id: 'contact', label: 'Contact', tone: '#F59E0B', icon: '✉️', sub: "Let's connect and build" },
]

const ROLES = [
  'AI/ML Engineer',
  'Deep Learning Researcher',
  'Full-Stack Developer',
  'AI Systems Architect',
]

const SCREEN_ORDER = ['home', 'hub', 'about', 'skills', 'projects', 'experience', 'research', 'contact']

const SCREEN_META = {
  home: { title: 'Home', subtitle: 'AI/ML Engineer' },
  hub: { title: 'The Hub', subtitle: 'Portfolio Navigation' },
  about: { title: 'About', subtitle: 'Identity & Vision' },
  skills: { title: 'Skills', subtitle: 'Technical Capabilities' },
  projects: { title: 'Projects', subtitle: 'Impactful Delivery' },
  experience: { title: 'Experience', subtitle: 'Journey Timeline' },
  research: { title: 'Research', subtitle: 'Experimental Lab' },
  contact: { title: 'Contact', subtitle: 'Let\'s Connect' },
}

const PROJECTS = [
  {
    name: 'Advanced RAG System',
    story: 'Retrieval-first QA with semantic memory, source-aware answers, and context augmentation for domain documents.',
    impact: '99.2% accuracy',
    tech: ['LangChain', 'OpenAI', 'FAISS', 'FastAPI'],
    tone: '#FB7185',
  },
  {
    name: 'Computer Vision Pipeline',
    story: 'Real-time detection and segmentation workflow for production video streams with tracked inference quality.',
    impact: '92% mAP',
    tech: ['YOLOv8', 'PyTorch', 'OpenCV', 'Docker'],
    tone: '#2DD4BF',
  },
  {
    name: 'AI Analytics Platform',
    story: 'Interactive model training, inference, and reporting interface for fast business decision support.',
    impact: '10x faster analysis',
    tech: ['React', 'Node.js', 'TensorFlow', 'AWS'],
    tone: '#60A5FA',
  },
]

const SKILL_CLUSTERS = [
  {
    title: 'AI / ML',
    accent: '#2DD4BF',
    skills: ['PyTorch', 'TensorFlow', 'LLMs', 'Computer Vision', 'RAG'],
  },
  {
    title: 'Development',
    accent: '#A78BFA',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'],
  },
  {
    title: 'Tools & Cloud',
    accent: '#F59E0B',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD'],
  },
]

const EXPERIENCE = [
  { year: '2020', label: 'First ML builds', detail: 'Built foundations in Python, data science, and modeling.', focus: 'Foundations' },
  { year: '2021', label: 'Full-stack systems', detail: 'Shipped interfaces and APIs that connected models to users.', focus: 'Delivery' },
  { year: '2023', label: 'AI pipeline growth', detail: 'Scaled RAG, computer vision, and MLOps work.', focus: 'Applied AI' },
  { year: '2025', label: 'Research architect', detail: 'Focused on AI product design and deployment quality.', focus: 'Systems' },
]

const RESEARCH_ITEMS = [
  { topic: 'NLP', q: 'How to reduce hallucination?', r: 'Grounding via source-backed QA', m: '98.5% accuracy' },
  { topic: 'CV', q: 'Can we detect in real-time?', r: 'Optimized YOLOv8 pipeline', m: '92% mAP' },
  { topic: 'MLOps', q: 'How to scale deploys?', r: 'Docker/K8s automated path', m: 'Repeatable' },
  { topic: 'RAG', q: 'Is memory reliable?', r: 'Vector DB + Chunk tuning', m: 'Stable' },
]

const CONTACT_CHANNELS = [
  ['Email', 'mailto:contact@example.com', 'Best for project briefs'],
  ['LinkedIn', '#', 'Professional intros'],
  ['GitHub', '#', 'Code experiments'],
  ['Resume', '#', 'Download file'],
]

/* ═══════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════ */

function useSystemClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  return now
}

function useTypingAnimation(roles) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [isDel, setIsDel] = useState(false)
  useEffect(() => {
    const current = roles[idx]
    const speed = isDel ? 50 : 100
    const timer = setTimeout(() => {
      if (!isDel) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1))
        else setTimeout(() => setIsDel(true), 1500)
      } else {
        if (text.length > 0) setText(text.slice(0, -1))
        else { setIsDel(false); setIdx((prev) => (prev + 1) % roles.length) }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, isDel, idx, roles])
  return text
}

/* ═══════════════════════════════════════════════════════
   CORE COMPONENTS
   ═══════════════════════════════════════════════════════ */

function ScreenShell({ children, rightRail, screenId }) {
  return (
    <div className="relative grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1fr_360px]">
      <div className="relative flex flex-col justify-center px-6 py-24 lg:px-12">
        {children}
      </div>
      <aside className="relative border-t border-white/10 bg-[#0F172A]/40 p-6 backdrop-blur-xl lg:border-l lg:border-t-0 lg:p-8">
        <div className="sticky top-24 space-y-6">
          {rightRail}
        </div>
      </aside>
    </div>
  )
}

function HomeScreen({ onEnter, onProjects }) {
  const role = useTypingAnimation(ROLES)
  return (
    <ScreenShell
      screenId="home"
      rightRail={
        <Reveal animation="fadeLeft" delay={0.2}>
          <TiltCard glowColor="#2DD4BF" intensity={8}>
            <div className="rounded-3xl border border-white/12 bg-[#0F172A]/72 p-6 shadow-2xl">
              <div className="text-[11px] uppercase tracking-[0.35em] text-[#2DD4BF]">Current Status</div>
              <div className="mt-4 space-y-3 text-sm text-[#94A3B8]">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#2DD4BF] animate-pulse" /> Portfolio Live</div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" /> AI Labs Active</div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      }
    >
      <Reveal animation="fadeUp">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#2DD4BF]/30 bg-[#0F172A]/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2DD4BF]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]" />
          </span>
          Engineering useful AI
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-[#F8FAFC] sm:text-8xl leading-none">
          Suresh <span className="text-[#2DD4BF]">Kumar</span>
        </h1>
        <div className="mt-6 text-2xl font-medium text-[#F59E0B] h-8">{role}<span className="animate-pulse">|</span></div>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
          I build intelligent products, prototype research ideas quickly, and ship high-performance AI systems with production discipline.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <button onClick={onEnter} className="rounded-full bg-[#2DD4BF] px-10 py-4 text-sm font-bold text-[#06110F] transition hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(45,212,191,0.3)]">Enter Hub</button>
          <button onClick={onProjects} className="rounded-full border border-white/20 bg-white/5 px-10 py-4 text-sm font-bold text-[#F8FAFC] transition hover:bg-white/10">View Artifacts</button>
        </div>
      </Reveal>
    </ScreenShell>
  )
}

function HubScreen({ activeModule, setActiveModule, goTo }) {
  const orbitRadius = 240
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[480px] w-[480px] rounded-full border border-white/5" />
        <div className="absolute h-[520px] w-[520px] rounded-full border border-white/10 opacity-40" />
        <div className="relative flex items-center justify-center">
          <div className="absolute h-32 w-32 rounded-full bg-[#3B82F6]/20 blur-[40px] animate-pulse" />
          <div className="z-10 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-[#0F172A] shadow-2xl">
            <div className="text-center text-[10px] font-black tracking-[0.2em] text-white/80">EXPLORE</div>
          </div>
        </div>
      </div>

      <div className="relative h-[600px] w-[600px] flex items-center justify-center" style={{ animation: 'hubSpin 60s linear infinite' }}>
        {MODULES.map((mod, i) => {
          const angle = (i / MODULES.length) * 360
          const rad = (angle * Math.PI) / 180
          const x = Math.cos(rad) * orbitRadius
          const y = Math.sin(rad) * orbitRadius
          return (
            <div key={mod.id} className="absolute" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}>
              <button
                onClick={() => { setActiveModule(mod.id); goTo(mod.id) }}
                className="group relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/12 bg-[#0F172A]/80 backdrop-blur-md transition hover:scale-110 hover:border-white/30"
                style={{ animation: 'hubCounterSpin 60s linear infinite' }}
              >
                <div className="text-3xl mb-1">{mod.icon === 'Code' ? '</>' : mod.icon}</div>
                <div className="absolute -bottom-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] opacity-0 transition group-hover:opacity-100">{mod.label}</div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AboutScreen() {
  return (
    <ScreenShell
      screenId="about"
      rightRail={
        <Reveal animation="fadeLeft">
          <TiltCard glowColor="#F59E0B" intensity={5}>
            <div className="rounded-3xl border border-white/12 bg-[#0F172A]/72 p-6">
              <div className="text-[11px] uppercase tracking-[0.35em] text-[#F59E0B]">Methodology</div>
              <div className="mt-4 space-y-4 text-sm text-[#94A3B8]">
                {['Define success', 'Rapid prototype', 'Evaluate loop', 'Ship & Monitor'].map((s, i) => (
                  <div key={s} className="flex items-center gap-3"><span className="text-xs text-[#FDE68A] font-bold">0{i+1}</span> {s}</div>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>
      }
    >
      <Reveal animation="fadeRight">
        <h2 className="text-5xl font-black tracking-tight text-[#F8FAFC] sm:text-7xl">Identity Chamber</h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
          I bridge the gap between abstract research and concrete delivery. By working across the entire AI stack, I ensure that intelligent systems are not just accurate, but also usable and robust.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {['Research-to-Product path', 'Evaluation-led delivery', 'Systems-level thinking', 'Fast MVP iteration'].map(item => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-[#CBD5E1]">{item}</div>
          ))}
        </div>
      </Reveal>
    </ScreenShell>
  )
}

function SkillsScreen() {
  return (
    <ScreenShell
      screenId="skills"
      rightRail={
        <Reveal animation="fadeLeft">
          <div className="rounded-3xl border border-white/12 bg-[#0F172A]/72 p-6">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#2DD4BF]">The Stack</div>
            <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">Living neural clusters of technologies I master for production AI.</p>
          </div>
        </Reveal>
      }
    >
      <Reveal animation="fadeUp">
        <h2 className="text-5xl font-black tracking-tight text-[#F8FAFC] sm:text-7xl">Neural clusters</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {SKILL_CLUSTERS.map(cluster => (
            <TiltCard key={cluster.title} glowColor={cluster.accent} intensity={10}>
              <div className="h-full rounded-3xl border border-white/10 bg-[#0F172A]/72 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#F8FAFC]">{cluster.title}</h3>
                  <div className="h-2 w-2 rounded-full" style={{ background: cluster.accent }} />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cluster.skills.map(s => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#94A3B8]">{s}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Reveal>
    </ScreenShell>
  )
}

function ProjectsScreen() {
  return (
    <ScreenShell
      screenId="projects"
      rightRail={
        <Reveal animation="fadeLeft">
          <div className="rounded-3xl border border-white/12 bg-[#0F172A]/72 p-6">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#FB7185]">Artifacts</div>
            <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">Systems that solve real problems with measured impact.</p>
          </div>
        </Reveal>
      }
    >
      <Reveal animation="fadeUp">
        <h2 className="text-5xl font-black tracking-tight text-[#F8FAFC] sm:text-7xl">Project Museum</h2>
        <div className="mt-12 space-y-6">
          {PROJECTS.map(proj => (
            <TiltCard key={proj.name} glowColor={proj.tone} intensity={5}>
              <div className="group rounded-3xl border border-white/10 bg-[#0F172A]/72 p-6 transition hover:border-white/20">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold text-[#F8FAFC]">{proj.name}</h3>
                  <span className="rounded-full bg-white/10 px-4 py-1 text-[11px] font-bold text-[#FB7185]">{proj.impact}</span>
                </div>
                <p className="mt-4 text-[#94A3B8] leading-relaxed">{proj.story}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {proj.tech.map(t => <span key={t} className="text-xs text-[#CBD5E1] bg-white/5 px-3 py-1 rounded-lg">{t}</span>)}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Reveal>
    </ScreenShell>
  )
}

function ExperienceScreen() {
  return (
    <ScreenShell
      screenId="experience"
      rightRail={
        <Reveal animation="fadeLeft">
          <div className="rounded-3xl border border-white/12 bg-[#0F172A]/72 p-6">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#A78BFA]">Journey</div>
            <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">A timeline of growth and technical evolution.</p>
          </div>
        </Reveal>
      }
    >
      <Reveal animation="fadeUp">
        <h2 className="text-5xl font-black tracking-tight text-[#F8FAFC] sm:text-7xl">Evolution Path</h2>
        <div className="mt-12 space-y-12 pl-6 border-l border-white/10">
          {EXPERIENCE.map(exp => (
            <div key={exp.year} className="relative">
              <div className="absolute -left-[31px] h-3 w-3 rounded-full bg-[#A78BFA] shadow-[0_0_15px_#A78BFA]" />
              <div className="text-xs font-black tracking-widest text-[#A78BFA]">{exp.year} — {exp.focus}</div>
              <div className="mt-2 text-xl font-bold text-[#F8FAFC]">{exp.label}</div>
              <p className="mt-2 text-[#94A3B8]">{exp.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </ScreenShell>
  )
}

function ResearchScreen() {
  const [topic, setTopic] = useState('NLP')
  const filtered = RESEARCH_ITEMS.filter(item => item.topic === topic)
  return (
    <ScreenShell
      screenId="research"
      rightRail={
        <Reveal animation="fadeLeft">
          <div className="rounded-3xl border border-white/12 bg-[#0F172A]/72 p-6">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#60A5FA]">Lab Filters</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['NLP', 'CV', 'MLOps', 'RAG'].map(t => (
                <button key={t} onClick={() => setTopic(t)} className={`rounded-full px-4 py-1.5 text-[10px] font-bold transition ${topic === t ? 'bg-[#60A5FA] text-[#06110F]' : 'bg-white/5 text-[#94A3B8] hover:bg-white/10'}`}>{t}</button>
              ))}
            </div>
          </div>
        </Reveal>
      }
    >
      <Reveal animation="fadeUp">
        <h2 className="text-5xl font-black tracking-tight text-[#F8FAFC] sm:text-7xl">Research Lab</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <Motion.div key={item.q} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                <TiltCard glowColor="#60A5FA" intensity={10}>
                  <div className="h-full rounded-3xl border border-white/10 bg-[#0F172A]/72 p-6">
                    <div className="text-[10px] uppercase tracking-widest text-[#64748B]">Inquiry</div>
                    <div className="mt-2 text-lg font-bold text-[#F8FAFC]">{item.q}</div>
                    <div className="mt-6 flex items-center gap-2"><span className="text-xs text-[#60A5FA]">Result:</span> <span className="text-xs text-[#CBD5E1]">{item.r}</span></div>
                    <div className="mt-3 inline-block rounded-lg bg-white/5 px-3 py-1 text-[10px] font-bold text-white/80">{item.m}</div>
                  </div>
                </TiltCard>
              </Motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Reveal>
    </ScreenShell>
  )
}

function ContactScreen() {
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <ScreenShell
      screenId="contact"
      rightRail={
        <Reveal animation="fadeLeft">
          <div className="rounded-3xl border border-white/12 bg-[#0F172A]/72 p-6">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#34D399]">Channels</div>
            <div className="mt-4 space-y-3">
              {CONTACT_CHANNELS.map(([l, h, d]) => (
                <a key={l} href={h} className="block rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10">
                  <div className="text-sm font-bold text-[#F8FAFC]">{l}</div>
                  <div className="text-[10px] text-[#94A3B8]">{d}</div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      }
    >
      <Reveal animation="fadeUp">
        <h2 className="text-5xl font-black tracking-tight text-[#F8FAFC] sm:text-7xl">Portal Transmission</h2>
        <div className="mt-12 max-w-2xl rounded-4xl border border-white/12 bg-[#0F172A]/80 p-8 backdrop-blur-xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="text-[10px] uppercase tracking-widest text-[#64748B]">Name <input value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-[#34D399]/40" /></label>
            <label className="text-[10px] uppercase tracking-widest text-[#64748B]">Email <input className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-[#34D399]/40" /></label>
            <label className="sm:col-span-2 text-[10px] uppercase tracking-widest text-[#64748B]">Message <textarea rows={4} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-[#34D399]/40" /></label>
          </div>
          <button onClick={() => setSent(true)} className="mt-8 w-full rounded-full bg-[#34D399] py-4 text-sm font-bold text-[#06110B] transition hover:scale-[1.02]">{sent ? 'Message Sent' : 'Transmit'}</button>
        </div>
      </Reveal>
    </ScreenShell>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

function SecretModeOverlay({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.5em] text-[#60A5FA]">Secret Mode</div>
            <div className="mt-4 text-6xl font-black text-white">System Override</div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ImmersivePortfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [activeModule, setActiveModule] = useState('about')
  const [secretMode, setSecretMode] = useState(false)
  const clock = useSystemClock()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.3 })
    SCREEN_ORDER.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }
  const meta = SCREEN_META[activeSection] || SCREEN_META.home

  return (
    <div className="relative bg-[#03050C]">
      <SecretModeOverlay active={secretMode} />

      {/* FIXED ASSETS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] via-[#03050C] to-[#0D1117]" />
        <div className="absolute top-[-10%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-[#14B8A6]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-[#F59E0B]/5 blur-[120px]" />
        <FloatingParticles count={25} color="#2DD4BF" />
      </div>

      {/* NAVIGATION */}
      <nav className="fixed inset-x-6 top-6 z-50 flex items-center justify-between rounded-full border border-white/10 bg-[#020617]/70 p-4 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">{meta.title}</span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {SCREEN_ORDER.map(id => (
            <button key={id} onClick={() => scrollTo(id)} className={`h-1.5 rounded-full transition-all ${activeSection === id ? 'w-8 bg-[#F59E0B]' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
          ))}
        </div>
        <button onClick={() => setSecretMode(!secretMode)} className="rounded-full border border-[#A78BFA]/30 bg-[#A78BFA]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-[#A78BFA]/20">Secret</button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        <section id="home"><HomeScreen onEnter={() => scrollTo('hub')} onProjects={() => scrollTo('projects')} /></section>
        <GlowDivider color="#2DD4BF" />
        <section id="hub"><HubScreen activeModule={activeModule} setActiveModule={setActiveModule} goTo={scrollTo} /></section>
        <GlowDivider color="#F59E0B" />
        <section id="about"><AboutScreen /></section>
        <GlowDivider color="#2DD4BF" />
        <section id="skills"><SkillsScreen /></section>
        <GlowDivider color="#FB7185" />
        <section id="projects"><ProjectsScreen /></section>
        <GlowDivider color="#A78BFA" />
        <section id="experience"><ExperienceScreen /></section>
        <GlowDivider color="#60A5FA" />
        <section id="research"><ResearchScreen /></section>
        <GlowDivider color="#34D399" />
        <section id="contact"><ContactScreen /></section>
      </main>

      {/* CLOCK */}
      <div className="fixed bottom-6 right-6 z-50 rounded-full border border-white/10 bg-[#020617]/70 px-4 py-2 text-[10px] font-bold text-white/60 backdrop-blur-xl">
        {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  )
}
