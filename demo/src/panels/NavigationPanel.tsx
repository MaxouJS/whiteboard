import {
  FloatingPanel, PanelSection,
  VerticalToolbar, AvatarBadge, CanvasStage, OverlayIconButton,
  Stack, Inline, MutedText,
} from '@objectifthunes/whiteboard'
import { LayoutDashboard, BookOpen, FolderOpen, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { CodeBlock } from '../CodeBlock'

const CODE = `// VerticalToolbar — fixed sidebar of icon buttons
<VerticalToolbar bottom={<button className="vertical-toolbar__icon-btn">...</button>}>
  <a className="vertical-toolbar__icon-btn is-active" href="/">
    <LayoutDashboard size={14} />
  </a>
  <a className="vertical-toolbar__icon-btn" href="/stories">
    <BookOpen size={14} />
  </a>
</VerticalToolbar>

// AvatarBadge — initials circle
<AvatarBadge>MG</AvatarBadge>

// CanvasStage — 16:9 bordered media container
<CanvasStage hint="Tap to interact">
  <OverlayIconButton placement="top-right"><ZoomIn size={14} /></OverlayIconButton>
  <OverlayIconButton placement="bottom-left"><ChevronLeft size={14} /></OverlayIconButton>
  <OverlayIconButton placement="bottom-right"><ChevronRight size={14} /></OverlayIconButton>
</CanvasStage>`

export function NavigationPanel({ defaultPosition }: { defaultPosition: { x: number; y: number } }) {
  return (
    <FloatingPanel title="Navigation & Canvas" defaultPosition={defaultPosition} width={360} focusable>
      <PanelSection heading="VerticalToolbar">
        <MutedText>Fixed sidebar — shown static for demo</MutedText>
        <VerticalToolbar
          position="static"
          style={{ flexDirection: 'row', padding: '0.34rem', width: 'fit-content' }}
          bottom={
            <button className="vertical-toolbar__icon-btn" title="Logout">
              ✕
            </button>
          }
        >
          <a className="vertical-toolbar__icon-btn is-active" href="#" title="Dashboard" onClick={(e) => e.preventDefault()}>
            <LayoutDashboard size={14} />
          </a>
          <a className="vertical-toolbar__icon-btn" href="#" title="Stories" onClick={(e) => e.preventDefault()}>
            <BookOpen size={14} />
          </a>
          <a className="vertical-toolbar__icon-btn" href="#" title="Assets" onClick={(e) => e.preventDefault()}>
            <FolderOpen size={14} />
          </a>
        </VerticalToolbar>
      </PanelSection>

      <PanelSection heading="AvatarBadge">
        <Inline>
          <AvatarBadge>MG</AvatarBadge>
          <AvatarBadge>JD</AvatarBadge>
          <AvatarBadge>AB</AvatarBadge>
          <MutedText>Initials / user badge</MutedText>
        </Inline>
      </PanelSection>

      <PanelSection heading="CanvasStage + OverlayIconButton">
        <CanvasStage hint="16:9 media container">
          <OverlayIconButton placement="top-right" title="Zoom">
            <ZoomIn size={14} />
          </OverlayIconButton>
          <OverlayIconButton placement="bottom-left" title="Previous">
            <ChevronLeft size={14} />
          </OverlayIconButton>
          <OverlayIconButton placement="bottom-right" title="Next">
            <ChevronRight size={14} />
          </OverlayIconButton>
        </CanvasStage>
      </PanelSection>

      <CodeBlock code={CODE} />
    </FloatingPanel>
  )
}
