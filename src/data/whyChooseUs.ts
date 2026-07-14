import { Gem, Wallet, Zap, Palette, Users, ThumbsUp } from 'lucide-react'
import type { IconComponent } from '@/types'

interface WhyItem {
  id: string
  icon: IconComponent
  title: string
  description: string
}

export const whyChooseUs: WhyItem[] = [
  {
    id: 'quality',
    icon: Gem,
    title: 'High Quality',
    description: 'Premium materials and precision craftsmanship in every single piece.',
  },
  {
    id: 'affordable',
    icon: Wallet,
    title: 'Affordable Prices',
    description: 'Studio-grade results priced fairly for individuals, teams and businesses.',
  },
  {
    id: 'fast',
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Streamlined production so your order arrives exactly when promised.',
  },
  {
    id: 'creative',
    icon: Palette,
    title: 'Creative Designs',
    description: 'Original concepts tailored to your brand, not recycled templates.',
  },
  {
    id: 'team',
    icon: Users,
    title: 'Professional Team',
    description: 'Skilled designers and printers dedicated to getting every detail right.',
  },
  {
    id: 'satisfaction',
    icon: ThumbsUp,
    title: 'Customer Satisfaction',
    description: 'A track record of happy clients who return for every new project.',
  },
]
