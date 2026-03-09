import type { ButtonHTMLAttributes } from 'react'
import { cn } from './cn'

interface ChoiceCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function ChoiceCard({ active = false, className, ...props }: ChoiceCardProps) {
  return (
    <button
      type="button"
      className={cn('choice-card', className)}
      data-active={active}
      {...props}
    />
  )
}
