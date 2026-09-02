import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Input, { Field, Textarea } from '../components/Input'
import Button from '../components/Button'
import { analyzeJob } from '../services/jobService'
import { mockProfile } from '../data/mockData'

export default function JobDescription() {
  const navigate = useNavigate()
  const [role, setRole] = useState(mockProfile.targetRole)
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!role.trim() || !description.trim()) {
      setError('Please fill in both fields before analyzing.')
      return
    }
    setError('')
    setLoading(true)
    try {
      // Structured to later POST /api/jobs/analyze
      await analyzeJob({ role, description })
      navigate('/match-result')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader title="Analyze Job" description="Paste a job description so PrepToJob can compare it to your profile." />

      <Card className="max-w-2xl">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Field label="Target Role" htmlFor="role" required>
            <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Software Engineer" />
          </Field>

          <Field label="Job Description" htmlFor="description" required error={error}>
            <Textarea
              id="description"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </Field>

          <div className="flex justify-end">
            <Button type="submit" loading={loading}>
              Analyze Job
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
