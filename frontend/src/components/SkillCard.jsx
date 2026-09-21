import React from 'react'
import ProgressBar, { scoreTone } from './ProgressBar'

export default function SkillCard({ name, score }) {
  return (
    <div className="rounded-xl border border-line-soft bg-paper-soft/40 p-4">
      <ProgressBar value={score} label={name} tone={scoreTone(score)} size="sm" />
    </div>
  )
}
