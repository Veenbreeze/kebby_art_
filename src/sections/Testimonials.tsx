import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 5500)
    return () => clearInterval(id)
  }, [emblaApi])

  return (
    <section id="testimonials" className="relative section-pad overflow-hidden bg-bg-secondary">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Real feedback from teams, brands and institutions we've had the pleasure to work with."
        />

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-0 flex-[0_0_100%] px-3 sm:flex-[0_0_100%]">
                  <div className="glass mx-auto flex max-w-2xl flex-col items-center rounded-3xl p-10 text-center sm:p-14">
                    <Quote className="text-orange/50" size={36} />
                    <p className="mt-6 text-lg leading-relaxed text-white sm:text-xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex gap-1 text-orange">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="mt-6 h-14 w-14 rounded-full object-cover ring-2 ring-orange/40"
                    />
                    <p className="mt-3 font-display text-base font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-soft">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            aria-label="Previous testimonial"
            className="glass absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors hover:text-orange sm:-left-4 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next testimonial"
            className="glass absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors hover:text-orange sm:-right-4 sm:flex"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i ? 'w-8 bg-orange' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
