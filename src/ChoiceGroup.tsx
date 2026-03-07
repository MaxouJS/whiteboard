import type { ReactNode } from 'react'
import { ChoiceCard } from './ChoiceCard'
import { List } from './List'
import { LineSkeleton, TitleSkeleton } from './Skeleton'
import { cn } from './cn'

export interface ChoiceOption<T extends string> {
  value: T
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

interface ChoiceGroupProps<T extends string> {
  options: ChoiceOption<T>[]
  value: T | null | undefined
  onChange: (value: T) => void
  className?: string
}

export function ChoiceGroup<T extends string>({
  options,
  value,
  onChange,
  className,
}: ChoiceGroupProps<T>) {
  return (
    <List className={cn('choice-list', className)}>
      {options.map((option) => (
        <li key={option.value}>
          <ChoiceCard
            active={value === option.value}
            onClick={() => onChange(option.value)}
            disabled={option.disabled}
            data-has-description={option.description ? 'true' : 'false'}
          >
            {option.description ? (
              <span className="choice-card__row">
                <span className="choice-card__label">{option.label}</span>
                <span className="choice-card__description">{option.description}</span>
              </span>
            ) : (
              <span className="choice-card__label">{option.label}</span>
            )}
          </ChoiceCard>
        </li>
      ))}
    </List>
  )
}

interface ChoiceGroupSkeletonProps {
  count?: number
  className?: string
  withDescription?: boolean
}

export function ChoiceGroupSkeleton({ count = 4, className, withDescription = false }: ChoiceGroupSkeletonProps) {
  return (
    <List className={cn('choice-list', className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <li key={`choice-skeleton-${i}`}>
          <div className="choice-card">
            <TitleSkeleton className={cn('skeleton-title--sm', !withDescription && 'skeleton-choice-label')} />
            {withDescription ? <LineSkeleton short /> : null}
          </div>
        </li>
      ))}
    </List>
  )
}
