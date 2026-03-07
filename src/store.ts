'use client'

import { create } from 'zustand'
import { WHITEBOARD_GRID } from './grid'

// ── Types ───────────────────────────────────────────────

export type PanelRect = {
  x: number
  y: number
  width: number
  height: number
  focusPadding?: number
  focusMaxScale?: number
}

// ── Geometry helpers ───────────────────────────────────

export function computeWhiteboardFit(
  panels: Map<string, PanelRect>,
  viewportSize: { width: number; height: number },
  padding = 60,
) {
  if (panels.size === 0) return null

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const r of panels.values()) {
    minX = Math.min(minX, r.x)
    minY = Math.min(minY, r.y)
    maxX = Math.max(maxX, r.x + r.width)
    maxY = Math.max(maxY, r.y + r.height)
  }

  const contentW = maxX - minX + padding * 2
  const contentH = maxY - minY + padding * 2
  const vpW = viewportSize.width || window.innerWidth
  const vpH = viewportSize.height || window.innerHeight
  const fitScale = Math.min(vpW / contentW, vpH / contentH, 1.5)
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2

  return {
    scale: Math.min(3, Math.max(0.2, fitScale)),
    offset: {
      x: vpW / 2 - centerX * fitScale,
      y: vpH / 2 - centerY * fitScale,
    },
  }
}

export function computeWhiteboardRectFocus(
  rect: PanelRect,
  viewportSize: { width: number; height: number },
  padding = 40,
  maxScale = 1.5,
) {
  const vpW = viewportSize.width || window.innerWidth
  const vpH = viewportSize.height || window.innerHeight
  const safeWidth = Math.max(1, rect.width)
  const safeHeight = Math.max(1, rect.height)
  const fitScale = Math.min(
    (vpW - padding * 2) / safeWidth,
    (vpH - padding * 2) / safeHeight,
    maxScale,
  )
  const nextScale = Math.min(3, Math.max(0.2, fitScale))

  return {
    scale: nextScale,
    offset: {
      x: vpW / 2 - (rect.x + safeWidth / 2) * nextScale,
      y: vpH / 2 - (rect.y + safeHeight / 2) * nextScale,
    },
  }
}

// ── Store ──────────────────────────────────────────────

export interface WhiteboardStore {
  offset: { x: number; y: number }
  scale: number
  viewportSize: { width: number; height: number }
  snapToGrid: boolean
  snapGridSize: number
  panels: Map<string, PanelRect>
  resetFns: Map<string, () => void>
  /** Incremented each time the panel registry changes; subscribe to trigger re-renders. */
  registryVersion: number

  setOffset: (v: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void
  setScale: (v: number | ((prev: number) => number)) => void
  setViewportSize: (v: { width: number; height: number }) => void
  setSnapToGrid: (v: boolean | ((prev: boolean) => boolean)) => void

  register: (id: string, rect: PanelRect) => void
  unregister: (id: string) => void
  registerReset: (id: string, fn: () => void) => void
  unregisterReset: (id: string) => void

  fitToContent: () => void
  focusPanel: (rect: PanelRect, options?: { padding?: number; maxScale?: number }) => void
  resetWidgets: () => void

  /** Call on WhiteboardShell mount to discard any stale state from the previous session. */
  resetSession: () => void
}

export const useWhiteboardStore = create<WhiteboardStore>((set, get) => ({
  offset: { x: 0, y: 0 },
  scale: 1,
  viewportSize: { width: 0, height: 0 },
  snapToGrid: false,
  snapGridSize: WHITEBOARD_GRID,
  panels: new Map(),
  resetFns: new Map(),
  registryVersion: 0,

  setOffset: (v) => set((s) => ({ offset: typeof v === 'function' ? v(s.offset) : v })),
  setScale: (v) => set((s) => ({ scale: typeof v === 'function' ? v(s.scale) : v })),
  setViewportSize: (v) => set({ viewportSize: v }),
  setSnapToGrid: (v) => set((s) => ({ snapToGrid: typeof v === 'function' ? v(s.snapToGrid) : v })),

  register: (id, rect) => {
    get().panels.set(id, rect)
    set((s) => ({ registryVersion: s.registryVersion + 1 }))
  },
  unregister: (id) => {
    get().panels.delete(id)
    set((s) => ({ registryVersion: s.registryVersion + 1 }))
  },
  registerReset: (id, fn) => { get().resetFns.set(id, fn) },
  unregisterReset: (id) => { get().resetFns.delete(id) },

  fitToContent: () => {
    const { panels, viewportSize } = get()
    const fit = computeWhiteboardFit(panels, viewportSize)
    if (fit) set({ scale: fit.scale, offset: fit.offset })
  },

  focusPanel: (rect, options) => {
    const { viewportSize } = get()
    const fit = computeWhiteboardRectFocus(
      rect, viewportSize, options?.padding ?? 40, options?.maxScale ?? 1.5,
    )
    set({ scale: fit.scale, offset: fit.offset })
  },

  resetWidgets: () => {
    for (const fn of get().resetFns.values()) fn()
    const attempt = (tries = 0) => {
      const { panels, viewportSize } = get()
      const fit = computeWhiteboardFit(panels, viewportSize)
      if (fit) { set({ scale: fit.scale, offset: fit.offset }); return }
      if (tries < 6) requestAnimationFrame(() => attempt(tries + 1))
    }
    requestAnimationFrame(() => requestAnimationFrame(() => attempt()))
  },

  resetSession: () => set({
    offset: { x: 0, y: 0 },
    scale: 1,
    viewportSize: { width: 0, height: 0 },
    snapToGrid: false,
    registryVersion: 0,
    panels: new Map(),
    resetFns: new Map(),
  }),
}))
