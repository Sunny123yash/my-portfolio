import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const NODE_COUNT = 60

function Nodes() {
  const pointsRef = useRef()
  const linesRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  const linePositions = useMemo(() => {
    const lines = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 2.2) {
          lines.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          )
        }
      }
    }
    return new Float32Array(lines)
  }, [positions])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.03
      linesRef.current.rotation.x = Math.sin(t * 0.1) * 0.05
    }
  })

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6EE7F9" transparent opacity={0.15} />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#A78BFA" size={0.06} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  )
}

function NeuralBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Nodes />
      </Canvas>
    </div>
  )
}

export default NeuralBackground