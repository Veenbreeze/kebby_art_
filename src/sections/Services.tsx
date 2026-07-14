import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'
import GlowBackground from '@/components/ui/GlowBackground'
import { services } from '@/data/services'

export default function Services() {
  return (
    <section id="services" className="relative section-pad overflow-hidden bg-bg">
      <GlowBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Crafted For Every Vision"
          description="From match-day jerseys to full brand identities — every service is delivered with premium materials and obsessive attention to detail."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
