import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { kebbyImage } from '@/lib/images'

const CYCLE_INTERVAL = 3200
const CELL_STAGGER = 450

interface Cell {
  alt: string
  images: string[]
}

const cells: Cell[] = [
  {
    alt: 'Custom football jerseys',
    images: [
      kebbyImage('WhatsApp Image 2026-07-13 at 19.38.37 (2).jpeg'),
      kebbyImage('WhatsApp Image 2026-07-13 at 19.05.13 (2).jpeg'),
    ],
  },
  {
    alt: 'Framed canvas wall art',
    images: [
      kebbyImage('WhatsApp Image 2026-07-13 at 19.05.09 (1).jpeg'),
      kebbyImage('WhatsApp Image 2026-07-13 at 19.38.40 (2).jpeg'),
    ],
  },
  {
    alt: 'Framed personalized jersey gifts',
    images: [
      kebbyImage('WhatsApp Image 2026-07-13 at 19.38.41 (4).jpeg'),
      kebbyImage('WhatsApp Image 2026-07-13 at 19.05.13 (1).jpeg'),
    ],
  },
  {
    alt: 'Custom national team kits',
    images: [
      kebbyImage('WhatsApp Image 2026-07-13 at 19.38.37 (3).jpeg'),
      kebbyImage('WhatsApp Image 2026-07-13 at 19.38.42 (1).jpeg'),
    ],
  },
  {
    alt: 'Framed logo and crest prints',
    images: [
      kebbyImage('WhatsApp Image 2026-07-13 at 19.05.13 (3).jpeg'),
      kebbyImage('WhatsApp Image 2026-07-13 at 19.38.40 (1).jpeg'),
    ],
  },
  {
    alt: 'Canvas prints and branding stickers',
    images: [
      kebbyImage('WhatsApp Image 2026-07-13 at 19.05.12 (1).jpeg'),
      kebbyImage('WhatsApp Image 2026-07-13 at 19.05.10 (2).jpeg'),
    ],
  },
]

export default function HeroSlideshow() {
  const [indices, setIndices] = useState<number[]>(() => cells.map(() => 0))

  useEffect(() => {
    const timers = cells.map((cell, i) =>
      setInterval(
        () => {
          setIndices((prev) => {
            const next = [...prev]
            next[i] = (next[i] + 1) % cell.images.length
            return next
          })
        },
        CYCLE_INTERVAL + i * CELL_STAGGER,
      ),
    )
    return () => timers.forEach(clearInterval)
  }, [])

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-3 sm:gap-4">
      {cells.map((cell, i) => (
        <div key={cell.alt} className="glass relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="sync">
            <motion.img
              key={cell.images[indices[i]]}
              src={cell.images[indices[i]]}
              alt={cell.alt}
              loading="eager"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
        </div>
      ))}
    </div>
  )
}
