import { type HTMLAttributes } from 'react'
import { cn } from './cn'

interface CanvasStageProps extends HTMLAttributes<HTMLDivElement> {
  hint?: string
}

export function CanvasStage({ children, hint, className, ...props }: CanvasStageProps) {
  return (
    <div className="canvas-wrap">
      <div className={cn('canvas-stage', className)} {...props}>
        {children}
        {hint && <p className="canvas-hint">{hint}</p>}
      </div>
    </div>
  )
}
