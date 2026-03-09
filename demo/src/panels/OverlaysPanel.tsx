import { useState } from 'react'
import {
  FloatingPanel, PanelSection,
  ConfirmDialog, GeneratingOverlay, EmptyState, Button,
  PanelErrorBoundary,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `// ConfirmDialog
<ConfirmDialog
  open={open}
  title="Delete item?"
  message="This action cannot be undone."
  confirmLabel="Delete"
  onConfirm={handleDelete}
  onCancel={() => setOpen(false)}
/>

// GeneratingOverlay
<GeneratingOverlay isGenerating={generating} message="Building scene…">
  <YourContent />
</GeneratingOverlay>

// EmptyState
<EmptyState
  title="No items yet"
  description="Create your first item to get started."
  action={<Button>Create item</Button>}
/>

// PanelErrorBoundary
<PanelErrorBoundary>
  <MightThrow />
</PanelErrorBoundary>`

export function OverlaysPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [generating, setGenerating] = useState(false)

  const simulateGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <FloatingPanel title="Overlays & Dialogs" defaultPosition={defaultPosition} width={360} focusable>
      <PanelSection heading="ConfirmDialog">
        <Button variant="danger" onClick={() => setDialogOpen(true)}>Open dialog</Button>
        <ConfirmDialog
          open={dialogOpen}
          title="Delete item?"
          message="This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={() => setDialogOpen(false)}
          onCancel={() => setDialogOpen(false)}
        />
      </PanelSection>
      <PanelSection heading="GeneratingOverlay">
        <GeneratingOverlay isGenerating={generating} message="Building scene…">
          <Button variant="secondary" fullWidth onClick={simulateGenerate} disabled={generating}>
            {generating ? 'Generating…' : 'Start generating'}
          </Button>
        </GeneratingOverlay>
      </PanelSection>
      <PanelSection heading="EmptyState">
        <EmptyState
          title="No items yet"
          description="Create your first item to get started."
          action={<Button variant="secondary">Create item</Button>}
        />
      </PanelSection>
      <PanelSection heading="PanelErrorBoundary">
        <PanelErrorBoundary>
          <div>Content wrapped in error boundary</div>
        </PanelErrorBoundary>
      </PanelSection>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
