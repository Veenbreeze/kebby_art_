import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { stats } from '@/data/stats'

export default function Stats() {
  return (
    <section className="relative bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl p-10 sm:grid-cols-4 sm:p-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-r from-orange to-orange-light bg-clip-text">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-gray-soft sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
