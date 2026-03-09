import { FloatingPanel, PanelSection } from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const INSTALL_CODE = `npm install @objectifthunes/whiteboard`

const SETUP_CODE = `import '@objectifthunes/whiteboard/style.css'
import {
  WhiteboardShell,
  FloatingPanel,
  ThemeToggle,
} from '@objectifthunes/whiteboard'

export function App() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <WhiteboardShell extraActions={<ThemeToggle />}>
        <FloatingPanel
          title="My Panel"
          defaultPosition={{ x: 100, y: 100 }}
          focusable
        >
          Drag me · Scroll to zoom · Double-click to focus
        </FloatingPanel>
      </WhiteboardShell>
    </div>
  )
}`

const STORE_CODE = `import { useWhiteboardStore } from '@objectifthunes/whiteboard'

const { fitToContent, resetWidgets, setSnapToGrid } = useWhiteboardStore(s => s)`

export function GettingStartedPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  return (
    <FloatingPanel title="Getting Started" defaultPosition={defaultPosition} width={420} focusable>
      <PanelSection heading="Install">
        <CodeBlock code={INSTALL_CODE} />
      </PanelSection>
      <PanelSection heading="Basic Setup">
        <CodeBlock code={SETUP_CODE} />
      </PanelSection>
      <PanelSection heading="Whiteboard Store">
        <CodeBlock code={STORE_CODE} />
      </PanelSection>
    </FloatingPanel>
  )
}
