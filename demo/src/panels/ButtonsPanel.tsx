import {
  FloatingPanel, PanelSection,
  Button, ButtonRow, PanelCloseButton,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button loading loadingText="Saving…">Save</Button>
<Button disabled>Disabled</Button>

<ButtonRow>
  <Button variant="secondary">Cancel</Button>
  <Button>Confirm</Button>
</ButtonRow>

<PanelCloseButton onClick={onClose} />`

export function ButtonsPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  return (
    <FloatingPanel title="Button" defaultPosition={defaultPosition} width={360} focusable>
      <PanelSection heading="Variants">
        <div className="demo-row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </PanelSection>
      <PanelSection heading="States">
        <div className="demo-row">
          <Button loading loadingText="Saving…">Save</Button>
          <Button disabled>Disabled</Button>
        </div>
      </PanelSection>
      <PanelSection heading="ButtonRow">
        <ButtonRow>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </ButtonRow>
      </PanelSection>
      <PanelSection heading="PanelCloseButton">
        <div className="demo-row">
          <PanelCloseButton onClick={() => {}} />
        </div>
      </PanelSection>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
