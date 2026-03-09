import {
  FloatingPanel, PanelSection,
  ItemCard, ItemList, PickerCard, PickerGrid,
  Inline, Pill, MutedText,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `// ItemCard + ItemList
<ItemList>
  <ItemCard as="li">
    <Inline justify="between">
      <span>Item name</span>
      <Pill tone="success">Active</Pill>
    </Inline>
  </ItemCard>
</ItemList>

// PickerCard + PickerGrid
<PickerGrid variant="elements">
  <PickerCard onClick={() => setSelected('a')}>Option A</PickerCard>
  <PickerCard onClick={() => setSelected('b')}>Option B</PickerCard>
</PickerGrid>`

const ITEMS = ['Character sprite', 'Background layer', 'Sound effect', 'Animation clip']

export function CardsPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  return (
    <FloatingPanel title="Cards & Lists" defaultPosition={defaultPosition} width={380} focusable>
      <PanelSection heading="ItemCard + ItemList">
        <ItemList>
          {ITEMS.map((name, i) => (
            <ItemCard key={name} as="li">
              <Inline justify="between">
                <span>{name}</span>
                <Pill tone={i % 2 === 0 ? 'success' : 'default'}>{i % 2 === 0 ? 'Active' : 'Draft'}</Pill>
              </Inline>
            </ItemCard>
          ))}
        </ItemList>
      </PanelSection>
      <PanelSection heading="PickerCard + PickerGrid">
        <PickerGrid variant="elements">
          {['Scene', 'Character', 'Asset', 'Effect', 'Music', 'Voice'].map((label) => (
            <PickerCard key={label}>
              <MutedText size="xs">{label}</MutedText>
            </PickerCard>
          ))}
        </PickerGrid>
      </PanelSection>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
