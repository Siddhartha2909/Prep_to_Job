import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { CircularProgress } from '../components/ProgressBar'
import ProgressBar, { scoreTone } from '../components/ProgressBar'
import Button from '../components/Button'
import { LoadingState } from '../components/LoadingState'
import { getMatchResult } from '../services/resumeService'

export default function MatchResult() {
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState(null)

  useEffect(() => {
    getMatchResult().then((data) => {
      setMatch(data)
      setLoading(false)
    })
  }, [])

  if (loading || !match) return <LoadingState message="Comparing your resume with the job description…" />

  return (
    <div>
      <PageHeader title="Resume–Job Match" description="How well your resume aligns with the target job description." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Overall score */}
        <Card className="flex flex-col items-center justify-center text-center lg:col-span-1">
          <p className="text-sm font-medium text-ink-muted">Overall Match</p>
          <div className="mt-4">
            <CircularProgress value={match.overallScore} tone={scoreTone(match.overallScore)} />
          </div>
        </Card>

        {/* Matched / missing skills */}
        <Card className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink">Matched Skills</h3>
              <div className="flex flex-col gap-2">
                {match.matchedSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm text-ink-soft">
                    <CheckCircle2 size={15} className="text-forest-500" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink">Missing Skills</h3>
              <div className="flex flex-col gap-2">
                {match.missingSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm text-ink-soft">
                    <AlertTriangle size={15} className="text-amber-500" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Resume analysis */}
        <Card className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-ink">Resume Analysis</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ProgressBar value={match.atsScore} label="ATS Compatibility" tone={scoreTone(match.atsScore)} />
            <ProgressBar value={match.resumeStrength} label="Resume Strength" tone={scoreTone(match.resumeStrength)} />
          </div>
        </Card>

        {/* Job requirements breakdown */}
        <Card className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-ink">Job Requirements</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {match.requirementBreakdown.map((req) => (
              <div key={req.label}>
                <ProgressBar value={req.score} label={req.label} tone={scoreTone(req.score)} size="sm" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge tone="amber">Missing skills detected</Badge>
        <Button as={Link} to="/skill-gap" icon={ArrowRight}>
          View Skill Gap
        </Button>
      </div>
    </div>
  )
}
