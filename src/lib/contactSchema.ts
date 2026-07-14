import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Tell us a little more about your project'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
