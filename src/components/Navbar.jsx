import React from 'react'
import { Bell, Menu } from 'lucide-react'
import { mockUser } from '../data/mockData'

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Navbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line-soft bg-paper/90 px-5 py-4 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-1.5 text-ink-muted hover:bg-paper-soft lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-base font-semibold text-ink sm:text-lg">{title}</h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          aria-label="View notifications"
          className="relative rounded-full p-2 text-ink-muted hover:bg-paper-soft hover:text-ink"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
            {initials(mockUser.name)}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-ink">{mockUser.name}</p>
            <p className="text-xs leading-tight text-ink-faint">{mockUser.email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
