import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, ArrowUp } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { businessInfo } from '@/data/nav'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 700)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-white hover:text-orange transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={businessInfo.phoneHref}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-white shadow-lg shadow-black/40 ring-1 ring-white/10 hover:text-orange transition-colors"
        aria-label="Call Kebby Arts"
      >
        <Phone size={20} />
      </motion.a>

      <motion.a
        href={businessInfo.whatsappHref}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-glow" />
        <FaWhatsapp size={26} className="relative" />
      </motion.a>
    </div>
  )
}
