import { type HTMLAttributes } from 'react'
import { cn } from './cn'

export function AvatarBadge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('avatar-badge', className)} {...props} />
}
