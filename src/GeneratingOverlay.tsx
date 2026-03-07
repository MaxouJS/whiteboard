'use client'

import { Loader2 } from './icons'
import type { ReactNode } from 'react'

interface GeneratingOverlayProps {
  isGenerating: boolean
  children: ReactNode
  message?: string
}

export function GeneratingOverlay({ isGenerating, children, message }: GeneratingOverlayProps) {
  return (
    <div className="generating-overlay-wrap">
      {children}
      {isGenerating && (
        <div className="generating-overlay" aria-live="polite">
          <Loader2 size={20} className="icon-spin" />
          <span>{message ?? 'Generating, please wait…'}</span>
        </div>
      )}
    </div>
  )
}
