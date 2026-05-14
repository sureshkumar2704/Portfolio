import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Text, Line } from '@react-three/drei'
import * as THREE from 'three'

const SKILLS = [
  { name: 'Python', group: 'Core AI', color: '#3776AB', orbit: 2.65, phase: 0.1 },
  { name: 'LLMs', group: 'Core AI', color: '#00D4FF', orbit: 2.75, phase: 1.65 },
  { name: 'FastAPI', group: 'Core AI', color: '#23C6A5', orbit: 2.9, phase: 3.25 },
  { name: 'Docker', group: 'Core AI', color: '#2496ED', orbit: 3.0, phase: 4.85 },
  { name: 'React', group: 'Interfaces', color: '#61DAFB', orbit: 4.25, phase: 0.55 },
  { name: 'Node.js', group: 'Interfaces', color: '#68A063', orbit: 4.35, phase: 2.1 },
  { name: 'NLP', group: 'Interfaces', color: '#7B61FF', orbit: 4.55, phase: 3.7 },
  { name: 'Kubernetes', group: 'Interfaces', color: '#326CE5', orbit: 4.8, phase: 5.05 },
  { name: 'TensorFlow', group: 'Infrastructure', color: '#FF6F00', orbit: 6.0, phase: 0.3 },
  { name: 'PyTorch', group: 'Infrastructure', color: '#EE4C2C', orbit: 6.15, phase: 1.85 },
  { name: 'Computer Vision', group: 'Infrastructure', color: '#FF0099', orbit: 6.25, phase: 3.35 },
  { name: 'AWS', group: 'Infrastructure', color: '#FF9900', orbit: 6.4, phase: 5.0 },
]

function SkillNode({ skill, index }) {
  const meshRef = useRef(null)
  const angle = skill.phase
  const x = Math.cos(angle) * skill.orbit
  const y = Math.sin(angle) * skill.orbit * 0.68
  const z = Math.sin(index * 0.9 + skill.phase) * 0.9

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()
      const drift = 0.18 + index * 0.01
      meshRef.current.position.z = z + Math.sin(time * 1.1 + index) * drift
      meshRef.current.scale.setScalar(1 + Math.sin(time * 1.6 + index) * 0.06)
      meshRef.current.rotation.z = Math.sin(time * 0.5 + index) * 0.08
    }
  })

  return (
    <group ref={meshRef} position={[x, y, z]}>
      <Sphere scale={0.32} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.45}
          roughness={0.28}
          metalness={0.2}
        />
      </Sphere>
      <mesh>
        <torusGeometry args={[0.5, 0.02, 10, 48]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.35} />
      </mesh>
      <Text
        position={[0, 0.55, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#03050C"
      >
        {skill.name}
      </Text>
    </group>
  )
}

export function SkillsNetwork() {
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime()
      groupRef.current.rotation.z = Math.sin(time * 0.12) * 0.08
      groupRef.current.rotation.x = 0.45 + Math.sin(time * 0.18) * 0.05
      groupRef.current.rotation.y = Math.sin(time * 0.14) * 0.12
    }
  })

  const orbitRings = useMemo(() => [2.65, 4.35, 6.15], [])

  const connections = useMemo(() => {
    const links = []
    const groupedSkills = [
      SKILLS.filter((skill) => skill.group === 'Core AI'),
      SKILLS.filter((skill) => skill.group === 'Interfaces'),
      SKILLS.filter((skill) => skill.group === 'Infrastructure'),
    ]

    groupedSkills.forEach((group) => {
      group.forEach((skill, index) => {
        const next = group[(index + 1) % group.length]
        const start = [Math.cos(skill.phase) * skill.orbit, Math.sin(skill.phase) * skill.orbit * 0.68, 0]
        const end = [Math.cos(next.phase) * next.orbit, Math.sin(next.phase) * next.orbit * 0.68, 0]
        links.push({ id: `${skill.name}-${next.name}`, points: [start, end] })
      })
    })

    return links.slice(0, 10)
  }, [])

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.03, 12, 96]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.16} />
      </mesh>

      {orbitRings.map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.018, 10, 128]} />
          <meshBasicMaterial color={index === 1 ? '#7B61FF' : '#00F0FF'} transparent opacity={0.12 - index * 0.02} />
        </mesh>
      ))}

      <Sphere scale={0.38} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#7B61FF"
          emissive="#7B61FF"
          emissiveIntensity={1.2}
          roughness={0.12}
          metalness={0.18}
        />
      </Sphere>

      <Sphere scale={0.68} position={[0, 0, 0]}>
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.08} />
      </Sphere>

      {connections.map((conn) => (
        <Line
          key={conn.id}
          points={conn.points}
          color="#00F0FF"
          opacity={0.22}
          lineWidth={0.65}
        />
      ))}

      {SKILLS.map((skill, index) => (
        <SkillNode key={skill.name} skill={skill} index={index} />
      ))}
    </group>
  )
}

export default function SkillsVisualization() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.8, 12.5], fov: 45 }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[10, 12, 12]} intensity={1.15} />
        <pointLight position={[-9, -8, 8]} intensity={0.85} color="#00F0FF" />
        <pointLight position={[0, 0, 9]} intensity={0.65} color="#7B61FF" />
        <SkillsNetwork />
      </Canvas>
    </div>
  )
}
