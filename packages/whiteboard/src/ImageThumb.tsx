
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from './cn'

type ImageThumbSize = 'sm' | 'md' | 'fluid'
type ImageThumbFit = 'contain' | 'cover'

interface ImageThumbProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt: string
  placeholder?: ReactNode
  size?: ImageThumbSize
  fit?: ImageThumbFit
  onImageError?: () => void
}

export function ImageThumb({
  src,
  alt,
  placeholder = 'No image',
  size = 'md',
  fit = 'contain',
  onImageError,
  className,
  ...props
}: ImageThumbProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const failed = Boolean(src && failedSrc === src)

  const classes = cn('image-thumb', `image-thumb--${size}`, `image-thumb--fit-${fit}`, className)

  return (
    <div className={classes} {...props}>
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          className="image-thumb__img"
          style={{ objectFit: fit, objectPosition: 'center' }}
          onError={() => {
            setFailedSrc(src)
            onImageError?.()
          }}
        />
      ) : (
        <span className="image-thumb__placeholder">{placeholder}</span>
      )}
    </div>
  )
}
