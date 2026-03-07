import type { ReactNode } from 'react'

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="page-shell">{children}</main>
}

export function PageCard({ children }: { children: ReactNode }) {
  return <div className="page-card">{children}</div>
}
