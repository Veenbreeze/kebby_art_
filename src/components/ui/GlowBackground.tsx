import { cn } from '@/lib/cn'

interface GlowBackgroundProps {
  className?: string
  variant?: 'hero' | 'section'
  vignette?: boolean
}

export default function GlowBackground({
  className,
  variant = 'section',
  vignette = true,
}: GlowBackgroundProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-orange/25 blur-[110px] animate-pulse-glow"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-red-hot/20 blur-[130px] animate-pulse-glow"
        style={{ animationDelay: '1.5s' }}
      />
      {variant === 'hero' && (
        <div
          className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-orange-light/20 blur-[100px] animate-pulse-glow"
          style={{ animationDelay: '3s' }}
        />
      )}
      {vignette && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,#050505_75%)]" />
      )}
    </div>
  )
}
