import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Phone } from 'lucide-react'
import { navLinks, businessInfo } from '@/data/nav'
import { services } from '@/data/services'

export default function Footer() {
  const year = new Date().getFullYear()
  const footerServices = services.slice(0, 8)

  return (
    <footer className="relative border-t border-white/5 bg-bg-secondary pt-20">
      <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="font-display text-2xl font-bold text-white">
              Kebby<span className="text-gradient">Arts</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-soft">
              Turning ideas into masterpieces — premium jerseys, apparel, branding and wooden
              artwork, crafted in {businessInfo.country}.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={businessInfo.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-white ring-1 ring-white/10 transition-colors hover:text-orange"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href={businessInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-white ring-1 ring-white/10 transition-colors hover:text-orange"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={businessInfo.phoneHref}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-white ring-1 ring-white/10 transition-colors hover:text-orange"
                aria-label="Call"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-soft transition-colors hover:text-orange">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="text-sm text-gray-soft transition-colors hover:text-orange">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Get In Touch
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-gray-soft">
              <li>{businessInfo.phone}</li>
              <li>{businessInfo.hours}</li>
              <li>{businessInfo.country}</li>
              <li className="text-orange">{businessInfo.instagramHandle}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-gray-soft">
            &copy; {year} Kebby Arts.
          </p>
          <p className="text-xs text-gray-soft">Crafted with precision in {businessInfo.country}.</p>
        </div>
      </div>
    </footer>
  )
}
