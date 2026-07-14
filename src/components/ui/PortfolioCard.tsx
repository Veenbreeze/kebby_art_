import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import type { PortfolioItem } from '@/types'

interface PortfolioCardProps {
  item: PortfolioItem
  onOpen: () => void
}

export default function PortfolioCard({ item, onOpen }: PortfolioCardProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={onOpen}
      className="group relative mb-6 block w-full overflow-hidden rounded-2xl break-inside-avoid text-left"
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="mb-2 inline-block w-fit rounded-full bg-orange/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
          {item.category}
        </span>
        <h3 className="translate-y-3 font-display text-lg font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
          {item.title}
        </h3>
        <span className="mt-3 flex translate-y-3 items-center gap-2 text-sm text-orange opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye size={16} /> View Project
        </span>
      </div>
    </motion.button>
  )
}
