import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Phone, Clock, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowBackground from '@/components/ui/GlowBackground'
import { contactSchema, type ContactFormValues } from '@/lib/contactSchema'
import { businessInfo } from '@/data/nav'
import { services } from '@/data/services'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })

  async function onSubmit(values: ContactFormValues) {
    setSubmitState('loading')
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          phone: values.phone,
          service: values.service,
          message: values.message,
        },
        { publicKey },
      )

      setSubmitState('success')
      reset()
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section id="contact" className="relative section-pad overflow-hidden bg-bg-secondary">
      <GlowBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something Beautiful"
          description="Tell us about your project and we'll get back to you with a free, no-obligation quote."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass flex flex-col gap-6 rounded-3xl p-8 lg:col-span-2"
          >
            <a
              href={businessInfo.phoneHref}
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/15 text-orange">
                <Phone size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-soft">Call Us</p>
                <p className="font-semibold text-white">{businessInfo.phone}</p>
              </div>
            </a>

            <a
              href={businessInfo.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <FaWhatsapp size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-soft">WhatsApp</p>
                <p className="font-semibold text-white">Chat With Us</p>
              </div>
            </a>

            <a
              href={businessInfo.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/15 text-orange">
                <FaInstagram size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-soft">Instagram</p>
                <p className="font-semibold text-white">{businessInfo.instagramHandle}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/15 text-orange">
                <Clock size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-soft">Business Hours</p>
                <p className="font-semibold text-white">{businessInfo.hours}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/15 text-orange">
                <MapPin size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-soft">Location</p>
                <p className="font-semibold text-white">{businessInfo.country}</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass grid grid-cols-1 gap-5 rounded-3xl p-8 sm:grid-cols-2 lg:col-span-3"
          >
            <div className="sm:col-span-1">
              <label className="mb-2 block text-sm font-medium text-gray-soft">Full Name</label>
              <input
                {...register('name')}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-orange"
                placeholder="John Mwangi"
              />
              {errors.name && <p className="mt-1 text-xs text-red-hot">{errors.name.message}</p>}
            </div>

            <div className="sm:col-span-1">
              <label className="mb-2 block text-sm font-medium text-gray-soft">Email</label>
              <input
                {...register('email')}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-orange"
                placeholder="john@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-hot">{errors.email.message}</p>}
            </div>

            <div className="sm:col-span-1">
              <label className="mb-2 block text-sm font-medium text-gray-soft">Phone</label>
              <input
                {...register('phone')}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-orange"
                placeholder="+255 6XX XXX XXX"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-hot">{errors.phone.message}</p>}
            </div>

            <div className="sm:col-span-1">
              <label className="mb-2 block text-sm font-medium text-gray-soft">Service</label>
              <select
                {...register('service')}
                defaultValue=""
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-orange"
              >
                <option value="" disabled className="bg-card">
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.title} className="bg-card">
                    {service.title}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-xs text-red-hot">{errors.service.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-soft">
                Project Details
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-orange"
                placeholder="Tell us about your project..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-hot">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitState === 'loading'}
              className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange to-red-hot px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-orange/25 transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {submitState === 'loading' ? 'Sending...' : 'Request Quote'}
              <Send size={16} />
            </button>

            {submitState === 'success' && (
              <p className="sm:col-span-2 flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={16} /> Message sent! We'll be in touch shortly.
              </p>
            )}
            {submitState === 'error' && (
              <p className="sm:col-span-2 flex items-center gap-2 text-sm text-red-hot">
                <AlertCircle size={16} /> Something went wrong — please WhatsApp us directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
