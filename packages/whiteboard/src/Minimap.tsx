
import { useRef, type PointerEvent, type WheelEvent } from 'react'
import { Loader2 } from './icons'
import { useWhiteboardStore } from './store'

const MAP_W = 200
const MAP_H = 150
const PADDING = 40
const MIN_WORLD_SIZE = 1

interface Props {
  loading?: boolean
}

export function Minimap({ loading = false }: Props) {
  // Subscribe to registryVersion so the minimap re-renders when panels change.
  useWhiteboardStore(s => s.registryVersion)
  const offset = useWhiteboardStore(s => s.offset)
  const scale = useWhiteboardStore(s => s.scale)
  const viewportSize = useWhiteboardStore(s => s.viewportSize)
  const panels = useWhiteboardStore(s => s.panels)
  const setOffset = useWhiteboardStore(s => s.setOffset)
  const setScale = useWhiteboardStore(s => s.setScale)
  const focusPanel = useWhiteboardStore(s => s.focusPanel)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const lastPanelTapRef = useRef<{ id: string; time: number } | null>(null)

  const rectEntries = Array.from(panels.entries())
  const visibleRectEntries = rectEntries.filter(([, rect]) => Number.isFinite(rect.width) && Number.isFinite(rect.height))
  const rects = visibleRectEntries.map(([, rect]) => rect)

  if (loading || rects.length === 0) {
    return (
      <div className="minimap minimap--loading" style={{ width: MAP_W, height: MAP_H }}>
        <div className="minimap__loading">
          <Loader2 size={14} className="icon-spin" />
        </div>
      </div>
    )
  }

  const viewportWidth = viewportSize.width || window.innerWidth
  const viewportHeight = viewportSize.height || window.innerHeight
  const vpW = viewportWidth / scale
  const vpH = viewportHeight / scale
  const vpX = -offset.x / scale
  const vpY = -offset.y / scale

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const r of rects) {
    minX = Math.min(minX, r.x)
    minY = Math.min(minY, r.y)
    maxX = Math.max(maxX, r.x + r.width)
    maxY = Math.max(maxY, r.y + r.height)
  }

  // Keep minimap anchored to actual panel content bounds to avoid disappearing widgets.
  minX -= PADDING
  minY -= PADDING
  maxX += PADDING
  maxY += PADDING

  const worldW = Math.max(MIN_WORLD_SIZE, maxX - minX)
  const worldH = Math.max(MIN_WORLD_SIZE, maxY - minY)
  const mapScale = Math.min(MAP_W / worldW, MAP_H / worldH)

  const contentW = worldW * mapScale
  const contentH = worldH * mapScale
  const mapOffsetX = (MAP_W - contentW) / 2
  const mapOffsetY = (MAP_H - contentH) / 2

  const toMapX = (wx: number) => mapOffsetX + (wx - minX) * mapScale
  const toMapY = (wy: number) => mapOffsetY + (wy - minY) * mapScale

  const clientToWorld = (clientX: number, clientY: number) => {
    if (!containerRef.current) return

    const mapRect = containerRef.current.getBoundingClientRect()
    const localX = Math.min(MAP_W, Math.max(0, clientX - mapRect.left))
    const localY = Math.min(MAP_H, Math.max(0, clientY - mapRect.top))

    const boundedX = Math.min(contentW + mapOffsetX, Math.max(mapOffsetX, localX))
    const boundedY = Math.min(contentH + mapOffsetY, Math.max(mapOffsetY, localY))

    const worldX = (boundedX - mapOffsetX) / mapScale + minX
    const worldY = (boundedY - mapOffsetY) / mapScale + minY

    return { worldX, worldY }
  }

  const centerToWorld = (worldX: number, worldY: number, targetScale: number) => {
    const clampedScale = Math.min(3, Math.max(0.2, targetScale))
    setScale(clampedScale)
    setOffset({
      x: viewportWidth / 2 - worldX * clampedScale,
      y: viewportHeight / 2 - worldY * clampedScale,
    })
  }

  const panTo = (clientX: number, clientY: number) => {
    const world = clientToWorld(clientX, clientY)
    if (!world) return
    centerToWorld(world.worldX, world.worldY, scale)
  }

  const onDown = (e: PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    panTo(e.clientX, e.clientY)
  }

  const onMove = (e: PointerEvent) => {
    if (!dragging.current) return
    panTo(e.clientX, e.clientY)
  }

  const onUp = () => {
    dragging.current = false
  }

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const world = clientToWorld(e.clientX, e.clientY)
    if (!world) return
    const factor = e.deltaY > 0 ? 0.9 : 1.1
    centerToWorld(world.worldX, world.worldY, scale * factor)
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onWheel={onWheel}
      className="minimap"
      style={{
        width: MAP_W,
        height: MAP_H,
      }}
    >
      {visibleRectEntries.map(([id, r]) => (
        <div
          key={id}
          className="minimap__panel"
          onPointerDown={(event) => {
            event.stopPropagation()
          }}
          onPointerUp={(event) => {
            event.stopPropagation()
            const now = Date.now()
            const last = lastPanelTapRef.current
            if (last && last.id === id && now - last.time < 300) {
              event.preventDefault()
              focusPanel(r, { padding: r.focusPadding, maxScale: r.focusMaxScale })
              lastPanelTapRef.current = null
              return
            }
            lastPanelTapRef.current = { id, time: now }
          }}
          onDoubleClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            focusPanel(r, { padding: r.focusPadding, maxScale: r.focusMaxScale })
          }}
          style={{
            left: toMapX(r.x),
            top: toMapY(r.y),
            width: Math.max(1, r.width * mapScale),
            height: Math.max(1, r.height * mapScale),
          }}
        />
      ))}
      <div
        className="minimap__viewport"
        style={{
          left: toMapX(vpX),
          top: toMapY(vpY),
          width: vpW * mapScale,
          height: vpH * mapScale,
        }}
      />
    </div>
  )
}
