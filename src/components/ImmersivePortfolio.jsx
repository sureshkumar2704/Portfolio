import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import profileImage from '../assets/image.png'

const MODULES = [
  { id: 'about', label: 'About', tone: '#F59E0B', icon: '👤', sub: 'Who I am and what I do' },
  { id: 'skills', label: 'Skills', tone: '#2DD4BF', icon: '</>', sub: 'Technologies I master' },
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
  home: {
    label: 'Screen 1',
    title: 'Suresh Kumar',
    subtitle: 'AI/ML Engineer • Full-Stack Developer • Research-Oriented Builder',
    cta: 'Enter Portfolio',
    secondary: 'View Projects',
  },
  hub: {
    label: 'Screen 2',
    title: 'Main Hub',
    subtitle: 'An interactive navigation layer with orbiting portfolio modules.',
    cta: 'Enter Module',
    secondary: 'Explore Universe',
  },
  about: {
    label: 'Screen 3',
    title: 'Identity Chamber',
    subtitle: 'Who I am, what I build, and how I think.',
    cta: 'Open Journey',
    secondary: 'Read Identity',
  },
  skills: {
    label: 'Screen 4',
    title: 'Skill Constellations',
    subtitle: 'Capabilities arranged as living neural clusters.',
    cta: 'Zoom Skills',
    secondary: 'Switch Cluster',
  },
  projects: {
    label: 'Screen 5',
    title: 'Project Museum',
    subtitle: 'Artifacts, systems, and impact-led outcomes.',
    cta: 'Inspect Artifact',
    secondary: 'Browse Gallery',
  },
  experience: {
    label: 'Screen 6',
    title: 'Journey Corridor',
    subtitle: 'A timeline of growth, milestones, and delivery.',
    cta: 'Walk Timeline',
    secondary: 'Open Milestones',
  },
  research: {
    label: 'Screen 7',
    title: 'Research Lab',
    subtitle: 'Papers, experiments, and findings presented as a live lab.',
    cta: 'Open Lab',
    secondary: 'Inspect Papers',
  },
  contact: {
    label: 'Screen 8',
    title: 'Transmission Portal',
    subtitle: 'Connect through secure channels or launch the resume file.',
    cta: 'Transmit Message',
    secondary: 'Download Resume',
  },
}

const SCREEN_THEMES = {
  home: {
    accent: '#2DD4BF',
    glow: 'rgba(45, 212, 191, 0.16)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
  hub: {
    accent: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.14)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
  about: {
    accent: '#2DD4BF',
    glow: 'rgba(45, 212, 191, 0.14)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
  skills: {
    accent: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.14)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
  projects: {
    accent: '#FB7185',
    glow: 'rgba(251, 113, 133, 0.14)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
  experience: {
    accent: '#A78BFA',
    glow: 'rgba(167, 139, 250, 0.14)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
  research: {
    accent: '#60A5FA',
    glow: 'rgba(96, 165, 250, 0.14)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
  contact: {
    accent: '#34D399',
    glow: 'rgba(52, 211, 153, 0.14)',
    rail: 'rgba(15, 23, 42, 0.62)',
  },
}

const screenVariants = {
  initial: { opacity: 0, y: 10, filter: 'blur(3px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -10, filter: 'blur(3px)', transition: { duration: 0.12, ease: 'easeOut' } },
}

const PROJECTS = [
  {
    name: 'Advanced RAG System',
    story: 'Retrieval-first QA with semantic memory, source-aware answers, and context augmentation for domain documents.',
    impact: '99.2% accuracy',
    tech: ['LangChain', 'OpenAI', 'FAISS', 'FastAPI'],
    outcome: 'Reduced manual search time and improved answer traceability.',
    tone: '#FB7185',
  },
  {
    name: 'Computer Vision Pipeline',
    story: 'Real-time detection and segmentation workflow for production video streams with tracked inference quality.',
    impact: '92% mAP',
    tech: ['YOLOv8', 'PyTorch', 'OpenCV', 'Docker'],
    outcome: 'Designed for repeatable evaluation, deployment, and monitoring.',
    tone: '#2DD4BF',
  },
  {
    name: 'AI Analytics Platform',
    story: 'Interactive model training, inference, and reporting interface for fast business decision support.',
    impact: '10x faster analysis',
    tech: ['React', 'Node.js', 'TensorFlow', 'AWS'],
    outcome: 'Turned raw model outputs into explainable dashboards and workflows.',
    tone: '#60A5FA',
  },
  {
    name: 'Generative AI Art Platform',
    story: 'Custom LoRA-driven generation experience with gallery, sharing, and prompt iteration flows.',
    impact: '50K+ users',
    tech: ['Stable Diffusion', 'FastAPI', 'MongoDB', 'S3'],
    outcome: 'Balanced fast generation, clean asset storage, and user-friendly controls.',
    tone: '#F59E0B',
  },
]

const SKILL_CLUSTERS = [
  {
    title: 'AI / ML',
    accent: '#2DD4BF',
    skills: ['PyTorch', 'TensorFlow', 'LLMs', 'Computer Vision', 'RAG'],
  },
  {
    title: 'Programming',
    accent: '#A78BFA',
    skills: ['Python', 'JavaScript', 'C++', 'SQL', 'TypeScript'],
  },
  {
    title: 'Web Development',
    accent: '#FB7185',
    skills: ['React', 'Vite', 'Tailwind', 'FastAPI', 'Node.js'],
  },
  {
    title: 'Data / Analytics',
    accent: '#34D399',
    skills: ['Pandas', 'NumPy', 'Data Viz', 'Feature Eng.', 'Dashboards'],
  },
  {
    title: 'Tools / Cloud',
    accent: '#F59E0B',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD'],
  },
]

const EXPERIENCE = [
  { year: '2020', label: 'First ML builds', detail: 'Built foundations in Python, data science, predictive modeling, and experiment tracking.', focus: 'Foundations' },
  { year: '2021', label: 'Full-stack systems', detail: 'Shipped interfaces and APIs that connected models, dashboards, and real user workflows.', focus: 'Product delivery' },
  { year: '2023', label: 'AI pipeline growth', detail: 'Scaled RAG, computer vision, data processing, and MLOps work across multiple projects.', focus: 'Applied AI' },
  { year: '2025', label: 'Research architect', detail: 'Focused on AI product design, deployment quality, and system-level thinking for reliable outcomes.', focus: 'Systems' },
]

const RESEARCH_ITEMS = [
  { topic: 'NLP', name: 'BERT sentiment study', finding: '98.5% accuracy with multi-language processing, error review, and confidence-based evaluation.', metric: '98.5% accuracy' },
  { topic: 'CV', name: 'Detection benchmark', finding: 'Production-ready detection pipeline with tracked inference, dataset splits, and repeatable scoring.', metric: '92% mAP' },
  { topic: 'MLOps', name: 'Model deployment flow', finding: 'Stable Docker and Kubernetes rollout path with health checks, versioned services, and monitoring hooks.', metric: 'repeatable deploys' },
  { topic: 'RAG', name: 'Context retrieval system', finding: 'Lower hallucination through retrieval grounding, answer citations, chunk tuning, and re-ranking.', metric: 'source-backed QA' },
]

const WORKFLOW_STEPS = [
  'Clarify the problem and success metric',
  'Prototype the model or product loop',
  'Evaluate results against real examples',
  'Ship the workflow with monitoring in mind',
]

const CONTACT_CHANNELS = [
  ['Email', 'mailto:contact@example.com', 'Best for project briefs and collaboration'],
  ['LinkedIn', '#', 'Professional updates and quick intros'],
  ['GitHub', '#', 'Code, experiments, and project history'],
  ['Resume', 'https://drive.google.com/file/d/1VRa7GZQfKXuy062cRwaHvJGBfCo_oUy9/view?usp=sharing', 'Download the latest resume'],
]

function useSystemClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return now
}

function useTypingAnimation(roles) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const speed = isDeleting ? 40 : 80

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, roles])

  return displayText
}

function useScreenNavigation() {
  const [screenIndex, setScreenIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const transitionRef = useRef(null)

  const goToIndex = (nextIndex) => {
    const bounded = Math.max(0, Math.min(SCREEN_ORDER.length - 1, nextIndex))
    if (bounded === screenIndex) return
    // Instantly scroll to position (framer-motion handles the visual transition)
    try {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const top = (bounded / (SCREEN_ORDER.length - 1)) * docHeight
        window.scrollTo({ top, behavior: 'instant' })
      }
    } catch (e) {
      console.warn('scroll navigation failed', e)
    }

    // snap shared progress immediately
    sharedProgressRef.current = bounded

    // update the visible screen index so UI updates immediately
    setScreenIndex(bounded)
  }

  const goTo = (screenId) => {
    const nextIndex = SCREEN_ORDER.indexOf(screenId)
    if (nextIndex >= 0) goToIndex(nextIndex)
  }

  const next = () => goToIndex(screenIndex + 1)
  const prev = () => goToIndex(screenIndex - 1)

  const setScreenIndexDirect = useCallback((index) => {
    const bounded = Math.max(0, Math.min(SCREEN_ORDER.length - 1, index))
    setScreenIndex(bounded)
  }, [])

  return { screenIndex, goTo, next, prev, transitioning, setScreenIndexDirect }
}

// shared progress ref used by the scroll handler
const sharedProgressRef = { current: 0 }

function ScreenShell({ screenId, children, rightRail, contentInteractive = true }) {
  const theme = SCREEN_THEMES[screenId] || SCREEN_THEMES.home

  return (
    <Motion.div
      className="pointer-events-none experience-shell scene-shell absolute inset-0 flex items-stretch overflow-hidden bg-transparent text-white"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative z-10 grid min-h-svh w-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(300px,23vw,380px)]">
        <div className={`relative flex min-h-[54vh] items-center justify-center overflow-y-auto px-5 py-24 lg:min-h-svh lg:pl-10 lg:pr-4 lg:py-24 ${contentInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {children}
        </div>
        <div
          className="pointer-events-auto relative overflow-y-auto border-t border-white/10 p-4 shadow-[-24px_0_80px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:min-h-svh lg:border-l lg:border-t-0 lg:p-4 xl:p-5"
          style={{ backgroundColor: theme.rail }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
          {rightRail}
        </div>
      </div>
    </Motion.div>
  )
}

function HomeScreen({ onEnter, onProjects }) {
  const role = useTypingAnimation(ROLES)

  return (
    <ScreenShell
      screenId="home"
      rightRail={
        <div className="flex h-full flex-col justify-between gap-5">
          <div className="rounded-[28px] border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#F59E0B]">System Status</div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                Interactive portfolio online
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                AI product workflow active
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FB7185] animate-pulse" />
                Research and delivery layers ready
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#2DD4BF]">Fast Launch</div>
            <div className="mt-3 space-y-2 text-sm text-[#94A3B8]">
              <button type="button" onClick={onEnter} className="w-full rounded-2xl border border-[#2DD4BF]/25 bg-[#2DD4BF]/12 px-4 py-3 text-left text-[#F8FAFC] transition hover:bg-[#2DD4BF]/20">
                Enter Portfolio
              </button>
              <button type="button" onClick={onProjects} className="w-full rounded-2xl border border-[#F59E0B]/25 bg-[#F59E0B]/12 px-4 py-3 text-left text-[#F8FAFC] transition hover:bg-[#F59E0B]/20">
                View Projects
              </button>
            </div>
          </div>
        </div>
      }
    >
      <div className="relative flex h-full w-full items-center justify-center px-5 py-12 text-left lg:px-8">
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-3xl">
          <Motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#2DD4BF]/35 bg-[#0F172A]/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2DD4BF] shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]" />
            </span>
            Available for Research & Engineering
          </Motion.div>

          <Motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="text-5xl font-black tracking-tighter text-[#F8FAFC] sm:text-7xl lg:text-[5.4rem] leading-[1.05]"
          >
            Suresh <span className="text-[#2DD4BF]">Kumar</span>
          </Motion.h1>

          <div className="mt-4 h-8">
            <p className="text-xl font-medium text-[#F59E0B] sm:text-2xl">
              {role}<span className="animate-pulse">|</span>
            </p>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8] sm:text-xl font-light">
            Building intelligent products, prototyping research ideas quickly, and shipping high-performance AI systems with production discipline.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Experience', val: '4+ Years' },
              { label: 'Projects', val: '25+' },
              { label: 'Models', val: '15+' },
              { label: 'Clients', val: '12+' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
                <div className="text-[10px] uppercase tracking-widest text-[#64748B]">{stat.label}</div>
                <div className="mt-1 text-xl font-bold text-[#F8FAFC]">{stat.val}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onEnter}
              className="group relative rounded-full bg-[#2DD4BF] px-10 py-4 text-sm font-bold text-[#07110F] transition hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(45,212,191,0.36)]"
            >
              Enter Hub
            </button>
            <button
              type="button"
              onClick={onProjects}
              className="rounded-full border border-[#F59E0B]/35 bg-[#0F172A]/72 px-10 py-4 text-sm font-bold text-[#F8FAFC] transition hover:scale-[1.05] hover:border-[#F59E0B]/60 hover:bg-[#F59E0B]/12"
            >
              View Artifacts
            </button>
          </div>
        </Motion.div>
      </div>
    </ScreenShell>
  )
}

function HubScreen({ activeModule, setActiveModule, goTo }) {
  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId)
    goTo(moduleId)
  }

  const orbitRadius = 220 // px radius of the card orbit

  return (
    <Motion.div
      className="absolute inset-0 z-10 flex h-svh w-full overflow-hidden text-white"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0.4) 0%, rgba(3,5,12,0.95) 70%)' }}
    >

      {/* ═══ CENTER: Pure CSS Orbital Universe ═══ */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {/* Orbit ring lines */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-[#3B82F6]/20" />
        <div className="absolute w-[480px] h-[480px] rounded-full border border-[#A855F7]/10" />
        <div className="absolute w-[520px] h-[520px] rounded-full border border-[#2DD4BF]/8" />

        {/* Center Glowing Sphere */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full bg-[#3B82F6]/20 blur-[40px] animate-pulse" />
          <div className="absolute w-24 h-24 rounded-full bg-[#3B82F6]/15 blur-[20px]" />
          <div className="w-20 h-20 rounded-full border-2 border-[#3B82F6]/40 flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(15,23,42,0.8) 70%)' }}>
            <div className="text-center">
              <div className="text-white/90 font-black text-[8px] tracking-[0.25em] leading-tight">EXPLORE</div>
              <div className="text-white/90 font-black text-[8px] tracking-[0.25em] leading-tight">THE UNIVERSE</div>
              <div className="text-white/40 text-xs mt-0.5">⌄</div>
            </div>
          </div>
        </div>

        {/* Spinning Cards Container */}
        <div className="absolute pointer-events-auto" style={{ animation: 'hubSpin 60s linear infinite' }}>
          {MODULES.map((mod, i) => {
            const angle = (i / MODULES.length) * 360
            const num = String(i + 1).padStart(2, '0')
            const rad = (angle * Math.PI) / 180
            const cx = Math.cos(rad) * orbitRadius
            const cy = Math.sin(rad) * orbitRadius
            return (
              <div
                key={mod.id}
                className="absolute"
                style={{
                  left: cx - 60,
                  top: cy - 80,
                }}
              >
                {/* Counter-spin to keep card upright */}
                <button
                  type="button"
                  onClick={() => handleModuleClick(mod.id)}
                  className="w-[120px] group cursor-pointer"
                  style={{ animation: 'hubCounterSpin 60s linear infinite' }}
                >
                  {/* Pedestal glow */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full blur-md" style={{ background: mod.tone, opacity: 0.6 }} />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full" style={{ background: mod.tone, opacity: 0.8 }} />

                  {/* Card */}
                  <div
                    className="relative rounded-xl p-3 pb-5 text-center transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
                    style={{
                      border: `1px solid ${mod.tone}66`,
                      background: `linear-gradient(180deg, rgba(15,23,42,0.7) 0%, ${mod.tone}18 100%)`,
                      boxShadow: `0 0 20px ${mod.tone}33, 0 0 40px ${mod.tone}11, inset 0 1px 0 rgba(255,255,255,0.1)`,
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${mod.tone}cc, transparent)` }} />
                    <div className="text-2xl mb-1" style={{ filter: `drop-shadow(0 0 8px ${mod.tone})` }}>{mod.icon}</div>
                    <div className="text-white font-bold text-sm">{mod.label}</div>
                    <div className="text-white/50 text-[9px] leading-snug mt-0.5">{mod.sub}</div>
                    <div className="absolute bottom-1 right-2 text-white/25 text-[8px] font-mono">{num}</div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* ═══ Left Panel ═══ */}
      <div className="pointer-events-auto absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-56 lg:w-64 space-y-5">
        <Motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 text-[#60A5FA] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
            <span className="text-base">✦</span> Welcome to my
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
            Living<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#2DD4BF]">portfolio</span><br />
            universe
          </h1>
          <p className="text-[#94A3B8] mt-3 text-xs leading-relaxed">
            Orbit the modules, then click the glowing cards to jump into each section.
          </p>
        </Motion.div>

        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-3 space-y-3 shadow-2xl">
          {[
            { icon: '✦', color: '#F59E0B', val: '5+', desc: 'Years of Journey' },
            { icon: '</>', color: '#2DD4BF', val: '25+', desc: 'Projects Delivered' },
            { icon: '🏆', color: '#A78BFA', val: '10+', desc: 'Achievements' },
          ].map((s) => (
            <div key={s.desc} className="flex items-center gap-3">
              <span className="text-lg" style={{ color: s.color, filter: `drop-shadow(0 0 6px ${s.color})` }}>{s.icon}</span>
              <div>
                <div className="text-white font-bold text-sm">{s.val}</div>
                <div className="text-[#94A3B8] text-[9px] uppercase tracking-wider">{s.desc}</div>
              </div>
            </div>
          ))}
        </Motion.div>

        <Motion.a
          href="https://drive.google.com/file/d/1VRa7GZQfKXuy062cRwaHvJGBfCo_oUy9/view?usp=sharing"
          target="_blank" rel="noreferrer"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex items-center gap-3 bg-gradient-to-r from-[#2DD4BF] to-[#A78BFA] p-[1px] rounded-xl overflow-hidden group hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-shadow"
        >
          <div className="flex items-center gap-3 bg-[#0F172A] w-full px-4 py-2.5 rounded-[11px] transition group-hover:bg-[#0F172A]/60">
            <span>📥</span>
            <span className="text-white font-semibold text-sm">Resume</span>
            <span className="text-white/60 ml-auto transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Motion.a>
      </div>

      {/* ═══ Right Panel ═══ */}
      <Motion.div
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        className="pointer-events-auto hidden lg:block absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-52 rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-4 shadow-2xl space-y-4"
      >
        <div className="text-[#60A5FA] text-[10px] font-bold tracking-[0.3em] uppercase">How to Navigate</div>
        {[
          { icon: '🖱️', title: 'Drag to Rotate', desc: 'Move the universe in any direction' },
          { icon: '👆', title: 'Click a Module', desc: 'Jump to that section' },
          { icon: '◎', title: 'Use Dots', desc: 'Jump between scenes' },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="text-lg mt-0.5">{item.icon}</span>
            <div>
              <div className="text-white font-semibold text-xs">{item.title}</div>
              <div className="text-[#94A3B8] text-[10px] mt-0.5 leading-tight">{item.desc}</div>
            </div>
          </div>
        ))}
        <div className="flex items-start gap-3">
          <span className="text-lg mt-0.5">⌨️</span>
          <div className="w-full">
            <div className="text-white font-semibold text-xs">Keyboard Shortcuts</div>
            <div className="flex justify-between mt-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-[9px] text-white">Home</span>
              <span className="text-[#94A3B8] text-[9px]">Go to start</span>
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="bg-white/10 px-2 py-0.5 rounded text-[9px] text-white">End</span>
              <span className="text-[#94A3B8] text-[9px]">Go to end</span>
            </div>
          </div>
        </div>
      </Motion.div>

      {/* ═══ Bottom Bar ═══ */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="pointer-events-auto absolute bottom-5 inset-x-6 lg:inset-x-12 z-20 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-[#60A5FA]/30 rounded-lg flex items-center justify-center text-[#60A5FA] text-sm">⬡</div>
          <div>
            <div className="text-white font-bold text-xs tracking-widest uppercase">Suresh Kumar</div>
            <div className="text-[#94A3B8] text-[10px] flex items-center gap-1.5">AI/ML Engineer <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" /></div>
          </div>
        </div>

        <div className="hidden md:flex rounded-full border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl px-4 py-2 text-[10px] text-[#94A3B8] items-center gap-2">
          <span className="text-[#F59E0B]">✦</span> TIP: Scroll smoothly, or use the dots to jump between scenes
        </div>

        <div className="flex items-center gap-2">
          {[
            { label: '⌂', href: '#' },
            { label: 'in', href: '#' },
            { label: '𝕏', href: '#' },
            { label: '✉', href: 'mailto:contact@example.com' },
          ].map((s) => (
            <a key={s.label} href={s.href} className="w-9 h-9 rounded-lg border border-white/10 bg-[#0F172A]/80 flex items-center justify-center text-white text-xs font-bold hover:bg-white/10 transition">
              {s.label}
            </a>
          ))}
        </div>
      </Motion.div>
    </Motion.div>
  )
}

function AboutScreen() {
  return (
    <ScreenShell
      screenId="about"
      rightRail={
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#2DD4BF]">Build Profile</div>
            <div className="mt-4 space-y-2 text-sm text-[#CBD5E1]">
              <div>AI / ML product systems</div>
              <div>Full-stack application delivery</div>
              <div>Research-backed prototyping</div>
              <div>Reliable deployment thinking</div>
            </div>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#F59E0B]">Workflow</div>
            <div className="mt-4 space-y-3">
              {WORKFLOW_STEPS.map((step, index) => (
                <div key={step} className="flex gap-3 text-sm leading-6 text-[#94A3B8]">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F59E0B]/18 text-xs text-[#FDE68A]">{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex h-full w-full items-center justify-center px-5 py-12">
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative mx-auto w-full max-w-90">
            <div className="absolute inset-0 rounded-4xl bg-[#2DD4BF]/18 blur-[80px]" />
            <div className="relative overflow-hidden rounded-4xl border border-[#E2E8F0]/12 bg-[#0F172A]/78 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl">
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-[#E2E8F0]/12 bg-[#0F172A]">
                <img src={profileImage} alt="Suresh Kumar" className="h-full w-full object-cover" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-[#CBD5E1]">
                <span className="rounded-full border border-[#2DD4BF]/25 bg-[#2DD4BF]/10 px-3 py-2">AI/ML</span>
                <span className="rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-3 py-2">Full-stack</span>
                <span className="rounded-full border border-[#FB7185]/25 bg-[#FB7185]/10 px-3 py-2">Research</span>
              </div>
            </div>
          </Motion.div>

          <Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <h2 className="text-4xl font-black tracking-tight text-[#F8FAFC] sm:text-6xl">Builder of useful AI systems</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#94A3B8]">
              I work across model experiments, full-stack interfaces, and deployment details so an idea can move from notebook to usable product. The goal is simple: intelligent systems that are understandable, fast, and valuable.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Turns ambiguous AI ideas into testable product loops',
                'Combines model quality with interface clarity',
                'Designs APIs, dashboards, and evaluation workflows',
                'Focuses on practical systems that can be maintained',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4 text-sm leading-6 text-[#CBD5E1]">
                  {item}
                </div>
              ))}
            </div>
          </Motion.div>
        </div>
      </div>
    </ScreenShell>
  )
}

function SkillsScreen() {
  const [activeCluster, setActiveCluster] = useState(0)
  const cluster = SKILL_CLUSTERS[activeCluster]

  return (
    <ScreenShell
      screenId="skills"
      rightRail={
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em]" style={{ color: cluster.accent }}>Selected Cluster</div>
            <div className="mt-2 text-2xl font-semibold text-[#F8FAFC]">{cluster.title}</div>
            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">Click a cluster to inspect the tools I use for production-grade AI and web systems.</p>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4 space-y-2">
            {SKILL_CLUSTERS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveCluster(index)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${activeCluster === index ? 'border-[#E2E8F0]/20 bg-[#E2E8F0]/10' : 'border-[#E2E8F0]/10 bg-[#E2E8F0]/5 hover:bg-[#E2E8F0]/8'}`}
              >
                <span className="text-sm text-[#F8FAFC]">{item.title}</span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.accent }} />
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex h-full w-full items-center justify-center px-5 py-12">
        <div className="w-full max-w-6xl">
          <h2 className="text-center text-4xl font-black tracking-tight text-[#F8FAFC] sm:text-6xl">Living skill clusters</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[#94A3B8]">
            A practical stack for AI experiments, application engineering, data workflows, and deployment.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SKILL_CLUSTERS.map((item, index) => {
              const selected = activeCluster === index
              return (
                <Motion.button
                  key={item.title}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCluster(index)}
                  className={`relative z-10 min-h-[208px] overflow-hidden rounded-[30px] border p-5 text-left backdrop-blur-xl transition ${selected ? 'border-[#E2E8F0]/24 bg-[#101820]/92' : 'border-[#E2E8F0]/12 bg-[#101820]/84'}`}
                  style={{ boxShadow: selected ? `0 0 0 1px ${item.accent}45, 0 22px 55px rgba(0,0,0,0.34)` : undefined }}
                >
                  <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at top left, ${item.accent}20, transparent 55%)` }} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-[#F8FAFC]">{item.title}</h3>
                      <span className="h-3 w-3 rounded-full" style={{ background: item.accent, boxShadow: `0 0 18px ${item.accent}` }} />
                    </div>
                    <div className="mt-6 flex min-h-[92px] flex-wrap items-start gap-2">
                      {item.skills.map((skill, skillIndex) => (
                        <Motion.div
                          key={skill}
                          animate={{ y: selected ? [0, -6, 0] : [0, -3, 0] }}
                          transition={{ duration: 2.8 + skillIndex * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                          className="rounded-full border border-[#E2E8F0]/12 bg-[#020617]/88 px-3 py-2 text-xs text-[#CBD5E1] whitespace-nowrap"
                        >
                          {skill}
                        </Motion.div>
                      ))}
                    </div>
                  </div>
                </Motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

function ProjectsScreen() {
  const [activeProject, setActiveProject] = useState(0)
  const project = PROJECTS[activeProject]

  return (
    <ScreenShell
      screenId="projects"
      rightRail={
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em]" style={{ color: project.tone }}>Artifact</div>
            <div className="mt-2 text-2xl font-semibold text-[#F8FAFC]">{project.name}</div>
            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{project.story}</p>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#F59E0B]">Impact</div>
            <div className="mt-2 text-3xl font-black text-[#F8FAFC]">{project.impact}</div>
            <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{project.outcome}</p>
          </div>
        </div>
      }
    >
      <div className="flex h-full w-full items-center justify-center px-5 py-12">
        <div className="w-full max-w-6xl">
          <h2 className="text-center text-4xl font-black tracking-tight text-[#F8FAFC] sm:text-6xl">Project artifacts</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[#94A3B8]">
            Selected systems that combine model quality, product thinking, and deployment discipline.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {PROJECTS.map((item, index) => {
              const selected = activeProject === index
              return (
                <Motion.button
                  key={item.name}
                  whileHover={{ y: -8, rotateX: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveProject(index)}
                  className={`relative overflow-hidden rounded-4xl border p-5 text-left backdrop-blur-xl transition ${selected ? 'border-[#E2E8F0]/24 bg-[#101820]/92' : 'border-[#E2E8F0]/12 bg-[#101820]/84'}`}
                >
                  <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at top left, ${item.tone}22, transparent 58%)` }} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-[#64748B]">Artifact {index + 1}</div>
                        <h3 className="mt-2 text-2xl font-semibold text-[#F8FAFC]">{item.name}</h3>
                      </div>
                      <span className="h-3 w-3 rounded-full" style={{ background: item.tone, boxShadow: `0 0 18px ${item.tone}` }} />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{item.story}</p>
                    <p className="mt-3 text-sm leading-7 text-[#CBD5E1]">{item.outcome}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <span key={tech} className="rounded-full border border-[#E2E8F0]/12 bg-[#E2E8F0]/7 px-3 py-2 text-xs text-[#CBD5E1]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 text-sm uppercase tracking-[0.24em]" style={{ color: item.tone }}>{item.impact}</div>
                  </div>
                </Motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

function ExperienceScreen() {
  return (
    <ScreenShell
      screenId="experience"
      rightRail={
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#A78BFA]">Journey Notes</div>
            <div className="mt-2 text-sm leading-6 text-[#94A3B8]">Internships, hackathons, research, production work, and major delivery milestones.</div>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#F59E0B]">Mode</div>
            <div className="mt-2 text-2xl font-semibold text-[#F8FAFC]">Corridor Walkthrough</div>
            <p className="mt-3 text-sm leading-6 text-[#94A3B8]">Each stage emphasizes a different engineering muscle: learning, shipping, scaling, and system design.</p>
          </div>
        </div>
      }
    >
      <div className="flex h-full w-full items-center justify-center px-5 py-12">
        <div className="w-full max-w-4xl">
          <h2 className="text-center text-4xl font-black tracking-tight text-[#F8FAFC] sm:text-6xl">Journey through time</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[#94A3B8]">
            A compact timeline of how the work evolved from fundamentals to complete AI systems.
          </p>
          <div className="relative mx-auto mt-12 max-w-3xl border-l border-[#E2E8F0]/14 pl-8">
            {EXPERIENCE.map((item, index) => (
              <Motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative mb-8 rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
              >
                <div className="absolute -left-[2.2rem] top-6 h-4 w-4 rounded-full" style={{ background: '#A78BFA', boxShadow: '0 0 18px rgba(167,139,250,0.8)' }} />
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-xs uppercase tracking-[0.35em] text-[#C4B5FD]">{item.year}</div>
                  <div className="rounded-full border border-[#A78BFA]/25 bg-[#A78BFA]/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#E9D5FF]">{item.focus}</div>
                </div>
                <div className="mt-2 text-2xl font-semibold text-[#F8FAFC]">{item.label}</div>
                <p className="mt-3 text-sm leading-7 text-[#94A3B8]">{item.detail}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

function ResearchScreen() {
  const [topic, setTopic] = useState('NLP')

  const filtered = useMemo(() => RESEARCH_ITEMS.filter((item) => item.topic === topic), [topic])

  return (
    <ScreenShell
      screenId="research"
      rightRail={
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#60A5FA]">Filters</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['NLP', 'CV', 'MLOps', 'RAG'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTopic(item)}
                  className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${topic === item ? 'border-[#60A5FA]/40 bg-[#60A5FA]/16 text-[#EFF6FF]' : 'border-[#E2E8F0]/12 bg-[#E2E8F0]/7 text-[#94A3B8]'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4 text-sm leading-6 text-[#94A3B8]">
            Research cards summarize the question, result, and metric so the section feels like a lab board instead of a list.
          </div>
        </div>
      }
    >
      <div className="flex h-full w-full items-center justify-center px-5 py-12">
        <div className="w-full max-w-5xl">
          <h2 className="text-center text-4xl font-black tracking-tight text-[#F8FAFC] sm:text-6xl">Research and experiments</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[#94A3B8]">
            Focused experiments across NLP, computer vision, retrieval, and deployment workflows.
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="rounded-4xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-5">
              <div className="text-xs uppercase tracking-[0.35em] text-[#60A5FA]">Topic</div>
              <div className="mt-3 text-3xl font-black text-[#F8FAFC]">{topic}</div>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">Click a topic to filter the lab board and reveal a short abstract.</p>
            </div>
            <div className="grid gap-4">
              {filtered.map((item) => (
                <Motion.div key={item.name} whileHover={{ y: -4 }} className="rounded-4xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs uppercase tracking-[0.35em] text-[#93C5FD]">{item.topic}</div>
                    <div className="rounded-full border border-[#60A5FA]/25 bg-[#60A5FA]/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#DBEAFE]">{item.metric}</div>
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-[#F8FAFC]">{item.name}</div>
                  <p className="mt-3 text-sm leading-7 text-[#94A3B8]">{item.finding}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

function ContactScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('AI product')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <ScreenShell
      screenId="contact"
      rightRail={
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#34D399]">Contact Channels</div>
            <div className="mt-3 space-y-3">
              {CONTACT_CHANNELS.map(([label, href, detail]) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'Resume' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="block rounded-2xl border border-[#E2E8F0]/10 bg-[#E2E8F0]/6 px-4 py-3 transition hover:border-[#34D399]/35 hover:bg-[#34D399]/10"
                >
                  <div className="text-sm font-semibold text-[#F8FAFC]">{label}</div>
                  <div className="mt-1 text-xs leading-5 text-[#94A3B8]">{detail}</div>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#E2E8F0]/12 bg-[#0F172A]/72 p-4">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#F59E0B]">Good Fit</div>
            <div className="mt-3 space-y-2 text-sm leading-6 text-[#94A3B8]">
              <div>AI prototypes and MVPs</div>
              <div>RAG, CV, analytics, and dashboards</div>
              <div>Research-to-product implementation</div>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex h-full w-full items-center justify-center px-5 py-12">
        <div className="w-full max-w-5xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#F8FAFC] sm:text-6xl">Start a useful conversation</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#94A3B8] sm:text-lg">
            Share what you are building, what success looks like, and where AI or software can create leverage.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 rounded-4xl border border-[#E2E8F0]/12 bg-[#0F172A]/78 p-5 text-left shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl md:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="mt-2 w-full rounded-2xl border border-[#E2E8F0]/12 bg-[#020617]/88 px-4 py-3 text-sm normal-case tracking-normal text-[#F8FAFC] outline-none transition placeholder:text-[#8A7F6D] focus:border-[#34D399]/45" />
            </label>
            <label className="text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Email
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-2xl border border-[#E2E8F0]/12 bg-[#020617]/88 px-4 py-3 text-sm normal-case tracking-normal text-[#F8FAFC] outline-none transition placeholder:text-[#8A7F6D] focus:border-[#34D399]/45" />
            </label>
            <label className="md:col-span-2 text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Project Type
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {['AI product', 'Research prototype', 'Full-stack build'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setProjectType(item)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm normal-case tracking-normal transition ${projectType === item ? 'border-[#34D399]/45 bg-[#34D399]/14 text-[#F8FAFC]' : 'border-[#E2E8F0]/12 bg-[#020617]/66 text-[#94A3B8] hover:bg-[#E2E8F0]/8'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </label>
            <label className="md:col-span-2 text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell me about the goal, users, data, timeline, or problem you want to solve."
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-[#E2E8F0]/12 bg-[#020617]/88 px-4 py-3 text-sm normal-case leading-6 tracking-normal text-[#F8FAFC] outline-none transition placeholder:text-[#8A7F6D] focus:border-[#34D399]/45"
              />
            </label>
            <div className="md:col-span-2 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E2E8F0]/12 bg-[#E2E8F0]/6 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-[#34D399]">Response</div>
                <div className="mt-2 text-sm text-[#CBD5E1]">Usually under 24h</div>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0]/12 bg-[#E2E8F0]/6 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-[#F59E0B]">Preference</div>
                <div className="mt-2 text-sm text-[#CBD5E1]">Clear problem brief</div>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0]/12 bg-[#E2E8F0]/6 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-[#60A5FA]">Scope</div>
                <div className="mt-2 text-sm text-[#CBD5E1]">{projectType}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSent(true)}
              className="md:col-span-2 rounded-full bg-[#34D399] px-6 py-3 text-sm font-semibold text-[#06110B] transition hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(52,211,153,0.28)]"
            >
              {sent ? `Message ready${name ? `, ${name}` : ''}` : 'Prepare message'}
            </button>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

function SecretModeOverlay({ active }) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1),transparent_30%),linear-gradient(180deg,rgba(2,5,12,0.92),rgba(2,5,12,0.98))]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[48px_48px] opacity-20" />
          <div className="relative mx-auto flex h-full max-w-4xl items-center justify-center p-8 text-center">
            <div>
              <div className="text-xs uppercase tracking-[0.5em] text-[#9CB4E4]">Secret Mode</div>
              <div className="mt-4 text-5xl font-black text-white">Research Mode</div>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#C8D4EC]">
                Hidden architecture, alternate camera style, and developer notes unlocked.
              </p>
            </div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ImmersivePortfolio() {
  const { screenIndex, goTo, setScreenIndexDirect } = useScreenNavigation()
  const [activeModule, setActiveModule] = useState('about')
  const [secretMode, setSecretMode] = useState(false)
  const clock = useSystemClock()
  const screenId = SCREEN_ORDER[screenIndex]

  const meta = SCREEN_META[screenId]

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const raw = docHeight > 0 ? (scrollTop / docHeight) * (SCREEN_ORDER.length - 1) : 0
      
      const nearest = Math.round(raw)
      sharedProgressRef.current = raw
      if (nearest !== screenIndex) {
        setScreenIndexDirect(nearest)
      }
    }

    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === 'n') setSecretMode((value) => !value)
      if (event.key === 'Escape') setSecretMode(false)
      if (event.key === 'Home') window.scrollTo({ top: 0, behavior: 'instant' })
      if (event.key === 'End') window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    // initialize
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [screenIndex, setScreenIndexDirect])

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none relative w-px"
        style={{ height: `${SCREEN_ORDER.length * 100}vh` }}
      />
      {/* Developer diagnostic runner (activated with ?diag=1) */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('diag') && (
        <DebugRunner />
      )}
      <SecretModeOverlay active={secretMode} />
      <div className="fixed left-4 right-4 top-4 z-40 rounded-full border border-[#E2E8F0]/12 bg-[#020617]/72 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:left-6 sm:right-6">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.28em] text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#E2E8F0]/12 bg-[#E2E8F0]/8 px-3 py-1 text-[#F8FAFC]">{meta.title}</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {SCREEN_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => goTo(id)}
                className={`h-2.5 rounded-full transition-all ${screenId === id ? 'w-8 bg-[#F59E0B]' : 'w-2.5 bg-[#E2E8F0]/28 hover:bg-[#E2E8F0]/55'}`}
                aria-label={`Go to ${id}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => setSecretMode((value) => !value)} className="rounded-full border border-[#A78BFA]/30 bg-[#A78BFA]/12 px-3 py-1 text-[#F8FAFC] transition hover:bg-[#A78BFA]/20">
            Night Shift
          </button>
        </div>
      </div>

      <div className="fixed inset-0 z-0 min-h-svh overflow-hidden bg-[#0D1117]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(135deg,#0D1117_0%,#111827_44%,#15110D_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-90 [background:radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.20),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.14),transparent_24%),radial-gradient(circle_at_55%_82%,rgba(96,165,250,0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute left-[-8%] top-[-10%] z-0 h-[42rem] w-[42rem] rounded-full bg-[#14B8A6]/10 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-[-16%] right-[10%] z-0 h-[38rem] w-[38rem] rounded-full bg-[#F59E0B]/10 blur-[140px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-black/42 to-transparent" />
        {/* CSS animated ambient glow background — replaces the heavy Three.js Canvas */}
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute top-[20%] left-[55%] w-[30rem] h-[30rem] rounded-full bg-[#14B8A6]/12 blur-[100px]" style={{ animation: 'ambientFloat 12s ease-in-out infinite' }} />
          <div className="absolute bottom-[15%] right-[40%] w-[25rem] h-[25rem] rounded-full bg-[#F59E0B]/10 blur-[100px]" style={{ animation: 'ambientFloat 15s ease-in-out infinite reverse' }} />
          <div className="absolute top-[40%] left-[30%] w-[20rem] h-[20rem] rounded-full bg-[#60A5FA]/10 blur-[80px]" style={{ animation: 'ambientFloat 18s ease-in-out infinite 3s' }} />
          <div className="absolute top-[60%] right-[20%] w-[18rem] h-[18rem] rounded-full bg-[#A78BFA]/8 blur-[90px]" style={{ animation: 'ambientFloat 14s ease-in-out infinite 5s' }} />
        </div>

        <div className={`pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,17,23,0.16)_48%,rgba(13,17,23,0.88)_100%)] ${screenId === 'hub' ? 'opacity-30' : ''}`} />
        <div className={`pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(13,17,23,0.92)_0%,rgba(13,17,23,0.24)_36%,rgba(13,17,23,0.70)_100%)] ${screenId === 'hub' ? 'opacity-20' : ''}`} />
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.055]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(246,231,200,0.45) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        <div className="pointer-events-none relative z-10 h-full w-full">
          <AnimatePresence>
            {screenId === 'home' && <HomeScreen key="home" onEnter={() => goTo('hub')} onProjects={() => goTo('projects')} />}
            {screenId === 'hub' && <HubScreen key="hub" activeModule={activeModule} setActiveModule={setActiveModule} goTo={goTo} />}
            {screenId === 'about' && <AboutScreen key="about" />}
            {screenId === 'skills' && <SkillsScreen key="skills" />}
            {screenId === 'projects' && <ProjectsScreen key="projects" />}
            {screenId === 'experience' && <ExperienceScreen key="experience" />}
            {screenId === 'research' && <ResearchScreen key="research" />}
            {screenId === 'contact' && <ContactScreen key="contact" />}
          </AnimatePresence>
        </div>

        <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-[#E2E8F0]/12 bg-[#020617]/72 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#94A3B8] backdrop-blur-xl">
          Scroll smoothly, or use the dots to jump between scenes
        </div>
        <div className="pointer-events-none fixed bottom-4 right-4 z-40 rounded-full border border-[#E2E8F0]/12 bg-[#020617]/72 px-4 py-2 text-xs text-[#94A3B8] backdrop-blur-xl">
          {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </>
  )
}

function DebugRunner() {
  const [running, setRunning] = useState(false)
  const [report, setReport] = useState(null)

  useEffect(() => {
    // capture console errors
    window.__IMMERSIVE_ERRORS = []
    const onErr = (msg, src, line, col, err) => {
      window.__IMMERSIVE_ERRORS.push({ message: msg, src, line, col, stack: err?.stack })
    }
    window.addEventListener('error', (e) => onErr(e.message, e.filename, e.lineno, e.colno, e.error))
    window.addEventListener('unhandledrejection', (e) => window.__IMMERSIVE_ERRORS.push({ message: e.reason?.message || String(e.reason), stack: e.reason?.stack }))

    return () => {
      // noop removal not strictly necessary in dev
    }
  }, [])

  const run = async () => {
    setRunning(true)
    const results = []
    const screens = SCREEN_ORDER.length
    const docHeight = document.documentElement.scrollHeight - window.innerHeight

    for (let i = 0; i < screens; i++) {
      const top = docHeight > 0 ? (i / (screens - 1)) * docHeight : 0
      window.scrollTo({ top, behavior: 'smooth' })
      // wait for camera to ease in
      await new Promise((r) => setTimeout(r, 900))

      const canvases = Array.from(document.querySelectorAll('canvas'))
      const canvasInfo = canvases.map((c) => {
        const r = c.getBoundingClientRect()
        return { width: c.width, height: c.height, clientH: r.height, clientW: r.width }
      })

      results.push({
        index: i,
        screenId: SCREEN_ORDER[i],
        progressApprox: (() => {
          const dh = document.documentElement.scrollHeight - window.innerHeight
          return dh ? window.scrollY / dh * (SCREEN_ORDER.length - 1) : 0
        })(),
        canvases: canvasInfo,
        errors: window.__IMMERSIVE_ERRORS.slice(),
      })
    }

    setReport(results)
    setRunning(false)
  }

  const download = () => {
    if (!report) return
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `immersive-diagnostics-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ position: 'fixed', left: 12, bottom: 12, zIndex: 9999 }}>
      <div className="rounded-2xl border border-white/10 bg-[#081018]/90 p-3 text-sm text-white backdrop-blur">
        <div className="mb-2 flex items-center gap-2">
          <strong>Diagnostics</strong>
          <span className="text-xs text-[#9CB4E4]">(dev)</span>
        </div>
        <div className="flex gap-2">
          <button onClick={run} disabled={running} className="rounded px-3 py-1 bg-[#00F0FF] text-black font-semibold">Run</button>
          <button onClick={download} disabled={!report} className="rounded px-3 py-1 border">Download</button>
        </div>
        {running && <div className="mt-2 text-xs text-[#C7D9FF]">Running tests… scrolling through screens</div>}
        {report && (
          <div className="mt-2 max-h-48 overflow-auto text-xs text-[#B9CADF]">
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(report.map(r=>({index:r.index, screen:r.screenId, canvases:r.canvases.length, errors:r.errors.length})), null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
