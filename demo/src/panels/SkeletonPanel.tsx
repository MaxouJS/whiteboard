import {
  FloatingPanel, PanelSection,
  Skeleton, LineSkeleton, TitleSkeleton, ButtonSkeleton, IconButtonSkeleton,
  InputSkeleton, SelectSkeleton, TextareaSkeleton, ChipSkeleton, ThumbSkeleton,
  AvatarSkeleton, CanvasSkeleton,
  Inline,
} from '@objectifthunes/whiteboard'
import { CodeBlock } from '../CodeBlock'

const CODE = `import {
  TitleSkeleton, LineSkeleton, ButtonSkeleton, InputSkeleton,
  SelectSkeleton, TextareaSkeleton, ChipSkeleton, ThumbSkeleton,
  AvatarSkeleton, CanvasSkeleton, IconButtonSkeleton,
} from '@objectifthunes/whiteboard'

// Use wherever content is loading:
<TitleSkeleton />
<LineSkeleton />
<LineSkeleton short />
<InputSkeleton />
<ButtonSkeleton />
<ChipSkeleton />`

export function SkeletonPanel({ defaultPosition, width }: { defaultPosition: { x: number; y: number }, width?: number }) {
  return (
    <FloatingPanel title="Skeletons" defaultPosition={defaultPosition} width={width ?? 820} focusable>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <PanelSection heading="Text">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TitleSkeleton />
            <LineSkeleton />
            <LineSkeleton short />
          </div>
        </PanelSection>
        <PanelSection heading="Inputs">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <InputSkeleton />
            <SelectSkeleton />
            <TextareaSkeleton />
          </div>
        </PanelSection>
        <PanelSection heading="Buttons & Icons">
          <Inline>
            <ButtonSkeleton />
            <IconButtonSkeleton />
          </Inline>
        </PanelSection>
        <PanelSection heading="Media & Tags">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ThumbSkeleton />
            <Inline>
              <ChipSkeleton />
              <ChipSkeleton />
              <AvatarSkeleton />
            </Inline>
          </div>
        </PanelSection>
        <PanelSection heading="Canvas">
          <CanvasSkeleton />
        </PanelSection>
        <PanelSection heading="Custom Skeleton">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton style={{ width: '60%', height: 12 }} />
            <Skeleton radius="md" style={{ width: 80, height: 80 }} />
            <Skeleton radius="pill" style={{ width: 120, height: 24 }} />
          </div>
        </PanelSection>
      </div>
      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
