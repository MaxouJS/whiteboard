import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from './cn'
import { Label } from './Label'
import { MutedText } from './Typography'

type FieldLayout = 'stack' | 'control'

interface FieldProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  label?: ReactNode
  htmlFor?: string
  hint?: ReactNode
  error?: ReactNode
  layout?: FieldLayout
}

export function Field({
  as,
  label,
  htmlFor,
  hint,
  error,
  layout = 'stack',
  className,
  children,
  ...props
}: FieldProps) {
  return createElement(
    as ?? 'div',
    {
      className: cn(layout === 'control' ? 'widget-control' : 'panel-stack-sm', className),
      ...props,
    },
    <>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {hint ? <MutedText size="xs">{hint}</MutedText> : null}
      {error ? <p className="field-error">{error}</p> : null}
    </>
  )
}
