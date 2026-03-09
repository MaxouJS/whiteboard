import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

interface InlineProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  justify?: 'start' | 'between' | 'end'
}

export function Inline({
  as,
  justify = 'start',
  className,
  ...props
}: InlineProps) {
  const cls = justify === 'between' ? 'space-between' : justify === 'end' ? 'space-end' : 'inline-row'
  return createElement(as ?? 'div', {
    className: cn(cls, className),
    ...props,
  })
}
