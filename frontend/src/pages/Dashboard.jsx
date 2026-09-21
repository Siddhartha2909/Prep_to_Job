import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, BarChart3, Gauge, TrendingUp, FileText, Briefcase, UserRound, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import ProgressBar, { scoreTone } from '../components/ProgressBar'
import Button from '../components/Button'
import { LoadingState } from '../components/LoadingState'
import { mockUser, mockProfile, mockMatch, mockSkills, mockRecentActivity } from '../data/mockData'

const ACTIVITY_ICONS = {
  'Resume analyzed': FileText,
  'Job description analyzed': Briefcase,
  'Skill profile created': UserRound,
}

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)))
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <LoadingState message="Loading your dashboard…" />

  const overallSkillLevel = Math.round(mockSkills.reduce((sum, s) => sum + s.score, 0) / mockSkills.length)
  const topGap = [...mockSkills].sort((a, b) => a.score - b.score)[0]

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${mockUser.name.split(' ')[0]}`}
        description={`Target role: ${mockProfile.targetRole} at ${mockProfile.targetCompany}`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UserRound} label="Target Role" value={mockProfile.targetRole} sub={mockProfile.targetCompany} />
        <StatCard icon={BarChart3} label="Resume–JD Match" value={`${mockMatch.overallScore}%`} tone="forest" />
        <StatCard icon={Gauge} label="Overall Skill Level" value={`${overallSkillLevel}%`} tone="forest" />
        <StatCard icon={Target} label="Top Skill Gap" value={topGap.name} sub={`${topGap.score}%`} tone="amber" />
      </div>

      <Card className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Recommended Action</p>
            <p className="text-sm text-ink-muted">Improve {topGap.name}</p>
          </div>
        </div>
        <Button as={Link} to="/skill-gap" icon={ArrowRight}>
          Start Preparation
        </Button>
      </Card>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-ink">Skill Overview</h3>
          <div className="flex flex-col gap-4">
            {mockSkills.map((skill) => (
              <ProgressBar key={skill.name} value={skill.score} label={skill.name} tone={scoreTone(skill.score)} size="sm" />
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-ink">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            {mockRecentActivity.map((activity) => {
              const Icon = ACTIVITY_ICONS[activity.label] ?? FileText
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="rounded-lg bg-paper-soft p-2 text-ink-muted">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-ink-soft">{activity.label}</p>
                    <p className="text-xs text-ink-faint">{timeAgo(activity.timestamp)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
