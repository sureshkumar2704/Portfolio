import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Text, Line } from '@react-three/drei'
import * as THREE from 'three'

const SKILLS = [
  { name: 'Python', category: 'Language', color: '#3776AB' },
  { name: 'TensorFlow', category: 'ML/DL', color: '#FF6F00' },
  { name: 'PyTorch', category: 'ML/DL', color: '#EE4C2C' },
  { name: 'React', category: 'Frontend', color: '#61DAFB' },
  { name: 'Node.js', category: 'Backend', color: '#68A063' },
  { name: 'LLMs', category: 'AI', color: '#0066CC' },
  { name: 'Computer Vision', category: 'AI', color: '#FF0099' },
  { name: 'NLP', category: 'AI', color: '#00D4FF' },
  { name: 'FastAPI', category: 'Backend', color: '#009688' },
  { name: 'Docker', category: 'DevOps', color: '#2496ED' },
  { name: 'Kubernetes', category: 'DevOps', color: '#326CE5' },
  { name: 'AWS', category: 'Cloud', color: '#FF9900' },
]

function SkillNode({ skill, index, total }) {
  const meshRef = useRef(null)
  const anglePerNode = (Math.PI * 2) / total
  const radius = 6
  const angle = anglePerNode * index

  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  const z = Math.sin(index * 0.5) * 1.5

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()
      meshRef.current.position.z = z + Math.sin(time + index) * 0.5
      
      // Scale animation
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.1)
      
      // Rotate to face camera
      meshRef.current.lookAt(0, 0, 5)
    }
  })

  return (
    <group ref={meshRef} position={[x, y, z]}>
      <Sphere scale={0.4} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </Sphere>
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {skill.name}
      </Text>
    </group>
  )
}

function SkillsNetwork() {
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0005
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.3
    }
  })

  // Create connections between nearby nodes
  const anglePerNode = (Math.PI * 2) / SKILLS.length
  const radius = 6
  const connections = []

  for (let i = 0; i < SKILLS.length; i++) {
    for (let j = i + 1; j < Math.min(i + 3, SKILLS.length); j++) {
      const angle1 = anglePerNode * i
      const angle2 = anglePerNode * j
      const x1 = Math.cos(angle1) * radius
      const y1 = Math.sin(angle1) * radius
      const x2 = Math.cos(angle2) * radius
      const y2 = Math.sin(angle2) * radius

      connections.push({ id: `${i}-${j}`, points: [[x1, y1, 0], [x2, y2, 0]], index: i })
    }
  }

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <Sphere scale={0.3} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#7B61FF"
          emissive="#7B61FF"
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Connection lines */}
      {connections.map((conn) => (
        <Line
          key={conn.id}
          points={conn.points}
          color="#00F0FF"
          opacity={0.3}
          lineWidth={0.5}
        />
      ))}

      {/* Skill nodes */}
      {SKILLS.map((skill, index) => (
        <SkillNode key={skill.name} skill={skill} index={index} total={SKILLS.length} />
      ))}
    </group>
  )
}

export default function SkillsVisualization() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.6} color="#00F0FF" />
        <SkillsNetwork />
      </Canvas>
    </div>
  )
}
