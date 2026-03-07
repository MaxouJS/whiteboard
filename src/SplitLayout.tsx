import type { HTMLAttributes } from 'react'
import { cn } from './cn'

type SplitLayoutVariant = 'element' | 'character' | 'user'

const variantClasses: Record<SplitLayoutVariant, string> = {
  element: 'split-layout--element',
  character: 'split-layout--character',
  user: 'split-layout--user',
}

interface SplitLayoutProps extends HTMLAttributes<HTMLDivElement> {
  variant: SplitLayoutVariant
}

/**
 * A two-column grid layout (image + content side-by-side).
 * Replaces `<div className="element-main">`, `<div className="character-main">`,
 * `<article className="user-row">`.
 */
export function SplitLayout({ variant, className, ...props }: SplitLayoutProps) {
  return <div className={cn('split-layout', variantClasses[variant], className)} {...props} />
}
