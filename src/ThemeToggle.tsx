'use client'

import { type ReactNode } from 'react'
import { Moon, Sun } from './icons'

interface ThemeToggleProps {
  className?: string
  theme?: 'light' | 'dark'
  onToggle?: () => void
  lightIcon?: ReactNode
  darkIcon?: ReactNode
}

export function ThemeToggle({ className, theme = 'light', onToggle, lightIcon, darkIcon }: ThemeToggleProps) {
  return (
    <button className={className} onClick={onToggle} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-label="Toggle theme">
      {theme === 'light' ? (darkIcon ?? <Moon />) : (lightIcon ?? <Sun />)}
    </button>
  )
}
