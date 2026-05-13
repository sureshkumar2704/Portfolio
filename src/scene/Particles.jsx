import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles() {
  const pointsRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const { geometry, material, originalPositions } = useMemo(() => {
    const count = 15000
    const positions = new Float32Array(count * 3)
    const originals = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const colorCyan = new THREE.Color('#00F0FF')
    const colorPurple = new THREE.Color('#7B61FF')
    const colorPink = new THREE.Color('#FF0055')
    const colorWhite = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Spread particles across a larger volume
      const radius = 12 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
      originals[i3] = x
      originals[i3 + 1] = y
      originals[i3 + 2] = z

      // Multi-color gradient based on distance + angle
      const t = Math.random()
      const angleT = (Math.atan2(y, x) + Math.PI) / (2 * Math.PI)
      let c
      if (t < 0.15) {
        c = colorWhite.clone()
        c.multiplyScalar(0.8)
      } else if (angleT < 0.33) {
        c = colorCyan.clone().lerp(colorPurple, t)
      } else if (angleT < 0.66) {
        c = colorPurple.clone().lerp(colorPink, t)
      } else {
        c = colorPink.clone().lerp(colorCyan, t)
      }
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    return { geometry: geo, material: mat, originalPositions: originals }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mx = state.pointer.x * viewport.width * 0.8
    const my = state.pointer.y * viewport.height * 0.8
    mouse.current.x += (mx - mouse.current.x) * 0.03
    mouse.current.y += (my - mouse.current.y) * 0.03

    const positions = geometry.attributes.position.array
    const count = positions.length / 3
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Gentle orbital motion
      const x = positions[i3]
      const z = positions[i3 + 2]
      const angle = Math.atan2(z, x) + 0.0015
      const radius = Math.sqrt(x * x + z * z)
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 2] = Math.sin(angle) * radius

      // Breathing/wave
      positions[i3 + 1] += Math.sin(t * 0.2 + radius * 0.5) * 0.0005

      // Mouse attraction/repulsion (stronger effect)
      const dx = positions[i3] - mouse.current.x
      const dy = positions[i3 + 1] - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 3.5) {
        const force = (3.5 - dist) * 0.004
        positions[i3] += dx * force
        positions[i3 + 1] += dy * force
      }
    }
    geometry.attributes.position.needsUpdate = true

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.015
    }
  })

  return <points ref={pointsRef} args={[geometry, material]} />
}
