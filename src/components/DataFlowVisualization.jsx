import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Trail } from '@react-three/drei'
import * as THREE from 'three'

function Particle({ index }) {
  const meshRef = useRef(null)
  const posRef = useRef({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
    z: Math.random() * 20 - 10,
    vx: (Math.random() - 0.5) * 0.1,
    vy: (Math.random() - 0.5) * 0.1,
    vz: (Math.random() - 0.5) * 0.1,
  })

  useFrame(() => {
    if (meshRef.current) {
      posRef.current.x += posRef.current.vx
      posRef.current.y += posRef.current.vy
      posRef.current.z += posRef.current.vz

      // Bounce off boundaries
      if (Math.abs(posRef.current.x) > 10) posRef.current.vx *= -1
      if (Math.abs(posRef.current.y) > 10) posRef.current.vy *= -1
      if (Math.abs(posRef.current.z) > 10) posRef.current.vz *= -1

      meshRef.current.position.set(
        posRef.current.x,
        posRef.current.y,
        posRef.current.z
      )
    }
  })

  const hue = index / 50
  const color = new THREE.Color().setHSL(hue, 0.8, 0.6)

  return (
    <Sphere ref={meshRef} scale={0.15} position={[posRef.current.x, posRef.current.y, posRef.current.z]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        toneMapped={false}
      />
    </Sphere>
  )
}

export function DataFlowVisualizationScene() {
  const lightRef = useRef(null)

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) * 15
      lightRef.current.position.y = Math.cos(clock.getElapsedTime() * 0.3) * 15
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={lightRef} intensity={1.5} color="#00F0FF" />
      <pointLight position={[-20, 10, 10]} intensity={0.8} color="#7B61FF" />
      
      {/* Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </>
  )
}

export default function DataFlowVisualization() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <DataFlowVisualizationScene />
      </Canvas>
    </div>
  )
}
