import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import GlowBackground from '@/components/ui/GlowBackground'
import FloatingParticles from '@/components/ui/FloatingParticles'
import MagneticButton from '@/components/ui/MagneticButton'
import HeroSlideshow from '@/components/ui/HeroSlideshow'
import { businessInfo } from '@/data/nav'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-bg via-bg-secondary to-bg pt-28 lg:pt-20"
    >
      <GlowBackground variant="hero" vignette={false} />
      <FloatingParticles count={30} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-orange"
          >
            <Sparkles size={14} />
            Premium Printing &amp; Branding Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Turning Ideas Into{' '}
            <span className="text-gradient gradient-animated">Masterpieces</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-gray-soft"
          >
            We create premium jerseys, custom apparel, branding, wooden artwork and personalized
            products — crafted in Tanzania, built to impress.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#portfolio"
              className="bg-gradient-to-r from-orange to-red-hot text-white shadow-xl shadow-orange/25 hover:shadow-orange/40"
            >
              View Portfolio
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contact" className="glass text-white hover:bg-white/10">
              Get Quote
            </MagneticButton>
            <MagneticButton
              href={businessInfo.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366]/15 text-[#25D366] ring-1 ring-[#25D366]/40 hover:bg-[#25D366]/25"
            >
              <FaWhatsapp size={16} />
              Chat on WhatsApp
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex items-center gap-8 border-t border-white/10 pt-8"
          >
            {[
              ['500+', 'Projects'],
              ['100+', 'Clients'],
              ['5+', 'Years'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-white">{value}</p>
                <p className="text-xs uppercase tracking-widest text-gray-soft">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative h-[420px] sm:h-[520px] lg:h-[620px]"
        >
          <HeroSlideshow />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-soft sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-[1.5px] animate-pulse-glow bg-gradient-to-b from-orange to-transparent" />
      </motion.div>
    </section>
  )
}
