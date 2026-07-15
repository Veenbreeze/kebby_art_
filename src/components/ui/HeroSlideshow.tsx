import { useEffect, useMemo, useRef, useState } from 'react'
import { kebbyImage } from '@/lib/images'

// Auto-rotate cadence and transition timing (kept in sync with the CSS transition below).
const ROTATE_INTERVAL_MS = 3000
const TRANSITION_MS = 900

interface Cell {
  alt: string
  images: string[]
}

// Existing image data source — untouched, same URLs as before.
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

interface SlideImage {
  src: string
  alt: string
}

// Flatten the cell data into one ring of slides — same URLs, new arrangement.
const slides: SlideImage[] = cells.flatMap((cell) =>
  cell.images.map((src) => ({ src, alt: cell.alt })),
)

// Smooth spatial falloff (cosine half-wave) used to derive scale/opacity/blur
// from each slide's angular distance to the front-center position.
function frontFactor(angleDeg: number): number {
  const normalized = ((((angleDeg % 360) + 540) % 360) - 180) // -180..180
  const abs = Math.abs(normalized)
  return Math.cos((abs * Math.PI) / 360) // 1 at center, 0 at back
}

function useVisibilityPaused(): { current: boolean } {
  const paused = useRef(false)
  useEffect(() => {
    const onVisibility = () => {
      paused.current = document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])
  return paused
}

export default function HeroSlideshow() {
  const count = slides.length
  const step = 360 / count
  const [rotation, setRotation] = useState(0)
  const [radius, setRadius] = useState(240)
  const containerRef = useRef<HTMLDivElement>(null)
  const paused = useVisibilityPaused()

  // Measure the container so the ring radius scales with available space.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = () => {
      const size = Math.min(el.clientWidth, el.clientHeight)
      setRadius(size * 0.62)
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Auto-rotate forever, every 3s, pausing while the tab is hidden.
  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return
      setRotation((r) => r + step)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [step, paused])

  const items = useMemo(
    () =>
      slides.map((slide, i) => ({
        ...slide,
        angle: i * step,
      })),
    [step],
  )

  const renderRing = (reflection: boolean) => (
    <div
      className="absolute inset-0"
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateY(${rotation}deg)`,
        transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        willChange: 'transform',
      }}
    >
      {items.map((item) => {
        const t = frontFactor(item.angle + rotation)
        const scale = 0.55 + t * 0.67 // ~0.55 (back) -> ~1.22 (front)
        const opacity = 0.15 + t * 0.85
        const blurPx = (1 - t) * 3
        const brightness = 0.5 + t * 0.6
        const glow = Math.max(0, (t - 0.75) / 0.25) // fades in only near center

        return (
          <div
            key={item.src}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `rotateY(${item.angle}deg) translateZ(${radius}px)` }}
          >
            <div
              className="relative aspect-[4/3] w-[170px] overflow-hidden rounded-2xl sm:w-[200px] md:w-[230px] lg:w-[260px] xl:w-[300px]"
              style={{
                transform: `scale(${scale})`,
                opacity: reflection ? opacity * 0.35 : opacity,
                filter: `blur(${blurPx}px) brightness(${brightness})`,
                zIndex: Math.round(t * 1000),
                transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${TRANSITION_MS}ms ease-in-out, filter ${TRANSITION_MS}ms ease-in-out`,
                border: `1.5px solid rgba(59, 130, 246, ${glow * 0.7 + 0.06})`,
                boxShadow: glow
                  ? `0 0 ${28 * glow}px ${6 * glow}px rgba(37, 99, 235, ${0.55 * glow}), 0 0 ${60 * glow}px rgba(59, 130, 246, ${0.4 * glow})`
                  : undefined,
                willChange: 'transform, opacity, filter',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div ref={containerRef} className="relative h-full w-full" style={{ perspective: 1500 }}>
      {/* Glowing circular platform beneath the carousel */}
      <div className="pointer-events-none absolute bottom-[4%] left-1/2 h-10 w-[68%] -translate-x-1/2 rounded-full bg-gradient-to-r from-red-hot/50 via-orange/45 to-orange-light/50 blur-2xl animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-2 w-[46%] -translate-x-1/2 rounded-full bg-orange-light/70 blur-md" />

      {/* Soft reflection of the ring, faded toward the platform */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'scaleY(-1) translateY(-6%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%)',
        }}
      >
        {renderRing(true)}
      </div>

      {/* The rotating ring itself */}
      {renderRing(false)}
    </div>
  )
}
