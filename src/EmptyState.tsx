import type { ReactNode } from 'react'
import { Stack } from './Stack'
import { AssetTitle, MutedText } from './Typography'

interface EmptyStateProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Stack size="sm">
      <AssetTitle>{title}</AssetTitle>
      {description ? <MutedText>{description}</MutedText> : null}
      {action}
    </Stack>
  )
}
