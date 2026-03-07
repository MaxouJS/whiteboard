import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

interface ButtonRowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

/**
 * A flexible row of buttons with equal sizing. Replaces ALL action-row patterns:
 * `element-actions`, `asset-actions`, `character-actions`, `character-secondary-row`,
 * `editor-header__actions`, `style-picker-actions`, `confirm-actions`, `form-actions`,
 * `lang-batch-actions`, `widget-actions-row`.
 *
 * This replaces the old ActionGroup component which mapped variant strings to CSS classes.
 */
export function ButtonRow({ as = 'div', className, ...props }: ButtonRowProps) {
  return createElement(as, {
    className: cn('button-row', className),
    ...props,
  })
}
