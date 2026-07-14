import type { PortfolioItem } from '@/types'
import { kebbyImage, placeholderImage } from '@/lib/images'

interface RawPortfolioItem extends Omit<PortfolioItem, 'image' | 'width' | 'height'> {
  file?: string
}

// Every real photo is force-cropped to this exact size (see public/kebby) so every
// portfolio tile — real or placeholder — renders at the same dimensions.
const WIDTH = 810
const HEIGHT = 1080

const raw: RawPortfolioItem[] = [
  // Jerseys — custom printed & personalized football kits
  { id: 'p1', title: 'Brasil "Shado" Custom Kit', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.37 (2).jpeg' },
  { id: 'p2', title: 'Argentina "Muhingo Jr" Kit', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.37 (3).jpeg' },
  { id: 'p3', title: 'National Team Kit Collection', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.35.jpeg' },
  { id: 'p4', title: 'USA, Jamaica & Morocco Kits', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.38.jpeg' },
  { id: 'p5', title: 'League Kit Assortment', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.05.12 (3).jpeg' },
  { id: 'p6', title: 'Match-Day Captain Kit', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.05.11 (2).jpeg' },
  { id: 'p7', title: 'Argentina World Champions Kit', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.38 (3).jpeg' },
  { id: 'p8', title: '"Kareem" Name Printing', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.40 (1).jpeg' },
  { id: 'p9', title: '"Star Boy" Custom Kit', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.40 (2).jpeg' },
  { id: 'p10', title: '"Kescha" & "Miakili" Kits', category: 'jerseys', file: 'WhatsApp Image 2026-07-13 at 19.38.39 (4).jpeg' },

  // T-Shirts
  { id: 'p11', title: '"Jesus, Way Truth Life" Tee', category: 'tshirts', file: 'WhatsApp Image 2026-07-13 at 19.05.12 (2).jpeg' },
  { id: 'p12', title: 'Custom Tee Heat Press', category: 'tshirts', file: 'WhatsApp Image 2026-07-13 at 19.05.14 (2).jpeg' },

  // Shoes — no photographed work yet, placeholders until real samples are added
  { id: 'p13', title: 'Custom Air Sneaker Rework', category: 'shoes' },
  { id: 'p14', title: 'Hand-Painted High Tops', category: 'shoes' },
  { id: 'p15', title: 'Gold Trim Runners', category: 'shoes' },

  // Wood & Wall Décor — canvas prints, framed art and personalized gifts
  { id: 'p16', title: 'Regal Portrait Canvas', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.05.09 (1).jpeg' },
  { id: 'p17', title: 'Sunset Elephant Canvas', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.05.12 (1).jpeg' },
  { id: 'p18', title: '"God First" Quote Frame', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.05.11 (1).jpeg' },
  { id: 'p19', title: 'Family Portrait Canvas', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.05.10 (1).jpeg' },
  { id: 'p20', title: 'Father & Daughter Canvas', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.05.10.jpeg' },
  { id: 'p21', title: 'Portrait Canvas Print', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.05.12.jpeg' },
  { id: 'p22', title: 'Framed Jersey Gift — Saka', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.38.42 (1).jpeg' },
  { id: 'p23', title: 'Framed Jersey Gift — Lamine Yamal', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.38.41 (4).jpeg' },
  { id: 'p24', title: 'Framed Jersey Gift — Fernandes', category: 'wood', file: 'WhatsApp Image 2026-07-13 at 19.38.42 (3).jpeg' },

  // Branding — stickers, signage and business print
  { id: 'p25', title: "Ms Fau's Taste Hub Stickers", category: 'branding', file: 'WhatsApp Image 2026-07-13 at 19.05.10 (2).jpeg' },
  { id: 'p26', title: 'House Rules Framed Signage', category: 'branding', file: 'WhatsApp Image 2026-07-13 at 19.05.12 (4).jpeg' },
  { id: 'p27', title: 'House Rules Poster Print', category: 'branding', file: 'WhatsApp Image 2026-07-13 at 19.05.13.jpeg' },
  { id: 'p28', title: 'Citi Land Solutions Vouchers', category: 'branding', file: 'WhatsApp Image 2026-07-13 at 19.05.14 (1).jpeg' },

  // Logos — framed national emblem prints
  { id: 'p29', title: 'Argentina Crest Frame', category: 'logos', file: 'WhatsApp Image 2026-07-13 at 19.05.13 (1).jpeg' },
  { id: 'p30', title: 'Spain Crest Frame', category: 'logos', file: 'WhatsApp Image 2026-07-13 at 19.05.13 (2).jpeg' },
  { id: 'p31', title: 'England Crest Frame', category: 'logos', file: 'WhatsApp Image 2026-07-13 at 19.05.13 (3).jpeg' },
  { id: 'p32', title: 'France Crest Frame', category: 'logos', file: 'WhatsApp Image 2026-07-13 at 19.05.14.jpeg' },
]

export const portfolioItems: PortfolioItem[] = raw.map(({ file, ...item }) => ({
  ...item,
  width: WIDTH,
  height: HEIGHT,
  image: file ? kebbyImage(file) : placeholderImage(item.id, WIDTH, HEIGHT),
}))

export const portfolioCategories = [
  { id: 'all', label: 'All' },
  { id: 'jerseys', label: 'Jerseys' },
  { id: 'tshirts', label: 'T-Shirts' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'wood', label: 'Wood Art' },
  { id: 'branding', label: 'Branding' },
  { id: 'logos', label: 'Logos' },
] as const
