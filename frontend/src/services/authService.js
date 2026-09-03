// authService — talks to /api/auth/* once the backend exists.
// Every function returns a Promise so call sites never need to change
// when mock logic is replaced with a real fetch() call.

import { mockUser } from '../data/mockData'

const SIMULATED_DELAY = 500

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY))
}

/**
 * Future: POST /api/auth/register
 * body: { name, email, password }
 */
export function register({ name, email, password }) {
  // TODO: replace with fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
  return delay({ user: { ...mockUser, name, email }, token: 'mock-token' })
}

/**
 * Future: POST /api/auth/login
 * body: { email, password }
 */
export function login({ email, password }) {
  // TODO: replace with fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  return delay({ user: { ...mockUser, email }, token: 'mock-token' })
}

export function logout() {
  return delay({ success: true })
}
