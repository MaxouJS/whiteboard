import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

interface ListProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  reset?: boolean
}

export function List({ as = 'ul', reset = true, className, ...props }: ListProps) {
  return createElement(as, {
    className: cn(reset && 'list-reset', className),
    ...props,
  })
}
