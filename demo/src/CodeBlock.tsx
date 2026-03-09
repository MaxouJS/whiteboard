import { useState } from 'react'

interface Props {
  code: string
}

export function CodeBlock({ code }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      <button className="code-block__copy" onClick={copy} type="button">
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre><code>{code.trim()}</code></pre>
    </div>
  )
}
