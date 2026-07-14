import { useMemo } from 'react'

interface Particle {
  id: number
  size: number
  left: number
  top: number
  duration: number
  delay: number
  opacity: number
}

export default function FloatingParticles({ count = 24 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, id) => ({
      id,
      size: Math.random() * 3 + 1.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-orange animate-float"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
