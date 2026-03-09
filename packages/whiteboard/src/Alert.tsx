import type { HTMLAttributes } from 'react'
import { cn } from './cn'

type AlertTone = 'error' | 'muted' | 'info' | 'success'

interface AlertProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: AlertTone
}

const toneClasses: Record<AlertTone, string> = {
  error: 'status-error',
  muted: 'text-sm text-muted',
  info: 'ui-alert ui-alert--info',
  success: 'ui-alert ui-alert--success',
}

export function Alert({ tone = 'info', className, ...props }: AlertProps) {
  return <p className={cn(toneClasses[tone], className)} {...props} />
}
