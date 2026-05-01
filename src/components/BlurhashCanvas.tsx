import { useEffect, useRef } from 'react'
import { decode } from 'blurhash'

interface BlurhashCanvasProps {
  hash: string
  /** Decode resolution — kept small; CSS stretches it to fill the container */
  width?: number
  height?: number
  style?: React.CSSProperties
}

/**
 * Decodes a BlurHash string and paints it to a <canvas>.
 * Intentionally low-res (default 32×32) — CSS object-fit stretches it,
 * which amplifies the blur and keeps decode cost negligible.
 */
export function BlurhashCanvas({ hash, width = 32, height = 32, style }: BlurhashCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !hash) return
    const pixels = decode(hash, width, height)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const imageData = ctx.createImageData(width, height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  }, [hash, width, height])

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        ...style,
      }}
    />
  )
}
