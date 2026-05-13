import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import profileImage from '../assets/image.png'

const ROLES = [
  'AI/ML Engineer',
  'Deep Learning Specialist',
  'Full-Stack Developer',
  'Innovation Builder',
]

export default function EnhancedHeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef(null)

  // Typing animation
  useEffect(() => {
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
  }, [displayText, isDeleting, roleIndex])

  return (
    <section id="hero" className="relative min-h-svh flex items-center overflow-hidden bg-[#03050C]">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-[#7B61FF]/15 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#00F0FF]/15 blur-[150px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djI2aC0ydi0yNmgtdjI2aC0ydi0yNmgtMnYyNmgteXQyNmgteXQyNmgp2djI2aC0ydi0yNmgtdjI2aC0ydi0yNmgtMnYtM2gtMjZ2MmgyNnYyaC0yNnYyaDI2djJoLTI2djJoMjZ2MmgtMjZ2MmgyNnYyaC0yNnYyaDI2di0yaDI2di0yaC0yNnYtMmgyNnYtMmgtMjZ2LTJoMjZ2LTJoLTI2di0yaDI2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-svh py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#7B61FF]/30 bg-[#7B61FF]/10 px-4 py-2 text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-widest backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
              </span>
              Available for Work
            </motion.div>

            {/* Main Heading */}
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white mb-2">
                Suresh
              </h1>
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#7B61FF] to-[#00F0FF]">
                Kumar D
              </h2>
            </div>

            {/* Role with typing effect */}
            <div className="h-12 flex items-center">
              <span className="text-2xl md:text-3xl font-light text-[#00F0FF]">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-xl font-light">
              I design and build intelligent AI/ML systems that scale. From neural networks to production APIs, I create solutions that turn complex problems into elegant code.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Projects', value: '12+' },
                { label: 'ML Models', value: '8+' },
                { label: 'Years Exp', value: '5+' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="border border-[#7B61FF]/30 bg-[#7B61FF]/5 px-4 py-3 rounded-lg backdrop-blur"
                >
                  <div className="text-2xl font-bold text-[#00F0FF]">{stat.value}</div>
                  <div className="text-xs text-[#94A3B8] uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-sm bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] text-[#03050C] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00F0FF]/50"
              >
                <span className="relative">Explore My Work</span>
              </a>
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-sm border-2 border-[#00F0FF] text-[#00F0FF] rounded-full transition-all duration-300 hover:bg-[#00F0FF]/10 hover:shadow-lg hover:shadow-[#00F0FF]/20"
              >
                <span className="relative">Get in Touch</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* Glow background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[400px] h-[400px] rounded-full bg-[#7B61FF]/20 blur-[80px] animate-pulse" />
              <div className="absolute w-[350px] h-[350px] rounded-full bg-[#00F0FF]/20 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Profile Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative z-10"
            >
              <div className="relative w-[350px] h-[350px]">
                {/* Gradient border ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F0FF] via-[#7B61FF] to-[#FF006E] p-1">
                  {/* Image container */}
                  <div className="w-full h-full rounded-full bg-[#03050C] p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Suresh Kumar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating particles effect */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#00F0FF]"
                    animate={{
                      x: Math.cos((i / 3) * Math.PI * 2) * 180 + Math.cos(Date.now() / 3000) * 30,
                      y: Math.sin((i / 3) * Math.PI * 2) * 180 + Math.sin(Date.now() / 3000) * 30,
                    }}
                    transition={{ duration: 0.1 }}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-4px',
                      marginTop: '-4px',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
