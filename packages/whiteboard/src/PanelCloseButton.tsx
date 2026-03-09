
import { X } from './icons'
import { Button } from './Button'

interface PanelCloseButtonProps {
  onClick: () => void
  label?: string
}

export function PanelCloseButton({ onClick, label = 'Close' }: PanelCloseButtonProps) {
  return (
    <Button variant="secondary" className="panel-close-btn" onClick={onClick}>
      <X size={14} />
      {label}
    </Button>
  )
}
