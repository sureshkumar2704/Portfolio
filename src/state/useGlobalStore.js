import { create } from 'zustand'

export const useGlobalStore = create((set) => ({
  // Current section (about, skills, etc.)
  section: 'about',
  // Orbital nav state
  orbitRotation: 0,
  orbitVelocity: 0,
  isDragging: false,
  setSection: (section) => set({ section }),
  setOrbitRotation: (orbitRotation) => set({ orbitRotation }),
  setOrbitVelocity: (orbitVelocity) => set({ orbitVelocity }),
  setIsDragging: (isDragging) => set({ isDragging }),
  // Add more state as needed
}))
