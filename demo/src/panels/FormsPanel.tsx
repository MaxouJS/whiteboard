import { useState } from 'react'
import {
  FloatingPanel, PanelSection,
  Input, Textarea, Select, Field, CoordGrid, CoordInput,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `<Field label="Name" hint="Your display name">
  <Input placeholder="John Doe" />
</Field>

<Field label="Bio" error="Required">
  <Textarea rows={3} placeholder="About you…" />
</Field>

<Field label="Theme">
  <Select>
    <option>Light</option>
    <option>Dark</option>
  </Select>
</Field>

<CoordGrid>
  <CoordInput axis="X" value={x} onChange={e => setX(+e.target.value)} />
  <CoordInput axis="Y" value={y} onChange={e => setY(+e.target.value)} />
</CoordGrid>`

export function FormsPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  return (
    <FloatingPanel title="Forms" defaultPosition={defaultPosition} width={380} focusable>
      <PanelSection heading="Input">
        <Field label="Name" hint="Your display name">
          <Input placeholder="John Doe" />
        </Field>
      </PanelSection>
      <PanelSection heading="Textarea">
        <Field label="Bio" error="Required field">
          <Textarea rows={3} placeholder="About you…" />
        </Field>
      </PanelSection>
      <PanelSection heading="Select">
        <Field label="Theme">
          <Select>
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </Select>
        </Field>
      </PanelSection>
      <PanelSection heading="CoordGrid">
        <CoordGrid>
          <CoordInput axis="X" value={x} onChange={e => setX(Number(e.target.value))} />
          <CoordInput axis="Y" value={y} onChange={e => setY(Number(e.target.value))} />
        </CoordGrid>
      </PanelSection>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
