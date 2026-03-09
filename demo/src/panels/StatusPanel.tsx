import {
  FloatingPanel, PanelSection,
  Alert, Pill, Chip, LoadingState, TagRow,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `<Alert tone="info">Saved successfully.</Alert>
<Alert tone="success">Changes applied.</Alert>
<Alert tone="error">Something went wrong.</Alert>
<Alert tone="muted">No items found.</Alert>

<Pill>Draft</Pill>
<Pill tone="success">Published</Pill>
<Pill tone="warning">Review</Pill>
<Pill tone="danger">Rejected</Pill>

<Chip>React</Chip>
<Chip>TypeScript</Chip>

<LoadingState label="Loading assets…" />

<TagRow>
  <Chip>tag-a</Chip>
  <Chip>tag-b</Chip>
  <Chip>tag-c</Chip>
</TagRow>`

export function StatusPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  return (
    <FloatingPanel title="Status & Feedback" defaultPosition={defaultPosition} width={360} focusable>
      <PanelSection heading="Alert">
        <div className="demo-col">
          <Alert tone="info">Saved successfully.</Alert>
          <Alert tone="success">Changes applied.</Alert>
          <Alert tone="error">Something went wrong.</Alert>
          <Alert tone="muted">No items found.</Alert>
        </div>
      </PanelSection>
      <PanelSection heading="Pill">
        <div className="demo-row">
          <Pill>Draft</Pill>
          <Pill tone="success">Published</Pill>
          <Pill tone="warning">Review</Pill>
          <Pill tone="danger">Rejected</Pill>
        </div>
      </PanelSection>
      <PanelSection heading="Chip & TagRow">
        <TagRow>
          <Chip>React</Chip>
          <Chip>TypeScript</Chip>
          <Chip>Vite</Chip>
        </TagRow>
      </PanelSection>
      <PanelSection heading="LoadingState">
        <LoadingState label="Loading assets…" />
      </PanelSection>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
