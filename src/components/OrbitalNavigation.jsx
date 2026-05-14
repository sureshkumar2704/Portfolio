import { useRef, useEffect } from 'react'
import { useGlobalStore } from '../state/useGlobalStore'
import { motion } from 'framer-motion'

const NODES = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

export default function OrbitalNavigation() {
  const orbitRotation = useGlobalStore((s) => s.orbitRotation)
  const setOrbitRotation = useGlobalStore((s) => s.setOrbitRotation)
  const setSection = useGlobalStore((s) => s.setSection)
  const isDragging = useGlobalStore((s) => s.isDragging)
  const setIsDragging = useGlobalStore((s) => s.setIsDragging)
  const dragOrigin = useRef(null)
  const lastRotation = useRef(orbitRotation)

  // Mouse/touch drag logic
  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDragging) return
      const x = e.touches ? e.touches[0].clientX : e.clientX
      const delta = x - dragOrigin.current
      setOrbitRotation(lastRotation.current + delta * 0.008)
    }
    const onPointerUp = () => {
      setIsDragging(false)
      lastRotation.current = orbitRotation
    }
    if (isDragging) {
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('touchmove', onPointerMove)
      window.addEventListener('touchend', onPointerUp)
    }
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)
    }
  }, [isDragging, orbitRotation, setOrbitRotation, setIsDragging])

  return (
    <div className="relative flex items-center justify-center h-[420px] w-full select-none">
      <div
        className="absolute inset-0 z-10"
        style={{ pointerEvents: isDragging ? 'auto' : 'none' }}
      />
      <svg
        width="420"
        height="420"
        viewBox="0 0 420 420"
        className="block mx-auto"
        style={{ touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={(e) => {
          setIsDragging(true)
          dragOrigin.current = e.touches ? e.touches[0].clientX : e.clientX
        }}
      >
        <g style={{ transform: `rotate(${orbitRotation}rad)`, transformOrigin: '210px 210px' }}>
          {NODES.map((node, i) => {
            const angle = (i / NODES.length) * Math.PI * 2
            const x = 210 + Math.cos(angle) * 140
            const y = 210 + Math.sin(angle) * 140
            return (
              <motion.circle
                key={node.id}
                cx={x}
                cy={y}
                r={38}
                fill="#10131A"
                stroke="#00F0FF"
                strokeWidth={2}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSection(node.id)}
                style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 16px #00F0FF44)' }}
              />
            )
          })}
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="rounded-full bg-gradient-to-br from-[#00F0FF33] to-[#7B61FF22] w-[120px] h-[120px] blur-2xl" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold text-cyan-300 tracking-wide uppercase">AI<br />Core</div>
      </div>
    </div>
  )
}
