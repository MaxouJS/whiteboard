
import { useEffect, type ReactNode } from 'react'
import { Grid3x3, Minus, Plus, RotateCcw, ScanSearch } from './icons'
import { useWhiteboardStore } from './store'

interface Props {
  /** Extra action buttons rendered at the bottom of the zoom bar */
  extraActions?: ReactNode
}

export function ZoomBar({ extraActions }: Props) {
  const scale = useWhiteboardStore(s => s.scale)
  const viewportSize = useWhiteboardStore(s => s.viewportSize)
  const snapToGrid = useWhiteboardStore(s => s.snapToGrid)
  const setScale = useWhiteboardStore(s => s.setScale)
  const setOffset = useWhiteboardStore(s => s.setOffset)
  const setSnapToGrid = useWhiteboardStore(s => s.setSnapToGrid)
  const fitToContent = useWhiteboardStore(s => s.fitToContent)
  const resetWidgets = useWhiteboardStore(s => s.resetWidgets)

  useEffect(() => {
    if (!snapToGrid) return
    window.dispatchEvent(new Event('whiteboard-snap-now'))
  }, [snapToGrid])

  const zoomTo = (nextScale: number) => {
    const clamped = Math.min(3, Math.max(0.2, nextScale))
    const ratio = clamped / scale
    const cx = (viewportSize.width || window.innerWidth) / 2
    const cy = (viewportSize.height || window.innerHeight) / 2
    setOffset(prev => ({
      x: cx - (cx - prev.x) * ratio,
      y: cy - (cy - prev.y) * ratio,
    }))
    setScale(clamped)
  }

  return (
    <div
      className="zoom-bar"
      onPointerDown={e => e.stopPropagation()}
      onWheel={e => e.stopPropagation()}
    >
      <button type="button" className="wb-btn wb-btn--secondary wb-btn--icon-only zoom-bar__icon" onClick={() => zoomTo(scale * 0.8)} title="Zoom out" aria-label="Zoom out">
        <Minus size={14} />
      </button>
      <span className="zoom-bar__value">
        {Math.round(scale * 100)}%
      </span>
      <button type="button" className="wb-btn wb-btn--secondary wb-btn--icon-only zoom-bar__icon" onClick={() => zoomTo(scale * 1.2)} title="Zoom in" aria-label="Zoom in">
        <Plus size={14} />
      </button>
      <button type="button" className="wb-btn wb-btn--secondary wb-btn--icon-only zoom-bar__action" onClick={fitToContent} title="Fit camera to all panels" aria-label="Fit camera to all panels">
        <ScanSearch size={14} />
      </button>
      <button type="button" className="wb-btn wb-btn--secondary wb-btn--icon-only zoom-bar__action" onClick={resetWidgets} title="Reset panel positions" aria-label="Reset panel positions">
        <RotateCcw size={14} />
      </button>
      <button
        type="button"
        className={`wb-btn wb-btn--secondary wb-btn--icon-only zoom-bar__action${snapToGrid ? ' is-active' : ''}`}
        onClick={() => setSnapToGrid((prev) => !prev)}
        title={snapToGrid ? 'Disable snap to grid' : 'Enable snap to grid'}
        aria-label={snapToGrid ? 'Disable snap to grid' : 'Enable snap to grid'}
      >
        <Grid3x3 size={14} />
      </button>
      {extraActions}
    </div>
  )
}
