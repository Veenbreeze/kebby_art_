import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 py-4 text-sm font-semibold transition-[transform,box-shadow] duration-200 ease-out',
        className,
      )}
      style={{ transitionProperty: 'transform' }}
    >
      {children}
    </motion.a>
  )
}
