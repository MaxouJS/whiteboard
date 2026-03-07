'use client'

import { useMemo } from 'react'
import { snapToWhiteboardGrid } from './grid'

type WidthMap = Record<string, number>

interface UseWhiteboardLayoutOptions<T extends WidthMap> {
  widths: T
  startX?: number
  y?: number
  gap?: number
}

type PositionMap<T extends WidthMap> = { [K in keyof T]: { x: number; y: number } }

export function useWhiteboardLayout<T extends WidthMap>({
  widths,
  startX = 20,
  y = 40,
  gap = 20,
}: UseWhiteboardLayoutOptions<T>) {
  const panelWidth = useMemo(() => {
    const normalized: WidthMap = {}
    for (const [key, value] of Object.entries(widths)) {
      normalized[key] = snapToWhiteboardGrid(value)
    }
    return normalized as T
  }, [widths])

  const layout = useMemo(
    () => ({
      startX: snapToWhiteboardGrid(startX),
      y: snapToWhiteboardGrid(y),
      gap: snapToWhiteboardGrid(gap),
    }),
    [startX, y, gap]
  )

  const positions = useMemo(() => {
    const next = {} as PositionMap<T>
    let x = layout.startX
    for (const [key, width] of Object.entries(panelWidth)) {
      ;(next as Record<string, { x: number; y: number }>)[key] = { x, y: layout.y }
      x += width + layout.gap
    }
    return next
  }, [layout.gap, layout.startX, layout.y, panelWidth])

  return { layout, panelWidth, positions }
}
