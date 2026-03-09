import './theme.css'
import '@objectifthunes/whiteboard/style.css'
import './demo.css'
import { WhiteboardShell, ThemeToggle, useWhiteboardLayout, WHITEBOARD_GRID } from '@objectifthunes/whiteboard'
import { GettingStartedPanel } from './panels/GettingStartedPanel'
import { ButtonsPanel } from './panels/ButtonsPanel'
import { FormsPanel } from './panels/FormsPanel'
import { StatusPanel } from './panels/StatusPanel'
import { LayoutPanel } from './panels/LayoutPanel'
import { CardsPanel } from './panels/CardsPanel'
import { TypographyPanel } from './panels/TypographyPanel'
import { SkeletonPanel } from './panels/SkeletonPanel'
import { OverlaysPanel } from './panels/OverlaysPanel'

const GAP = WHITEBOARD_GRID * 2

export default function App() {
  const row1 = useWhiteboardLayout({
    widths: { gettingStarted: 420, buttons: 360, forms: 380 },
    startX: 40,
    y: 40,
    gap: GAP,
  })
  const row2 = useWhiteboardLayout({
    widths: { status: 360, layout: 360, typography: 360 },
    startX: 40,
    y: 780,
    gap: GAP,
  })
  const row3 = useWhiteboardLayout({
    widths: { cards: 380, overlays: 360 },
    startX: 40,
    y: 1440,
    gap: GAP,
  })
  const row4 = useWhiteboardLayout({
    widths: { skeletons: 820 },
    startX: 40,
    y: 2040,
    gap: GAP,
  })

  return (
    <div className="demo-root">
      <WhiteboardShell extraActions={<ThemeToggle />}>
        <GettingStartedPanel defaultPosition={row1.positions.gettingStarted} />
        <ButtonsPanel defaultPosition={row1.positions.buttons} />
        <FormsPanel defaultPosition={row1.positions.forms} />
        <StatusPanel defaultPosition={row2.positions.status} />
        <LayoutPanel defaultPosition={row2.positions.layout} />
        <TypographyPanel defaultPosition={row2.positions.typography} />
        <CardsPanel defaultPosition={row3.positions.cards} />
        <OverlaysPanel defaultPosition={row3.positions.overlays} />
        <SkeletonPanel defaultPosition={row4.positions.skeletons} width={820} />
      </WhiteboardShell>
    </div>
  )
}
