import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

interface InlineProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  justify?: 'start' | 'between'
}

export function Inline({
  as,
  justify = 'start',
  className,
  ...props
}: InlineProps) {
  return createElement(as ?? 'div', {
    className: cn(justify === 'between' ? 'space-between' : 'inline-row', className),
    ...props,
  })
}
