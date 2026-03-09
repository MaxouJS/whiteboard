import type { HTMLAttributes } from 'react'
import { cn } from './cn'
import { List } from './List'

type PickerGridVariant = 'elements' | 'characters' | 'library'

const variantClasses: Record<PickerGridVariant, string> = {
  elements: 'picker-grid--elements',
  characters: 'picker-grid--characters',
  library: 'picker-grid--library',
}

interface PickerGridProps extends HTMLAttributes<HTMLUListElement> {
  variant: PickerGridVariant
}

/**
 * A responsive grid for picker cards.
 * Replaces `<List className="picker-grid picker-grid--elements">`, etc.
 */
export function PickerGrid({ variant, className, ...props }: PickerGridProps) {
  return <List className={cn('picker-grid', variantClasses[variant], className)} {...props} />
}
