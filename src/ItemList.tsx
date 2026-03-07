import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

interface ItemListProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

/**
 * A vertical list with consistent gap, used for lists of ItemCards.
 * Replaces raw `<div className="element-list">`, `<div className="fact-list">`,
 * `<div className="secret-list">`, `<List className="user-list">`,
 * `<List className="characters-list">`, etc.
 */
export function ItemList({ as = 'div', className, ...props }: ItemListProps) {
  return createElement(as, {
    className: cn('item-list', className),
    ...props,
  })
}
