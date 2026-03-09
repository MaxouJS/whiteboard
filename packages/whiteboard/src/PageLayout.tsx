import type { HTMLAttributes } from 'react'
import { cn } from './cn'

export function PageShell({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return <main className={cn('page-shell', className)} {...props}>{children}</main>
}

export function PageCard({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('page-card', className)} {...props}>{children}</div>
}
