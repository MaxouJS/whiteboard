'use client'

import type { ComponentType } from 'react'

interface PanelTitleProps {
  icon: ComponentType<{ size?: number; className?: string }>
  label: string
}

export function PanelTitle({ icon: Icon, label }: PanelTitleProps) {
  return (
    <span className="panel-title-with-icon">
      <Icon size={13} className="panel-title-icon" />
      <span>{label}</span>
    </span>
  )
}
