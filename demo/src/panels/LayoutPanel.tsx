import {
  FloatingPanel, PanelSection,
  Stack, Inline, TitleRow, Button, SplitLayout,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `// Stack — vertical spacing
<Stack size="sm">
  <Button>One</Button>
  <Button>Two</Button>
</Stack>

// Inline — horizontal space-between
<Inline justify="between">
  <span>Left</span>
  <span>Right</span>
</Inline>

// TitleRow — title + action
<TitleRow>
  <span>My Section</span>
  <Button variant="secondary">Add</Button>
</TitleRow>

// SplitLayout — image + content 2-col
<SplitLayout variant="element">
  <div>Image</div>
  <div>Content</div>
</SplitLayout>`

export function LayoutPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  return (
    <FloatingPanel title="Layout" defaultPosition={defaultPosition} width={360} focusable>
      <PanelSection heading="Stack">
        <Stack size="sm">
          <Button variant="secondary" fullWidth>Item 1</Button>
          <Button variant="secondary" fullWidth>Item 2</Button>
          <Button variant="secondary" fullWidth>Item 3</Button>
        </Stack>
      </PanelSection>
      <PanelSection heading="Inline">
        <Inline justify="between">
          <span>Left content</span>
          <span>Right content</span>
        </Inline>
      </PanelSection>
      <PanelSection heading="TitleRow">
        <TitleRow>
          <span>My Section</span>
          <Button variant="secondary">Add</Button>
        </TitleRow>
      </PanelSection>
      <PanelSection heading="SplitLayout">
        <SplitLayout variant="element">
          <Button variant="secondary" fullWidth>Image</Button>
          <Button variant="secondary" fullWidth>Content</Button>
        </SplitLayout>
      </PanelSection>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
