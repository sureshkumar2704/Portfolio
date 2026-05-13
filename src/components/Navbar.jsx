import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver for active section
  useEffect(() => {
    const observers = []
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger (left) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-2 -ml-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          {/* Logo (text-only) */}
          <a href="#hero" className="group flex items-center" aria-label="Suresh Kumar Portfolio">
            <span className="font-display text-lg font-bold tracking-tighter text-white transition-colors duration-300 group-hover:text-[#00F0FF] md:text-xl">
              SURESH<span className="text-[#00F0FF]">.</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link text-sm font-medium ${
                active === id ? 'active text-[#00F0FF]' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Resume Button */}
        <a
          href="https://drive.google.com/file/d/1VRa7GZQfKXuy062cRwaHvJGBfCo_oUy9/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white border border-[#00F0FF]/30 bg-[#00F0FF]/10 transition-all hover:bg-[#00F0FF]/20 hover:scale-105 hover:shadow-lg hover:shadow-[#00F0FF]/10"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Resume
        </a>

        {/* Mobile Resume Button */}
        <a
          href="https://drive.google.com/file/d/1VRa7GZQfKXuy062cRwaHvJGBfCo_oUy9/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white border border-[#00F0FF]/30 bg-[#00F0FF]/10 transition-all hover:bg-[#00F0FF]/20 active:scale-[0.98]"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Resume
        </a>
      </div>

      {/* Hamburger Menu (all sizes) */}
      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-50 border-t border-white/5 bg-[#03050C]/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-6 py-4 md:px-10">
              <div className="grid gap-2 md:grid-cols-2">
                {NAV_ITEMS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setMobileOpen(false)
                      scrollToId(id)
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active === id
                        ? 'bg-white/5 text-[#00F0FF]'
                        : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div className="mt-3 md:hidden">
                <a
                  href="https://drive.google.com/file/d/1VRa7GZQfKXuy062cRwaHvJGBfCo_oUy9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white border border-[#00F0FF]/30 bg-[#00F0FF]/10 transition-all hover:bg-[#00F0FF]/20"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Resume
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
