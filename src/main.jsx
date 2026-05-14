import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initLenis } from './lib/lenis'

// Silence Three.js deprecation spam
if (import.meta.env.DEV) {
  const _warn = console.warn.bind(console)
  console.warn = (...args) => {
    try {
      const msg = String(args[0] ?? '')
      if (msg.includes('THREE.Clock') || msg.includes('THREE.THREE.Clock')) return
    } catch (e) {}
    _warn(...args)
  }
}

initLenis()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
