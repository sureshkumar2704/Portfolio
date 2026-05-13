import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleSectionChange = () => {
      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleSectionChange, { passive: true })
    return () => window.removeEventListener('scroll', handleSectionChange)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#03050C]/80 backdrop-blur-xl border-b border-[#7B61FF]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 font-black text-xl"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#7B61FF] flex items-center justify-center text-white font-bold">
              SK
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#7B61FF]">
              Suresh
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setActiveSection(item.href.slice(1))}
                className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#00F0FF]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-lg bg-[#7B61FF]/20 border border-[#00F0FF]/50 -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:inline-flex px-6 py-2 rounded-full font-bold text-sm text-[#03050C] bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] hover:shadow-lg hover:shadow-[#00F0FF]/50 transition-all duration-200 hover:scale-105"
          >
            Let's Work
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-lg border border-[#7B61FF]/30 flex flex-col items-center justify-center gap-1.5 hover:bg-[#7B61FF]/10 transition-colors"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#00F0FF] rounded-full"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-[#00F0FF] rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#00F0FF] rounded-full"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => {
                  setActiveSection(item.href.slice(1))
                  setIsOpen(false)
                }}
                className={`block px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#00F0FF] bg-[#7B61FF]/20 border border-[#00F0FF]/50'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#7B61FF]/10'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
