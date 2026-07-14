import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/nav'
import { cn } from '@/lib/cn'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function handleClick(href: string) {
    setActive(href)
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled ? 'py-3 glass' : 'py-6 bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#home" onClick={() => handleClick('#home')} className="font-display text-2xl font-bold tracking-tight text-white">
          Kebby<span className="text-gradient">Arts</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleClick(link.href)}
                className="group relative text-sm font-medium text-gray-soft transition-colors hover:text-white"
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-[1.5px] bg-gradient-to-r from-orange to-red-hot transition-all duration-300',
                    active === link.href ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={() => handleClick('#contact')}
          className="hidden rounded-full bg-gradient-to-r from-orange to-red-hot px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20 transition-transform hover:scale-105 lg:inline-block"
        >
          Get Quote
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden bg-bg-secondary/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => handleClick(link.href)}
                    className="block py-3 text-lg font-medium text-white/90 hover:text-orange"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <a
                href="#contact"
                onClick={() => handleClick('#contact')}
                className="mt-2 rounded-full bg-gradient-to-r from-orange to-red-hot px-6 py-3 text-center text-sm font-semibold text-white"
              >
                Get Quote
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
