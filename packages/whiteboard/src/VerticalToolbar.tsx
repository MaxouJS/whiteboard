import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from './cn'

interface VerticalToolbarProps extends HTMLAttributes<HTMLElement> {
  position?: 'left' | 'right' | 'static'
  bottom?: ReactNode
}

export function VerticalToolbar({
  children,
  bottom,
  position = 'left',
  className,
  ...props
}: VerticalToolbarProps) {
  return (
    <nav
      className={cn(
        'vertical-toolbar',
        position === 'right' && 'vertical-toolbar--right',
        position === 'static' && 'vertical-toolbar--static',
        className
      )}
      {...props}
    >
      <div className="vertical-toolbar__links">{children}</div>
      {bottom}
    </nav>
  )
}
