import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/process'

export default function Process() {
  return (
    <section id="process" className="relative section-pad overflow-hidden bg-bg">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From Idea To Masterpiece"
          description="A simple, transparent process designed to turn your vision into a finished product you'll love."
        />

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-orange via-orange-light/50 to-transparent sm:block" />

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange to-red-hot font-display text-2xl font-bold text-white shadow-lg shadow-orange/30"
                >
                  {step.step}
                </motion.div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-soft">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <span className="mt-6 text-orange/60 sm:hidden">↓</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
