import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

type StackSize = 'sm' | 'md'

interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  size?: StackSize
}

export function Stack({
  as,
  size = 'md',
  className,
  ...props
}: StackProps) {
  return createElement(as ?? 'div', {
    className: cn(size === 'sm' ? 'panel-stack-sm' : 'panel-stack', className),
    ...props,
  })
}
