import './theme.css'
import '@objectifthunes/whiteboard/style.css'
import './demo.css'
import { WhiteboardShell, ThemeToggle, useWhiteboardLayout, useWhiteboardStore, WHITEBOARD_GRID } from '@objectifthunes/whiteboard'

// Expose store for screenshots.mjs
;(window as any).__wb = useWhiteboardStore
import { GettingStartedPanel } from './panels/GettingStartedPanel'
import { ButtonsPanel } from './panels/ButtonsPanel'
import { FormsPanel } from './panels/FormsPanel'
import { StatusPanel } from './panels/StatusPanel'
import { LayoutPanel } from './panels/LayoutPanel'
import { CardsPanel } from './panels/CardsPanel'
import { TypographyPanel } from './panels/TypographyPanel'
import { SkeletonPanel } from './panels/SkeletonPanel'
import { OverlaysPanel } from './panels/OverlaysPanel'
import { NavigationPanel } from './panels/NavigationPanel'

const GAP = WHITEBOARD_GRID * 2

export default function App() {
  const { positions } = useWhiteboardLayout({
    widths: {
      gettingStarted: 420, buttons: 360, forms: 380,
      status: 360, layout: 360, typography: 360,
      cards: 380, overlays: 360, navigation: 360, skeletons: 820,
    },
    startX: 40,
    y: 40,
    gap: GAP,
  })

  return (
    <div className="demo-root">
      <WhiteboardShell extraActions={<ThemeToggle />}>
        <GettingStartedPanel defaultPosition={positions.gettingStarted} />
        <ButtonsPanel defaultPosition={positions.buttons} />
        <FormsPanel defaultPosition={positions.forms} />
        <StatusPanel defaultPosition={positions.status} />
        <LayoutPanel defaultPosition={positions.layout} />
        <TypographyPanel defaultPosition={positions.typography} />
        <CardsPanel defaultPosition={positions.cards} />
        <OverlaysPanel defaultPosition={positions.overlays} />
        <NavigationPanel defaultPosition={positions.navigation} />
        <SkeletonPanel defaultPosition={positions.skeletons} width={820} />
      </WhiteboardShell>
    </div>
  )
}
