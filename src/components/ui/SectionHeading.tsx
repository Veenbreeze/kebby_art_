import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange"
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base leading-relaxed text-gray-soft sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
