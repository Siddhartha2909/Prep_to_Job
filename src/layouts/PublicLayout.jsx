import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Button from '../components/Button'

export default function PublicLayout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line-soft">
        <div className="container-page flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper">
              <Compass size={16} />
            </div>
            <span className="font-display text-lg font-semibold text-ink">PrepToJob</span>
          </Link>
          {isLanding && (
            <div className="flex items-center gap-3">
              <Button as={Link} to="/login" variant="ghost" size="sm">
                Login
              </Button>
              <Button as={Link} to="/register" variant="primary" size="sm">
                Get Started
              </Button>
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  )
}
