
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallbackMessage?: string
}

interface State {
  error: Error | null
}

export class PanelErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="wb-stack wb-stack--sm">
          <div className="wb-alert wb-alert--error">
            {this.props.fallbackMessage ?? 'This panel crashed.'}
          </div>
          <button
            type="button"
            className="wb-btn wb-btn--secondary"
            onClick={() => this.setState({ error: null })}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
