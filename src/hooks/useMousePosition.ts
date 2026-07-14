import { useEffect, useState } from 'react'

interface NormalizedMouse {
  x: number
  y: number
}

export function useMousePosition(): NormalizedMouse {
  const [position, setPosition] = useState<NormalizedMouse>({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      setPosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}
