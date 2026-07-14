import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { faqItems } from '@/data/faq'
import { cn } from '@/lib/cn'

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null)

  return (
    <section id="faq" className="relative section-pad bg-bg">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Answers to the questions we hear most from clients before starting a project."
        />

        <div className="mt-14 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass overflow-hidden rounded-2xl"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-white sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange transition-transform duration-300',
                      isOpen && 'rotate-45',
                    )}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-gray-soft">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
