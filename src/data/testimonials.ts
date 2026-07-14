import type { Testimonial } from '@/types'
import { avatarImage } from '@/lib/images'

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Amani Mwakalinga',
    role: 'Coach, Dar Youth FC',
    avatar: avatarImage(12),
    quote:
      'Kebby Arts printed our entire league kit in days, not weeks. The colors are still vivid after a full season of matches.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Grace Kileo',
    role: 'Founder, Grace Boutique',
    avatar: avatarImage(45),
    quote:
      'Our new logo and brand identity completely changed how customers see us. Professional, fast, and genuinely creative.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Daniel Mushi',
    role: 'Events Manager, Uhuru Conferences',
    avatar: avatarImage(33),
    quote:
      'From banners to badges, every piece of our event branding was flawless. Kebby Arts is our go-to studio now.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Fatma Juma',
    role: 'Head Teacher, Amani Secondary',
    avatar: avatarImage(29),
    quote:
      'The wooden signage they built for our school entrance is stunning. Parents ask about it constantly.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Baraka Ndosi',
    role: 'Owner, Baraka Motors',
    avatar: avatarImage(51),
    quote:
      'Our fleet wrap looks like a moving billboard. Sharp design, durable print, and installed on schedule.',
    rating: 5,
  },
]
