import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

export function NeuralNetwork() {
  const groupRef = useRef(null)
  const particlesRef = useRef([])
  
  // Create neural network layers
  const layers = [
    { nodes: 4, x: -6 },
    { nodes: 8, x: -2 },
    { nodes: 6, x: 2 },
    { nodes: 3, x: 6 },
  ]

  useEffect(() => {
    const particles = []
    layers.forEach((layer, layerIdx) => {
      const spacing = 3 / (layer.nodes - 1)
      for (let i = 0; i < layer.nodes; i++) {
        particles.push({
          x: layer.x,
          y: (i - layer.nodes / 2) * spacing,
          z: 0,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          vz: (Math.random() - 0.5) * 0.02,
          originalY: (i - layer.nodes / 2) * spacing,
          layerIdx,
          nodeIdx: i,
        })
      }
    })
    particlesRef.current = particles
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    particlesRef.current.forEach((particle) => {
      // Oscillate around original position
      particle.y = particle.originalY + Math.sin(time + particle.nodeIdx) * 0.3
      particle.z = Math.cos(time * 0.5 + particle.layerIdx) * 0.2
    })

    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Draw neurons */}
      {particlesRef.current.map((particle, idx) => (
        <Sphere
          key={`neuron-${idx}`}
          position={[particle.x, particle.y, particle.z]}
          scale={0.25}
        >
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.6 + particle.layerIdx * 0.1, 0.8, 0.6)}
            emissive={new THREE.Color().setHSL(0.6 + particle.layerIdx * 0.1, 0.8, 0.4)}
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}

      {/* Draw connections */}
      {layers.map((layer, layerIdx) => {
        if (layerIdx === 0) return null
        const prevLayer = layers[layerIdx - 1]
        const prevSpacing = 3 / (prevLayer.nodes - 1)
        const currSpacing = 3 / (layer.nodes - 1)

        return (
          <group key={`connections-${layerIdx}`}>
            {Array.from({ length: prevLayer.nodes }).map((_, prevIdx) => (
              <group key={`node-connections-${prevIdx}`}>
                {Array.from({ length: layer.nodes }).map((_, currIdx) => {
                  const prevY = (prevIdx - prevLayer.nodes / 2) * prevSpacing
                  const currY = (currIdx - layer.nodes / 2) * currSpacing
                  
                  return (
                    <Line
                      key={`line-${prevIdx}-${currIdx}`}
                      points={[
                        [layers[layerIdx - 1].x, prevY, 0],
                        [layer.x, currY, 0],
                      ]}
                      color={new THREE.Color().setHSL(
                        0.6 + (prevIdx + currIdx) * 0.05,
                        0.6,
                        0.5
                      )}
                      opacity={0.3}
                      lineWidth={0.5}
                    />
                  )
                })}
              </group>
            ))}
          </group>
        )
      })}
    </group>
  )
}

export default function MLModelVisualization() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 10]} intensity={0.4} color="#00F0FF" />
        <NeuralNetwork />
      </Canvas>
    </div>
  )
}
