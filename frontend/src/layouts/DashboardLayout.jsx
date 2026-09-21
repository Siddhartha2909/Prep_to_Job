import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const TITLES = {
  '/dashboard': 'Overview',
  '/career-profile': 'Career Profile',
  '/resume-upload': 'Resume Analysis',
  '/job-description': 'Job Analysis',
  '/match-result': 'Resume Match',
  '/skill-gap': 'Skill Gap',
  '/settings': 'Settings',
}

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const title = TITLES[location.pathname] ?? 'PrepToJob'

  return (
    <div className="min-h-screen bg-paper lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-line-soft bg-white px-3 py-5 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="relative flex h-full w-72 max-w-[80%] flex-col bg-white px-3 py-5 shadow-lift">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="absolute right-3 top-3 rounded-full p-1.5 text-ink-muted hover:bg-paper-soft"
            >
              <X size={18} />
            </button>
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar title={title} onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
