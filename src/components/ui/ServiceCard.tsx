import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10])

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.03 }}
        className="glass group relative overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-orange/20"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
          <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange/90 text-white shadow-lg backdrop-blur-sm">
            <Icon size={20} />
          </div>
        </div>

        <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="font-display text-lg font-semibold text-white">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-soft">{service.description}</p>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-orange/40 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  )
}
