import { Loader2 } from './icons'
import { cn } from './cn'

interface LoadingStateProps {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading...', className }: LoadingStateProps) {
  return (
    <span className={cn('status-inline', className)}>
      <Loader2 size={14} className="icon-spin" />
      {label}
    </span>
  )
}
