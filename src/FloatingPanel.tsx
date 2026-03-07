'use client'

import { useRef, useId, useState, useCallback, useEffect, useLayoutEffect, memo, type ReactNode, type PointerEvent, type MutableRefObject } from 'react'
import { Maximize2 } from './icons'
import { useWhiteboardStore } from './store'
import type { PanelRect } from './store'
import { WHITEBOARD_GRID } from './grid'

interface Props {
  title: ReactNode
  defaultPosition: { x: number; y: number }
  width?: number
  className?: string
  /** Ref that stays in sync with the panel's current position and rendered size */
  trackRect?: MutableRefObject<PanelRect>
  /** Show a focus button that zooms the whiteboard to this panel */
  focusable?: boolean
  /** Optional camera framing controls used by the focus button */
  focusPadding?: number
  focusMaxScale?: number
  /** Extra action buttons rendered in the header bar next to the focus button */
  headerActions?: ReactNode
  children: ReactNode
}

export const FloatingPanel = memo(function FloatingPanel({
  title,
  defaultPosition,
  width = 300,
  className,
  trackRect: trackRectRef,
  focusable,
  focusPadding = 40,
  focusMaxScale = 1.5,
  headerActions,
  children,
}: Props) {
  const panelId = useId()
  const [pos, setPos] = useState(defaultPosition)
  const dragging = useRef(false)
  const posRef = useRef(pos)
  const elRef = useRef<HTMLDivElement>(null)
  const lastRegisteredRectRef = useRef<PanelRect | null>(null)
  const scale = useWhiteboardStore(s => s.scale)
  const snapToGrid = useWhiteboardStore(s => s.snapToGrid)
  const snapGridSize = useWhiteboardStore(s => s.snapGridSize)
  const register = useWhiteboardStore(s => s.register)
  const unregister = useWhiteboardStore(s => s.unregister)
  const registerReset = useWhiteboardStore(s => s.registerReset)
  const unregisterReset = useWhiteboardStore(s => s.unregisterReset)
  const focusPanel = useWhiteboardStore(s => s.focusPanel)
  const scaleRef = useRef(scale)
  const snapToGridRef = useRef(false)
  const snapGridSizeRef = useRef(20)
  const defaultPosRef = useRef(defaultPosition)
  const cleanupRef = useRef<(() => void) | null>(null)
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null)

  useEffect(() => {
    scaleRef.current = scale
  }, [scale])

  useEffect(() => {
    snapToGridRef.current = snapToGrid
    snapGridSizeRef.current = snapGridSize
  }, [snapToGrid, snapGridSize])

  useEffect(() => {
    const onSnapNow = () => {
      const snapSize = snapGridSizeRef.current
      setPos((current) => {
        const next = {
          x: Math.round(current.x / snapSize) * snapSize,
          y: Math.round(current.y / snapSize) * snapSize,
        }
        return next.x === current.x && next.y === current.y ? current : next
      })
    }

    window.addEventListener('whiteboard-snap-now', onSnapNow)
    return () => window.removeEventListener('whiteboard-snap-now', onSnapNow)
  }, [])

  useEffect(() => {
    posRef.current = pos
  }, [pos])

  const registerRect = useCallback(() => {
    const el = elRef.current
    if (!el) return

    const nextRect: PanelRect = {
      x: posRef.current.x,
      y: posRef.current.y,
      width: el.offsetWidth,
      height: el.offsetHeight,
      focusPadding,
      focusMaxScale,
    }

    const prev = lastRegisteredRectRef.current
    if (
      prev &&
      prev.x === nextRect.x &&
      prev.y === nextRect.y &&
      prev.width === nextRect.width &&
      prev.height === nextRect.height &&
      prev.focusPadding === nextRect.focusPadding &&
      prev.focusMaxScale === nextRect.focusMaxScale
    ) {
      return
    }

    lastRegisteredRectRef.current = nextRect
    register(panelId, nextRect)
    if (trackRectRef) {
      trackRectRef.current = nextRect
    }
  }, [focusMaxScale, focusPadding, panelId, register, trackRectRef])

  const getCurrentRect = useCallback((): PanelRect | null => {
    const el = elRef.current
    if (!el) return null
    return {
      x: posRef.current.x,
      y: posRef.current.y,
      width: el.offsetWidth,
      height: el.offsetHeight,
      focusPadding,
      focusMaxScale,
    }
  }, [focusMaxScale, focusPadding])

  const handleFocus = useCallback(() => {
    const rect = getCurrentRect()
    if (!rect) return
    focusPanel(rect, { padding: focusPadding, maxScale: focusMaxScale })
  }, [focusPanel, focusPadding, focusMaxScale, getCurrentRect])

  // Register reset function + cleanup on unmount
  useEffect(() => {
    registerReset(panelId, () => setPos(defaultPosRef.current))
    return () => {
      cleanupRef.current?.()
      unregister(panelId)
      unregisterReset(panelId)
      lastRegisteredRectRef.current = null
    }
  }, [panelId, registerReset, unregister, unregisterReset])

  // Measure actual DOM size after paint + register in panel registry.
  useLayoutEffect(() => {
    registerRect()
  }, [pos.x, pos.y, width, registerRect])

  // Track content-driven size changes (e.g. skeleton → real content).
  useEffect(() => {
    const el = elRef.current
    if (!el) return
    if (typeof ResizeObserver === 'undefined') return

    const obs = new ResizeObserver(() => {
      registerRect()
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [registerRect])

  const onDown = useCallback((e: PointerEvent) => {
    if (e.button !== 0) return
    dragging.current = true
    const startX = e.clientX
    const startY = e.clientY
    const startPosX = posRef.current.x
    const startPosY = posRef.current.y
    const startScale = scaleRef.current
    e.preventDefault()
    e.stopPropagation()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)

    const move = (ev: globalThis.PointerEvent) => {
      if (!dragging.current) return
      const rawX = startPosX + (ev.clientX - startX) / startScale
      const rawY = startPosY + (ev.clientY - startY) / startScale
      const snapSize = snapGridSizeRef.current
      const nextX = snapToGridRef.current ? Math.round(rawX / snapSize) * snapSize : rawX
      const nextY = snapToGridRef.current ? Math.round(rawY / snapSize) * snapSize : rawY
      setPos({
        x: nextX,
        y: nextY,
      })
    }
    const up = () => {
      dragging.current = false
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      cleanupRef.current = null
    }
    // Clean previous listeners if any
    cleanupRef.current?.()
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    cleanupRef.current = up
  }, [])

  const panelClassName = className ? `floating-panel ${className}` : 'floating-panel'

  return (
    <div
      ref={elRef}
      className={panelClassName}
      style={{ left: pos.x, top: pos.y, width }}
      onPointerDown={e => e.stopPropagation()}
      onPointerUp={(e) => {
        if (dragging.current) return

        const now = Date.now()
        const last = lastTapRef.current
        if (last && now - last.time < 300) {
          const dx = e.clientX - last.x
          const dy = e.clientY - last.y
          if (dx * dx + dy * dy < 100) {
            e.stopPropagation()
            handleFocus()
            lastTapRef.current = null
            return
          }
        }
        lastTapRef.current = { time: now, x: e.clientX, y: e.clientY }
      }}
      onWheel={e => e.stopPropagation()}
      onDoubleClick={(e) => {
        e.stopPropagation()
        handleFocus()
      }}
    >
      <div onPointerDown={onDown} className="floating-panel__header">
        <strong className="floating-panel__title">{title}</strong>
        {headerActions}
        {focusable && (
          <button
            type="button"
            className="wb-btn wb-btn--secondary wb-btn--icon-only floating-panel__focus"
            onClick={handleFocus}
            onPointerDown={e => e.stopPropagation()}
            title="Focus on this panel"
            aria-label="Focus on this panel"
          >
            <Maximize2 size={14} />
          </button>
        )}
      </div>
      <div className="floating-panel__body">
        {children}
      </div>
    </div>
  )
})

/** Helper: create a stable rect ref for use with trackRect */
export function usePanelRect(initial: { x: number; y: number }): MutableRefObject<PanelRect> {
  const ref = useRef<PanelRect>({ ...initial, width: 0, height: 0 })
  return ref
}

/** Get a position just below a tracked panel */
export function belowPanel(rect: PanelRect, gap = WHITEBOARD_GRID): { x: number; y: number } {
  return { x: rect.x, y: rect.y + rect.height + gap }
}
