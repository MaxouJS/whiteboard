import {
  FloatingPanel, PanelSection,
  PageTitle, SectionTitle, SectionDescription, AssetTitle, StoryTitle, MutedText,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `<PageTitle>Page Title</PageTitle>
<StoryTitle>Story Title</StoryTitle>
<AssetTitle>Asset Title</AssetTitle>
<AssetTitle clamp>Long title that gets clamped to one line</AssetTitle>

<SectionTitle>Section Title</SectionTitle>
<SectionDescription>Supporting description for a section.</SectionDescription>

<MutedText>Default muted</MutedText>
<MutedText size="xs">Extra small muted</MutedText>`

export function TypographyPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  return (
    <FloatingPanel title="Typography" defaultPosition={defaultPosition} width={360} focusable>
      <PanelSection>
        <div className="demo-col">
          <PageTitle>Page Title</PageTitle>
          <StoryTitle>Story Title</StoryTitle>
          <AssetTitle>Asset Title</AssetTitle>
          <AssetTitle clamp>Long title that gets clamped to a single line when overflow occurs</AssetTitle>
        </div>
      </PanelSection>
      <PanelSection heading="Section">
        <SectionTitle>Section Title</SectionTitle>
        <SectionDescription>Supporting description for a section.</SectionDescription>
      </PanelSection>
      <PanelSection heading="Muted">
        <div className="demo-col">
          <MutedText>Default muted text</MutedText>
          <MutedText size="xs">Extra small muted text</MutedText>
        </div>
      </PanelSection>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
