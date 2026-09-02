import React from 'react'

const TONES = {
  forest: 'bg-forest-500',
  amber: 'bg-amber-500',
  brick: 'bg-brick-500',
  ink: 'bg-ink',
}

export function scoreTone(score) {
  if (score >= 70) return 'forest'
  if (score >= 50) return 'amber'
  return 'brick'
}

export default function ProgressBar({ value, tone = 'forest', label, showValue = true, size = 'md' }) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-ink-soft">{label}</span>}
          {showValue && <span className="text-ink-muted">{value}%</span>}
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-paper-soft overflow-hidden`}>
        <div
          className={`${height} rounded-full ${TONES[tone]} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}

export function CircularProgress({ value, size = 148, strokeWidth = 12, tone = 'forest', label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const strokeColor = {
    forest: '#2F6F4E',
    amber: '#C97A2B',
    brick: '#B23A2E',
  }[tone]

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EFF1EB" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-semibold text-ink">{value}%</span>
        {label && <span className="text-xs text-ink-muted">{label}</span>}
      </div>
    </div>
  )
}
