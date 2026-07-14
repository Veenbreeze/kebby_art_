import { useLenis } from '@/hooks/useLenis'
import ScrollProgress from '@/components/ui/ScrollProgress'
import FloatingActions from '@/components/ui/FloatingActions'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/sections/Hero'
import Services from '@/sections/Services'
import Portfolio from '@/sections/Portfolio'
import Process from '@/sections/Process'
import WhyChooseUs from '@/sections/WhyChooseUs'
import Stats from '@/sections/Stats'
import Testimonials from '@/sections/Testimonials'
import Faq from '@/sections/Faq'
import Contact from '@/sections/Contact'

export default function App() {
  useLenis()

  return (
    <>
      <div className="noise-overlay" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <WhyChooseUs />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
