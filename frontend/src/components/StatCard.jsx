import React from 'react'
import Card from './Card'

export default function StatCard({ icon: Icon, label, value, sub, tone = 'ink' }) {
  const iconTone = {
    ink: 'bg-paper-soft text-ink-soft',
    forest: 'bg-forest-50 text-forest-600',
    amber: 'bg-amber-50 text-amber-600',
  }[tone]

  return (
    <Card hover className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-ink-muted">{label}</p>
        <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
        {sub && <p className="mt-1 text-xs text-ink-faint">{sub}</p>}
      </div>
      {Icon && (
        <div className={`shrink-0 rounded-xl p-2.5 ${iconTone}`}>
          <Icon size={18} />
        </div>
      )}
    </Card>
  )
}
