import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

interface ItemCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

/**
 * A bordered card container used for list items (elements, facts, secrets, users, characters, assets).
 * Replaces raw `<div className="element-card">`, `<div className="fact-card">`,
 * `<div className="secret-card">`, `<li className="user-card">`, `<div className="character-card">`,
 * `<li className="asset-card">`, etc.
 */
export function ItemCard({ as = 'div', className, ...props }: ItemCardProps) {
  return createElement(as, {
    className: cn('item-card', className),
    ...props,
  })
}
