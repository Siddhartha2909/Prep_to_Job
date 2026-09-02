// jobService — talks to /api/jobs/* and /api/skills once the backend exists.

import { mockJob, mockSkills, mockRecommendedFocus } from '../data/mockData'

function delay(value, ms = 900) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/**
 * Future: POST /api/jobs/analyze
 * body: { role, description }
 */
export function analyzeJob({ role, description }) {
  // TODO: replace with fetch('/api/jobs/analyze', { method: 'POST', body: JSON.stringify({ role, description }) })
  return delay({ ...mockJob, role: role ?? mockJob.role, description: description ?? mockJob.description })
}

/**
 * Future: GET /api/skills
 */
export function getSkillGap() {
  // TODO: replace with fetch('/api/skills')
  return delay({ skills: mockSkills, recommendedFocus: mockRecommendedFocus }, 500)
}
