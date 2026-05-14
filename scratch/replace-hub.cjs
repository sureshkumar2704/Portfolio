const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'components', 'ImmersivePortfolio.jsx')
let file = fs.readFileSync(filePath, 'utf8')

// We will use regex to completely replace HubCard, HubScene, and HubScreen

const hubCardReplacement = `function HubCard({ module, index, activeModule, onModuleClick }) {
  const [hovered, setHovered] = useState(false)
  const angle = (index / MODULES.length) * Math.PI * 2
  const radius = 3.6
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius * 0.4
  const isSelected = activeModule === module.id
  const num = String(index + 1).padStart(2, '0')

  const subtitles = {
    'about': 'Who I am and what I do',
    'skills': 'Technologies I master',
    'projects': "Things I've built with impact",
    'experience': 'My professional journey',
    'research': 'Exploration and innovation',
    'contact': "Let's connect and build",
  }

  const icons = {
    'about': '👤',
    'skills': '&lt;/&gt;',
    'projects': '📦',
    'experience': '💼',
    'research': '🔬',
    'contact': '🚀',
  }

  return (
    <group
      position={[x, y, 0]}
      rotation={[0, 0, 0]}
      onClick={(e) => { e.stopPropagation(); onModuleClick(module.id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor='pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor='default' }}
    >
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.5, 0.7, 32]} />
        <meshBasicMaterial color={module.tone} transparent opacity={hovered ? 0.8 : 0.3} side={THREE.DoubleSide} />
      </mesh>
      
      <Html transform center position={[0, 0, 0]} style={{ transition: 'all 0.3s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}>
        <div 
          className="w-44 h-56 rounded-2xl border flex flex-col items-center justify-center p-4 text-center cursor-pointer relative overflow-hidden"
          style={{ 
            borderColor: module.tone,
            background: \`linear-gradient(180deg, rgba(15,23,42,0.4) 0%, \${module.tone}44 100%)\`,
            boxShadow: hovered ? \`0 0 30px \${module.tone}aa, inset 0 0 20px \${module.tone}66\` : \`0 0 15px \${module.tone}55\`,
            backdropFilter: 'blur(12px)'
          }}
        >
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
          
          <div className="text-4xl mb-3 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" dangerouslySetInnerHTML={{__html: icons[module.id]}}></div>
          <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">{module.label}</h3>
          <p className="text-white/80 text-xs leading-relaxed">{subtitles[module.id]}</p>
          
          <div className="absolute bottom-3 right-4 text-white/50 text-[10px] font-mono">{num}</div>
        </div>
      </Html>
    </group>
  )
}`

const hubSceneReplacement = `function HubScene({ activeModule, onModuleClick }) {
  const hub = useRef(null)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (hub.current) {
      hub.current.rotation.y = time * 0.05
      hub.current.rotation.x = time * 0.02
    }
  })

  return (
    <group>
      {/* Central Core */}
      <group ref={hub}>
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.15} />
        </mesh>
        {/* Glow rings */}
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <ringGeometry args={[1.5, 1.55, 64]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI/3, Math.PI/4, 0]}>
          <ringGeometry args={[1.7, 1.75, 64]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI/4, Math.PI/3, 0]}>
          <ringGeometry args={[1.9, 1.95, 64]} />
          <meshBasicMaterial color="#EAB308" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <Html center transform position={[0,0,0]}>
          <div className="text-center pointer-events-none">
            <div className="text-white font-black text-[10px] tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              EXPLORE
            </div>
            <div className="text-white font-black text-[10px] tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mt-0.5">
              THE UNIVERSE
            </div>
            <div className="mt-1 text-white/50 text-[10px]">v</div>
          </div>
        </Html>
      </group>

      {/* Orbit Rings spanning to cards */}
      <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[3.58, 3.6, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {MODULES.map((module, index) => (
        <HubCard
          key={module.id}
          module={module}
          index={index}
          activeModule={activeModule}
          onModuleClick={onModuleClick}
        />
      ))}
    </group>
  )
}`

const hubScreenReplacement = `function HubScreen({ activeModule, setActiveModule, goTo }) {
  return (
    <Motion.div
      className="pointer-events-none absolute inset-0 z-10 flex h-svh w-full flex-col overflow-hidden text-white"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Left Overlay */}
      <div className="pointer-events-auto absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 w-72 lg:w-80 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-[#60A5FA] text-xs font-bold tracking-widest uppercase">
            <span className="text-lg">✦</span> Welcome to my
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mt-2 drop-shadow-lg">
            Living <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#2DD4BF]">portfolio</span> <br/> universe
          </h1>
          <p className="text-[#94A3B8] mt-4 text-sm leading-relaxed">
            Orbit the modules, then click the glowing cards to jump into each section.
          </p>
        </div>
        
        <div className="rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-5 space-y-5 shadow-2xl">
          <div className="flex items-center gap-4">
            <span className="text-2xl text-[#F59E0B]">✦</span>
            <div>
              <div className="text-white font-bold text-lg">5+</div>
              <div className="text-[#94A3B8] text-[10px] lg:text-xs uppercase tracking-wider">Years of Journey</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl text-[#2DD4BF]">&lt;/&gt;</span>
            <div>
              <div className="text-white font-bold text-lg">25+</div>
              <div className="text-[#94A3B8] text-[10px] lg:text-xs uppercase tracking-wider">Projects Delivered</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl text-[#F59E0B]">🏆</span>
            <div>
              <div className="text-white font-bold text-lg">10+</div>
              <div className="text-[#94A3B8] text-[10px] lg:text-xs uppercase tracking-wider">Achievements</div>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-3 bg-gradient-to-r from-[#2DD4BF] to-[#A78BFA] p-[1px] rounded-xl overflow-hidden group hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition">
          <div className="flex items-center gap-3 bg-[#0F172A] px-6 py-3 rounded-xl transition group-hover:bg-transparent">
            <span className="text-white">📥</span>
            <span className="text-white font-semibold text-sm">Resume</span>
            <span className="text-white ml-2 transition-transform group-hover:translate-x-1">➔</span>
          </div>
        </button>
      </div>

      {/* Right Overlay */}
      <div className="hidden lg:block pointer-events-auto absolute right-12 top-1/2 -translate-y-1/2 w-64 rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-6 shadow-2xl space-y-6">
        <div className="text-[#60A5FA] text-xs font-bold tracking-widest uppercase">How to Navigate</div>
        
        <div className="flex items-start gap-4">
          <span className="text-2xl text-[#60A5FA]">🖱️</span>
          <div>
            <div className="text-white font-semibold text-sm">Drag to Rotate</div>
            <div className="text-[#94A3B8] text-xs mt-1">Move the universe in any direction</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-2xl text-[#60A5FA]">👆</span>
          <div>
            <div className="text-white font-semibold text-sm">Click a Module</div>
            <div className="text-[#94A3B8] text-xs mt-1">Jump to that section</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-2xl text-[#60A5FA]">◎</span>
          <div>
            <div className="text-white font-semibold text-sm">Use Dots</div>
            <div className="text-[#94A3B8] text-xs mt-1">Jump between scenes</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-2xl text-[#60A5FA]">⌨️</span>
          <div className="w-full">
            <div className="text-white font-semibold text-sm">Shortcuts</div>
            <div className="flex items-center justify-between mt-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">Home</span>
              <span className="text-[#94A3B8] text-[10px]">Go to start</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">End</span>
              <span className="text-[#94A3B8] text-[10px]">Go to end</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Overlay */}
      <div className="pointer-events-auto absolute bottom-6 lg:bottom-8 inset-x-6 lg:inset-x-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[#60A5FA]/30 rounded-lg flex items-center justify-center text-[#60A5FA]">
            ⬡
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-widest uppercase">Suresh Kumar</div>
            <div className="text-[#94A3B8] text-[10px] lg:text-xs flex items-center gap-2">
              AI/ML Engineer <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"></span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex rounded-full border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl px-5 py-2.5 text-xs text-[#94A3B8] items-center gap-2">
          <span className="text-[#F59E0B]">✦ TIP:</span> Scroll smoothly, or use the dots to jump between scenes
        </div>

        <div className="flex items-center gap-2">
          {['GH', 'IN', 'TW', 'EM'].map(icon => (
            <button key={icon} className="w-10 h-10 rounded-lg border border-white/10 bg-[#0F172A]/80 flex items-center justify-center text-white text-xs font-bold hover:bg-white/10 transition">
              {icon}
            </button>
          ))}
        </div>
      </div>
    </Motion.div>
  )
}`

// Use regex to replace the functions

// 1. Replace HubCard
file = file.replace(/function HubCard\(\{ module.*?\}\n\s*\)\n\}/s, hubCardReplacement)

// 2. Replace HubScene
file = file.replace(/function HubScene\(\{ activeModule.*?\}\n\s*\)\n\}/s, hubSceneReplacement)

// 3. Replace HubScreen
file = file.replace(/function HubScreen\(\{ activeModule.*?\}\n\s*\)\n\}/s, hubScreenReplacement)

fs.writeFileSync(filePath, file)
console.log('Hub completely redesigned.')
