import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from './cn'

interface IconTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  icon: ReactNode
}

export function IconText({ as = 'span', icon, className, children, ...props }: IconTextProps) {
  return createElement(
    as,
    {
      className: cn('inline-row', className),
      ...props,
    },
    <>
      {icon}
      {children}
    </>
  )
}
