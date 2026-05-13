import { useEffect, useRef, useState } from 'react'
import profileImage from '../assets/image.png'

const ROLES = [
  'Machine Learning Engineer',
  'Deep Learning Specialist',
  'Full-Stack Developer',
  'AI Systems Builder',
]

export default function HeroSection({ reducedMotion }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef(null)

  // Typing animation
  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(ROLES[0])
      return
    }

    const currentRole = ROLES[roleIndex]

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timerRef.current = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, 80)
      } else {
        timerRef.current = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % ROLES.length)
      }
    }

    return () => clearTimeout(timerRef.current)
  }, [displayText, isDeleting, roleIndex, reducedMotion])

  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center pt-20 pb-10 sm:pt-24 sm:pb-12 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-[#7B61FF]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#00F0FF]/10 blur-[120px]" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djI2aC0ydi0yNmgtdjI2aC0ydi0yNmgtMnYyNmgteXQyNmgteXQyNmgp2djI2aC0ydi0yNmgtdjI2aC0ydi0yNmgtMnYtM2gtMjZ2MmgyNnYyaC0yNnYyaDI2djJoLTI2djJoMjZ2MmgtMjZ2MmgyNnYyaC0yNnYyaDI2di0yaDI2di0yaC0yNnYtMmgyNnYtMmgtMjZ2LTJoMjZ2LTJoLTI2di0yaDI2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 w-full relative z-10 grid gap-10 lg:gap-12 lg:grid-cols-2 items-center">
        {/* Left Side: Text Content */}
        <div className="space-y-7 sm:space-y-8 order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#7B61FF]/30 bg-[#7B61FF]/10 px-4 py-1.5 text-[11px] font-mono font-semibold text-[#7B61FF] uppercase tracking-widest backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B61FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7B61FF]" />
            </span>
            Available for Work
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-white leading-[1.05]">
            Suresh 
            <br />
            <span className="gradient-text">Kumar D</span>
          </h1>

          {/* Typing Role */}
          <div className="h-8 md:h-10 flex items-center">
            <span className="text-lg md:text-xl font-light text-[#94A3B8] typing-cursor">
              {displayText}
            </span>
          </div>

          {/* Value Statement */}
          <p className="max-w-lg text-base md:text-lg text-[#94A3B8] font-light leading-relaxed">
            I build intelligent systems and AI-driven applications that solve real-world
            problems — from research-grade ML models to production-ready interfaces.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center rounded-full px-8 py-3.5 font-semibold text-sm text-[#03050C] bg-white overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#00F0FF]/20"
            >
              <span className="absolute inset-0 bg-linear-to-r from-[#00F0FF] to-[#7B61FF] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative group-hover:text-white transition-colors duration-300">
                View Projects
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white border border-white/15 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/25 hover:scale-105"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Side: Photo (no decorative background) */}
        <div className="order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div
              className={`pointer-events-none absolute -inset-10 sm:-inset-12 -z-10 rounded-[36px]
              bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.22),transparent_62%),radial-gradient(circle_at_0%_0%,rgba(0,229,255,0.18),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(0,229,255,0.18),transparent_55%),radial-gradient(circle_at_0%_100%,rgba(0,229,255,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,229,255,0.18),transparent_55%)]
              blur-3xl ${
                !reducedMotion ? 'animate-pulse' : ''
              }`}
              style={{ animationDuration: '4s' }}
            />
            <img
              src={profileImage}
              alt="Suresh Kumar D."
              className={`relative w-[min(22rem,90vw)] sm:w-80 md:w-96 max-w-full h-auto rounded-2xl object-contain ${
                !reducedMotion ? 'animate-float' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
