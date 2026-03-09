import type { HTMLAttributes } from 'react'
import { cn } from './cn'

type PillTone = 'default' | 'success' | 'warning' | 'danger'

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone
}

const toneClasses: Record<PillTone, string> = {
  default: '',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

export function Pill({ tone = 'default', className, ...props }: PillProps) {
  return <span className={cn('pill', toneClasses[tone], className)} {...props} />
}
