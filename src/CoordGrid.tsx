import type { HTMLAttributes, InputHTMLAttributes } from 'react'
import { cn } from './cn'

interface CoordGridProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * A 2-column grid for coordinate inputs.
 * Replaces `<div className="coord-grid">`.
 */
export function CoordGrid({ className, ...props }: CoordGridProps) {
  return <div className={cn('coord-grid', className)} {...props} />
}

interface CoordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  axis: string
}

/**
 * A labeled coordinate input (x, y, z, scale).
 * Replaces `<label className="coord-input">x <input ...></label>`.
 */
export function CoordInput({ axis, className, ...props }: CoordInputProps) {
  return (
    <label className={cn('coord-input', className)}>
      {axis} <input type="number" step="0.01" {...props} />
    </label>
  )
}
