import { type ComponentProps } from 'react'
import { Button } from './Button'
import { cn } from './cn'

type Placement = 'top-right' | 'bottom-left' | 'bottom-right'

interface OverlayIconButtonProps extends Omit<ComponentProps<typeof Button>, 'variant' | 'iconOnly'> {
  placement?: Placement
}

export function OverlayIconButton({
  className,
  placement,
  onPointerDown,
  onWheel,
  onContextMenu,
  ...props
}: OverlayIconButtonProps) {
  return (
    <Button
      variant="secondary"
      iconOnly
      className={cn('overlay-icon-btn', placement && `overlay-icon-btn--${placement}`, className)}
      onPointerDown={(event) => {
        event.stopPropagation()
        onPointerDown?.(event)
      }}
      onWheel={(event) => {
        event.stopPropagation()
        onWheel?.(event)
      }}
      onContextMenu={(event) => {
        event.stopPropagation()
        onContextMenu?.(event)
      }}
      {...props}
    />
  )
}
