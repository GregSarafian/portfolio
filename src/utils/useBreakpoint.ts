import { useEffect, useState } from 'react'

export type Breakpoint = 'sm' | 'md' | 'lg'

function current(): Breakpoint {
  if (typeof window === 'undefined') return 'lg'
  const w = window.innerWidth
  if (w <= 749) return 'sm'
  if (w <= 1199) return 'md'
  return 'lg'
}

/** Tracks the active layout breakpoint, mirroring the media-query ranges in index.css. */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(current)
  useEffect(() => {
    const onResize = () => setBp(current())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return bp
}
