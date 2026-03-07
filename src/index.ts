// Components
export { WhiteboardShell } from './WhiteboardShell'
export { FloatingPanel, usePanelRect, belowPanel } from './FloatingPanel'
export { ZoomBar } from './ZoomBar'
export { Minimap } from './Minimap'
export { ConfirmDialog } from './ConfirmDialog'
export { PanelErrorBoundary } from './PanelErrorBoundary'

// Store
export {
  useWhiteboardStore,
  computeWhiteboardFit,
  computeWhiteboardRectFocus,
} from './store'
export type { PanelRect, WhiteboardStore } from './store'

// Hooks
export { useWhiteboardLayout } from './useWhiteboardLayout'

// Utilities
export { WHITEBOARD_GRID, snapToWhiteboardGrid } from './grid'
export { cn } from './cn'
