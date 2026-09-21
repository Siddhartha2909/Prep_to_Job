import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  UserRound,
  FileText,
  Briefcase,
  Target,
  BarChart3,
  Settings,
  LogOut,
  Lock,
  Compass,
} from 'lucide-react'

const primaryLinks = [{ to: '/dashboard', label: 'Overview', icon: LayoutGrid }]

const careerLinks = [
  { to: '/career-profile', label: 'Career Profile', icon: UserRound },
  { to: '/resume-upload', label: 'Resume Analysis', icon: FileText },
  { to: '/job-description', label: 'Job Analysis', icon: Briefcase },
  { to: '/match-result', label: 'Resume Match', icon: BarChart3 },
]

const preparationLinks = [{ to: '/skill-gap', label: 'Skill Gap', icon: Target }]

const comingSoon = ['Quiz', 'Interview', 'Roadmap', 'Analytics']

function NavItem({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'bg-forest-50 text-forest-600' : 'text-ink-muted hover:bg-paper-soft hover:text-ink'
        }`
      }
    >
      <Icon size={17} />
      {label}
    </NavLink>
  )
}

function SectionLabel({ children }) {
  return <p className="px-3 pb-1.5 pt-4 text-xs font-medium text-ink-faint">{children}</p>
}

export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col justify-between" onClick={onNavigate}>
      <div>
        <div className="flex items-center gap-2 px-3 pb-6 pt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper">
            <Compass size={16} />
          </div>
          <span className="font-display text-lg font-semibold text-ink">PrepToJob</span>
        </div>

        <nav className="flex flex-col gap-0.5">
          {primaryLinks.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}

          <SectionLabel>Career</SectionLabel>
          {careerLinks.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}

          <SectionLabel>Preparation</SectionLabel>
          {preparationLinks.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}

          <SectionLabel>Coming soon</SectionLabel>
          {comingSoon.map((label) => (
            <div
              key={label}
              className="flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-2 text-sm text-ink-faint"
            >
              {label}
              <Lock size={13} />
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-0.5 border-t border-line-soft pt-3">
        <NavItem to="/settings" label="Settings" icon={Settings} />
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:bg-paper-soft hover:text-brick-500"
        >
          <LogOut size={17} />
          Logout
        </NavLink>
      </div>
    </div>
  )
}
