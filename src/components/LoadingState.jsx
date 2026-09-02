import React from 'react'
import { Loader2, Inbox } from 'lucide-react'

export function LoadingState({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Loader2 size={22} className="animate-spin text-forest-500" />
      <p className="text-sm text-ink-muted">{message}</p>
    </div>
  )
}

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line py-16 text-center px-6">
      <div className="rounded-full bg-paper-soft p-3">
        <Icon size={20} className="text-ink-muted" />
      </div>
      <p className="text-sm font-medium text-ink-soft">{title}</p>
      {description && <p className="max-w-sm text-sm text-ink-faint">{description}</p>}
      {action}
    </div>
  )
}

export default LoadingState
