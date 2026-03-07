import type { HTMLAttributes } from 'react'
import { cn } from './cn'

interface TitleRowProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * A horizontal row with space-between alignment, used for title + action pairs.
 * Replaces `<div className="element-card__title-row">`,
 * `<div className="character-info__title-row">`,
 * `<header className="widget-section__header">`, etc.
 */
export function TitleRow({ className, ...props }: TitleRowProps) {
  return <div className={cn('title-row', className)} {...props} />
}
