import React from 'react'

const TONES = {
  neutral: 'bg-paper-soft text-ink-muted',
  forest: 'bg-forest-50 text-forest-600',
  amber: 'bg-amber-50 text-amber-600',
  brick: 'bg-brick-50 text-brick-600',
  ink: 'bg-ink text-paper',
}

export default function Badge({ tone = 'neutral', icon: Icon, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]} ${className}`}
    >
      {Icon && <Icon size={13} />}
      {children}
    </span>
  )
}
