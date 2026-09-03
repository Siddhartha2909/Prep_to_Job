import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import ProgressBar, { scoreTone } from '../components/ProgressBar'
import Button from '../components/Button'
import { LoadingState } from '../components/LoadingState'
import { getSkillGap } from '../services/jobService'

export default function SkillGap() {
  const [loading, setLoading] = useState(true)
  const [skills, setSkills] = useState([])
  const [recommendedFocus, setRecommendedFocus] = useState([])

  useEffect(() => {
    getSkillGap().then((data) => {
      setSkills(data.skills)
      setRecommendedFocus(data.recommendedFocus)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingState message="Building your skill profile…" />

  const strong = skills.filter((s) => s.category === 'strong')
  const improve = skills.filter((s) => s.category === 'improve')

  return (
    <div>
      <PageHeader title="Your Skill Profile" description="A breakdown of where you stand against your target role." />

      <Card>
        <h3 className="mb-5 text-sm font-semibold text-ink">Skill Levels</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skills.map((skill) => (
            <ProgressBar key={skill.name} value={skill.score} label={skill.name} tone={scoreTone(skill.score)} />
          ))}
        </div>
      </Card>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 text-sm font-semibold text-forest-600">Strong Skills</h3>
          <div className="flex flex-wrap gap-2">
            {strong.map((s) => (
              <span key={s.name} className="rounded-full bg-forest-50 px-3 py-1 text-sm text-forest-600">
                {s.name}
              </span>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 text-sm font-semibold text-amber-600">Skills to Improve</h3>
          <div className="flex flex-wrap gap-2">
            {improve.map((s) => (
              <span key={s.name} className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-600">
                {s.name}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-lg bg-forest-50 p-1.5 text-forest-600">
            <TrendingUp size={16} />
          </div>
          <h3 className="text-sm font-semibold text-ink">Recommended Focus</h3>
        </div>
        <ol className="flex flex-col gap-2.5">
          {recommendedFocus.map((skill, idx) => (
            <li key={skill} className="flex items-center gap-3 text-sm text-ink-soft">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
                {idx + 1}
              </span>
              {skill}
            </li>
          ))}
        </ol>
      </Card>

      <div className="mt-6">
        <Button as={Link} to="/dashboard" icon={ArrowRight}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
