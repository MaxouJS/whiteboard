import type { HTMLAttributes } from 'react'
import { cn } from './cn'

type ChipProps = HTMLAttributes<HTMLSpanElement>

export function Chip({ className, ...props }: ChipProps) {
  return <span className={cn('chip', className)} {...props} />
}
