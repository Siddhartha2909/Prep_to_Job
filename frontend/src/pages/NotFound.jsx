import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-5xl font-semibold text-ink">404</p>
      <p className="mt-2 text-sm text-ink-muted">This page doesn't exist yet.</p>
      <Button as={Link} to="/" className="mt-6">
        Back to home
      </Button>
    </div>
  )
}
