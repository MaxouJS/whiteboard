import {
  FloatingPanel, PanelSection,
  GeneratingOverlay, EmptyState, Button,
  PanelErrorBoundary,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `// ConfirmDialog
<ConfirmDialog
  open={open}
  title="Delete item?"
  message="This cannot be undone."
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
  return (
    <FloatingPanel title="Overlays & Dialogs" defaultPosition={defaultPosition} width={360} focusable>
      <PanelSection heading="GeneratingOverlay">
        <GeneratingOverlay isGenerating message="Building scene…">
          <Button variant="secondary" fullWidth>Start generating</Button>
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
