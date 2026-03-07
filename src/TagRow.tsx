import type { HTMLAttributes } from 'react'
import { cn } from './cn'

interface TagRowProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * A horizontal wrapping row for chips/tags/pills/small items.
 * Replaces `<div className="element-tags-row">`, `<div className="chip-row">`,
 * `<div className="asset-meta">`, etc.
 */
export function TagRow({ className, ...props }: TagRowProps) {
  return <div className={cn('tag-row', className)} {...props} />
}
