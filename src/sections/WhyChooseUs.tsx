import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowBackground from '@/components/ui/GlowBackground'
import { whyChooseUs } from '@/data/whyChooseUs'

export default function WhyChooseUs() {
  return (
    <section className="relative section-pad overflow-hidden bg-bg-secondary">
      <GlowBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why Kebby Arts"
          title="Trusted By Teams, Brands & Institutions"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass group rounded-2xl p-8 transition-shadow duration-300 hover:shadow-2xl hover:shadow-orange/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange/20 to-red-hot/10 text-orange transition-transform duration-300 group-hover:scale-110 group-hover:from-orange group-hover:to-red-hot group-hover:text-white">
                  <Icon size={26} />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-soft">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
