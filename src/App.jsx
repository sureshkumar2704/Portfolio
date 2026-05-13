import './App.css'
import { useEffect, useState } from 'react'
import EnhancedNavbar from './components/EnhancedNavbar'
import EnhancedHeroSection from './components/EnhancedHeroSection'
import EnhancedAboutSection from './components/EnhancedAboutSection'
import EnhancedSkillsSection from './components/EnhancedSkillsSection'
import EnhancedProjectsSection from './components/EnhancedProjectsSection'
import EnhancedExperienceSection from './components/EnhancedExperienceSection'
import EnhancedContactSection from './components/EnhancedContactSection'
import EnhancedFooter from './components/EnhancedFooter'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{background: 'radial-gradient(ellipse at top, #0A0F1F 0%, #03050C 100%)' }}
      />

      <EnhancedNavbar />

      <EnhancedHeroSection />

      <EnhancedAboutSection />

      <EnhancedSkillsSection />

      <EnhancedProjectsSection />

      <EnhancedExperienceSection />

      <EnhancedContactSection />

      <EnhancedFooter />
    </div>
  )
}

export default App
