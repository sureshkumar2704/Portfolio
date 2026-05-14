import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Line, Text } from '@react-three/drei'
import * as THREE from 'three'
import HeroGLTF from '../scene/HeroGLTF'

const nodes = [
  { label: 'ML', position: [-2.8, 1.15, 0.2], color: '#48B8A8' },
  { label: 'Data', position: [-1.65, -1.2, -0.35], color: '#E6B85C' },
  { label: 'API', position: [1.15, 1.45, -0.2], color: '#8EA7FF' },
  { label: 'UI', position: [2.65, -0.75, 0.15], color: '#F0F4FF' },
  { label: 'Ship', position: [0.1, -2.05, 0.45], color: '#48B8A8' },
]

const links = [
  [0, 1],
  [0, 2],
  [1, 4],
  [2, 3],
  [3, 4],
  [4, 0],
]

function SystemsMap() {
  const group = useRef(null)
  const nodeRefs = useRef([])

  const linkPoints = useMemo(
    () =>
      links.map(([from, to]) => [
        new THREE.Vector3(...nodes[from].position),
        new THREE.Vector3(...nodes[to].position),
      ]),
    []
  )

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.25) * 0.16 + pointer.x * 0.08
      group.current.rotation.x = Math.cos(time * 0.2) * 0.06 - pointer.y * 0.05
    }

    nodeRefs.current.forEach((node, index) => {
      if (!node) return
      const pulse = 1 + Math.sin(time * 1.4 + index * 0.9) * 0.08
      node.scale.setScalar(pulse)
    })
  })

  return (
    <group ref={group} position={[0.15, -0.05, 0]}>
      <group scale={0.68} position={[-0.35, 0.15, 0]}>
        <HeroGLTF reducedMotion={false} />
      </group>

      {linkPoints.map((points, index) => (
        <Line
          key={`link-${index}`}
          points={points}
          color="#5F6E87"
          lineWidth={1.2}
          transparent
          opacity={0.45}
        />
      ))}

      {nodes.map((node, index) => (
        <Float key={node.label} speed={1.5 + index * 0.12} floatIntensity={0.12} rotationIntensity={0.08}>
          <group position={node.position}>
            <mesh ref={(element) => { nodeRefs.current[index] = element }}>
              <sphereGeometry args={[0.18, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.45}
                metalness={0.6}
                roughness={0.22}
              />
            </mesh>
            <Text
              position={[0, -0.36, 0]}
              fontSize={0.16}
              color="#F4F7FB"
              anchorX="center"
              anchorY="middle"
            >
              {node.label}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  )
}

export default function Portfolio3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0B0F16']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#F8FAFC" />
      <pointLight position={[-3, 1.5, 2.5]} intensity={0.9} color="#48B8A8" />
      <pointLight position={[3, -2, 3]} intensity={0.75} color="#E6B85C" />
      <SystemsMap />
      <Environment preset="city" />
    </Canvas>
  )
}
