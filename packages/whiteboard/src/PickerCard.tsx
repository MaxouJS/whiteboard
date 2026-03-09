import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

interface PickerCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

/**
 * A clickable card used inside picker grids (asset pickers, variant pickers).
 * Replaces `<button className="picker-card">`, `<Stack className="picker-card picker-card--skeleton">`.
 */
export function PickerCard({ as = 'button', className, ...props }: PickerCardProps) {
  return createElement(as, {
    className: cn('picker-card', className),
    ...props,
  })
}
