import type { ComponentType } from 'react'

export type IconComponent = ComponentType<{ className?: string; size?: number }>

export interface Service {
  id: string
  title: string
  description: string
  image: string
  icon: IconComponent
  category: PortfolioCategory
}

export type PortfolioCategory =
  | 'jerseys'
  | 'tshirts'
  | 'shoes'
  | 'wood'
  | 'branding'
  | 'logos'

export interface PortfolioItem {
  id: string
  title: string
  category: PortfolioCategory
  image: string
  width: number
  height: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface StatItem {
  id: string
  value: number
  suffix: string
  label: string
}

export interface ProcessStep {
  id: string
  step: number
  title: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}
