export const WHITEBOARD_GRID = 20

export function snapToWhiteboardGrid(value: number) {
  return Math.round(value / WHITEBOARD_GRID) * WHITEBOARD_GRID
}
