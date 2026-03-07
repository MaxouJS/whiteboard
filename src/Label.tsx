import type { LabelHTMLAttributes } from 'react'
import { cn } from './cn'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn('widget-label', className)} {...props} />
}
