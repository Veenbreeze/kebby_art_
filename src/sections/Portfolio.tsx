import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import SectionHeading from '@/components/ui/SectionHeading'
import PortfolioCard from '@/components/ui/PortfolioCard'
import { portfolioItems, portfolioCategories } from '@/data/portfolio'
import { cn } from '@/lib/cn'
import type { PortfolioCategory } from '@/types'

const PAGE_SIZE = 9

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'all'>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return portfolioItems
    return portfolioItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const visible = filtered.slice(0, visibleCount)

  function handleCategoryChange(category: PortfolioCategory | 'all') {
    setActiveCategory(category)
    setVisibleCount(PAGE_SIZE)
  }

  const slides = filtered.map((item) => ({ src: item.image, title: item.title }))

  return (
    <section id="portfolio" className="relative section-pad bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Our Work"
          title="A Portfolio Built On Craft"
          description="Explore a curated selection of jerseys, apparel, footwear, wooden art and brand identities we've brought to life."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {portfolioCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange to-red-hot text-white shadow-lg shadow-orange/25'
                  : 'glass text-gray-soft hover:text-white',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <PortfolioCard key={item.id} item={item} onOpen={() => setLightboxIndex(i)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < filtered.length && (
          <div className="mt-4 flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="glass rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(5,5,5,0.95)' } }}
      />
    </section>
  )
}
