import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function HeroGLTF({ reducedMotion }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()
  const ringRef3 = useRef()
  const matRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current && !reducedMotion) {
      groupRef.current.position.y = Math.sin(t / 4) * 0.4
      groupRef.current.rotation.y = t * 0.12
    }

    // Main torus knot pulsing rotation
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.x = Math.sin(t / 6) * 0.15
      meshRef.current.rotation.z = Math.cos(t / 5) * 0.1
    }

    // Orbiting rings
    if (ringRef1.current && !reducedMotion) {
      ringRef1.current.rotation.x = t * 0.5
      ringRef1.current.rotation.y = t * 0.3
    }
    if (ringRef2.current && !reducedMotion) {
      ringRef2.current.rotation.x = t * 0.4 + Math.PI / 3
      ringRef2.current.rotation.z = t * 0.25
    }
    if (ringRef3.current && !reducedMotion) {
      ringRef3.current.rotation.y = t * 0.6 + Math.PI / 2
      ringRef3.current.rotation.z = t * 0.2
    }

    // Emissive color shift
    if (matRef.current) {
      const hue = (Math.sin(t * 0.25) * 0.5 + 0.5) * 0.2 + 0.5
      matRef.current.emissive.setHSL(hue, 1, 0.35)
      matRef.current.emissiveIntensity = 0.6 + Math.sin(t * 0.6) * 0.25
    }
  })

  return (
    <group ref={groupRef} position={[2.5, 0.5, -1]}>
      {/* Main Torus Knot */}
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1.3, 0.35, 300, 48, 2, 3]} />
        <meshStandardMaterial
          ref={matRef}
          metalness={0.97}
          roughness={0.05}
          color="#4030A0"
          emissive="#00F0FF"
          emissiveIntensity={0.6}
          envMapIntensity={2}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <torusKnotGeometry args={[1.3, 0.37, 300, 48, 2, 3]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Orbiting Ring 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
      </mesh>

      {/* Orbiting Ring 2 */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[2.6, 0.012, 16, 100]} />
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Ring 3 */}
      <mesh ref={ringRef3}>
        <torusGeometry args={[3.0, 0.01, 16, 100]} />
        <meshBasicMaterial color="#FF0055" transparent opacity={0.2} />
      </mesh>

      {/* Floating orbs around the main shape */}
      {[
        { pos: [2.0, 1.0, 0.5], color: '#00F0FF', size: 0.08 },
        { pos: [-1.5, -0.8, 1.0], color: '#7B61FF', size: 0.06 },
        { pos: [0.5, 1.8, -1.0], color: '#FF0055', size: 0.07 },
        { pos: [-2.0, 0.3, -0.5], color: '#00F0FF', size: 0.05 },
        { pos: [1.2, -1.5, 0.8], color: '#7B61FF', size: 0.09 },
      ].map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}
