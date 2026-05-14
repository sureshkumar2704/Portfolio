const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'components', 'ImmersivePortfolio.jsx')
let file = fs.readFileSync(filePath, 'utf8')

// Replace colors
file = file.replace(/#11100D/g, '#0F172A') // Muddy brown bg -> slate-900
file = file.replace(/#F6E7C8/g, '#E2E8F0') // Muddy yellow borders -> slate-200
file = file.replace(/#F7F2E8/g, '#F8FAFC') // Bright text -> slate-50
file = file.replace(/#D8CEBC/g, '#94A3B8') // Muted text -> slate-400
file = file.replace(/#EFE6D5/g, '#CBD5E1') // Medium text -> slate-300
file = file.replace(/#B9AA91/g, '#64748B') // Dark muted text -> slate-500
file = file.replace(/#080806/g, '#020617') // Very dark bg -> slate-950
file = file.replace(/#17120B/g, '#0F172A') // Another muddy bg -> slate-900
file = file.replace(/#0B0A08/g, '#020617') // Another muddy bg -> slate-950

// Replace rail colors
file = file.replace(/rgba\((18|20|16|24|25|14|13), (20|18|22|16|17|19|22), (19|16|21|13|18|25|26|17), 0\.62\)/g, 'rgba(15, 23, 42, 0.62)')

// Replace gsap animations in useScreenNavigation
file = file.replace(/if \(transitionRef\.current\) transitionRef\.current\.kill\(\)\n\s*transitionRef\.current = gsap\.timeline\(\{[\s\S]*?onComplete: \(\) => setTransitioning\(false\),\n\s*\}\)\n\s*transitionRef\.current[\s\S]*?\.to\('\.scene-shell', \{ scale: 1, opacity: 1, filter: 'blur\(0px\)', duration: 0\.48, ease: 'power3\.out' \}\)/m, `setTimeout(() => setTransitioning(false), 500)`)

// Replace AnimatePresence
file = file.replace(/<AnimatePresence>/, '<AnimatePresence mode="wait">')

// Update screenVariants for smoother framer-motion transitions
file = file.replace(/initial: \{ opacity: 0, y: 28, scale: 0.975, filter: 'blur\(12px\)' \},/, `initial: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' },`)
file = file.replace(/exit: \{\s*opacity: 0,\s*y: -18,\s*scale: 0\.982,\s*filter: 'blur\(12px\)',\s*transition: \{ duration: 0\.34, ease: 'easeInOut' \},\s*\}/, `exit: { opacity: 0, y: -20, scale: 0.98, filter: 'blur(8px)', transition: { duration: 0.3, ease: 'easeInOut' } }`)

fs.writeFileSync(filePath, file)
console.log('Replacements applied successfully.')
