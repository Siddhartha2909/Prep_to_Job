// profileService — talks to /api/profile once the backend exists.

import { mockProfile } from '../data/mockData'

const SIMULATED_DELAY = 400

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY))
}

/**
 * Future: GET /api/profile
 */
export function getProfile() {
  // TODO: replace with fetch('/api/profile')
  return delay(mockProfile)
}

/**
 * Future: PUT /api/profile
 * body: full or partial profile object
 */
export function saveProfile(profile) {
  // TODO: replace with fetch('/api/profile', { method: 'PUT', body: JSON.stringify(profile) })
  return delay({ ...mockProfile, ...profile })
}
